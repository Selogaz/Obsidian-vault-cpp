// Delete unlinked notes: moves every note of the list the button sits under
// into the trash, after confirmation. Only notes in base/notes that nothing
// links to are deleted, so a note that gained a link in the meantime is kept.
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

  const withIncoming = new Set();
  for (const targets of Object.values(app.metadataCache.resolvedLinks)) {
    for (const target in targets) withIncoming.add(target);
  }
  const unlinked = items.filter((file) => file.path.startsWith('base/notes/') && !withIncoming.has(file.path));
  if (!unlinked.length) {
    new obsidian.Notice('This list has no unlinked notes.');
    return;
  }

  const plural = (count, word) => `${count} ${count === 1 ? word : `${word}s`}`;
  const kept = items.length - unlinked.length;
  const confirmed = await quickAddApi.yesNoPrompt(
    `Move ${plural(unlinked.length, 'unlinked note')} to the trash?`,
    unlinked.slice(0, 8).map((file) => `• ${file.basename}`).join('\n')
      + (unlinked.length > 8 ? `\n… and ${unlinked.length - 8} more` : '')
      + (kept ? `\n\n${plural(kept, 'linked note')} will stay.` : '')
  );
  if (!confirmed) return;

  for (const file of unlinked) await app.fileManager.trashFile(file);
  new obsidian.Notice(`Moved ${plural(unlinked.length, 'unlinked note')} to the trash.`);
};
