module.exports = async function creator() {
  const dv = app.plugins.plugins['dataview'].api;
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const typeIcons = {
    'creator/writer': '✍️',
    'creator/director': '🎬',
    'creator/researcher': '🔬',
    'creator/contentmaker': '📱',
    'creator/businessman': '💼',
    'creator/expert': '🧠',
    'creator/musician': '🎵',
    'creator/composer': '🎼',
    'creator/actor': '🎭',
    'creator/painter': '🖌️',
    'creator/photographer': '📷',
    'creator/cinematographer': '🎥',
  };

  // Auto-resolve from active file's frontmatter
  const activeFile = app.workspace.getActiveFile();
  if (activeFile) {
    // If we are already inside base/creators/, use current note as creator.
    if (activeFile.path.startsWith('base/creators/')) {
      return activeFile.basename;
    }

    const fm = app.metadataCache.getFileCache(activeFile)?.frontmatter;
    const creatorLinks = [fm?.creator].flat().filter(Boolean);
    if (creatorLinks.length > 0) {
      const raw = creatorLinks[0];
      const match = String(raw).match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
      const name = match
        ? match[1].split('/').pop().replace(/\.md$/, '')
        : String(raw);
      if (name) return name;
    }
  }

  const catPages = dv.pages('#system/category');
  const catIconMap = {};
  catPages.forEach((p) => {
    catIconMap[p.file.name] = p.file.frontmatter?.icon || '🗺️';
  });

  const pages = dv
    .pages('#creator AND -#mark/ignore')
    .sort((p) => p.file.name);

  let creator;
  if (pages.length !== 0) {
    creator = await tp.system.suggester(
      pages.map(function (page) {
        const tags = page.file.frontmatter?.tags || [];
        const typeTag = tags.find((t) => typeIcons[t]);
        const typeIcon = typeTag ? typeIcons[typeTag] : '';
        const cats = [page.category].flat().filter(Boolean);
        const catStr = cats.length
          ? ' [' +
            cats
              .map((link) => {
                const name =
                  link?.path?.split('/').pop()?.replace(/\.md$/, '') || '';
                return `${catIconMap[name] || '🗺️'} ${name}`;
              })
              .join('; ') +
            ']'
          : '';
        return `${typeIcon} ${page.file.name}${catStr}`.trim();
      }),
      pages.map((p) => p.file.name),
      false,
      'Select the creator'
    );
  } else {
    creator = '';
  }

  if (creator == null) {
    creator = '';
  }

  return creator;
};
