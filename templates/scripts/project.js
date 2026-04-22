module.exports = async function project() {
  const dv = app.plugins.plugins['dataview'].api;
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const typeIcons = {
    'project/single': '✏️',
    'project/short': '🗞️',
    'project/longform': '🖊️',
  };

  const statusOrder = {
    '🟦': 0, // active
    '🟥': 1, // planned
    '📥': 2, // inbox
    '❄': 3, // hold
    '🟩': 4, // done
    '📢': 5, // published
    '⬛': 6, // dropped
  };

  // Auto-resolve from active file's frontmatter
  const activeFile = app.workspace.getActiveFile();
  if (activeFile) {
    // If we are already inside projects/, use current note as project.
    if (activeFile.path.startsWith('projects/')) {
      return activeFile.basename;
    }

    const fm = app.metadataCache.getFileCache(activeFile)?.frontmatter;
    const projectLinks = [fm?.project].flat().filter(Boolean);
    if (projectLinks.length > 0) {
      const raw = projectLinks[0];
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
    .pages('#project AND -#mark/ignore')
    .sort((p) => p.file.name)
    .sort((p) => statusOrder[p.file.frontmatter?.status] ?? 99);

  let project;
  if (pages.length !== 0) {
    project = await tp.system.suggester(
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
      'Select the project'
    );
  } else {
    project = '';
  }

  if (project == null) {
    project = '';
  }

  return project;
};
