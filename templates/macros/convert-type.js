module.exports = async ({ app, quickAddApi, obsidian }) => {
  const SYSTEM = 'templates/create/system/category/meta';
  const GROUPS = [
    { title: '👥 people', roots: ['templates/create/contacts', 'templates/create/creators', 'templates/create/productions'] },
    { title: '🏢 project', roots: ['templates/create/projects'] },
    { title: '🗃️ source', roots: ['templates/create/sources'] },
    { title: '🧠 system', paths: [SYSTEM, `${SYSTEM}/problem`, `${SYSTEM}/problem/hierarchy`] },
    { title: '📝 note', notes: 'templates/create/notes' },
  ];
  const SKIPPED = ['templates/create/projects/longform'];
  const PROTECTED = /^(templates|base\/categories)\//;
  const PRIMARY = 'note/basic/primary';
  const KEPT_TAGS = /^(category|mark)\//;
  const OWN_KEYS = ['tags', 'aliases', 'icon', 'color', 'created', 'updated'];
  const CURSOR = /<%\s*tp\.file\.cursor\(\d*\)\s*%>/g;
  const TABS = /^~~~~tabs\n[\s\S]*?\n~~~~(?=\n|$)/gm;
  const HEADING = /^#{1,6} \S.*$/gm;
  const HEADING_LINE = /^#{1,6} \S/;

  const file = app.workspace.getActiveFile();
  if (file?.extension !== 'md') {
    new obsidian.Notice('Open the note to convert.');
    return;
  }
  if (PROTECTED.test(file.path)) {
    new obsidian.Notice('Templates and categories are not converted.');
    return;
  }
  const templater = app.plugins.plugins['templater-obsidian']?.templater;
  if (!templater?.read_and_parse_template) {
    new obsidian.Notice('Templater is not available.');
    return;
  }

  const manifestOf = (path) => {
    const manifest = app.vault.getFileByPath(`${path}/manifest.md`);
    return manifest ? app.metadataCache.getFileCache(manifest)?.frontmatter : undefined;
  };
  const folderOf = (manifest, fallback = '') => String(manifest?.enforce_folder ?? manifest?.folder ?? '').trim() || fallback;
  const subfolders = (path) => (app.vault.getFolderByPath(path)?.children ?? [])
    .filter((child) => child instanceof obsidian.TFolder);

  const templateType = (path, fallback) => {
    const manifest = manifestOf(path);
    const template = app.vault.getFileByPath(`${path}/template.md`);
    const folder = folderOf(manifest, fallback);
    if (!manifest || !template || !folder) return null;
    return { title: String(manifest.name ?? path.split('/').pop()).trim(), folder, template };
  };

  const noteType = (path, folder) => {
    const manifest = manifestOf(path);
    const tag = String(manifest?.target?.query ?? '').match(/#([\w/-]+)/)?.[1];
    if (!tag) return null;
    return { title: `${String(manifest.name ?? tag).trim()} (${tag.split('/')[1]})`, folder, tag, fields: manifest.fields };
  };

  const typesOf = (group) => {
    if (group.paths) return group.paths.map((path) => templateType(path)).filter(Boolean);
    if (group.notes) {
      const folder = folderOf(manifestOf(group.notes), 'base/notes');
      const rank = (type) => (type.tag === PRIMARY ? 0 : 1);
      return subfolders(group.notes)
        .flatMap((kind) => subfolders(kind.path))
        .map((child) => noteType(child.path, folder))
        .filter(Boolean)
        .sort((a, b) => rank(a) - rank(b) || a.tag.localeCompare(b.tag));
    }
    return group.roots
      .flatMap((root) => subfolders(root)
        .filter((child) => !SKIPPED.includes(child.path))
        .map((child) => templateType(child.path, folderOf(manifestOf(root)))))
      .filter(Boolean)
      .sort((a, b) => a.title.localeCompare(b.title));
  };

  await app.workspace.getActiveViewOfType(obsidian.MarkdownView)?.save();
  const text = await app.vault.read(file);
  const info = obsidian.getFrontMatterInfo(text);
  let old;
  try {
    old = (info.exists && obsidian.parseYaml(info.frontmatter)) || {};
  } catch (error) {
    new obsidian.Notice(`Convert type error: ${error?.message ?? error}`);
    return;
  }

  const group = await quickAddApi.suggester(GROUPS.map((g) => g.title), GROUPS);
  if (!group) return;
  const types = typesOf(group);
  const type = await quickAddApi.suggester(types.map((t) => t.title), types);
  if (!type) return;

  const listOf = (value) => [value ?? []].flat()
    .filter((item) => item != null && item !== '' && typeof item !== 'object')
    .map(String);
  const tagsOf = (value) => (typeof value === 'string' ? value.split(/[,\s]+/) : listOf(value))
    .filter(Boolean)
    .map((tag) => tag.replace(/^#/, ''));
  const isEmpty = (value) => value == null || value === '' || value === false || (Array.isArray(value) && !value.length);
  const targetOf = (link, from) => app.metadataCache.getFirstLinkpathDest(
    obsidian.parseLinktext(link.replace(/^\[\[|\]\]$/g, '').split('|')[0]).path,
    from,
  );
  const isSelf = (link) => targetOf(link, file.path) === file;

  const pinned = (option) => (option.fm.relevant === true ? 0 : 1);
  const tagged = (tag) => app.vault.getMarkdownFiles()
    .filter((f) => f !== file)
    .map((f) => ({ file: f, fm: app.metadataCache.getFileCache(f)?.frontmatter ?? {} }))
    .filter(({ fm: other }) => {
      const tags = tagsOf(other.tags);
      return tags.includes(tag) && !tags.includes('mark/ignore');
    })
    .sort((a, b) => pinned(a) - pinned(b) || a.file.basename.localeCompare(b.file.basename));
  const labelOf = ({ file: f, fm: other }, mark = '') => `${mark}${other.relevant === true ? '📌' : ''}${other.icon ?? ''} ${f.basename}`.trim();
  const linksUnder = (fm, key, parentKey, parents) => listOf(fm[key]).filter((link) => {
    const target = targetOf(link, file.path);
    const own = target && app.metadataCache.getFileCache(target)?.frontmatter;
    return listOf(own?.[parentKey]).some((parent) => parents.has(targetOf(parent, target.path)));
  });

  const askMissing = async (fm, key, tag, parentKey) => {
    if (!(key in fm) || !isEmpty(fm[key])) return;
    const parents = new Set(listOf(fm[parentKey]).map((link) => targetOf(link, file.path)).filter(Boolean));
    if (!parents.size) return;
    const options = tagged(tag)
      .filter(({ file: f, fm: other }) => listOf(other[parentKey]).some((link) => parents.has(targetOf(link, f.path))));
    if (!options.length) return;
    const choice = await quickAddApi.suggester(options.map((option) => labelOf(option)), options);
    if (choice) fm[key] = [`[[${choice.file.basename}]]`];
  };

  // Esc keeps the current categories; a new choice replaces them and drops
  // the meta-notes and problems that do not sit under it.
  const askCategory = async (fm) => {
    const current = new Set(listOf(fm.category).map((link) => targetOf(link, file.path)).filter(Boolean));
    const options = tagged('system/category');
    if (!options.length) return;
    const labels = options.map((option) => labelOf(option, current.has(option.file) ? '✓ ' : ''));
    const choice = await quickAddApi.suggester(labels, options);
    if (!choice || (current.size === 1 && current.has(choice.file))) return;
    fm.category = [`[[${choice.file.basename}]]`];
    if ('meta' in fm) {
      const metas = linksUnder(fm, 'meta', 'category', new Set([choice.file]));
      fm.meta = metas.length ? metas : null;
    }
    if ('problem' in fm) {
      const parents = new Set(listOf(fm.meta).map((link) => targetOf(link, file.path)).filter(Boolean));
      const problems = linksUnder(fm, 'problem', 'meta', parents);
      fm.problem = problems.length ? problems : null;
    }
  };

  const plainNote = () => {
    const now = window.moment().format('YYYY-MM-DDTHH:mm:ssZ');
    const fm = {
      tags: [type.tag],
      aliases: [],
      deck: null,
      cssclasses: null,
      icon: type.fields?.icon?.fixed,
      color: type.fields?.color?.fixed,
      created: now,
      updated: now,
    };
    return `---\n${obsidian.stringifyYaml(fm)}---\n`;
  };

  const render = async () => {
    if (type.tag) return plainNote();
    templater.start_templater_task(file.path);
    try {
      return await templater.read_and_parse_template(templater.create_running_config(type.template, file, 0));
    } finally {
      await templater.end_templater_task(file.path);
    }
  };

  try {
    const rendered = (await render()).replace(CURSOR, '');
    const head = obsidian.getFrontMatterInfo(rendered);
    const fm = obsidian.parseYaml(head.frontmatter) ?? {};
    let tail = rendered.slice(head.contentStart).trim();

    for (const [key, value] of Object.entries(old)) {
      if (!OWN_KEYS.includes(key) && key in fm && isEmpty(fm[key]) && !isEmpty(value)) fm[key] = value;
    }
    fm.aliases = [...new Set([...listOf(fm.aliases), ...listOf(old.aliases)])];
    if (old.created) fm.created = old.created;
    if (type.tag) fm.tags = [...new Set([type.tag, ...tagsOf(old.tags).filter((tag) => KEPT_TAGS.test(tag))])];
    for (const key of ['category', 'meta', 'problem']) {
      if (!(key in fm)) continue;
      const links = listOf(fm[key]).filter((link) => !isSelf(link));
      fm[key] = links.length ? links : null;
    }
    // The template itself asks only for a note with no place at all.
    const templateAsked = !type.tag && ['category', 'meta', 'problem'].every((key) => isEmpty(old[key]));
    if ('category' in fm && !templateAsked) await askCategory(fm);
    await askMissing(fm, 'meta', 'system/high/meta', 'category');
    await askMissing(fm, 'problem', 'system/high/problem', 'meta');

    const templates = app.vault.getMarkdownFiles()
      .filter((f) => f.path.startsWith('templates/create/') && f.name === 'template.md' && !f.path.endsWith('system/category/template.md'));
    const texts = (await Promise.all(templates.map((f) => app.vault.cachedRead(f)))).map((t) => t.replace(/\r\n/g, '\n'));
    const templateTabs = new Set(texts.flatMap((t) => t.match(TABS) ?? []));
    const templateHeadings = new Set(texts.flatMap((t) => t.match(HEADING) ?? []));
    const headingsOf = (part) => new Set(part.match(HEADING) ?? []);

    let body = text.slice(info.contentStart).replace(/\r\n/g, '\n').trim();
    const oldTabs = body.match(new RegExp(TABS.source))?.[0];
    if (oldTabs && templateTabs.has(oldTabs)) body = body.slice(oldTabs.length).trim();

    const tailHeadings = headingsOf(tail);
    const lines = body.split('\n');
    body = lines.filter((line, i) => {
      if (!templateHeadings.has(line) || tailHeadings.has(line)) return true;
      const next = lines.slice(i + 1).findIndex((l) => HEADING_LINE.test(l));
      return lines.slice(i + 1, next < 0 ? undefined : i + 1 + next).some((l) => l.trim());
    }).join('\n').replace(/\n{3,}/g, '\n\n').trim();

    const bodyHeadings = headingsOf(body);
    tail = tail.split('\n').filter((line) => !bodyHeadings.has(line)).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    const content = [body && tail === '💤' ? '' : tail, body].filter(Boolean).join('\n\n');

    if (file.parent?.path !== type.folder) {
      await app.fileManager.renameFile(file, app.vault.getAvailablePath(`${type.folder}/${file.basename}`, 'md'));
    }
    await app.vault.modify(file, `---\n${obsidian.stringifyYaml(fm)}---\n\n${content}\n`);
    new obsidian.Notice(`Converted: ${type.title}`);
  } catch (error) {
    new obsidian.Notice(`Convert type error: ${error?.message ?? error}`);
    console.error('Convert type error', error);
  }
};
