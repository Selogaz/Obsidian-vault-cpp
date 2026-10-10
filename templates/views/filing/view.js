/**
 * Filing zones: drag an item from any Bases view (a table row or a card) onto a
 * zone to file it there. Everything is filed through metadata or links; the
 * notes the zones stand for are only changed by hierarchies and aggregators.
 *
 *   target: "categories" (default) — a note in base/notes receives the
 *           category's own tag; anything with a `category` property receives
 *           a link to the category there.
 *   target: "meta-notes" — `meta` gets the meta-note. Only an item that is
 *           already in the meta-note's category can go there.
 *   target: "problems" — `problem` gets the problem. Only an item that is
 *           already filed under the problem's meta-note can go there.
 *   target: "hierarchies" — a link to the note is added to the hierarchy under
 *           an "Unsorted" heading at its end, ready to be moved into place.
 *   target: "aggregators" — the same, for aggregator notes (mark/aggregator).
 *   target: "values" — one property gets one of the values the page lists,
 *           such as a rating or a priority.
 *   target: "stages" — a basic note moves to a growth stage it is ready for.
 *
 * Each step goes one level down the chain Category → Meta-note → Problem, so an
 * item never lands under a meta-note or problem that is not part of its chain.
 * Hierarchies and aggregators are those of the current category.
 * Zones marked mark/ignore are left out. The zones are rebuilt from the vault
 * on every render, so new structure appears on its own.
 */

const options = input && typeof input === "object" ? input : {};
const NOTES_FOLDER = "base/notes/";
const UNSORTED = "# Unsorted";

