/**
 * Islands: notes that rest on nothing in the system. Following their links in
 * both directions never reaches a source, project, person, task, interim note
 * or structure note (category, meta-note, problem, hierarchy). An island is
 * either a group of notes linked to each other or a note that only periodic
 * notes (a daily note, a weekly review…) are linked with.
 *
 * A category does not tie an island to the system: it tells where the notes
 * belong, and the island stays until its notes are linked into that structure.
 * Notes with no links at all are orphans and stay in the Orphans step. Folders
 * that hold no knowledge (attachments in files, dashboards in home, templates)
 * are left out: their links neither connect notes nor make an island.
 *
 * Each island shows the links that hold it together and the periodic notes it
 * grew from, one card per island, drawn from the link index alone.
 */

const NOTES_FOLDER = "base/notes/";
const SYSTEM_FOLDERS = [
  "sources/", "projects/",
  "base/categories/", "base/_meta-notes/", "base/_problems/", "base/_hierarchy/",
  "base/contacts/", "base/creators/", "base/productions/",
  "base/tasks/", "base/additions/",
];

// Dataview runs this script again after every change in the vault, with the
// same component. What has to survive from one run to the next lives on it.
const state = (dv.component.islandsState ??= {});
// A renderer whose output has left the page stops instead of working into nothing.
if (state.rendered && dv.component.target && !dv.component.target.isConnected) {
  dv.component.unload();
  return;
}
state.rendered = true;

// The styles sit beside this script in styles.css and go into the page once.
const stylesFile = app.vault.getAbstractFileByPath("templates/views/islands/styles.css");
if (stylesFile) {
  const css = await app.vault.cachedRead(stylesFile);
  const style = document.getElementById("islands-view-styles") ?? document.head.createEl("style", { attr: { id: "islands-view-styles" } });
  if (style.textContent !== css) style.textContent = css;
}

