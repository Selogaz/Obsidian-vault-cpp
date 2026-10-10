// Send to category: files every item of the list the button sits under into
// one category. Notes in base/notes receive the category tag; sources,
// projects and people receive a link in their `category` property.
//
// The list is the Bases view above the button, as it is shown right now,
// after its filters and search.
module.exports = async (params) => {
  const { app, quickAddApi, obsidian } = params;
  // The pressed button tells which list it belongs to. A clicked button loses
  // focus before the macro starts, so the button under the pointer comes
  // first; the focused one covers a press from the keyboard.
  const pressed = document.querySelector('.mb-button:hover') ?? document.activeElement;

  const view = app.workspace.activeLeaf?.view;
  const container = view?.containerEl;
  if (!container) return;

  // Inactive tabs are hidden with `visibility`, and the page is rendered for
  // both reading and editing modes, so only a list on screen counts.
  const onScreen = (embed) => embed.checkVisibility({ visibilityProperty: true }) && embed.getBoundingClientRect().height > 0;
  const visible = [...container.querySelectorAll('.bases-embed')].filter(onScreen);
  // The nearest list on screen above the button; a button under tabs belongs
  // to whichever tab is open.
  const listAbove = () => {
    if (!pressed || !container.contains(pressed)) return null;
    for (let node = pressed.parentElement; node && node !== container; node = node.parentElement) {
      const above = [...node.querySelectorAll('.bases-embed')]
        .filter((embed) => onScreen(embed) && embed.compareDocumentPosition(pressed) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (above.length) return above[above.length - 1];
    }
    return null;
  };
  const embed = listAbove() ?? (visible.length === 1 ? visible[0] : null);
  if (!embed) {
    new obsidian.Notice('Press the button under a list.');
    return;
  }

  // The Bases view behind the embed holds the rows it shows, not only the ones
  // scrolled into sight.
  const controllerOf = (element) => {
    const seen = new Set();
    const stack = [[view, 0]];
    while (stack.length) {
      const [component, depth] = stack.pop();
      if (!component || typeof component !== 'object' || seen.has(component) || depth > 16) continue;
      seen.add(component);
      if (component.controller && component.containerEl === element) return component.controller;
      for (const child of component._children ?? []) stack.push([child, depth + 1]);
      for (const [key, value] of Object.entries(component)) {
        if (key !== 'app' && value && typeof value === 'object' && Array.isArray(value._children)) stack.push([value, depth + 1]);
      }
    }
    return null;
  };
  const entries = controllerOf(embed)?.view?.data?.data;
  if (!Array.isArray(entries)) {
    new obsidian.Notice('Could not read this list.');
    return;
  }
  const items = [...new Set(entries.map((entry) => entry.file).filter((file) => file?.extension === 'md'))];
  if (!items.length) {
    new obsidian.Notice('This list is empty.');
    return;
  }

  const frontmatterOf = (file) => app.metadataCache.getFileCache(file)?.frontmatter ?? {};
  const tagsOf = (file) => {
    const cache = app.metadataCache.getFileCache(file) ?? {};
    const declared = cache.frontmatter?.tags ?? [];
    return [...(typeof declared === 'string' ? declared.split(/[,\s]+/) : [declared].flat()).filter(Boolean).map(String), ...(cache.tags ?? []).map(({ tag }) => tag)]
      .map((tag) => tag.replace(/^#/, '').toLowerCase());
  };
  const isNote = (file) => file.path.startsWith('base/notes/');
  const plural = (count, word) => `${count} ${count === 1 ? word : `${word}s`}`;
  const preview = (files) => files.slice(0, 8).map((file) => `• ${file.basename}`).join('\n')
    + (files.length > 8 ? `\n… and ${files.length - 8} more` : '');

  const categories = app.vault.getMarkdownFiles()
    .filter((file) => file.path.startsWith('base/categories/'))
    .filter((file) => !tagsOf(file).some((tag) => tag === 'mark/ignore' || tag.startsWith('mark/ignore/')))
    .map((file) => {
      const frontmatter = frontmatterOf(file);
      const tag = [frontmatter.tags ?? []].flat().map((value) => String(value).replace(/^#/, '')).find((value) => value.startsWith('category/'));
      return { file, tag, icon: frontmatter.icon ?? '🗺️', relevant: frontmatter.relevant === true };
    })
    .filter((category) => category.tag)
    .sort((a, b) => Number(b.relevant) - Number(a.relevant) || a.file.basename.localeCompare(b.file.basename));
  const category = await quickAddApi.suggester(
    categories.map(({ file, icon }) => `${icon} ${file.basename}`),
    categories,
    `Send ${plural(items.length, 'item')} to a category`
  );
  if (!category) return;

  const name = category.file.basename.toLowerCase();
  const tag = category.tag.toLowerCase();
  const linked = (value) => [value].flat().filter(Boolean)
    .some((raw) => String(raw).replace(/^\[\[|\]\]$/g, '').split('|')[0].split('/').pop().trim().toLowerCase() === name);
  // Anything belongs to a category through its tag or its `category` property;
  // what is written is a tag for notes and the property for everything else.
  const inCategory = (file) => tagsOf(file).some((value) => value === tag || value.startsWith(`${tag}/`))
    || linked(frontmatterOf(file).category);
  const pending = items.filter((file) => !inCategory(file) && (isNote(file) || 'category' in frontmatterOf(file)));
  if (!pending.length) {
    new obsidian.Notice(`Everything in this list is already in ${category.file.basename}.`);
    return;
  }
  const confirmed = await quickAddApi.yesNoPrompt(`Send ${plural(pending.length, 'item')} to ${category.file.basename}?`, preview(pending));
  if (!confirmed) return;

  const changes = [];
  for (const file of pending) {
    const before = await app.vault.read(file);
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      if (isNote(file)) {
        const declared = frontmatter.tags ?? [];
        frontmatter.tags = [...(typeof declared === 'string' ? declared.split(/[,\s]+/).filter(Boolean) : [declared].flat()), category.tag];
      } else {
        frontmatter.category = [...[frontmatter.category ?? []].flat().filter(Boolean), `[[${category.file.basename}]]`];
      }
    });
    changes.push({ file, before, after: await app.vault.read(file) });
  }

  // Undo puts back every note that has not changed since.
  const message = `Sent ${plural(changes.length, 'item')} to ${category.file.basename}.`;
  const fragment = createFragment((notice) => {
    notice.appendText(`${message} `);
    const undo = notice.createEl('a', { text: 'Undo', href: '#' });
    undo.addEventListener('click', async (event) => {
      event.preventDefault();
      let kept = 0;
      for (const change of changes) {
        await app.vault.process(change.file, (data) => {
          if (data !== change.after) {
            kept++;
            return data;
          }
          return change.before;
        });
      }
      new obsidian.Notice(kept ? `Undone, except ${plural(kept, 'item')} changed since.` : `Undone: ${message}`);
    });
  });
  new obsidian.Notice(fragment, 10000);
};
