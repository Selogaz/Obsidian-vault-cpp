/**
 * Category header line: how large this domain is, what it has produced and what
 * is in work right now.
 *
 * Membership follows the same rule as the Bases views below: a note belongs to
 * the category through a `category/<name>` tag or a `category` link. Notes are
 * counted twice over — the ones tagged with the category and the ones its
 * hierarchies collect — because both ways of filing are in use.
 *
 * One pass over Obsidian's metadata cache, plus the Tasks plugin cache for
 * inline tasks, keeps the line cheap enough to refresh with Dataview.
 *
 * Optional input:
 *   tabs: count id → tab titles opened on click, outer tab first
 */

const options = input && typeof input === "object" ? input : {};

// Dataview runs this script again after every change in the vault, with the
// same component. A renderer whose output has left the page (the note was
// rendered anew and this one was left behind) stops instead of counting for
// nothing.
const run = (dv.component.statLineState ??= {});
if (run.rendered && dv.component.target && !dv.component.target.isConnected) {
  dv.component.unload();
  return;
}
run.rendered = true;

// The styles sit beside this script in styles.css and go into the page once:
// Dataview would insert a view.css again on every run.
const stylesFile = app.vault.getAbstractFileByPath("templates/views/category/styles.css");
if (stylesFile) {
  const css = await app.vault.cachedRead(stylesFile);
  const style = document.getElementById("category-view-styles") ?? document.head.createEl("style", { attr: { id: "category-view-styles" } });
  if (style.textContent !== css) style.textContent = css;
}
const tabs = {
  notes: ["📝 notes", "All"],
  unfiled: ["📝 notes", "Unfiled"],
  published: ["🏢 projects", "Published"],
  projects: ["🏢 projects", "In work"],
  sources: ["🗃️ sources", "In work"],
  tasks: ["✅ tasks", "Inline Tasks"],
  ...(options.tabs ?? {}),
};