const resolved = app.metadataCache.resolvedLinks;
const isNote = (path) => path.startsWith(NOTES_FOLDER);
const isSystem = (path) => SYSTEM_FOLDERS.some((folder) => path.startsWith(folder));
const isPeriodic = (path) => path.startsWith("periodic/");
const categoriesOf = (path) => {
  const cache = app.metadataCache.getCache(path) ?? {};
  const declared = cache.frontmatter?.tags ?? [];
  const tags = [...(typeof declared === "string" ? declared.split(/[,\s]+/) : [].concat(declared)).map(String), ...(cache.tags ?? []).map(({ tag }) => tag)]
    .map((tag) => tag.replace(/^#/, "").toLowerCase())
    .filter((tag) => tag.startsWith("category/"))
    .map((tag) => tag.split("/")[1].replace(/_/g, " "));
  const linked = [].concat(cache.frontmatter?.category ?? []).filter(Boolean)
    .map((value) => String(value).replace(/^\[\[|\]\]$/g, "").split("|")[0].split("/").pop().trim().toLowerCase());
  return [...tags, ...linked];
};

// One pass over the link index: links between notes, notes tied to the system,
// and the periodic notes each note is linked with.
const neighbours = new Map();
const tied = new Set();
const outside = new Map();
const connect = (map, key, other, direction) => {
  if (!map.has(key)) map.set(key, new Map());
  const directions = map.get(key);
  if (!directions.has(other)) directions.set(other, new Set());
  directions.get(other).add(direction);
};
for (const [source, targets] of Object.entries(resolved)) {
  for (const target in targets) {
    if (target === source) continue;
    if (isNote(source) && isNote(target)) {
      connect(neighbours, source, target, "out");
      connect(neighbours, target, source, "in");
    } else if (isNote(source) && isSystem(target)) tied.add(source);
    else if (isNote(target) && isSystem(source)) tied.add(target);
    else if (isNote(source) && isPeriodic(target)) connect(outside, source, target, "out");
    else if (isNote(target) && isPeriodic(source)) connect(outside, target, source, "in");
  }
}

const islands = [];
const seen = new Set();
for (const file of app.vault.getMarkdownFiles()) {
  if (!isNote(file.path) || seen.has(file.path)) continue;
  const members = [];
  const queue = [file.path];
  seen.add(file.path);
  while (queue.length) {
    const path = queue.pop();
    members.push(path);
    for (const next of neighbours.get(path)?.keys() ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  if (members.some((path) => tied.has(path))) continue;
  // A note linked with nothing at all is an orphan, not an island.
  if (members.length === 1 && !outside.has(members[0])) continue;
  members.sort((a, b) => a.localeCompare(b));

  // Links inside the island: one arrow per pair, both ways when both link.
  const links = [];
  const paired = new Set();
  for (const from of members) {
    for (const [to, directions] of neighbours.get(from) ?? []) {
      const key = [from, to].sort().join("\n");
      if (paired.has(key)) continue;
      paired.add(key);
      if (directions.has("out") && directions.has("in")) links.push({ from, to, arrow: "⇄" });
      else if (directions.has("out")) links.push({ from, to, arrow: "→" });
      else links.push({ from: to, to: from, arrow: "→" });
    }
  }
  // The periodic notes outside the island that link with its notes.
  const origins = [];
  for (const path of members) {
    for (const [other, directions] of outside.get(path) ?? []) {
      origins.push({ note: path, other, arrow: directions.has("out") && directions.has("in") ? "⇄" : directions.has("in") ? "←" : "→" });
    }
  }
  origins.sort((a, b) => a.note.localeCompare(b.note) || b.other.localeCompare(a.other));
  const categories = [...new Set(members.flatMap(categoriesOf))].sort();
  islands.push({ members, links, origins, categories });
}
// Groups first, largest first; then single notes by name.
islands.sort((a, b) => b.members.length - a.members.length || a.members[0].localeCompare(b.members[0]));

const iconOf = (path) => app.metadataCache.getCache(path)?.frontmatter?.icon ?? (isPeriodic(path) ? "📅" : "📝");
const nameOf = (path) => app.vault.getAbstractFileByPath(path)?.basename ?? path;
const arrowOf = (directions) => directions.has("out") && directions.has("in") ? "⇄" : directions.has("out") ? "→" : "←";

// The chain of an island as a tree: it starts from the notes a periodic note
// links to, then from notes nothing inside the island links to. Each arrow
// shows how a note is linked with the one above it; links the tree has no room
// for are listed under it.
const chainOf = (island) => {
  const inside = new Set(island.members);
  const fromPeriodic = new Set(island.origins.filter((origin) => origin.arrow !== "→").map((origin) => origin.note));
  const unreferenced = (path) => ![...(neighbours.get(path) ?? [])].some(([other, directions]) => inside.has(other) && directions.has("in"));
  const starts = [
    ...island.members.filter((path) => fromPeriodic.has(path)),
    ...island.members.filter((path) => !fromPeriodic.has(path) && unreferenced(path)),
    ...island.members,
  ];
  const visited = new Set();
  const rows = [];
  const used = new Set();
  const grow = (path, prefix) => {
    const kids = [...(neighbours.get(path) ?? [])]
      .filter(([other]) => inside.has(other) && !visited.has(other))
      .sort(([a], [b]) => a.localeCompare(b));
    kids.forEach(([other]) => visited.add(other));
    kids.forEach(([other, directions], index) => {
      const last = index === kids.length - 1;
      used.add([path, other].sort().join("\n"));
      rows.push({ prefix: `${prefix}${last ? "└" : "├"}`, arrow: arrowOf(directions), path: other });
      grow(other, `${prefix}${last ? "  " : "│ "}`);
    });
  };
  for (const start of starts) {
    if (visited.has(start)) continue;
    visited.add(start);
    rows.push({ prefix: "", arrow: "", path: start });
    grow(start, "");
  }
  const extra = island.links.filter(({ from, to }) => !used.has([from, to].sort().join("\n")));
  return { rows, extra };
};

// When the islands are the same as last time, the cards built then are put back.
const signature = JSON.stringify(islands.map((island) => [island.members.map((path) => [path, iconOf(path)]), island.links, island.origins, island.categories]));
if (state.root && state.signature === signature) {
  dv.container.appendChild(state.root);
  return;
}

const root = dv.container.createDiv({ cls: "islands" });
state.root = root;
state.signature = signature;
root.createEl("small", {
  cls: "islands__hint",
  text: "Each card is an island: a chain of notes that rests on no source, project, person, task or structure note, and the periodic notes it grows from.",
});
if (!islands.length) {
  root.createEl("small", { cls: "islands__empty", text: "No islands: every linked note rests on the system." });
}

const noteLink = (container, path) => {
  const file = app.vault.getAbstractFileByPath(path);
  const holder = container.createSpan({ cls: "islands__node" });
  holder.createSpan({ cls: "islands__icon", text: iconOf(path) });
  const link = holder.createEl("a", {
    cls: "internal-link",
    href: path,
    text: file?.basename ?? path,
    attr: { "data-href": path, target: "_blank", rel: "noopener", draggable: "true" },
  });
  // Dragged into a note or onto a zone elsewhere, it carries the note itself.
  link.addEventListener("dragstart", (event) => {
    if (!file || event.islandsDragStarted) return;
    event.islandsDragStarted = true;
    app.dragManager.onDragStart(event, app.dragManager.dragFile(event, file));
  });
};

const grid = root.createDiv({ cls: "islands__cards" });
for (const island of islands) {
  const card = grid.createDiv({ cls: "islands__card" });
  const head = card.createDiv({ cls: "islands__head" });
  head.createSpan({
    text: island.members.length === 1
      ? "🏝️ 1 note"
      : `🏝️ ${island.members.length} notes · ${island.links.length} ${island.links.length === 1 ? "link" : "links"}`,
  });
  if (island.categories.length) head.createSpan({ cls: "islands__category", text: `🗺️ ${island.categories.join(", ")}` });

  // Where the island grows from: periodic note → note.
  if (island.origins.length) {
    const origins = card.createDiv({ cls: "islands__origins" });
    for (const { note, arrow, other } of island.origins) {
      const line = origins.createDiv({ cls: "islands__line" });
      noteLink(line, other);
      line.createSpan({ cls: "islands__arrow", text: arrow === "←" ? "→" : arrow === "→" ? "←" : "⇄" });
      if (island.members.length === 1) noteLink(line, note);
      else line.createSpan({ cls: "islands__mention", text: nameOf(note) });
    }
  }

  // The chain itself, for islands of several notes.
  if (island.members.length > 1) {
    const { rows, extra } = chainOf(island);
    const chain = card.createDiv({ cls: "islands__chain" });
    for (const { prefix, arrow, path } of rows) {
      const line = chain.createDiv({ cls: "islands__line" });
      if (prefix || arrow) line.createSpan({ cls: "islands__branch", text: `${prefix}${arrow} ` });
      noteLink(line, path);
    }
    for (const { from, arrow, to } of extra) {
      const line = chain.createDiv({ cls: "islands__line islands__line--extra" });
      line.createSpan({ text: `also ${nameOf(from)} ${arrow} ${nameOf(to)}` });
    }
  }
}
