module.exports = {
  entry: async (params) => {
    const { app } = params;
    const quickAddApi = params.quickAddApi || app.plugins.plugins.quickadd?.api;

    try {
      if (!quickAddApi?.suggester) {
        new Notice('QuickAdd API is not available.');
        return;
      }

      const activeFile = app.workspace.getActiveFile();
      if (!activeFile) {
        new Notice('Open a parent note before creating an addition.');
        return;
      }

      const tp = getTemplaterFunctions(app);
      const definitions = await loadAdditionDefinitions(
        app,
        'templates/create/additions'
      );

      const contextFolder = getFileFolder(activeFile.path);
      const visible = definitions.filter((item) =>
        matchesContext(item.contextFolder, contextFolder)
      );

      if (visible.length === 0) {
        new Notice(`No additions configured for folder: ${contextFolder}`);
        return;
      }

      const selected = await quickAddApi.suggester(
        visible.map((item) => `${item.emoji} ${item.title}`),
        visible
      );

      if (!selected) {
        new Notice('Addition creation cancelled.');
        return;
      }

      if (selected.targetKind === 'canvas') {
        const targetFolder = selected.folder || 'files';
        const canvasTitle = `${activeFile.basename} (${getTodayDate()}) - ${selected.title}`;
        const canvasPath = getUniquePathWithExtension(
          app,
          targetFolder,
          canvasTitle,
          '.canvas'
        );

        const createdCanvas = await app.vault.create(
          canvasPath,
          JSON.stringify({ nodes: [], edges: [] }, null, 2)
        );

        const canvasTarget = canvasPath.split('/').pop();
        await ensureParentHasDirectLink(
          app,
          activeFile,
          canvasTarget,
          selected.emoji
        );

        const leaf = app.workspace.getLeaf(true);
        await leaf.openFile(createdCanvas);
        new Notice(`Canvas addition created: ${canvasTarget}`);
        return;
      }

      if (!isMarkdownFile(selected.aggregatorTemplateFile)) {
        throw new Error(
          `Missing aggregator.md for addition type: ${selected.id}`
        );
      }

      const hasConcreteTemplate = isMarkdownFile(selected.templateFile);
      let concreteTitle = '';

      if (hasConcreteTemplate) {
        concreteTitle = await askRequiredConcreteTitle(quickAddApi);
        if (!concreteTitle) {
          new Notice('Addition creation cancelled: title is required.');
          return;
        }
      }

      const aggregatorFolder = 'base/additions/aggregators';
      const aggregatorBaseName = `${activeFile.basename} - ${selected.id}`;
      const aggregatorPath = `${aggregatorFolder}/${aggregatorBaseName}.md`;

      await ensureParentHasAggregatorLink(
        app,
        activeFile,
        aggregatorBaseName,
        selected.emoji
      );

      let aggregatorFile = app.vault.getAbstractFileByPath(aggregatorPath);
      if (!isMarkdownFile(aggregatorFile)) {
        aggregatorFile = await tp.file.create_new(
          selected.aggregatorTemplateFile,
          aggregatorBaseName,
          false,
          aggregatorFolder
        );
      }

      if (!isMarkdownFile(aggregatorFile)) {
        aggregatorFile = app.vault.getAbstractFileByPath(aggregatorPath);
      }
      if (!isMarkdownFile(aggregatorFile)) {
        throw new Error(`Cannot create aggregator: ${aggregatorPath}`);
      }

      if (!hasConcreteTemplate) {
        const leaf = app.workspace.getLeaf(true);
        await leaf.openFile(aggregatorFile);
        new Notice(`Aggregator ready: ${aggregatorFile.basename}`);
        return;
      }

      const targetFolder = selected.folder || 'base/additions';
      const concretePath = getUniquePathWithExtension(
        app,
        targetFolder,
        concreteTitle,
        '.md'
      );
      const concreteBaseName = concretePath
        .split('/')
        .pop()
        .replace(/\.md$/, '');

      let createdFile = await tp.file.create_new(
        selected.templateFile,
        concreteBaseName,
        false,
        targetFolder
      );

      if (!isMarkdownFile(createdFile)) {
        createdFile = app.vault.getAbstractFileByPath(concretePath);
      }
      if (!isMarkdownFile(createdFile)) {
        throw new Error(`Cannot create concrete note: ${concretePath}`);
      }

      const leaf = app.workspace.getLeaf(true);
      await leaf.openFile(createdFile);

      new Notice(`Addition created: ${createdFile.basename}`);
    } catch (error) {
      const message = error?.message || String(error);
      new Notice(`Addition macro error: ${message}`);
      console.error('Addition macro error', error);
    }
  },
};

function getTemplaterFunctions(app) {
  const tp =
    app.plugins.plugins['templater-obsidian']?.templater
      ?.current_functions_object;

  if (!tp?.file?.create_new) {
    throw new Error('Templater API is not available.');
  }

  return tp;
}

