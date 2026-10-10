// Tag with this category: gives every note of the list under the button the
// tag of the category page the button is on. Meant for the notes a category's
// hierarchies collect without the category tag: once tagged they belong to the
// category directly, and a note collected by several categories becomes a
// bridge between them. Notes that already carry the tag are left alone.
//
// The list is the Bases view below the button, as it is shown right now,
// after its filters and search.
module.exports = async (params) => {
  const { app, quickAddApi, obsidian } = params;
  // The pressed button tells which list it belongs to. A clicked button loses
  // focus before the macro starts, so the button under the pointer comes
  // first; the focused one covers a press from the keyboard.
  const pressed = document.querySelector('.mb-button:hover') ?? document.activeElement;

  const page = app.workspace.getActiveFile();
  const pageFrontmatter = page ? app.metadataCache.getFileCache(page)?.frontmatter ?? {} : {};
  const pageTags = [pageFrontmatter.tags ?? []].flat().map((tag) => String(tag).replace(/^#/, ''));
  const categoryTag = pageTags.find((tag) => tag.startsWith('category/'));
  if (!pageTags.includes('system/category') || !categoryTag) {
    new obsidian.Notice('Press this button on a category page.');
    return;
  }

  const view = app.workspace.activeLeaf?.view;
  const container = view?.containerEl;
  if (!container) return;

  // Inactive tabs are hidden with `visibility`, and the page is rendered for
  // both reading and editing modes, so only a list on screen counts.
  const onScreen = (embed) => embed.checkVisibility({ visibilityProperty: true }) && embed.getBoundingClientRect().height > 0;
  // The nearest list on screen below the button.
  const listBelow = () => {
    if (!pressed || !container.contains(pressed)) return null;
    for (let node = pressed.parentElement; node && node !== container; node = node.parentElement) {
      const below = [...node.querySelectorAll('.bases-embed')]
        .filter((embed) => onScreen(embed) && pressed.compareDocumentPosition(embed) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (below.length) return below[0];
    }
    return null;
  };
  const embed = listBelow();
  if (!embed) {
    new obsidian.Notice('Press the button above a list.');
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

  const tag = categoryTag.toLowerCase();
  const tagged = (file) => {
    const cache = app.metadataCache.getFileCache(file) ?? {};
    const declared = cache.frontmatter?.tags ?? [];
    return [...(typeof declared === 'string' ? declared.split(/[,\s]+/) : [declared].flat()).filter(Boolean).map(String), ...(cache.tags ?? []).map((item) => item.tag)]
      .map((value) => value.replace(/^#/, '').toLowerCase())
      .some((value) => value === tag || value.startsWith(`${tag}/`));
  };
  const pending = [...new Set(entries.map((entry) => entry.file))]
    .filter((file) => file?.extension === 'md' && file.path.startsWith('base/notes/') && !tagged(file));
  if (!pending.length) {
    new obsidian.Notice(`Every note in this list is already tagged ${categoryTag}.`);
    return;
  }

  const plural = (count, word) => `${count} ${count === 1 ? word : `${word}s`}`;
  const confirmed = await quickAddApi.yesNoPrompt(
    `Tag ${plural(pending.length, 'note')} with ${categoryTag}?`,
    pending.slice(0, 8).map((file) => `• ${file.basename}`).join('\n')
      + (pending.length > 8 ? `\n… and ${pending.length - 8} more` : '')
  );
  if (!confirmed) return;

  const changes = [];
  for (const file of pending) {
    const before = await app.vault.read(file);
    await app.fileManager.processFrontMatter(file, (frontmatter) => {
      const declared = frontmatter.tags ?? [];
      frontmatter.tags = [...(typeof declared === 'string' ? declared.split(/[,\s]+/).filter(Boolean) : [declared].flat()), categoryTag];
    });
    changes.push({ file, before, after: await app.vault.read(file) });
  }

  // Undo puts back every note that has not changed since.
  const message = `Tagged ${plural(changes.length, 'note')} with ${categoryTag}.`;
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
      new obsidian.Notice(kept ? `Undone, except ${plural(kept, 'note')} changed since.` : `Undone: ${message}`);
    });
  });
  new obsidian.Notice(fragment, 10000);
};
