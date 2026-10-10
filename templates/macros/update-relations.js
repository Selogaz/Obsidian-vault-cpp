module.exports = async (params) => {
  const { app } = params;

  const TASK_FOLDER = 'base/tasks';

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

  // Started from a category page, only that category's task notes are updated.
  const activeTags = [activeFm?.tags]
    .flat()
    .filter(Boolean)
    .map((tag) => String(tag).replace(/^#/, ''));
  const activeCategory =
    !activeProject && activeTags.includes('system/category')
      ? activeFile.basename
      : null;

  function inActiveCategory(fm) {
    const tag = `category/${activeCategory.replace(/ /g, '_').toLowerCase()}`;
    return (
      [fm?.tags]
        .flat()
        .filter(Boolean)
        .some((value) => {
          const name = String(value).replace(/^#/, '').toLowerCase();
          return name === tag || name.startsWith(`${tag}/`);
        }) || hasLink(fm?.category, activeCategory)
    );
  }

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
    : activeCategory
      ? allTaskFiles.filter((f) =>
          inActiveCategory(app.metadataCache.getFileCache(f)?.frontmatter)
        )
      : allTaskFiles;

  let relationsAdded = 0;

  for (const file of taskFiles) {
    const fm = app.metadataCache.getFileCache(file)?.frontmatter;
    if (!fm) continue;

    // Sync bidirectional related links. Freezing by blockedBy is done by the rules
    // `hold while blocked` and `release when unblocked` in the task manifest.
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
  }

  // Touch milestone files to force Bases progress formula refresh
  const milestoneFiles = (activeProject || activeCategory ? allTaskFiles : app.vault.getMarkdownFiles()).filter((f) => {
    const fm = app.metadataCache.getFileCache(f)?.frontmatter;
    if (!fm?.tags) return false;
    const tags = [fm.tags].flat();
    if (!tags.some((t) => String(t).includes('task/milestone'))) return false;
    if (activeCategory) return inActiveCategory(fm);
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

  new Notice(`Relations updated: +${relationsAdded} links, ${milestoneFiles.length} milestones refreshed`);
};
