module.exports = async function production() {
  const dv = app.plugins.plugins['dataview'].api;
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const typeIcons = {
    'production/company': '🏢',
    'production/band': '🎸',
    'production/label': '🎵',
    'production/channel': '📺',
    'production/podcast': '🎙️',
    'production/platform': '🌐',
    'production/publisher': '📚',
    'production/journal': '📰',
    'production/website': '🔗',
    'production/film_studio': '🎬',
    'production/art_studio': '🎨',
    'production/game_studio': '🎮',
    'production/organization': '🏛️',
  };

  // Auto-resolve from active file's frontmatter
  const activeFile = app.workspace.getActiveFile();
  if (activeFile) {
    // If we are already inside base/productions/, use current note as production.
    if (activeFile.path.startsWith('base/productions/')) {
      return activeFile.basename;
    }

    const fm = app.metadataCache.getFileCache(activeFile)?.frontmatter;
    const productionLinks = [fm?.production].flat().filter(Boolean);
    if (productionLinks.length > 0) {
      const raw = productionLinks[0];
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
    .pages('#production AND -#mark/ignore')
    .sort((p) => p.file.name);

  let production;
  if (pages.length !== 0) {
    production = await tp.system.suggester(
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
      'Select the production'
    );
  } else {
    production = '';
  }

  if (production == null) {
    production = '';
  }

  return production;
};
