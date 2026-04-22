module.exports = async function source() {
  const dv = app.plugins.plugins['dataview'].api;
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const typeIcons = {
    'source/article/paper': '📄',
    'source/article/resource': '🌐',
    'source/book': '📖',
    'source/course': '🎓',
    'source/cinematic/movie': '🎬',
    'source/cinematic/series': '🍿',
    'source/cinematic/anime': '🌸',
    'source/podcast': '📻',
    'source/video/recording': '📹',
    'source/video/playlist': '📼',
    'source/music/album': '💽',
    'source/music/tracklist': '🎧',
    'source/game': '🎮',
  };

  const statusOrder = {
    '🟦': 0,
    '🟥': 1,
    '📥': 2,
    '❄': 3,
    '🟩': 4,
    '📢': 5,
    '⬛': 6,
  };

  const activeFile = app.workspace.getActiveFile();
  if (activeFile) {
    if (activeFile.path.startsWith('sources/')) {
      return activeFile.basename;
    }

    const fm = app.metadataCache.getFileCache(activeFile)?.frontmatter;
    const sourceLinks = [fm?.source].flat().filter(Boolean);
    if (sourceLinks.length > 0) {
      const raw = sourceLinks[0];
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
    .pages('#source AND -#mark/log')
    .sort((p) => p.file.name)
    .sort((p) => statusOrder[p.file.frontmatter?.status] ?? 99);

  let sourceName;
  if (pages.length !== 0) {
    sourceName = await tp.system.suggester(
      pages.map(function (page) {
        const status = page.file.frontmatter?.status || '';
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
        return `${typeIcon} ${status} ${page.file.name}${catStr}`;
      }),
      pages.map((p) => p.file.name),
      false,
      'Select the source'
    );
  } else {
    sourceName = '';
  }

  if (sourceName == null) {
    sourceName = '';
  }

  return sourceName;
};