const markdownFiles = (folder) => {
  const files = [];
  const walk = (entry) => {
    if (entry.children) entry.children.forEach(walk);
    else if (entry.extension === "md") files.push(entry);
  };
  const root = app.vault.getAbstractFileByPath(folder);
  if (root) walk(root);
  return files;
};
const frontmatterOf = (file) => app.metadataCache.getFileCache(file)?.frontmatter ?? {};
const tagsOf = (file) => {
  const cache = app.metadataCache.getFileCache(file) ?? {};
  const declared = cache.frontmatter?.tags ?? [];
  const tags = typeof declared === "string" ? declared.split(/[,\s]+/) : [].concat(declared);
  return [...tags.map(String), ...(cache.tags ?? []).map(({ tag }) => tag)]
    .map((tag) => tag.replace(/^#/, "").toLowerCase());
};
const hasTag = (file, tag) => tagsOf(file).some((value) => value === tag || value.startsWith(`${tag}/`));
const ignored = (file) => hasTag(file, "mark/ignore");
const linkedNames = (value) => [].concat(value ?? []).filter(Boolean)
  .map((raw) => String(raw).replace(/^\[\[|\]\]$/g, "").split("|")[0].split("/").pop().trim().toLowerCase());
const linkedFiles = (value, source) => linkedNames(value)
  .map((name) => app.metadataCache.getFirstLinkpathDest(name, source.path))
  .filter(Boolean);
const byName = (a, b) => a.name.localeCompare(b.name);

// A file belongs to a category through its tag or its `category` property, the
// same rule the Bases views follow. Filing writes a tag to notes and the
// property to sources, projects and people.
const inCategory = (file, name) => hasTag(file, `category/${name.toLowerCase().replace(/ /g, "_")}`)
  || linkedNames(frontmatterOf(file).category).includes(name.toLowerCase());
const hasLink = (file, { key, file: target }) => key === "category"
  ? inCategory(file, target.basename)
  : linkedNames(frontmatterOf(file)[key]).includes(target.basename.toLowerCase());

const categories = () => markdownFiles("base/categories")
  .filter((file) => !ignored(file))
  .map((file) => {
    const frontmatter = frontmatterOf(file);
    const tag = [].concat(frontmatter.tags ?? [])
      .map((value) => String(value).replace(/^#/, ""))
      .find((value) => value.startsWith("category/"));
    return { file, name: file.basename, icon: frontmatter.icon ?? "🗺️", relevant: frontmatter.relevant === true, tag };
  })
  .filter((category) => category.tag)
  .sort((a, b) => Number(b.relevant) - Number(a.relevant) || byName(a, b));

// Resolves once Obsidian has indexed the links of a file that is about to change.
const linksResolved = (file) => new Promise((resolve) => {
  const finish = () => {
    app.metadataCache.offref(ref);
    clearTimeout(timer);
    resolve();
  };
  const ref = app.metadataCache.on("resolve", (resolved) => {
    if (resolved.path === file.path) finish();
  });
  const timer = setTimeout(finish, 3000);
});
// Bases re-checks a note only when the note itself changes, not when another
// note starts or stops linking to it, so the views are told explicitly.
const refreshNote = async (note) => {
  app.metadataCache.trigger("changed", note, await app.vault.cachedRead(note), app.metadataCache.getFileCache(note));
};

// Each way of filing returns the file it changes, or null when the item is
// already there.
const addTag = async (note, zone) => {
  if (hasTag(note, zone.tag.toLowerCase())) return null;
  await app.fileManager.processFrontMatter(note, (frontmatter) => {
    const declared = frontmatter.tags ?? [];
    const tags = typeof declared === "string" ? declared.split(/[,\s]+/).filter(Boolean) : [].concat(declared);
    frontmatter.tags = [...tags, zone.tag];
  });
  return note;
};
const addProperty = async (item, zone) => {
  if (hasLink(item, zone.sets)) return null;
  await app.fileManager.processFrontMatter(item, (frontmatter) => {
    const { key, file } = zone.sets;
    frontmatter[key] = [...[].concat(frontmatter[key] ?? []).filter(Boolean), `[[${file.basename}]]`];
  });
  return item;
};
const addLink = async (note, zone) => {
  if (app.metadataCache.resolvedLinks[zone.file.path]?.[note.path]) return null;
  const item = `- ${app.fileManager.generateMarkdownLink(note, zone.file.path)}`;
  const indexed = linksResolved(zone.file);
  await app.vault.process(zone.file, (data) => {
    const lines = data.replace(/\s+$/, "").split("\n");
    const heading = lines.findIndex((line) => line.trim() === UNSORTED);
    if (heading === -1) return [...lines, "", UNSORTED, "", item, ""].join("\n");
    let end = lines.findIndex((line, index) => index > heading && /^#{1,6}\s/.test(line));
    if (end === -1) end = lines.length;
    while (end > heading + 1 && lines[end - 1].trim() === "") end--;
    lines.splice(end, 0, item);
    return lines.join("\n") + "\n";
  });
  await indexed;
  await refreshNote(note);
  return zone.file;
};

// On a category page the meta-notes and problems are that category's own.
const page = app.vault.getAbstractFileByPath(dv.current().file.path);
const onCategory = Boolean(page && hasTag(page, "system/category"));

const isNote = (file) => file.path.startsWith(NOTES_FOLDER);
const hasProperty = (key) => (file) => key in frontmatterOf(file);
const notesOnly = (file) => isNote(file)
  ? null
  : `“${file.basename}” is not a note. Sources, projects and people are filed through their properties.`;
const propertyOnly = (key, level) => (file) => {
  if (isNote(file)) return `“${file.basename}” is a note. Notes are collected by hierarchies, not by ${level}.`;
  return hasProperty(key)(file) ? null : `“${file.basename}” has no ${key} property.`;
};

// Growth stages of basic notes. Each stage's manifest describes it in words;
// these are the measurable forms of those descriptions, each stage asking more
// than the one before.
const STAGES = ["seed", "fern", "incubator", "evergreen"];
const STAGE_REQUIREMENTS = {
  seed: { words: 100 },
  fern: { words: 300, outgoing: 3 },
  incubator: { words: 600, outgoing: 6 },
  evergreen: { words: 1000, outgoing: 10, incoming: 2, home: true },
};
// What a stage asks for, in the words shown under the stages.
const requirementsOf = (stage) => {
  const need = STAGE_REQUIREMENTS[stage];
  return [
    need.words && `${need.words}+ words`,
    need.outgoing && `${need.outgoing}+ links to notes`,
    need.incoming && `${need.incoming}+ notes linking to it`,
    need.home && "a hierarchy or aggregator",
  ].filter(Boolean);
};
const stageManifest = (stage) => {
  const file = app.vault.getAbstractFileByPath(`templates/create/notes/basic/${stage}/manifest.md`);
  const frontmatter = file ? frontmatterOf(file) : null;
  if (!frontmatter) return null;
  return { file, stage, name: String(frontmatter.name ?? stage).replace(/^\S+\s/, ""), icon: frontmatter.fields?.icon?.fixed, color: frontmatter.fields?.color?.fixed };
};
// Words of the note's own text, its links to other notes and whether a
// hierarchy or an aggregator gives it a home.
const measure = async (note) => {
  const text = (await app.vault.cachedRead(note))
    .replace(/^---\n[\s\S]*?\n---\n?/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[\[[^\]]*\]\]/g, " ")
    .replace(/\[\[[^\]|]*\|([^\]]*)\]\]/g, "$1")
    .replace(/\[\[([^\]]*)\]\]/g, "$1")
    .replace(/https?:\/\/\S+/g, " ");
  const words = (text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []).length;
  const resolved = app.metadataCache.resolvedLinks;
  const outgoing = Object.keys(resolved[note.path] ?? {})
    .filter((path) => path !== note.path && path.startsWith(NOTES_FOLDER)).length;
  let incoming = 0;
  let home = false;
  for (const [source, targets] of Object.entries(resolved)) {
    if (source === note.path || !targets[note.path] || !source.startsWith("base/")) continue;
    incoming++;
    const sourceFile = app.vault.getAbstractFileByPath(source);
    if (source.startsWith("base/_hierarchy/") || (source.startsWith(NOTES_FOLDER) && sourceFile && hasTag(sourceFile, "mark/aggregator"))) home = true;
  }
  return { words, outgoing, incoming, home };
};
const shortfalls = (measured, stage) => {
  const need = STAGE_REQUIREMENTS[stage];
  return [
    need.words && measured.words < need.words && `${need.words}+ words (has ${measured.words})`,
    need.outgoing && measured.outgoing < need.outgoing && `${need.outgoing}+ links to notes (has ${measured.outgoing})`,
    need.incoming && measured.incoming < need.incoming && `${need.incoming}+ notes linking to it (has ${measured.incoming})`,
    need.home && !measured.home && "a hierarchy or aggregator",
  ].filter(Boolean);
};
const stageOf = (note) => tagsOf(note).find((tag) => tag.startsWith("note/basic/"))?.slice("note/basic/".length);

const targets = {
  categories: {
    hint: "Drag onto a category to file it",
    empty: "There are no categories to file into.",
    groups: () => [{
      zones: categories().map((category) => ({
        ...category,
        label: category.tag,
        sets: { key: "category", file: category.file },
      })),
    }],
    refuse: (file) => isNote(file) || hasProperty("category")(file) ? null : `“${file.basename}” has no category property.`,
    file: (item, zone) => isNote(item) ? addTag(item, zone) : addProperty(item, zone),
  },
  "meta-notes": {
    hint: "Drag onto a meta-note of the item's category",
    empty: onCategory ? "This category has no meta-notes yet." : "There are no meta-notes yet.",
    groups: () => {
      const metas = markdownFiles("base/_meta-notes").filter((file) => !ignored(file));
      return categories().filter((category) => !onCategory || category.file === page).map((category) => ({
        ...category,
        title: !onCategory,
        zones: metas
          .filter((meta) => linkedNames(frontmatterOf(meta).category).includes(category.name.toLowerCase()))
          .map((meta) => ({
            file: meta,
            name: meta.basename,
            icon: frontmatterOf(meta).icon ?? "🔎",
            label: `${category.name} › ${meta.basename}`,
            requires: { key: "category", file: category.file },
            sets: { key: "meta", file: meta },
          }))
          .sort(byName),
      }));
    },
    suggests: (item, group) => inCategory(item, group.name),
    refuse: propertyOnly("meta", "meta-notes"),
    file: addProperty,
  },
  problems: {
    hint: "Drag onto a problem of the item's meta-note",
    empty: onCategory ? "Its meta-notes have no problems yet." : "There are no problems yet.",
    groups: () => {
      const groups = new Map();
      for (const problem of markdownFiles("base/_problems").filter((file) => !ignored(file))) {
        for (const meta of linkedFiles(frontmatterOf(problem).meta, problem)) {
          if (onCategory && !inCategory(meta, page.basename)) continue;
          if (!groups.has(meta.path)) {
            groups.set(meta.path, { file: meta, name: meta.basename, icon: frontmatterOf(meta).icon ?? "🔎", zones: [] });
          }
          groups.get(meta.path).zones.push({
            file: problem,
            name: problem.basename,
            icon: frontmatterOf(problem).icon ?? "⚡",
            label: `${meta.basename} › ${problem.basename}`,
            requires: { key: "meta", file: meta },
            sets: { key: "problem", file: problem },
          });
        }
      }
      return [...groups.values()].sort(byName).map((group) => ({ ...group, zones: group.zones.sort(byName) }));
    },
    suggests: (item, group) => hasLink(item, { key: "meta", file: group.file }),
    refuse: propertyOnly("problem", "problems"),
    file: addProperty,
  },
  hierarchies: {
    hint: "Drag a note onto a hierarchy",
    empty: "This category has no hierarchies yet.",
    groups: () => [{
      zones: markdownFiles("base/_hierarchy")
        .filter((file) => !ignored(file) && inCategory(file, dv.current().file.name))
        .map((file) => ({ file, name: file.basename, icon: frontmatterOf(file).icon ?? "🧬", label: file.path }))
        .sort(byName),
    }],
    refuse: notesOnly,
    file: addLink,
  },
  aggregators: {
    hint: "Drag a note onto an aggregator",
    empty: "This category has no aggregators yet.",
    groups: () => [{
      zones: markdownFiles("base/notes")
        .filter((file) => hasTag(file, "mark/aggregator") && !ignored(file) && inCategory(file, dv.current().file.name))
        .map((file) => ({ file, name: file.basename, icon: frontmatterOf(file).icon ?? "⇶", label: file.path }))
        .sort(byName),
    }],
    refuse: notesOnly,
    file: addLink,
  },
  // A property with a fixed set of values, given by the page:
  //   {target: "values", property: "rating", values: [["🌕", "masterpiece"], …]}
  values: {
    hint: `Drag onto a value to set ${options.property ?? "it"}`,
    empty: "No values are given for this property.",
    verb: "set to",
    groups: () => [{
      zones: (options.values ?? []).map(([value, label]) => ({
        file: page,
        name: label,
        icon: value,
        title: `${value} ${label}`,
        label: `${options.property}: ${value} ${label}`,
        value,
      })),
    }],
    refuse: (file) => hasProperty(options.property)(file) ? null : `“${file.basename}” has no ${options.property} property.`,
    file: async (item, zone) => {
      if (String(frontmatterOf(item)[options.property] ?? "") === zone.value) return null;
      await app.fileManager.processFrontMatter(item, (frontmatter) => {
        frontmatter[options.property] = zone.value;
      });
      return item;
    },
  },
  // Growth stages: a note moves to a stage only when it meets that stage's
  // requirements. Moving changes the stage tag and nothing else in the note.
  stages: {
    hint: "Drag a note onto a stage it is ready for",
    empty: "The stage manifests are missing.",
    verb: "moved to",
    groups: () => [{
      zones: STAGES.map(stageManifest).filter(Boolean).map((manifest) => ({
        ...manifest,
        title: `${manifest.icon} ${manifest.name}`,
        label: `${manifest.icon} ${manifest.name}`,
      })),
    }],
    refuse: (file) => {
      if (!isNote(file)) return `“${file.basename}” is not a note.`;
      if (!stageOf(file) || hasTag(file, "note/discourse")) return `“${file.basename}” is not a basic note, so it has no growth stage.`;
      return null;
    },
    check: async (note, zone) => {
      const missing = shortfalls(await measure(note), zone.stage);
      return missing.length ? `“${note.basename}” is not ready for ${zone.title}: needs ${missing.join(", ")}.` : null;
    },
    file: async (note, zone) => {
      const current = stageOf(note);
      if (current === zone.stage) return null;
      // The tag is replaced in place in the frontmatter text, so the rest of the
      // properties keep their exact form.
      let replaced = false;
      await app.vault.process(note, (data) => {
        const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(data);
        if (!frontmatter) return data;
        const start = frontmatter.index + frontmatter[0].indexOf(frontmatter[1]);
        const pattern = new RegExp(`(^|[\\s\\[,"'#])note/basic/${current}(?=$|[\\s\\],"'])`, "mi");
        if (!pattern.test(frontmatter[1])) return data;
        replaced = true;
        return data.slice(0, start) + frontmatter[1].replace(pattern, `$1note/basic/${zone.stage}`) + data.slice(start + frontmatter[1].length);
      });
      if (!replaced) {
        new Notice(`“${note.basename}” keeps its stage tag outside the properties, so it was left as is.`);
        return null;
      }
      return note;
    },
  },
};
const targetName = options.target in targets ? options.target : "categories";
const target = targets[targetName];
const groups = target.groups().filter((group) => group.zones.length);
const linksInto = targetName === "hierarchies" || targetName === "aggregators";

// The item being dragged: Obsidian records it for its own drops; an Obsidian URI
// in the transfer data covers drags that did not go through the drag manager.
const draggedFile = (event) => {
  const draggable = app.dragManager?.draggable;
  if (draggable?.file) return draggable.file;
  if (draggable?.linktext) {
    return app.metadataCache.getFirstLinkpathDest(draggable.linktext, draggable.sourcePath ?? "");
  }
  const uri = event?.dataTransfer?.getData("text/uri-list") || event?.dataTransfer?.getData("text/plain") || "";
  const path = /[?&]file=([^&]+)/.exec(uri)?.[1];
  if (!path) return null;
  const decoded = decodeURIComponent(path);
  return app.vault.getAbstractFileByPath(decoded) ?? app.vault.getAbstractFileByPath(`${decoded}.md`);
};

// A notice that can put the changed file back as it was before the drop.
const reportFiled = (message, changed, before, after, item) => {
  const fragment = createFragment((notice) => {
    notice.appendText(`${message} `);
    const undo = notice.createEl("a", { text: "Undo", href: "#" });
    undo.addEventListener("click", async (event) => {
      event.preventDefault();
      let restored = false;
      await app.vault.process(changed, (data) => {
        restored = data === after;
        return restored ? before : data;
      });
      if (restored && changed !== item) await refreshNote(item);
      new Notice(restored ? `Undone: ${message}` : `“${changed.basename}” has changed since, so it was left as is.`);
    });
  });
  new Notice(fragment, 8000);
};

// Dataview runs this script again after every change in the vault: each time
// into a new container, but with the same component. What has to survive from
// one run to the next lives on that component.
const state = (dv.component.filingState ??= { handlers: { dragstart: [], dragend: [], pointerover: [] } });

// A renderer whose output has left the page (the note was rendered anew and this
// one was left behind) stops instead of working into nothing.
if (state.rendered && dv.component.target && !dv.component.target.isConnected) {
  dv.component.unload();
  return;
}
state.rendered = true;

// Bases highlights its entire view on every dragover, including when a row is
// being dragged to a filing zone beside it. That hover update repeatedly
// recalculates the table's styles. Keep the normal hover everywhere else.
if (!state.baseHoverGuardRegistered) {
  state.baseHoverGuardRegistered = true;
  const key = "__filingBaseHoverGuard";
  let guard = window[key];
  if (!guard) {
    const manager = app.dragManager;
    const original = manager.updateHover;
    const patched = function (element, hoverClass) {
      if (hoverClass === "is-being-dragged-over" && element?.classList?.contains("bases-view") && element.closest(".tabbed-columns__grid")?.querySelector(".filing")) {
        if (this.hoverEl) return original.call(this, null, "");
        return;
      }
      return original.call(this, element, hoverClass);
    };
    guard = window[key] = { manager, original, patched, users: 0 };
    manager.updateHover = patched;
  }
  guard.users++;
  dv.component.register(() => {
    if (--guard.users) return;
    if (guard.manager.updateHover === guard.patched) guard.manager.updateHover = guard.original;
    if (window[key] === guard) delete window[key];
  });
}

// The styles sit beside this script in styles.css and go into the page once:
// Dataview would insert a view.css again on every run.
const stylesFile = app.vault.getAbstractFileByPath("templates/views/filing/styles.css");
if (stylesFile) {
  const css = await app.vault.cachedRead(stylesFile);
  const style = document.getElementById("filing-view-styles") ?? document.head.createEl("style", { attr: { id: "filing-view-styles" } });
  if (style.textContent !== css) style.textContent = css;
}

// When nothing the zones show has changed, the zones built last time are put
// back as they are, instead of being built and laid out again.
const signature = JSON.stringify([targetName, options, onCategory, groups.map((group) => [
  group.name, group.icon, group.title,
  group.zones.map((zone) => [zone.file?.path, zone.name, zone.icon, zone.title, zone.label, zone.tag, zone.value, zone.stage, zone.color, zone.requires?.file.path, zone.sets?.file.path]),
])]);
if (state.root && state.signature === signature) {
  dv.container.appendChild(state.root);
  return;
}

// Document listeners are registered once per component; every build replaces
// the handlers they call.
if (!state.listening) {
  state.listening = true;
  for (const type of Object.keys(state.handlers)) {
    dv.component.registerDomEvent(document, type, (event) => state.handlers[type].forEach((handler) => handler(event)));
  }
}
state.handlers = { dragstart: [], dragend: [], pointerover: [] };
const on = (type, handler) => state.handlers[type].push(handler);

const root = dv.container.createDiv({ cls: ["filing", `filing--${targetName}`] });
state.root = root;
state.signature = signature;
root.createEl("small", { cls: "filing__hint", text: target.hint });
if (!groups.length) root.createEl("small", { cls: "filing__empty", text: target.empty });
const list = root.createDiv({ cls: "filing__groups" });

for (const group of groups) {
  group.element = list.createDiv({ cls: "filing__group" });
  group.hasTitle = Boolean(group.name) && group.title !== false;
  if (group.hasTitle) {
    // With several groups, each stays folded to its title until it is needed:
    // a click opens one, and so does holding a dragged item over it.
    if (groups.length > 1) group.element.addClass("is-collapsed");
    const title = group.element.createDiv({ cls: "filing__group-title", attr: { role: "button", tabindex: "0" } });
    title.createSpan({ cls: "filing__icon", text: group.icon });
    title.createSpan({ cls: "filing__name", text: group.name });
    title.createSpan({ cls: "filing__count", text: String(group.zones.length) });
    const toggle = () => group.element.toggleClass("is-collapsed", !group.element.hasClass("is-collapsed"));
    title.addEventListener("click", toggle);
    title.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
    let opening = null;
    title.addEventListener("dragenter", () => {
      clearTimeout(opening);
      opening = setTimeout(() => group.element.removeClass("is-collapsed"), 400);
    });
    title.addEventListener("dragleave", () => clearTimeout(opening));
  }
  const grid = group.element.createDiv({ cls: "filing__zones" });

  for (const zone of group.zones) {
    const element = grid.createDiv({
      cls: "filing__zone",
      attr: { "aria-label": zone.label, "data-tooltip-position": "left" },
    });
    element.createSpan({ cls: "filing__icon", text: zone.icon });
    element.createSpan({ cls: "filing__name", text: zone.name });

    element.addEventListener("dragenter", (event) => {
      event.preventDefault();
      element.addClass("is-over");
    });
    element.addEventListener("dragover", (event) => {
      event.preventDefault();
      if (event.dataTransfer) event.dataTransfer.dropEffect = "copy";
    });
    element.addEventListener("dragleave", (event) => {
      if (!element.contains(event.relatedTarget)) element.removeClass("is-over");
    });
    element.addEventListener("drop", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      element.removeClass("is-over");

      const item = draggedFile(event);
      if (!item || item.extension !== "md") {
        new Notice("Drop an item from a list or from the cards.");
        return;
      }
      if (item.path === zone.file.path) {
        new Notice(`“${item.basename}” cannot be filed into itself.`);
        return;
      }
      const refusal = target.refuse(item);
      if (refusal) {
        new Notice(refusal);
        return;
      }
      if (zone.requires && !hasLink(item, zone.requires)) {
        new Notice(`“${item.basename}” is not filed under ${zone.requires.file.basename}, so it cannot go into ${zone.name}.`);
        return;
      }
      const unmet = await target.check?.(item, zone);
      if (unmet) {
        new Notice(unmet);
        return;
      }

      const changes = linksInto ? zone.file : item;
      const before = await app.vault.read(changes);
      const changed = await target.file(item, zone);
      const title = zone.title ?? zone.name;
      if (!changed) {
        new Notice(`“${item.basename}” is already ${zone.title ? title : `in ${title}`}.`);
        return;
      }
      const verb = target.verb ?? (linksInto ? "added to" : "filed under");
      reportFiled(`“${item.basename}” ${verb} ${title}.`, changed, before, await app.vault.read(changed), item);
      element.addClass("is-done");
      setTimeout(() => element.removeClass("is-done"), 900);
    });
  }
}

