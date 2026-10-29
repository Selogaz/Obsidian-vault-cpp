module.exports = async ({ app, quickAddApi, obsidian }) => {
  const CREATE = 'templates/create';
  const SYSTEM = `${CREATE}/system/category/meta`;
  const CONTACT = `${CREATE}/contacts/working`;
  const PRIMARY = `${CREATE}/notes/basic/primary`;
  const GROUPS = [
    { title: '👥 people', paths: [CONTACT] },
    { title: '🏢 project', paths: [`${CREATE}/projects/*`] },
    { title: '🗃️ source', paths: [`${CREATE}/sources/*`] },
    { title: '🧠 system', paths: [SYSTEM, `${SYSTEM}/problem`, `${SYSTEM}/problem/hierarchy`] },
    { title: '📝 note', paths: [PRIMARY] },
  ];
  const SKIPPED = [`${CREATE}/projects/longform`];
  const PROTECTED = /^(templates|base\/categories)\//;
  const KEPT_TAGS = /^(category|mark)\//;
  const OWN_KEYS = ['tags', 'aliases', 'icon', 'color', 'created', 'updated'];
  const PLACE = ['category', 'meta', 'problem'];
  const ICONS = { 'system/category': '🗺️', 'system/high/meta': '🔎', 'system/high/problem': '⚡' };
  const ASKS_CATEGORY = /tp\.user\.category\(/;
  const PLACEHOLDER = '💤';
  const CURSOR = /<%\s*tp\.file\.cursor\(\d*\)\s*%>/g;
  const TABS = /^~~~~tabs\n[\s\S]*?\n~~~~(?=\n|$)/gm;
  const LEADING_TABS = /^~~~~tabs\n[\s\S]*?\n~~~~(?=\n|$)/;
  const HEADING = /^#{1,6} \S.*$/gm;
  const TEMPLATER = ['start_templater_task', 'end_templater_task', 'create_running_config', 'read_and_parse_template'];
  const RUN_CREATE = 0;

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
  if (!TEMPLATER.every((key) => typeof templater?.[key] === 'function')) {
    new obsidian.Notice('Templater is not available.');
    return;
  }

  const manifestOf = (path) => {
    const manifest = app.vault.getFileByPath(`${path}/manifest.md`);
    return manifest ? app.metadataCache.getFileCache(manifest)?.frontmatter : undefined;
  };
  const parentOf = (path) => path.slice(0, path.lastIndexOf('/'));
  const folderOf = (path) => {
    for (let at = path; at.startsWith(`${CREATE}/`); at = parentOf(at)) {
      const manifest = manifestOf(at);
      const folder = String(manifest?.enforce_folder ?? manifest?.folder ?? '').trim();
      if (folder) return folder;
    }
    return '';
  };
  const subfolders = (path) => (app.vault.getFolderByPath(path)?.children ?? [])
    .filter((child) => child instanceof obsidian.TFolder);

  const typeOf = (path) => {
    const manifest = manifestOf(path);
    const folder = folderOf(path);
    if (!manifest || !folder) return null;
    const title = String(manifest.name ?? path.split('/').pop()).trim();
    const template = app.vault.getFileByPath(`${path}/template.md`);
    if (template) return { title, folder, template };
    const tag = String(manifest.target?.query ?? '').match(/#([\w/-]+)/)?.[1];
    return tag ? { title, folder, tag, fields: manifest.fields } : null;
  };

  const typesOf = (group) => group.paths.flatMap((path) => {
    if (!path.endsWith('/*')) return [typeOf(path)].filter(Boolean);
    return subfolders(parentOf(path))
      .filter((child) => !SKIPPED.includes(child.path))
      .map((child) => typeOf(child.path))
      .filter(Boolean)
      .sort((a, b) => a.title.localeCompare(b.title));
  });

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
  if (!types.length) {
    new obsidian.Notice(`No types for ${group.title}.`);
    return;
  }
  const type = types.length === 1 ? types[0] : await quickAddApi.suggester(types.map((t) => t.title), types);
  if (!type) return;
  if (PROTECTED.test(`${type.folder}/`) || !app.vault.getFolderByPath(type.folder)) {
    new obsidian.Notice(`Bad target folder: ${type.folder}`);
    return;
  }

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
  const targetsOf = (links) => new Set(listOf(links).map((link) => targetOf(link, file.path)).filter(Boolean));
  const isSelf = (link) => targetOf(link, file.path) === file;
  const linkTo = (target) => `[[${app.metadataCache.fileToLinktext(target, file.path, true)}]]`;

  const pinned = (option) => (option.fm.relevant === true ? 0 : 1);
  const tagged = (tag) => app.vault.getMarkdownFiles()
    .filter((f) => f !== file)
    .map((f) => ({ file: f, fm: app.metadataCache.getFileCache(f)?.frontmatter ?? {}, tag }))
    .filter(({ fm: other }) => {
      const tags = tagsOf(other.tags);
      return tags.includes(tag) && !tags.includes('mark/ignore');
    })
    .sort((a, b) => pinned(a) - pinned(b) || a.file.basename.localeCompare(b.file.basename));
  const labelOf = ({ file: f, fm: other, tag }, mark = '') => {
    const aggregator = tagsOf(other.tags).includes('mark/aggregator') ? '⇶' : '';
    const aliases = listOf(other.aliases);
    return `${mark}${other.relevant === true ? '📌' : ''}${aggregator}${other.icon || ICONS[tag]} ${f.basename}${aliases.length ? ` | ${aliases.join(', ')}` : ''}`;
  };
  const linksUnder = (fm, key, parentKey, parents) => listOf(fm[key]).filter((link) => {
    const target = targetOf(link, file.path);
    const own = target && app.metadataCache.getFileCache(target)?.frontmatter;
    return listOf(own?.[parentKey]).some((parent) => parents.has(targetOf(parent, target.path)));
  });

  const askMissing = async (fm, key, tag, parentKey) => {
    if (!(key in fm) || !isEmpty(fm[key])) return;
    const parents = targetsOf(fm[parentKey]);
    if (!parents.size) return;
    const options = tagged(tag)
      .filter(({ file: f, fm: other }) => listOf(other[parentKey]).some((link) => parents.has(targetOf(link, f.path))));
    if (!options.length) return;
    const choice = await quickAddApi.suggester(options.map((option) => labelOf(option)), options);
    if (choice) fm[key] = [linkTo(choice.file)];
  };

  const askCategory = async (fm) => {
    const current = targetsOf(fm.category);
    const options = tagged('system/category');
    if (!options.length) return;
    const labels = options.map((option) => labelOf(option, current.has(option.file) ? '✓ ' : ''));
    const choice = await quickAddApi.suggester(labels, options);
    if (!choice || (current.size === 1 && current.has(choice.file))) return;
    fm.category = [linkTo(choice.file)];
    if ('meta' in fm) {
      const metas = linksUnder(fm, 'meta', 'category', new Set([choice.file]));
      fm.meta = metas.length ? metas : null;
    }
    if ('problem' in fm) {
      const problems = linksUnder(fm, 'problem', 'meta', targetsOf(fm.meta));
      fm.problem = problems.length ? problems : null;
    }
  };

  const plainNote = () => {
    const now = obsidian.moment().format('YYYY-MM-DDTHH:mm:ssZ');
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
      return await templater.read_and_parse_template(templater.create_running_config(type.template, file, RUN_CREATE));
    } finally {
      await templater.end_templater_task(file.path);
    }
  };

  const levelOf = (line) => line.match(/^(#{1,6}) \S/)?.[1].length;
  const dropEmptySections = (part, drop) => {
    const lines = part.split('\n');
    return lines.filter((line, i) => {
      const level = levelOf(line);
      if (!level || !drop(line)) return true;
      const end = lines.findIndex((l, j) => j > i && levelOf(l) <= level);
      return lines.slice(i + 1, end < 0 ? undefined : end).some((l) => l.trim());
    }).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  };
  const tabsKey = (block) => block.split('\n').filter((line) => /^\s*tab:/.test(line)).join('\n');
  const headingsOf = (part) => new Set(part.match(HEADING) ?? []);

  const templateParts = async () => {
    const templates = app.vault.getMarkdownFiles()
      .filter((f) => f.path.startsWith(`${CREATE}/`) && f.name === 'template.md' && !f.path.endsWith('system/category/template.md'));
    const texts = (await Promise.all(templates.map((f) => app.vault.cachedRead(f)))).map((t) => t.replace(/\r\n/g, '\n'));
    return {
      tabs: new Set(texts.flatMap((t) => t.match(TABS) ?? []).map(tabsKey).filter(Boolean)),
      headings: new Set(texts.flatMap((t) => t.match(HEADING) ?? [])),
    };
  };
  const withoutTemplateTabs = (body, tabs) => {
    const leading = body.match(LEADING_TABS)?.[0];
    return leading && tabs.has(tabsKey(leading)) ? body.slice(leading.length).trim() : body;
  };
  const withoutEmptyTemplateSections = (body, headings, tail) => {
    const kept = headingsOf(tail);
    return dropEmptySections(body, (line) => headings.has(line) && !kept.has(line));
  };
  const withoutDuplicateHeadings = (tail, body) => {
    const taken = headingsOf(body);
    return dropEmptySections(tail, (line) => taken.has(line));
  };
  const mergeBody = async (oldBody, tail) => {
    const known = await templateParts();
    const body = withoutEmptyTemplateSections(withoutTemplateTabs(oldBody, known.tabs), known.headings, tail);
    const fresh = withoutDuplicateHeadings(tail, body);
    return [body && fresh === PLACEHOLDER ? '' : fresh, body].filter(Boolean).join('\n\n');
  };

  try {
    const rendered = (await render()).replace(CURSOR, '');
    const head = obsidian.getFrontMatterInfo(rendered);
    if (!head.exists) throw new Error(`${type.title}: template has no frontmatter`);
    const fm = obsidian.parseYaml(head.frontmatter) ?? {};

    for (const [key, value] of Object.entries(old)) {
      if (!OWN_KEYS.includes(key) && key in fm && isEmpty(fm[key]) && !isEmpty(value)) fm[key] = value;
    }
    for (const key of PLACE) {
      if (key in fm && listOf(old[key]).length) fm[key] = listOf(old[key]);
    }
    fm.aliases = [...new Set([...listOf(fm.aliases), ...listOf(old.aliases)])];
    if (old.created) fm.created = old.created;
    if (type.tag) fm.tags = [...new Set([type.tag, ...tagsOf(old.tags).filter((tag) => KEPT_TAGS.test(tag))])];
    for (const key of PLACE) {
      if (!(key in fm)) continue;
      const links = listOf(fm[key]).filter((link) => !isSelf(link));
      fm[key] = links.length ? links : null;
    }

    const asksPlace = !type.tag && 'category' in fm && ASKS_CATEGORY.test(await app.vault.cachedRead(type.template));
    const placed = PLACE.some((key) => [old[key]].flat().some(Boolean));
    if (asksPlace) {
      if (placed) await askCategory(fm);
      await askMissing(fm, 'meta', 'system/high/meta', 'category');
      await askMissing(fm, 'problem', 'system/high/problem', 'meta');
    }

    const content = await mergeBody(
      text.slice(info.contentStart).replace(/\r\n/g, '\n').trim(),
      rendered.slice(head.contentStart).trim(),
    );

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
