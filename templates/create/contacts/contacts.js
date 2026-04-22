module.exports = {
  entry: async (params) => {
    const { app } = params;
    const quickAddApi = params.quickAddApi || app.plugins.plugins.quickadd?.api;

    try {
      if (!quickAddApi?.suggester || !quickAddApi?.inputPrompt) {
        new Notice('QuickAdd API is not available.');
        return;
      }

      const tp = getTemplaterFunctions(app);

      const inputTitle = await quickAddApi.inputPrompt('🔤 Title');
      const contactTitle = sanitizeFileName(inputTitle);
      if (!contactTitle) {
        new Notice('Contact creation cancelled: title is required.');
        return;
      }

      const contactTypes = await loadContactDefinitions(
        app,
        'templates/create/contacts'
      );

      if (contactTypes.length === 0) {
        new Notice('No contact templates found.');
        return;
      }

      const shortList = contactTypes.filter(
        (item) => String(item.group || '').toLowerCase() === 'short'
      );
      const initialList = shortList.length > 0 ? shortList : contactTypes;

      const menuItems = [...initialList];
      if (shortList.length > 0) {
        menuItems.push({
          __showAll: true,
          emoji: '',
          title: '...show all',
        });
      }

      let selected = await quickAddApi.suggester(
        menuItems.map(formatMenuLabel),
        menuItems
      );

      if (!selected) {
        new Notice('Contact creation cancelled.');
        return;
      }

      if (selected.__showAll) {
        selected = await quickAddApi.suggester(
          contactTypes.map(formatMenuLabel),
          contactTypes,
          false,
          'Contact type (full list):'
        );
      }

      if (!selected || selected.__showAll) {
        new Notice('Contact creation cancelled.');
        return;
      }

      const targetFolder = selected.folder || 'base/contacts';
      const contactPath = getUniquePathWithExtension(
        app,
        targetFolder,
        contactTitle,
        '.md'
      );
      const contactBaseName = contactPath.split('/').pop().replace(/\.md$/, '');

      let createdFile = await tp.file.create_new(
        selected.templateFile,
        contactBaseName,
        false,
        targetFolder
      );

      if (!isMarkdownFile(createdFile)) {
        createdFile = app.vault.getAbstractFileByPath(contactPath);
      }
      if (!isMarkdownFile(createdFile)) {
        throw new Error(`Cannot create contact note: ${contactPath}`);
      }

      const leaf = app.workspace.getLeaf(true);
      await leaf.openFile(createdFile);

      new Notice(`Contact created: ${createdFile.basename}`);
    } catch (error) {
      const message = error?.message || String(error);
      new Notice(`Contacts macro error: ${message}`);
      console.error('Contacts macro error', error);
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

async function loadContactDefinitions(app, rootPath) {
  const root = app.vault.getAbstractFileByPath(rootPath);
  if (!isFolder(root)) {
    throw new Error(`Contacts root folder not found: ${rootPath}`);
  }

  const result = [];

  for (const child of root.children) {
    if (!isFolder(child)) {
      continue;
    }

    const manifestFile = app.vault.getAbstractFileByPath(
      `${child.path}/manifest.md`
    );
    const templateFile = app.vault.getAbstractFileByPath(
      `${child.path}/template.md`
    );

    if (!isMarkdownFile(manifestFile) || !isMarkdownFile(templateFile)) {
      continue;
    }

    const manifest = await readManifest(app, manifestFile);

    const icon =
      normalizeManifestString(getByPath(manifest, 'fields.icon.fixed')) ||
      normalizeManifestString(manifest.emoji) ||
      '📄';

    result.push({
      id: child.name,
      title:
        normalizeManifestString(manifest.name) ||
        normalizeManifestString(manifest.title) ||
        toDisplayTitle(child.name),
      emoji: icon,
      folder: normalizeManifestString(manifest.folder) || 'base/contacts',
      group: normalizeManifestString(manifest.group),
      order: toNumberOrNull(manifest.order),
      templateFile,
    });
  }

  return result.sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
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

  const frontmatterLines = [];
  for (let i = 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === '---') break;
    frontmatterLines.push(line);
  }

  return parseSimpleYamlMap(frontmatterLines);
}

function normalizeManifestString(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function toNumberOrNull(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function sanitizeFileName(value) {
  const normalized = String(value || '').trim();
  if (!normalized) return '';
  return normalized.replace(/[\\/:*?"<>|]/g, '-').trim();
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

function isFolder(node) {
  return Boolean(node && Array.isArray(node.children));
}

function isMarkdownFile(node) {
  return Boolean(
    node && node.extension === 'md' && typeof node.path === 'string'
  );
}

function toDisplayTitle(value) {
  return String(value || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function getByPath(obj, path) {
  if (obj && Object.prototype.hasOwnProperty.call(obj, path)) {
    return obj[path];
  }

  return String(path)
    .split('.')
    .reduce((acc, part) => {
      if (acc === undefined || acc === null) return undefined;
      return acc[part];
    }, obj);
}

function parseSimpleYamlMap(lines) {
  const root = {};
  const stack = [{ indent: -1, value: root }];

  for (const rawLine of lines) {
    const line = rawLine.replace(/\t/g, '  ');
    if (!line.trim() || line.trimStart().startsWith('#')) continue;

    const match = line.match(/^(\s*)([^:]+):(.*)$/);
    if (!match) continue;

    const indent = match[1].length;
    const key = match[2].trim();
    const rawValue = match[3].trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].value;
    if (rawValue === '') {
      const nested = {};
      parent[key] = nested;
      stack.push({ indent, value: nested });
      continue;
    }

    parent[key] = parseScalar(rawValue);
  }

  return root;
}

function parseScalar(raw) {
  const value = raw.replace(/^['\"]|['\"]$/g, '');
  const lower = value.toLowerCase();
  if (lower === 'true') return true;
  if (lower === 'false') return false;

  const asNumber = Number(value);
  if (!Number.isNaN(asNumber) && value !== '') {
    return asNumber;
  }

  return value;
}

function formatMenuLabel(item) {
  if (!item || item.__showAll) {
    return item?.title || '...show all';
  }

  return String(item.title || '').trim();
}