const category = dv.current().file.name;
// Bases builds the tag the same way, so both sides always agree.
const tag = `category/${category.replace(/ /g, "_")}`.toLowerCase();
const now = new Date();
const pad = (number) => String(number).padStart(2, "0");
const thisMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
));
const statusOf = (frontmatter) => String(frontmatter?.status ?? "");
const linkedName = (value) => String(value).replace(/^\[\[|\]\]$/g, "").split("|")[0].split("/").pop().trim().toLowerCase();
const belongs = (cache) => {
  const declared = cache.frontmatter?.tags ?? [];
  const tags = (typeof declared === "string" ? declared.split(/[,\s]+/) : [].concat(declared)).map(String);
  const all = [...tags, ...(cache.tags ?? []).map(({ tag: inline }) => inline)]
    .map((value) => value.replace(/^#/, "").toLowerCase());
  return all.some((value) => value === tag || value.startsWith(`${tag}/`))
    || [].concat(cache.frontmatter?.category ?? []).some((value) => linkedName(value) === category.toLowerCase());
};

const resolved = app.metadataCache.resolvedLinks;
// Notes that a hierarchy or an aggregator note already collects, as the Unfiled view sees it.
const isAggregator = (path) => {
  const cache = app.metadataCache.getCache(path) ?? {};
  const declared = cache.frontmatter?.tags ?? [];
  return [...(typeof declared === "string" ? declared.split(/[,\s]+/) : [].concat(declared)).map(String), ...(cache.tags ?? []).map(({ tag: inline }) => inline)]
    .some((value) => /^#?mark\/aggregator(\/|$)/i.test(value));
};
const collected = new Set();
for (const path of Object.keys(resolved)) {
  if (!path.startsWith("base/_hierarchy/") && !(path.startsWith("base/notes/") && isAggregator(path))) continue;
  for (const target in resolved[path]) collected.add(target);
}
const created = new Map();
const notes = new Set();
const hierarchies = [];
const projects = { active: 0, published: 0 };
let toRead = 0;
for (const file of app.vault.getMarkdownFiles()) {
  const path = file.path;
  const isNote = path.startsWith("base/notes/");
  const cache = app.metadataCache.getFileCache(file) ?? {};
  if (isNote) created.set(path, String(cache.frontmatter?.created ?? "").slice(0, 7));
  if (!belongs(cache)) continue;
  if (isNote) notes.add(path);
  else if (path.startsWith("base/_hierarchy/")) hierarchies.push(path);
  else if (path.startsWith("projects/")) {
    if (statusOf(cache.frontmatter).includes("📢")) projects.published++;
    else if (statusOf(cache.frontmatter).includes("🟦")) projects.active++;
  } else if (path.startsWith("sources/")) {
    if (!["🟩", "⬛"].some((status) => statusOf(cache.frontmatter).includes(status))) toRead++;
  }
}
// A hierarchy is an aggregator: the notes it links are part of the domain too.
for (const hierarchy of hierarchies) {
  for (const target of Object.keys(resolved[hierarchy] ?? {})) {
    if (target.startsWith("base/notes/")) notes.add(target);
  }
}
const addedThisMonth = [...notes].filter((path) => created.get(path) === thisMonth).length;
const unfiled = [...notes].filter((path) => !collected.has(path)).length;

// Open inline tasks carrying this category, as listed on the tasks tab.
const openTasks = (() => {
  const mine = (taskTags) => (taskTags ?? []).some((value) => {
    const name = value.replace(/^#/, "").toLowerCase();
    return name === tag || name.startsWith(`${tag}/`);
  });
  const closed = new Set(["x", "X", "-"]);
  const cached = app.plugins.plugins["obsidian-tasks-plugin"]?.getTasks?.();
  const all = Array.isArray(cached)
    ? cached.map((task) => ({ tags: task.tags, status: task.status?.symbol }))
    : dv.pages('-"templates" AND -"files"').file.tasks.array();
  return all.filter((task) => mine(task.tags) && !closed.has(task.status)).length;
})();

const count = (value, label, { tab, hint, growth = false }) => `
  <span class="stat-count"${tab ? ` data-tab="${tab}"` : ""} data-zero="${value === 0}" data-growth="${growth}"
    aria-label="${escapeHtml(hint)}" data-tooltip-position="bottom"><b>${growth ? "+" : ""}${value}</b> ${label}</span>`;
const plural = (value, word) => value === 1 ? word : `${word}s`;

const root = dv.container.createSpan({ cls: "stat-line" });
root.innerHTML = `
  <span class="stat-line__group stat-line__lead">
    ${count(notes.size, plural(notes.size, "note"), { tab: "notes", hint: "Notes tagged with this category or collected by its hierarchies" })}
    ${count(addedThisMonth, "this month", { tab: "notes", hint: "Notes of this domain created this month", growth: true })}
    ${count(unfiled, "unfiled", { tab: "unfiled", hint: "Notes of this category that no hierarchy or aggregator collects yet" })}
    ${count(projects.published, "published", { tab: "published", hint: "Published projects of this category" })}
  </span>
  <span class="stat-line__group stat-line__group--divided">
    <span class="stat-line__label">In work</span>
    ${count(projects.active, plural(projects.active, "project"), { tab: "projects", hint: "Projects in progress" })}
    ${count(toRead, plural(toRead, "source"), { tab: "sources", hint: "Sources not finished or dropped" })}
    ${count(openTasks, plural(openTasks, "task"), { tab: "tasks", hint: "Open inline tasks carrying this category" })}
  </span>`;

const openTabs = async (titles) => {
  let container = root.closest(".markdown-preview-view, .markdown-source-view, .view-content") ?? document;
  for (const title of titles) {
    let tab = null;
    for (let attempt = 0; attempt < 40 && !tab; attempt++) {
      tab = [...container.querySelectorAll(".tabbed__tab")]
        .find((candidate) => candidate.offsetParent && candidate.textContent.trim().includes(title));
      if (!tab) await new Promise((resolve) => setTimeout(resolve, 25));
    }
    if (!tab) return;
    if (!tab.classList.contains("is-active")) tab.click();
    // A nested tab lives inside the panel of the tab just opened.
    container = container.querySelector(`[aria-labelledby="${tab.id}"]`) ?? container;
  }
};
for (const target of root.querySelectorAll("[data-tab]")) {
  const titles = tabs[target.dataset.tab];
  if (!Array.isArray(titles)) continue;
  target.tabIndex = 0;
  target.setAttribute("role", "button");
  target.addEventListener("click", () => openTabs(titles));
  target.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openTabs(titles);
  });
}
