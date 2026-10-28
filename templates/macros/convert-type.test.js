(async () => {
  const templater = app.plugins.plugins['templater-obsidian']?.templater;
  const anyNote = app.vault.getMarkdownFiles()[0];
  const { obsidian } = await templater.functions_generator.generate_object(templater.create_running_config(anyNote, anyNote, 0), 0);
  const PREFIX = 'zz convtest';
  const keep = window.__convTestKeep === true;
  delete window.__convTestKeep;
  const results = [];
  const isToday = (value) => String(value).startsWith(window.moment().format('YYYY-MM-DD'));
  const code = await app.vault.adapter.read('templates/macros/convert-type.js');
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let leaf;

  const until = async (test, ms = 4000) => {
    const end = Date.now() + ms;
    while (Date.now() < end) {
      if (await test()) return true;
      await sleep(50);
    }
    return false;
  };

  const stopTimer = () => {
    if (window.__convTestTimer) clearInterval(window.__convTestTimer);
    delete window.__convTestTimer;
  };

  const ours = () => app.vault.getFiles().filter((f) => f.basename.startsWith(PREFIX));

  const purge = async () => {
    for (const f of ours()) await app.vault.delete(f, true);
    await until(() => !ours().length);
  };

  const settle = async (list, quiet = 1800, limit = 12000) => {
    const end = Date.now() + limit;
    let stamp = '';
    let since = Date.now();
    while (Date.now() < end) {
      const next = list.map((f) => `${f.path}:${f.stat.mtime}:${f.stat.size}`).join('|');
      if (next !== stamp) {
        stamp = next;
        since = Date.now();
      } else if (Date.now() - since >= quiet && list.every((f) => f.extension !== 'md' || app.metadataCache.getFileCache(f))) {
        return;
      }
      await sleep(100);
    }
  };

  const parse = async (file) => {
    const text = await app.vault.read(file);
    const info = obsidian.getFrontMatterInfo(text);
    const fm = (info.exists && obsidian.parseYaml(info.frontmatter)) || {};
    return { text, fm, body: text.slice(info.contentStart).trim() };
  };

  const count = (text, part) => text.split(part).length - 1;

  const listOfLinks = (file, key) => [app.metadataCache.getFileCache(file)?.frontmatter?.[key] ?? []].flat()
    .map((link) => app.metadataCache.getFirstLinkpathDest(String(link).replace(/^\[\[|\]\]$/g, '').split('|')[0], file.path)?.basename);

  const ok = (value, message) => {
    if (!value) throw new Error(message);
  };

  const same = (actual, expected, message) => ok(
    JSON.stringify(actual) === JSON.stringify(expected),
    `${message}: ${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`,
  );

  const test = async (name, fn) => {
    try {
      await fn();
      results.push(`PASS ${name}`);
    } catch (error) {
      results.push(`FAIL ${name}: ${error?.message ?? error}`);
    }
  };

  const patch = async (target, key, value, fn) => {
    const own = Object.prototype.hasOwnProperty.call(target, key);
    const original = target[key];
    target[key] = value;
    try {
      return await fn();
    } finally {
      if (own) target[key] = original;
      else delete target[key];
    }
  };

  const convert = async (file, picks) => {
    if (file) {
      await leaf.openFile(file);
      app.workspace.setActiveLeaf(leaf, { focus: false });
      await until(() => app.workspace.getActiveFile() === file);
    }
    const menus = [];
    const notices = [];
    const api = Object.create(obsidian, {
      Notice: { value: class { constructor(message) { notices.push(String(message)); } } },
    });
    const quickAddApi = {
      suggester: async (labels, items) => {
        menus.push({ labels, items });
        const pick = picks[menus.length - 1];
        if (pick == null) return null;
        if (typeof pick === 'function') return pick(items);
        const index = labels.indexOf(pick);
        if (index < 0) throw new Error(`no menu item ${pick}`);
        return items[index];
      },
    };
    const module = { exports: {} };
    new Function('module', 'app', code)(module, app);
    stopTimer();
    window.__convTestTimer = setInterval(() => {
      document.querySelectorAll('.modal-container').forEach((el) => el.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true }),
      ));
    }, 100);
    try {
      await module.exports({ app, quickAddApi, obsidian: api });
    } finally {
      stopTimer();
    }
    if (file?.extension === 'md') await settle([file], 1500, 6000);
    return { menus, notices };
  };

  const untouched = async (file, snap, alone = true) => {
    same(file.path, snap.path, 'path');
    ok(await app.vault.read(file) === snap.text, 'content changed');
    if (alone) ok(!ours().some((f) => f !== file && f.path.startsWith(snap.path.replace(/\.md$/, ' '))), 'duplicate created');
  };

  const tabsOf = async (path) => (await app.vault.read(app.vault.getFileByPath(path))).match(/^~~~~tabs\n[\s\S]*?\n~~~~(?=\n|$)/m)[0];
  const contactTabs = await tabsOf('templates/create/contacts/template.md');
  const sourceTabs = await tabsOf('templates/create/sources/template.md');
  const projectTabs = await tabsOf('templates/create/projects/single/template.md');
  const projectNote = (description, tasks) => `---\ntags:\n  - project/single\n---\n\n${projectTabs}\n\n# Description\n\n${description}\n\n# Tasks\n\n${tasks}\n`;
  const fixtures = {
    contact: ['base/notes', `---\ntags:\n  - note/basic/primary\n  - category/obsidian\n  - mark/scene\naliases:\n  - first alias\ndescription: kept description\ncategory:\n  - "[[obsidian]]"\ndeck: obsidian::test\ncreated: 2026-01-02T03:04:05+03:00\n---\n\n${sourceTabs}\n\nContact body line\n`],
    creator: ['base/notes', 'Creator plain body\n'],
    production: ['base/notes', `---\r\ntags:\r\n  - note/basic/primary\r\naliases: crlf alias\r\n---\r\n\r\n${contactTabs.replace(/\n/g, '\r\n')}\r\n\r\nCRLF body\r\n`],
    single: ['base/notes', '---\ntags:\n  - note/basic/primary\ndescription: project description\n---\n\nSingle body\n'],
    short: ['base/notes', '---\ntags:\n  - note/basic/primary\n---\n\nShort body\n'],
    book: ['base/notes', '---\ntags:\n  - note/basic/primary\naliases: []\n---\n\nBook body\n'],
    meta: ['base/notes', '---\ntags:\n  - note/basic/primary\n---\n\nMeta body\n'],
    'meta empty': ['base/notes', 'Placeholder\n'],
    problem: ['base/notes', '---\ntags:\n  - note/basic/primary\n---\n\nProblem body\n'],
    'self meta': ['base/_meta-notes', '---\ntags:\n  - system/high/meta\n---\n\nSelf meta body\n'],
    'self link': ['base/_meta-notes', '---\ntags:\n  - system/high/meta\ncategory:\n  - "[[obsidian]]"\nmeta:\n  - "[[zz convtest self link]]"\n---\n\nSelf link body\n'],
    'from source': ['sources', `---\ntags:\n  - source/book\n  - category/obsidian\n  - topic/other\naliases:\n  - s1\ndescription: source description\nstatus: 🟦\nrating: 5\nurl: https://example.com\ncategory:\n  - "[[obsidian]]"\ncreated: 2026-02-03T04:05:06+03:00\n---\n\n${sourceTabs}\n\nSource body\n`],
    claim: ['base/notes', '---\ntags:\n  - note/basic/primary\n  - category/obsidian\n  - mark/scene\n  - topic/other\naliases: solo\ndeck: obsidian::claims\ncssclasses:\n  - full-width\n---\n\nClaim body\n'],
    code: ['base/contacts', '---\ntags:\n  - contact/working\nproduction:\nrelevant: false\n---\n\nCode body\n'],
    clash: ['base/notes', '---\ntags:\n  - note/basic/primary\n---\n\nClash body\n'],
    'clash other': ['base/contacts', 'Other clash file\n', 'zz convtest clash'],
    target: ['base/notes', '---\ntags:\n  - note/basic/primary\n---\n\nTarget body\n'],
    linker: ['base/notes', 'See [[zz convtest target]] and [[base/notes/zz convtest target|alias text]].\n'],
    'empty fm': ['base/notes', '---\n---\nEmpty fm body\n'],
    plain: ['base/notes', 'Plain text only\n'],
    cancel: ['base/notes', '---\ntags:\n  - note/basic/primary\naliases:\nicon: 📝\ncolor: "#70a0b5"\n---\n\nCancel body\n'],
    broken: ['base/notes', '---\ntags:\n  - note/basic/primary\naliases:\nicon: 📝\ncolor: "#70a0b5"\n---\n\nBroken body\n'],
    'bad template': ['base/notes', 'Placeholder\n'],
    canvas: ['base/notes', '{"nodes":[],"edges":[]}', 'zz convtest canvas', 'canvas'],
    paper: ['sources', '---\ntags:\n  - source/book\naliases:\n  - p1\nstatus: 🟦\nrating: 🌔\nurl: https://example.org\nstart: 2026-03-01\nscientificity: 👓\n---\n\nPaper body\n'],
    client: ['base/contacts', `---\ntags:\n  - contact/working\nproduction:\n  - "[[zz convtest production]]"\nrelevant: true\n---\n\n${contactTabs}\n\nClient body\n`],
    'custom tabs': ['base/contacts', '---\ntags:\n  - contact/working\n---\n\n~~~~tabs\ntab: mine\nmy own tab text\n~~~~\n\nCustom body\n'],
    'string tags': ['base/notes', '---\ntags: "note/basic/primary, category/obsidian, mark/scene, topic/other"\n---\n\nString tags body\n'],
    'hash tags': ['base/notes', '---\ntags:\n  - "#category/obsidian"\n  - "#mark/scene"\n  - note/basic/primary\n---\n\nHash tags body\n'],
    'self forms': ['base/_meta-notes', '---\ntags:\n  - system/high/meta\ncategory:\n  - "[[obsidian]]"\nmeta:\n  - "[[base/_meta-notes/zz convtest self forms|me]]"\n  - zz convtest self forms\n---\n\nSelf forms body\n'],
    'parent meta': ['base/_meta-notes', '---\ntags:\n  - system/high/meta\ncategory:\n  - "[[obsidian]]"\n---\n\nParent meta body\n'],
    'parent problem': ['base/_problems', '---\ntags:\n  - system/high/problem\ncategory:\n  - "[[obsidian]]"\nmeta:\n  - "[[zz convtest parent meta]]"\n---\n\nParent problem body\n'],
    'child meta': ['base/_meta-notes', '---\ntags:\n  - system/high/meta\ncategory:\n  - "[[obsidian]]"\n---\n\nChild meta body\n'],
    'child hierarchy': ['base/_meta-notes', '---\ntags:\n  - system/high/meta\ncategory:\n  - "[[obsidian]]"\n---\n\nChild hierarchy body\n'],
    'moved hierarchy': ['base/_hierarchy', '---\ntags:\n  - system/high/hierarchy\ncategory:\n  - "[[obsidian]]"\nmeta:\n  - "[[zz convtest parent meta]]"\nproblem:\n  - "[[zz convtest parent problem]]"\n---\n\nMoved hierarchy body\n'],
    'two categories': ['base/_hierarchy', '---\ntags:\n  - system/high/hierarchy\ncategory:\n  - "[[obsidian]]"\n  - "[[linux]]"\n---\n\nTwo categories body\n'],
    'short placed': ['base/notes', '---\ntags:\n  - note/basic/primary\ncategory:\n  - "[[obsidian]]"\n---\n\nShort placed body\n'],
    'nested section': ['projects', projectNote('## Goals\n\nGoal text', '')],
    'changed tabs': ['projects', projectNote('Changed tabs text', '').replace('hide task count', 'hide task count\nshort mode')],
    'no fm template': ['base/notes', '---\ntags:\n  - note/basic/primary\naliases:\nicon: 📝\ncolor: "#70a0b5"\n---\n\nNo fm body\n'],
    'bad folder': ['base/notes', '---\ntags:\n  - note/basic/primary\naliases:\nicon: 📝\ncolor: "#70a0b5"\n---\n\nBad folder body\n'],
    'project again': ['projects', projectNote('What the project is about', '- [ ] first task')],
    'project twice': ['projects', projectNote('', '')],
    'project to book': ['projects', projectNote('Kept description text', '')],
    'empty project to book': ['projects', projectNote('', '')],
    unsaved: ['base/notes', '---\ntags:\n  - note/basic/primary\n---\n\nSaved line\n'],
    'bad yaml': ['base/notes', '---\ntags: [unclosed\n---\n\nBad yaml body\n'],
  };

  const rewrites = {
    'meta empty': '---\ntags:\n  - note/basic/primary\n---\n',
    'bad template': '<%* throw new Error(\'zz convtest boom\') %>\n',
  };

  const files = {};
  const snaps = {};

  try {
    stopTimer();
    await purge();
    for (const [key, [folder, text, name, ext]] of Object.entries(fixtures)) {
      files[key] = await app.vault.create(`${folder}/${name ?? `${PREFIX} ${key}`}.${ext ?? 'md'}`, text);
    }
    await settle(Object.values(files));
    for (const [key, text] of Object.entries(rewrites)) await app.vault.modify(files[key], text);
    await settle(Object.values(files));
    for (const [key, file] of Object.entries(files)) snaps[key] = { path: file.path, text: await app.vault.read(file) };
    leaf = app.workspace.getLeaf('tab');

    await test('people: contact keeps aliases, created, description, strips old tabs, drops note props', async () => {
      const file = files.contact;
      const { menus, notices } = await convert(file, ['👥 people']);
      ok(!menus.slice(1).some((menu) => menu.items.some((item) => item?.template)), 'type menu shown');
      ok(menus[1]?.labels.some((label) => /^✓ .* obsidian( \|.*)?$/.test(label)), 'category not asked');
      same(file.path, 'base/contacts/zz convtest contact.md', 'path');
      const { text, fm, body } = await parse(file);
      same(fm.tags?.[0], 'contact/working', 'type tag');
      ok(!fm.tags.includes('note/basic/primary') && !fm.tags.includes('mark/scene'), 'old tags kept');
      ok(!('deck' in fm), 'deck kept on template type');
      same(fm.aliases, ['first alias'], 'aliases');
      ok(text.includes('created: 2026-01-02T03:04:05+03:00'), `created ${fm.created}`);
      same(fm.description, 'kept description', 'description');
      same(fm.category, ['[[obsidian]]'], 'category');
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
      ok(!text.includes('path includes {{query.file.path}}'), 'old tabs left');
      ok(body.indexOf('~~~~tabs') < body.indexOf('Contact body line'), 'body order');
      ok(notices.some((n) => n.startsWith('Converted')), `notices ${notices}`);
    });

    await test('people: note without frontmatter fills created, empty aliases', async () => {
      const file = files.creator;
      await convert(file, ['👥 people']);
      same(file.path, 'base/contacts/zz convtest creator.md', 'path');
      const { text, fm, body } = await parse(file);
      same(fm.tags?.[0], 'contact/working', 'type tag');
      ok(isToday(fm.created), `created ${fm.created}`);
      same(fm.aliases, [], 'aliases');
      ok(body.endsWith('Creator plain body'), 'body');
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
    });

    await test('people: CRLF note keeps alias and strips CRLF tabs', async () => {
      const file = files.production;
      await convert(file, ['👥 people']);
      same(file.path, 'base/contacts/zz convtest production.md', 'path');
      const { text, fm, body } = await parse(file);
      same(fm.tags?.[0], 'contact/working', 'type tag');
      same(fm.aliases, ['crlf alias'], 'aliases');
      ok(!text.includes('\r'), 'CRLF left');
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
      ok(body.includes('CRLF body'), 'body');
      ok(!text.slice(0, text.indexOf('CRLF body')).includes('---\r\n'), 'old frontmatter left in body');
    });

    await test('project: single carries description', async () => {
      const file = files.single;
      await convert(file, ['🏢 project', '✏️ Single']);
      same(file.path, 'projects/zz convtest single.md', 'path');
      const { fm, body } = await parse(file);
      ok(fm.tags.includes('project/single') && !fm.tags.some((t) => t.startsWith('note/')), `tags ${fm.tags}`);
      same(fm.description, 'project description', 'description');
      ok(body.endsWith('Single body'), 'body');
    });

    await test('project: short, longform not offered', async () => {
      const file = files.short;
      const { menus } = await convert(file, ['🏢 project', '🗞️ Short']);
      same(menus[1].labels, ['✏️ Single', '🗞️ Short'], 'project menu');
      ok(!menus[1].items.some((t) => /longform/.test(t.template?.path)), 'longform offered');
      same(file.path, 'projects/zz convtest short.md', 'path');
      const { fm, body } = await parse(file);
      ok(fm.tags.includes('project/short') && !fm.tags.some((t) => t.startsWith('note/')), `tags ${fm.tags}`);
      ok(body.endsWith('Short body'), 'body');
    });

    await test('source: book', async () => {
      const file = files.book;
      await convert(file, ['🗃️ source', '_📖 Book']);
      same(file.path, 'sources/zz convtest book.md', 'path');
      const { fm, body } = await parse(file);
      same(fm.tags, ['source/book'], 'tags');
      same(fm.aliases, [], 'aliases');
      ok('status' in fm && 'rating' in fm, 'source fields');
      ok(body.endsWith('Book body'), 'body');
    });

    await test('system: meta drops 💤 when old body exists', async () => {
      const file = files.meta;
      await convert(file, ['🧠 system', '🔎 Meta-note']);
      same(file.path, 'base/_meta-notes/zz convtest meta.md', 'path');
      const { fm, body } = await parse(file);
      same(fm.tags, ['system/high/meta'], 'tags');
      same(body, 'Meta body', 'body');
    });

    await test('system: meta keeps 💤 when old body is empty', async () => {
      const file = files['meta empty'];
      await convert(file, ['🧠 system', '🔎 Meta-note']);
      same(file.path, 'base/_meta-notes/zz convtest meta empty.md', 'path');
      same((await parse(file)).body, '💤', 'body');
    });

    await test('system: problem', async () => {
      const file = files.problem;
      await convert(file, ['🧠 system', '⚡ Problem']);
      same(file.path, 'base/_problems/zz convtest problem.md', 'path');
      const { fm, body } = await parse(file);
      same(fm.tags, ['system/high/problem'], 'tags');
      same(body, 'Problem body', 'body');
    });

    await test('system: meta → hierarchy drops inherited self meta', async () => {
      const file = files['self meta'];
      await convert(file, ['🧠 system', '🧬 Hierarchy']);
      same(file.path, 'base/_hierarchy/zz convtest self meta.md', 'path');
      const { text, fm, body } = await parse(file);
      same(fm.tags, ['system/high/hierarchy'], 'tags');
      ok(!fm.meta, `meta ${JSON.stringify(fm.meta)}`);
      ok(!text.includes('[[zz convtest self meta'), 'self link left');
      same(body, 'Self meta body', 'body');
    });

    await test('system: meta → hierarchy drops prefilled self meta, keeps category', async () => {
      const file = files['self link'];
      await convert(file, ['🧠 system', '🧬 Hierarchy']);
      same(file.path, 'base/_hierarchy/zz convtest self link.md', 'path');
      const { text, fm } = await parse(file);
      ok(!fm.meta, `meta ${JSON.stringify(fm.meta)}`);
      ok(!text.includes('[[zz convtest self link'), 'self link left');
      same(fm.category, ['[[obsidian]]'], 'category');
    });

    await test('note: source → primary drops old props, keeps category tag', async () => {
      const file = files['from source'];
      await convert(file, ['📝 note']);
      same(file.path, 'base/notes/zz convtest from source.md', 'path');
      const { text, fm, body } = await parse(file);
      same(Object.keys(fm).sort(), ['aliases', 'color', 'created', 'cssclasses', 'deck', 'icon', 'tags', 'updated'], 'keys');
      same(fm.tags, ['note/basic/primary', 'category/obsidian'], 'tags');
      same(fm.aliases, ['s1'], 'aliases');
      same(fm.icon, '📝', 'icon');
      ok(text.includes('created: 2026-02-03T04:05:06+03:00'), `created ${fm.created}`);
      ok(isToday(fm.updated), `updated ${fm.updated}`);
      same(body, 'Source body', 'body');
    });

    await test('note: no type menu, primary in place keeps deck, cssclasses, category and mark tags', async () => {
      const file = files.claim;
      const before = ours().length;
      const { menus } = await convert(file, ['📝 note']);
      same(menus.length, 1, 'menus');
      same(file.path, 'base/notes/zz convtest claim.md', 'path');
      same(ours().length, before, 'file count');
      const { fm, body } = await parse(file);
      same(fm.tags[0], 'note/basic/primary', 'type tag');
      same([...fm.tags].sort(), ['category/obsidian', 'mark/scene', 'note/basic/primary'], 'tags');
      same(fm.deck, 'obsidian::claims', 'deck');
      same(fm.cssclasses, ['full-width'], 'cssclasses');
      same(fm.aliases, ['solo'], 'aliases');
      same(body, 'Claim body', 'body');
    });

    await test('note: contact → primary moves to base/notes, drops production', async () => {
      const file = files.code;
      await convert(file, ['📝 note']);
      same(file.path, 'base/notes/zz convtest code.md', 'path');
      const { fm, body } = await parse(file);
      same(fm.tags, ['note/basic/primary'], 'tags');
      ok(!('production' in fm) && !('relevant' in fm), 'old props kept');
      same(body, 'Code body', 'body');
    });

    await test('name clash in target folder gets a free name', async () => {
      const file = files.clash;
      await convert(file, ['👥 people']);
      same(file.path, 'base/contacts/zz convtest clash 1.md', 'path');
      await untouched(files['clash other'], snaps['clash other'], false);
      ok((await parse(file)).body.endsWith('Clash body'), 'body');
    });

    await test('inbound links resolve after move', async () => {
      const file = files.target;
      const linker = files.linker;
      await convert(file, ['👥 people']);
      same(file.path, 'base/contacts/zz convtest target.md', 'path');
      const resolved = await until(() => {
        const links = app.metadataCache.getFileCache(linker)?.links ?? [];
        return links.length === 2 && links.every((l) => app.metadataCache.getFirstLinkpathDest(l.link, linker.path) === file);
      }, 6000);
      const text = await app.vault.read(linker);
      ok(resolved, `links not resolved: ${text}`);
      ok(text.includes('|alias text]]'), `alias lost: ${text}`);
    });

    await test('empty frontmatter ---\\n--- → primary', async () => {
      const file = files['empty fm'];
      await convert(file, ['📝 note']);
      same(file.path, 'base/notes/zz convtest empty fm.md', 'path');
      const { text, fm, body } = await parse(file);
      same(fm.tags, ['note/basic/primary'], 'tags');
      same(body, 'Empty fm body', 'body');
      same(count(text, '---'), 2, 'frontmatter fences');
    });

    await test('no frontmatter → primary', async () => {
      const file = files.plain;
      await convert(file, ['📝 note']);
      const { fm, body } = await parse(file);
      same(fm.tags, ['note/basic/primary'], 'tags');
      ok(isToday(fm.created), `created ${fm.created}`);
      same(body, 'Plain text only', 'body');
    });

    await test('cancel at menu 1 leaves note untouched', async () => {
      const { menus } = await convert(files.cancel, [null]);
      same(menus.length, 1, 'menus');
      await untouched(files.cancel, snaps.cancel);
    });

    await test('cancel at menu 2 leaves note untouched', async () => {
      const { menus } = await convert(files.cancel, ['🧠 system', null]);
      same(menus.length, 2, 'menus');
      await untouched(files.cancel, snaps.cancel);
    });

    await test('menu 1 order, no category anywhere', async () => {
      const groups = [];
      await convert(files.cancel, [(items) => { groups.push(...items); return null; }]);
      same(groups.map((g) => g.title), ['👥 people', '🏢 project', '🗃️ source', '🧠 system', '📝 note'], 'groups');
      const { menus } = await convert(files.cancel, ['🧠 system', null]);
      same(menus[1].labels, ['🔎 Meta-note', '⚡ Problem', '🧬 Hierarchy'], 'system menu');
      ok(!menus[1].items.some((t) => /category\/template\.md$/.test(t.template?.path)), 'category offered');
      for (const group of ['🏢 project', '🗃️ source']) {
        const run = await convert(files.cancel, [group, null]);
        ok(!run.menus[1].items.some((t) => /\/category\b|categories/.test(`${t.template?.path} ${t.folder}`)), `category in ${group}`);
      }
      await untouched(files.cancel, snaps.cancel);
    });

    await test('no active file: notice, nothing changes', async () => {
      const run = await patch(app.workspace, 'getActiveFile', () => null, () => convert(null, ['👥 people']));
      same(run.menus.length, 0, 'menus');
      same(run.notices, ['Open the note to convert.'], 'notices');
      await untouched(files.cancel, snaps.cancel);
    });

    await test('non-md active file: notice, nothing changes', async () => {
      const run = await convert(files.canvas, ['👥 people']);
      ok(app.workspace.getActiveFile() === files.canvas, 'canvas is not active');
      same(run.menus.length, 0, 'menus');
      same(run.notices, ['Open the note to convert.'], 'notices');
      await untouched(files.canvas, snaps.canvas);
    });

    await test('template render throws: note byte-identical', async () => {
      const fail = () => Promise.reject(new Error('zz convtest render failure'));
      const run = await patch(templater, 'read_and_parse_template', fail, () => convert(files.broken, ['👥 people']));
      ok(run.notices.some((n) => n.startsWith('Convert type error') && n.includes('render failure')), `notices ${run.notices}`);
      await untouched(files.broken, snaps.broken);
      ok(!templater.files_with_pending_templates?.has(files.broken.path), 'templater task left open');
    });

    await test('template that throws: note byte-identical', async () => {
      const bad = { title: 'zz broken', folder: 'base/contacts', template: files['bad template'] };
      const run = await convert(files.broken, ['🗃️ source', () => bad]);
      ok(run.notices.some((n) => n.startsWith('Convert type error')), `notices ${run.notices}`);
      await untouched(files.broken, snaps.broken);
      await untouched(files['bad template'], snaps['bad template']);
    });
    await test('same family: book → paper keeps rating, url, start, scientificity', async () => {
      const file = files.paper;
      await convert(file, ['🗃️ source', '_📃 Paper']);
      same(file.path, 'sources/zz convtest paper.md', 'path');
      const { fm, body } = await parse(file);
      ok(String(fm.tags[0]).endsWith('paper'), `tags ${fm.tags}`);
      same(fm.rating, '🌔', 'rating');
      same([fm.url].flat(), ['https://example.org'], 'url');
      same(String(fm.start), '2026-03-01', 'start');
      same(fm.scientificity, '👓', 'scientificity');
      ok(fm.status, 'status');
      same(fm.aliases, ['p1'], 'aliases');
      same(body.split('\n').pop(), 'Paper body', 'body');
    });

    await test('same family: working → working in place keeps production and relevant, one tabs block', async () => {
      const file = files.client;
      const before = ours().length;
      await convert(file, ['👥 people']);
      same(file.path, 'base/contacts/zz convtest client.md', 'path');
      same(ours().length, before, 'file count');
      const { text, fm, body } = await parse(file);
      ok(fm.tags.includes('contact/working'), `tags ${fm.tags}`);
      same(fm.production, ['[[zz convtest production]]'], 'production');
      same(fm.relevant, true, 'relevant');
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
      
      ok(body.endsWith('Client body'), 'body');
    });

    await test('old tabs kept when the new type has no tabs', async () => {
      const file = files['custom tabs'];
      await convert(file, ['📝 note']);
      same(file.path, 'base/notes/zz convtest custom tabs.md', 'path');
      const { text, body } = await parse(file);
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
      ok(body.includes('my own tab text') && body.endsWith('Custom body'), `body ${body}`);
    });

    await test('note: comma-separated string tags keep category and mark', async () => {
      const file = files['string tags'];
      await convert(file, ['📝 note']);
      same([...(await parse(file)).fm.tags].sort(), ['category/obsidian', 'mark/scene', 'note/basic/primary'], 'tags');
    });

    await test('note: #-prefixed tags keep category and mark', async () => {
      const file = files['hash tags'];
      await convert(file, ['📝 note']);
      same([...(await parse(file)).fm.tags].sort(), ['category/obsidian', 'mark/scene', 'note/basic/primary'], 'tags');
    });

    await test('self links as [[path|alias]] and plain name are removed', async () => {
      const file = files['self forms'];
      await convert(file, ['🧠 system', '🧬 Hierarchy']);
      same(file.path, 'base/_hierarchy/zz convtest self forms.md', 'path');
      const { text, fm } = await parse(file);
      ok(!fm.meta, `meta ${JSON.stringify(fm.meta)}`);
      ok(!text.includes('zz convtest self forms'), 'self link left');
      same(fm.category, ['[[obsidian]]'], 'category');
    });

    await test('meta → problem asks the missing meta from the same category, without itself', async () => {
      const file = files['child meta'];
      const pickParent = (items) => items.find((o) => o.file.basename === 'zz convtest parent meta');
      const { menus } = await convert(file, ['🧠 system', '⚡ Problem', null, pickParent]);
      same(file.path, 'base/_problems/zz convtest child meta.md', 'path');
      ok(menus[2]?.labels.some((label) => /^✓ .* obsidian( \|.*)?$/.test(label)), 'current category not marked');
      ok(menus[3]?.items.length, 'meta not asked');
      ok(!menus[3].items.some((o) => o.file === file), 'itself offered');
      ok(menus[3].items.every((o) => listOfLinks(o.file, 'category').includes('obsidian')), 'meta from other category offered');
      const { fm } = await parse(file);
      same(fm.meta, ['[[zz convtest parent meta]]'], 'meta');
      same(fm.category, ['[[obsidian]]'], 'category');
    });

    await test('meta → hierarchy asks meta, then problem of that meta', async () => {
      const file = files['child hierarchy'];
      const pick = (name) => (items) => items.find((o) => o.file.basename === name);
      const { menus } = await convert(file, ['🧠 system', '🧬 Hierarchy', null, pick('zz convtest parent meta'), pick('zz convtest parent problem')]);
      same(file.path, 'base/_hierarchy/zz convtest child hierarchy.md', 'path');
      same(menus.length, 5, 'menus');
      ok(menus[4].items.every((o) => listOfLinks(o.file, 'meta').includes('zz convtest parent meta')), 'problem from other meta offered');
      const { fm } = await parse(file);
      same(fm.meta, ['[[zz convtest parent meta]]'], 'meta');
      same(fm.problem, ['[[zz convtest parent problem]]'], 'problem');
    });

    await test('new category replaces the old one and drops meta and problem outside it', async () => {
      const file = files['moved hierarchy'];
      const pickLinux = (items) => items.find((o) => o.file.basename === 'linux');
      const { menus } = await convert(file, ['🧠 system', '🧬 Hierarchy', pickLinux]);
      ok(menus[2]?.labels.some((label) => /^✓ .* obsidian( \|.*)?$/.test(label)), 'current category not marked');
      ok(!menus.slice(3).some((menu) => menu.items.some((o) => o.file.basename.startsWith('zz convtest parent'))), 'old meta or problem offered');
      const { fm } = await parse(file);
      same(fm.category, ['[[linux]]'], 'category');
      ok(!fm.meta, `meta ${JSON.stringify(fm.meta)}`);
      ok(!fm.problem, `problem ${JSON.stringify(fm.problem)}`);
    });

    await test('Esc on the category keeps every category of the note', async () => {
      const file = files['two categories'];
      await convert(file, ['🧠 system', '🧬 Hierarchy']);
      same([...(await parse(file)).fm.category].sort(), ['[[linux]]', '[[obsidian]]'], 'category');
    });

    await test('short project does not ask a category', async () => {
      const file = files['short placed'];
      const { menus } = await convert(file, ['🏢 project', '🗞️ Short']);
      same(menus.length, 2, 'menus');
      same(file.path, 'projects/zz convtest short placed.md', 'path');
    });

    await test('section with only subheadings is not empty', async () => {
      const file = files['nested section'];
      await convert(file, ['🗃️ source', '_📖 Book']);
      const { body } = await parse(file);
      ok(body.endsWith('# Description\n\n## Goals\n\nGoal text'), `body ${body}`);
    });

    await test('old tabs with changed contents are still replaced', async () => {
      const file = files['changed tabs'];
      await convert(file, ['🏢 project', '✏️ Single']);
      const { text } = await parse(file);
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
      ok(!text.includes('short mode'), 'old tabs left');
    });

    await test('template without frontmatter: note byte-identical', async () => {
      const run = await patch(templater, 'read_and_parse_template', async () => 'Just text\n', () => convert(files['no fm template'], ['👥 people']));
      ok(run.notices.some((n) => n.includes('template has no frontmatter')), `notices ${run.notices}`);
      await untouched(files['no fm template'], snaps['no fm template']);
    });

    await test('protected target folder: notice, nothing changes', async () => {
      const run = await convert(files['bad folder'], ['🗃️ source', (items) => ({ ...items[0], folder: 'base/categories' })]);
      same(run.notices, ['Bad target folder: base/categories'], 'notices');
      await untouched(files['bad folder'], snaps['bad folder']);
    });

    await test('project → project keeps one Description and one Tasks with their text', async () => {
      const file = files['project again'];
      await convert(file, ['🏢 project', '🗞️ Short']);
      const { text, body } = await parse(file);
      same(count(text, '# Description'), 1, 'Description headings');
      same(count(text, '# Tasks'), 1, 'Tasks headings');
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
      ok(body.indexOf('# Description') < body.indexOf('What the project is about'), 'description text moved');
      ok(body.indexOf('# Tasks') < body.indexOf('- [ ] first task'), 'task moved');
    });

    await test('repeated project conversions do not pile up headings', async () => {
      const file = files['project twice'];
      await convert(file, ['🏢 project', '🗞️ Short']);
      await convert(file, ['🏢 project', '✏️ Single']);
      await convert(file, ['🏢 project', '🗞️ Short']);
      const { text } = await parse(file);
      same(count(text, '# Description'), 1, 'Description headings');
      same(count(text, '# Tasks'), 1, 'Tasks headings');
      same(count(text, '~~~~tabs'), 1, 'tabs blocks');
    });

    await test('project → source drops empty template sections, keeps filled ones', async () => {
      const file = files['project to book'];
      await convert(file, ['🗃️ source', '_📖 Book']);
      const { text, body } = await parse(file);
      same(count(text, '# Description'), 1, 'Description kept');
      same(count(text, '# Tasks'), 0, 'empty Tasks left');
      ok(body.endsWith('# Description\n\nKept description text'), `body ${body}`);
    });

    await test('empty project → source leaves no template headings', async () => {
      const file = files['empty project to book'];
      await convert(file, ['🗃️ source', '_📖 Book']);
      const { text } = await parse(file);
      ok(!/^# (Description|Tasks)$/m.test(text), `headings left: ${text}`);
    });

    await test('unsaved editor text is converted too', async () => {
      const file = files.unsaved;
      await leaf.openFile(file);
      app.workspace.setActiveLeaf(leaf, { focus: false });
      await until(() => app.workspace.getActiveFile() === file);
      const editor = leaf.view.editor;
      editor.replaceRange('Unsaved line\n', { line: editor.lastLine(), ch: 0 });
      await convert(file, ['👥 people']);
      same(file.path, 'base/contacts/zz convtest unsaved.md', 'path');
      ok((await parse(file)).body.includes('Unsaved line'), 'unsaved text lost');
    });

    await test('invalid YAML: notice before any menu, note untouched', async () => {
      const run = await convert(files['bad yaml'], ['👥 people']);
      same(run.menus.length, 0, 'menus');
      ok(run.notices.some((n) => n.startsWith('Convert type error')), `notices ${run.notices}`);
      await untouched(files['bad yaml'], snaps['bad yaml']);
    });

    for (const path of ['base/categories/zz convtest category.md', 'templates/create/contacts/working/template.md']) {
      await test(`protected path refused: ${path.split('/')[0]}/${path.split('/')[1]}`, async () => {
        const fake = Object.assign(Object.create(Object.getPrototypeOf(files.cancel)), { path, extension: 'md', basename: 'x' });
        const run = await patch(app.workspace, 'getActiveFile', () => fake, () => convert(null, ['👥 people']));
        same(run.menus.length, 0, 'menus');
        same(run.notices, ['Templates and categories are not converted.'], 'notices');
      });
    }
  } finally {
    stopTimer();
    if (keep) results.push(`KEPT ${ours().map((f) => f.path).join('\n')}`);
    else await purge();
    leaf?.detach();
  }

  const modal = new obsidian.Modal(app);
  modal.open();
  await sleep(1500);
  const alive = modal.containerEl.isConnected;
  modal.close();
  results.push(`${alive ? 'PASS' : 'FAIL'} modal stays open after suite`);
  if (!keep) results.push(`${ours().length ? 'FAIL' : 'PASS'} cleanup: ${ours().length} test files left`);

  const failed = results.filter((r) => r.startsWith('FAIL')).length;
  const total = results.filter((r) => /^(PASS|FAIL)/.test(r)).length;
  return `${total - failed}/${total} passed\n${results.join('\n')}`;
})()