async function askRequiredConcreteTitle(quickAddApi) {
  if (typeof quickAddApi?.inputPrompt !== 'function') {
    throw new Error('QuickAdd inputPrompt API is not available.');
  }

  const raw = await quickAddApi.inputPrompt('🔤 Title');
  return sanitizeFileName(raw);
}

function sanitizeFileName(value) {
  const normalized = String(value || '').trim();
  if (!normalized) return '';
  return normalized.replace(/[\\/:*?"<>|]/g, '-').trim();
}

async function loadAdditionDefinitions(app, rootPath) {
  const root = app.vault.getAbstractFileByPath(rootPath);
  if (!isFolder(root)) {
    throw new Error(`Additions root folder not found: ${rootPath}`);
  }

  const result = [];

  for (const child of root.children) {
    if (!isFolder(child)) {
      continue;
    }

    const profileFile = app.vault.getAbstractFileByPath(
      `${child.path}/profile.md`
    );
    const aggregatorTemplateFile = app.vault.getAbstractFileByPath(
      `${child.path}/aggregator.md`
    );
    const templateFile = app.vault.getAbstractFileByPath(
      `${child.path}/template.md`
    );

    if (!isMarkdownFile(profileFile)) {
      continue;
    }

    const manifest = await readManifest(app, profileFile);
    const id = child.name;
    const targetKind = String(manifest.targetKind || 'note').toLowerCase();

    if (targetKind !== 'canvas' && !isMarkdownFile(aggregatorTemplateFile)) {
      continue;
    }

    result.push({
      id,
      emoji: String(manifest.emoji || '➕'),
      title: String(manifest.title || id),
      targetKind,
      contextFolder: normalizeManifestString(
        manifest.contextFolder
      ).toLowerCase(),
      folder: normalizeManifestString(manifest.folder),
      aggregatorTemplateFile: isMarkdownFile(aggregatorTemplateFile)
        ? aggregatorTemplateFile
        : null,
      templateFile: isMarkdownFile(templateFile) ? templateFile : null,
    });
  }

  return result;
}

async function readManifest(app, manifestFile) {
  const cached = app.metadataCache.getFileCache(manifestFile)?.frontmatter;
  if (cached) {
    return cached;
  }

  const content = await app.vault.read(manifestFile);
  const lines = content.split('\n');
  if (lines[0]?.trim() !== '---') {
    return {};
  }

  const data = {};
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === '---') {
      break;
    }

    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const key = match[1].trim();
    const raw = match[2].trim();
    data[key] = raw.replace(/^['\"]|['\"]$/g, '');
  }

  return data;
}

function getFileFolder(filePath) {
  const parts = String(filePath).split('/');
  parts.pop(); // remove filename
  return parts.join('/').toLowerCase();
}

function matchesContext(configContext, activeFileFolder) {
  const value = String(configContext || '').toLowerCase();

  if (!value) return true;
  if (value === 'any' || value === '*') return true;
  if (activeFileFolder === value) return true;
  if (activeFileFolder.startsWith(value + '/')) return true;

  return false;
}

function normalizeManifestString(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

async function ensureParentHasAggregatorLink(
  app,
  activeFile,
  aggregatorBaseName,
  emoji
) {
  await app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
    const existingTargets = normalizeLinks(frontmatter.addition);
    const hasLink = existingTargets.some(
      (target) => target.toLowerCase() === aggregatorBaseName.toLowerCase()
    );

    if (hasLink) {
      return;
    }

    const link = `[[${aggregatorBaseName}|${emoji || '➕'}]]`;
    const next = [frontmatter.addition].flat().filter(Boolean);
    next.push(link);
    frontmatter.addition = next;
  });
}

async function ensureParentHasDirectLink(app, activeFile, targetName, emoji) {
  await app.fileManager.processFrontMatter(activeFile, (frontmatter) => {
    const existingTargets = normalizeLinks(frontmatter.addition);
    const hasLink = existingTargets.some(
      (target) => target.toLowerCase() === targetName.toLowerCase()
    );

    if (hasLink) {
      return;
    }

    const link = `[[${targetName}|${emoji || '➕'}]]`;
    const next = [frontmatter.addition].flat().filter(Boolean);
    next.push(link);
    frontmatter.addition = next;
  });
}

function getUniquePathWithExtension(app, folder, title, extension) {
  let counter = 0;

  while (true) {
    const suffix = counter === 0 ? '' : ` ${counter}`;
    const path = `${folder}/${title}${suffix}${extension}`;
    if (!app.vault.getAbstractFileByPath(path)) {
      return path;
    }
    counter += 1;
  }
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeLinks(value) {
  return [value]
    .flat()
    .filter(Boolean)
    .map((item) => extractLinkTarget(String(item)))
    .filter(Boolean);
}

function extractLinkTarget(link) {
  const match = link.match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
  if (!match) return null;
  return match[1].split('/').pop().replace(/\.md$/, '');
}

function isFolder(node) {
  return Boolean(node && Array.isArray(node.children));
}

function isMarkdownFile(node) {
  return Boolean(
    node && node.extension === 'md' && typeof node.path === 'string'
  );
}
