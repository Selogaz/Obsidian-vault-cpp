module.exports = async (params) => {
  const { app } = params;

  const TASK_FOLDER = 'base/tasks';
  const FREEZE_STATUS = '❄';
  const ACTIVE_BLOCKER_STATUSES = new Set(['🟦', '📥', '❄']);

  function parseLinks(value) {
    return [value]
      .flat()
      .filter(Boolean)
      .map((v) => {
        const match = String(v).match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
        return match ? match[1].split('/').pop().replace(/\.md$/, '') : null;
      })
      .filter(Boolean);
  }

  function hasLink(value, targetName) {
    return parseLinks(value).some(
      (name) => name.toLowerCase() === targetName.toLowerCase()
    );
  }

  const activeFile = app.workspace.getActiveFile();
  const activeFm = activeFile
    ? app.metadataCache.getFileCache(activeFile)?.frontmatter
    : null;
  const activeProjectLinks = [activeFm?.project].flat().filter(Boolean);
  const activeProject =
    activeProjectLinks.length > 0
      ? (() => {
          const raw = String(activeProjectLinks[0]);
          const match = raw.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
          return match
            ? match[1].split('/').pop().replace(/\.md$/, '')
            : raw;
        })()
      : null;

  const allTaskFiles = app.vault.getMarkdownFiles().filter((f) =>
    f.path.startsWith(TASK_FOLDER)
  );

  const taskFiles = activeProject
    ? allTaskFiles.filter((f) => {
        const fm = app.metadataCache.getFileCache(f)?.frontmatter;
        return [fm?.project]
          .flat()
          .filter(Boolean)
          .some((link) => {
            const raw = String(link);
            const match = raw.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
            const name = match
              ? match[1].split('/').pop().replace(/\.md$/, '')
              : raw;
            return name === activeProject;
          });
      })
    : allTaskFiles;

  let relationsAdded = 0;
  let tasksFrozen = 0;

  for (const file of taskFiles) {
    const fm = app.metadataCache.getFileCache(file)?.frontmatter;
    if (!fm) continue;

    // 1. Sync bidirectional related links
    for (const name of parseLinks(fm.related)) {
      const target = app.metadataCache.getFirstLinkpathDest(name, file.path);
      if (!target) continue;
      const targetFm = app.metadataCache.getFileCache(target)?.frontmatter;
      if (!hasLink(targetFm?.related, file.basename)) {
        await app.fileManager.processFrontMatter(target, (tfm) => {
          const existing = [tfm.related].flat().filter(Boolean);
          tfm.related = [...existing, `[[${file.basename}]]`];
        });
        relationsAdded++;
      }
    }

    // 2. Freeze if blocked by active tasks
    const blockers = parseLinks(fm.blockedBy);
    if (blockers.length === 0) continue;

    const hasActiveBlocker = blockers.some((name) => {
      const blocker = app.metadataCache.getFirstLinkpathDest(name, file.path);
      if (!blocker) return false;
      const status =
        app.metadataCache.getFileCache(blocker)?.frontmatter?.status;
      return ACTIVE_BLOCKER_STATUSES.has(status);
    });

    if (hasActiveBlocker && fm.status !== FREEZE_STATUS) {
      await app.fileManager.processFrontMatter(file, (tfm) => {
        tfm.status = FREEZE_STATUS;
      });
      tasksFrozen++;
    } else if (!hasActiveBlocker && fm.status === FREEZE_STATUS) {
      await app.fileManager.processFrontMatter(file, (tfm) => {
        tfm.status = '🟥';
      });
      tasksFrozen--;
    }
  }

  // Touch milestone files to force Bases progress formula refresh
  const milestoneFiles = (activeProject ? allTaskFiles : app.vault.getMarkdownFiles()).filter((f) => {
    const fm = app.metadataCache.getFileCache(f)?.frontmatter;
    if (!fm?.tags) return false;
    const tags = [fm.tags].flat();
    if (!tags.some((t) => String(t).includes('task/milestone'))) return false;
    if (!activeProject) return true;
    return [fm.project].flat().filter(Boolean).some((link) => {
      const match = String(link).match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
      const name = match ? match[1].split('/').pop().replace(/\.md$/, '') : String(link);
      return name === activeProject;
    });
  });

  for (const file of milestoneFiles) {
    await app.fileManager.processFrontMatter(file, (fm) => {
      fm.updated = new Date().toISOString().replace('Z', '+00:00').replace(/\.\d{3}/, '');
    });
  }

  const frozenMsg = tasksFrozen > 0 ? `, ${tasksFrozen} frozen` : tasksFrozen < 0 ? `, ${Math.abs(tasksFrozen)} unfrozen` : '';
  new Notice(`Relations updated: +${relationsAdded} links${frozenMsg}, ${milestoneFiles.length} milestones refreshed`);
};
