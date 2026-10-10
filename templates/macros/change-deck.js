// Change deck: moves flashcards from one deck to another and keeps their
// category tag in step, the way .claude/skills/flashcard/change-deck.py does
// from the terminal.
//
// A deck mirrors a category: `obsidian::a::b` belongs to the tag `category/a/b`.
// The card's category tag on that chain is replaced, so cards whose tag had
// drifted from their deck (`category/a` on an `obsidian::a::b` card) are put
// right as well. Started from a category page, only that category's cards are
// offered.
module.exports = async (params) => {
  const { app, obsidian } = params;

  const NOTES_FOLDER = 'base/notes/';
  const DECK_PREFIX = 'obsidian::';

  const tagsOf = (frontmatter) => {
    const declared = frontmatter?.tags ?? [];
    return (typeof declared === 'string' ? declared.split(/[,\s]+/) : [declared].flat())
      .filter(Boolean)
      .map((tag) => String(tag).replace(/^#/, ''));
  };
  // "obsidian::a::b", "a::b", "a/b" and "a b" all name the path "a/b".
  const pathOf = (deck) => String(deck)
    .trim()
    .replace(new RegExp(`^${DECK_PREFIX}`), '')
    .split(/::|\//)
    .map((part) => part.trim().replace(/ /g, '_').toLowerCase())
    .filter(Boolean)
    .join('/');
  const deckOf = (path) => DECK_PREFIX + path.split('/').join('::');
  const onChain = (tagPath, path) => tagPath === path || tagPath.startsWith(`${path}/`) || path.startsWith(`${tagPath}/`);

  // Where the button was pressed.
  const active = app.workspace.getActiveFile();
  const activeTags = active ? tagsOf(app.metadataCache.getFileCache(active)?.frontmatter) : [];
  const scope = active && activeTags.includes('system/category')
    ? { name: active.basename, path: active.basename.replace(/ /g, '_').toLowerCase() }
    : null;

  const cards = app.vault.getMarkdownFiles()
    .filter((file) => file.path.startsWith(NOTES_FOLDER))
    .map((file) => ({ file, frontmatter: app.metadataCache.getFileCache(file)?.frontmatter }))
    .filter(({ frontmatter }) => frontmatter?.deck)
    .filter(({ frontmatter }) => !scope || tagsOf(frontmatter)
      .some((tag) => tag.startsWith('category/') && onChain(tag.slice('category/'.length).toLowerCase(), scope.path)));

  const decks = new Map();
  for (const card of cards) {
    const path = pathOf(card.frontmatter.deck);
    if (!decks.has(path)) decks.set(path, []);
    decks.get(path).push(card);
  }

  // Decks a card can move to: the ones in use and the ones home/prefixes.md
  // defines for flashcards.
  const known = new Set(app.vault.getMarkdownFiles()
    .map((file) => app.metadataCache.getFileCache(file)?.frontmatter?.deck)
    .filter(Boolean)
    .map(pathOf));
  const prefixes = app.vault.getAbstractFileByPath('home/prefixes.md');
  if (prefixes) {
    let section = '';
    let fenced = false;
    for (const line of (await app.vault.cachedRead(prefixes)).split('\n')) {
      if (line.startsWith('```')) fenced = !fenced;
      if (fenced) continue;
      if (line.startsWith('# ')) section = line.slice(2).trim();
      const match = line.match(/^([\w,-]+) – (.+)$/);
      if (!match || !['Categories', 'Code'].includes(section)) continue;
      if (match[2].split('|').some((prefix) => !prefix.startsWith('-'))) known.add(match[1].split(',').join('/').toLowerCase());
    }
  }
  const categories = new Set(app.vault.getMarkdownFiles()
    .filter((file) => file.path.startsWith('base/categories/'))
    .map((file) => file.basename.replace(/ /g, '_').toLowerCase()));

  const retag = (frontmatter, from, to) => {
    const tags = [frontmatter.tags ?? []].flat().filter(Boolean).map(String);
    const index = tags.findIndex((tag) => tag.replace(/^#/, '') === `category/${from}`);
    const drifted = index === -1
      ? tags.findIndex((tag) => tag.replace(/^#/, '').startsWith('category/') && onChain(tag.replace(/^#/, '').slice('category/'.length), from))
      : index;
    const next = `category/${to}`;
    if (drifted === -1) tags.push(next);
    else tags[drifted] = next;
    frontmatter.tags = [...new Set(tags.map((tag) => tag.replace(/^#/, '')))];
    frontmatter.deck = deckOf(to);
  };

  const move = async (from, to) => {
    const changes = [];
    for (const { file } of decks.get(from)) {
      const before = await app.vault.read(file);
      await app.fileManager.processFrontMatter(file, (frontmatter) => retag(frontmatter, from, to));
      changes.push({ file, before, after: await app.vault.read(file) });
    }
    const message = `Moved ${changes.length} ${changes.length === 1 ? 'card' : 'cards'} to ${deckOf(to)}.`;
    const fragment = createFragment((notice) => {
      notice.appendText(`${message} `);
      const undo = notice.createEl('a', { text: 'Undo', href: '#' });
      undo.addEventListener('click', async (event) => {
        event.preventDefault();
        let kept = 0;
        for (const { file, before, after } of changes) {
          await app.vault.process(file, (data) => {
            if (data !== after) {
              kept++;
              return data;
            }
            return before;
          });
        }
        new obsidian.Notice(kept
          ? `Undone, except ${kept} ${kept === 1 ? 'card that has' : 'cards that have'} changed since.`
          : `Undone: ${message}`);
      });
    });
    new obsidian.Notice(fragment, 10000);
  };

  class ChangeDeckModal extends obsidian.Modal {
    onOpen() {
      const { contentEl, titleEl } = this;
      this.modalEl.addClass('change-deck');
      titleEl.setText(scope ? `Change deck · ${scope.name}` : 'Change deck');
      contentEl.createEl('style', {
        text: `
          .change-deck { width: min(720px, 90vw); }
          .change-deck__body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 16px; }
          .change-deck__decks { display: flex; flex-direction: column; gap: 2px; max-height: 50vh; overflow-x: hidden; overflow-y: auto; }
          .change-deck__deck { display: flex; justify-content: space-between; gap: 12px; padding: 6px 8px; border-radius: var(--radius-s); color: var(--text-muted); cursor: pointer; }
          .change-deck__deck span:first-child { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
          .change-deck__deck:hover { background: var(--background-modifier-hover); }
          .change-deck__deck.is-selected { background: var(--background-modifier-active-hover); color: var(--text-normal); }
          .change-deck__count { color: var(--text-faint); font-family: var(--font-monospace); }
          .change-deck__form { display: flex; flex-direction: column; gap: 8px; }
          .change-deck__label { color: var(--text-faint); font-size: var(--font-ui-smaller); }
          .change-deck__from { font-family: var(--font-monospace); }
          .change-deck__status { min-height: 3em; color: var(--text-muted); font-size: var(--font-ui-small); }
          .change-deck__status.is-warning { color: var(--text-error); }
          .change-deck__buttons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
        `,
      });

      if (!decks.size) {
        contentEl.createEl('p', { text: scope ? 'This category has no cards.' : 'There are no cards in base/notes.' });
        return;
      }

      const body = contentEl.createDiv({ cls: 'change-deck__body' });
      const list = body.createDiv({ cls: 'change-deck__decks' });
      const form = body.createDiv({ cls: 'change-deck__form' });
      form.createDiv({ cls: 'change-deck__label', text: 'From' });
      const fromEl = form.createDiv({ cls: 'change-deck__from', text: 'Select a deck on the left' });
      form.createDiv({ cls: 'change-deck__label', text: 'To' });
      const input = form.createEl('input', { type: 'text', attr: { list: 'change-deck-known', placeholder: 'category::subdeck' } });
      const datalist = form.createEl('datalist', { attr: { id: 'change-deck-known' } });
      for (const path of [...known].sort()) datalist.createEl('option', { attr: { value: path.split('/').join('::') } });
      const status = form.createDiv({ cls: 'change-deck__status' });

      const buttons = contentEl.createDiv({ cls: 'change-deck__buttons' });
      buttons.createEl('button', { text: 'Cancel' }).addEventListener('click', () => this.close());
      const apply = buttons.createEl('button', { cls: 'mod-cta', text: 'Change' });

      let from = null;
      const check = () => {
        const to = pathOf(input.value);
        let problem = null;
        if (!from) problem = 'Select the deck to move.';
        else if (!to) problem = 'Type the deck to move the cards to.';
        else if (to === from) problem = 'The cards are already in this deck.';
        else if (!categories.has(to.split('/')[0])) problem = `There is no category “${to.split('/')[0]}” in base/categories.`;
        apply.disabled = Boolean(problem);
        status.toggleClass('is-warning', Boolean(problem && from && to));
        status.setText(problem ?? `${decks.get(from).length} cards: ${deckOf(from)} → ${deckOf(to)}\nTag: category/${from} → category/${to}`);
        apply.setText(problem ? 'Change' : `Change ${decks.get(from).length}`);
        return !problem;
      };

      for (const [path, deckCards] of [...decks].sort((a, b) => a[0].localeCompare(b[0]))) {
        const item = list.createDiv({ cls: 'change-deck__deck' });
        item.createSpan({ text: path.split('/').join('::') });
        item.createSpan({ cls: 'change-deck__count', text: String(deckCards.length) });
        item.addEventListener('click', () => {
          list.querySelectorAll('.is-selected').forEach((element) => element.removeClass('is-selected'));
          item.addClass('is-selected');
          from = path;
          fromEl.setText(deckOf(path));
          if (!input.value) input.value = path.split('/').join('::');
          check();
          input.focus();
        });
      }

      const run = async () => {
        if (!check()) return;
        apply.disabled = true;
        const to = pathOf(input.value);
        this.close();
        await move(from, to);
      };
      input.addEventListener('input', check);
      input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') run();
      });
      apply.addEventListener('click', run);
      check();
    }

    onClose() {
      this.contentEl.empty();
      this.resolve?.();
    }
  }

  await new Promise((resolve) => {
    const modal = new ChangeDeckModal(app);
    modal.resolve = resolve;
    modal.open();
  });
};
