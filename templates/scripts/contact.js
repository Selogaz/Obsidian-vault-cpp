module.exports = async function contact() {
  const dv = app.plugins.plugins['dataview'].api;
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const typeIcons = {
    'contact/working': '💼',
    'contact/personal': '👤',
    'contact/client': '🤝',
    'contact/routine': '🔁',
  };

  // Auto-resolve from active file's frontmatter
  const activeFile = app.workspace.getActiveFile();
  if (activeFile) {
    // If we are already inside base/contacts/, use current note as contact.
    if (activeFile.path.startsWith('base/contacts/')) {
      return activeFile.basename;
    }

    const fm = app.metadataCache.getFileCache(activeFile)?.frontmatter;
    const contactLinks = [fm?.contact].flat().filter(Boolean);
    if (contactLinks.length > 0) {
      const raw = contactLinks[0];
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
    .pages('#contact AND -#mark/ignore')
    .sort((p) => p.file.name);

  let contact;
  if (pages.length !== 0) {
    contact = await tp.system.suggester(
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
      'Select the contact'
    );
  } else {
    contact = '';
  }

  if (contact == null) {
    contact = '';
  }

  return contact;
};