// While an item is dragged, the groups it belongs to open at the top and the
// rest step back: they are not part of its chain.
if (target.suggests) {
  let folded = null;
  const restore = () => {
    if (!folded) return;
    groups.forEach((group, index) => {
      group.element.toggleClass("is-collapsed", folded[index]);
      group.element.removeClass("is-related", "is-unavailable");
    });
    folded = null;
  };
  on("dragstart", (event) => setTimeout(() => {
    const item = draggedFile(event);
    if (!item) return;
    folded = groups.map((group) => group.element.hasClass("is-collapsed"));
    for (const group of groups) {
      const related = target.suggests(item, group);
      group.element.toggleClass("is-related", related);
      group.element.toggleClass("is-unavailable", !related);
      // A group without a title has nothing to fold into, so it only dims.
      group.element.toggleClass("is-collapsed", !related && group.hasTitle);
    }
  }));
  on("dragend", restore);
}

// While a note is dragged over growth stages, each stage shows whether the note
// is ready for it, and the line under the stages says what is still missing.
if (target.check) {
  const status = root.createEl("small", { cls: "filing__status" });
  // The requirements stay in sight, so nobody has to guess what a stage needs.
  const requirements = root.createDiv({ cls: "filing__requirements" });
  requirements.createDiv({ cls: "filing__requirements-lead", text: "A note moves to a stage once it has:" });
  for (const zone of groups.flatMap((group) => group.zones)) {
    const row = requirements.createDiv({ cls: "filing__requirement" });
    row.createSpan({ cls: "filing__requirement-stage", text: zone.title });
    row.createSpan({ text: requirementsOf(zone.stage).join(" · ") });
  }
  requirements.createDiv({
    cls: "filing__requirements-note",
    text: "Words are counted in the note's own text, without properties, code and embeds. Links count only links to notes in base/notes.",
  });
  const zones = groups.flatMap((group) => group.zones);
  const elements = [...root.querySelectorAll(".filing__zone")];
  let assessment = null;
  const clear = () => {
    assessment = null;
    status.setText("");
    elements.forEach((element) => element.removeClass("is-ready", "is-not-ready"));
  };
  on("dragstart", (event) => setTimeout(async () => {
    const item = draggedFile(event);
    if (!item || target.refuse(item)) return;
    const current = assessment = { item, missing: new Map() };
    const measured = await measure(item);
    if (assessment !== current) return;
    zones.forEach((zone, index) => {
      const missing = shortfalls(measured, zone.stage);
      current.missing.set(elements[index], { zone, missing });
      elements[index].toggleClass("is-ready", !missing.length);
      elements[index].toggleClass("is-not-ready", missing.length > 0);
    });
    const count = (value, one, many) => `${value} ${value === 1 ? one : many}`;
    status.setText(`“${item.basename}”: ${count(measured.words, "word", "words")}, ${count(measured.outgoing, "link", "links")} to notes, ${count(measured.incoming, "note", "notes")} linking to it${measured.home ? ", has a home" : ", no home yet"}.`);
  }));
  elements.forEach((element) => element.addEventListener("dragenter", () => {
    const entry = assessment?.missing.get(element);
    if (!entry) return;
    status.setText(entry.missing.length
      ? `${entry.zone.title} needs ${entry.missing.join(", ")}.`
      : `Ready for ${entry.zone.title}.`);
  }));
  on("dragend", clear);
}

// A Bases table only lets the title link be dragged. Next to the zones, the
// whole row becomes a handle, so a short title is not the only place to grab.
const scope = () => {
  for (let node = root.parentElement; node; node = node.parentElement) {
    if (node.querySelector(".bases-embed")) return node;
  }
  return null;
};
const rowFile = (row) => {
  const link = row.querySelector(".internal-link[data-href]");
  return link ? app.metadataCache.getFirstLinkpathDest(link.dataset.href, "") : null;
};
on("pointerover", (event) => {
  const row = event.target.closest?.(".bases-embed .bases-tr");
  if (!row || row.draggable || !row.querySelector(".internal-link[data-href]") || !scope()?.contains(row)) return;
  row.draggable = true;
});
on("dragstart", (event) => {
  // Two zone views in one column both see the row; only the first starts the drag.
  if (event.filingRowDragStarted) return;
  const row = event.target.closest?.(".bases-tr");
  if (!row?.draggable || event.target.closest(".internal-link") || !scope()?.contains(row)) return;
  const file = rowFile(row);
  if (!file) return;
  event.filingRowDragStarted = true;
  app.dragManager.onDragStart(event, app.dragManager.dragFile(event, file));
});
