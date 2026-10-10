/**
 * Inbox header line: today, what grew today and what still waits in the inbox.
 *
 * Every count follows the place that holds the same items: the recent.base
 * "Today activity" view, today's daily note, the inline task queries and the
 * fleetings.base orphans. Counts come from Obsidian's metadata cache and the
 * Tasks plugin cache in a single pass over the vault, so the line stays cheap
 * to refresh.
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
const stylesFile = app.vault.getAbstractFileByPath("templates/views/inbox/styles.css");
if (stylesFile) {
  const css = await app.vault.cachedRead(stylesFile);
  const style = document.getElementById("inbox-view-styles") ?? document.head.createEl("style", { attr: { id: "inbox-view-styles" } });
  if (style.textContent !== css) style.textContent = css;
}
const tabs = {
  today: ["🆕 recent", "Today"],
  inline: ["✅ tasks", "Inline Tasks"],
  notes: ["🧭 triage", "Orphans"],
  ...(options.tabs ?? {}),
};

const now = new Date();
const pad = (number) => String(number).padStart(2, "0");
const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
const dayOf = (value) => typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : "";
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => (
  { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]
));

// One pass: today's activity, plus the notes that may be orphans.
const resolved = app.metadataCache.resolvedLinks;
const activity = { created: 0, updated: 0 };
const unlinked = [];
for (const file of app.vault.getMarkdownFiles()) {
  const path = file.path;
  if (path.startsWith("base/notes/")) {
    const outgoing = resolved[path];
    if (!outgoing || !Object.keys(outgoing).some((target) => target.endsWith(".md"))) unlinked.push(file);
  }
  // The recent.base scope. A note touched today always has a fresh mtime, so
  // only those files need their frontmatter read.
  if (file.stat.mtime < todayStart) continue;
  if (!["base/", "sources/", "projects/"].some((folder) => path.startsWith(folder))) continue;
  const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter ?? {};
  if (dayOf(frontmatter.created) >= todayKey) activity.created++;
  else if (dayOf(frontmatter.updated) >= todayKey) activity.updated++;
}

// Interstitial logs: the "- HH:MM …" lines the log button adds to today's
// daily note.
const dailyNote = app.vault.getAbstractFileByPath(`periodic/daily/${todayKey}.md`);
const logs = dailyNote
  ? ((await app.vault.cachedRead(dailyNote)).match(/^[ \t]*-[ \t]+\d{1,2}:\d{2}[ \t]/gm) ?? []).length
  : 0;

// Orphans: no outgoing note links, no backlinks and no category.
const orphans = (() => {
  if (!unlinked.length) return 0;
  const incoming = new Set();
  for (const targets of Object.values(resolved)) {
    for (const target in targets) incoming.add(target);
  }
  const hasCategory = (file) => {
    const cache = app.metadataCache.getFileCache(file) ?? {};
    const declared = cache.frontmatter?.tags ?? [];
    const tags = typeof declared === "string" ? declared.split(/[,\s]+/) : [].concat(declared);
    return [...tags.map(String), ...(cache.tags ?? []).map(({ tag }) => tag)]
      .some((tag) => /^#?category(\/|$)/i.test(tag));
  };
  return unlinked.filter((file) => !incoming.has(file.path) && !hasCategory(file)).length;
})();

// Open #task/inbox and #task/idea tasks.
const tasks = (() => {
  const counts = { inbox: 0, idea: 0 };
  const kindOf = (taskTags) => {
    const lower = (taskTags ?? []).map((tag) => tag.toLowerCase());
    return lower.includes("#task/inbox") ? "inbox" : lower.includes("#task/idea") ? "idea" : null;
  };
  const excluded = (path) => ["templates/", "files/", "home/"].some((folder) => path.startsWith(folder));
  const closed = new Set(["x", "X", "-"]);
  const cached = app.plugins.plugins["obsidian-tasks-plugin"]?.getTasks?.();
  const all = Array.isArray(cached)
    ? cached.map((task) => ({ tags: task.tags, path: task.path, status: task.status?.symbol }))
    : dv.pages('-"templates" AND -"files" AND -"home"').file.tasks.array();
  for (const task of all) {
    const kind = kindOf(task.tags);
    if (kind && !excluded(task.path) && !closed.has(task.status)) counts[kind]++;
  }
  return counts;
})();

// A count reads as growth ("+3 created") or as a remainder ("3 tasks").
const count = (value, label, { tab, hint, growth = false }) => `
  <span class="stat-count"${tab ? ` data-tab="${tab}"` : ""} data-zero="${value === 0}" data-growth="${growth}"
    aria-label="${escapeHtml(hint)}" data-tooltip-position="bottom"><b>${growth ? "+" : ""}${value}</b> ${label}</span>`;

const root = dv.container.createSpan({ cls: "stat-line" });
const date = root.createSpan({ cls: "stat-line__lead" });
const currentDay = moment();
const dailyPath = `periodic/daily/${currentDay.format("YYYY-MM-DD")}`;
date.createEl("a", {
  cls: "internal-link",
  href: dailyPath,
  text: currentDay.format("D MMMM • dddd"),
  attr: { "data-href": dailyPath, target: "_blank", rel: "noopener" },
});
root.insertAdjacentHTML("beforeend", `
  <span class="stat-line__group">
    ${count(activity.created, "created", { tab: "today", hint: "Created today", growth: true })}
    ${count(activity.updated, "updated", { tab: "today", hint: "Updated today", growth: true })}
    ${count(logs, logs === 1 ? "log" : "logs", { tab: dailyNote ? "daily" : null, hint: "Interstitial logs in today's daily note", growth: true })}
  </span>
  <span class="stat-line__group stat-line__group--divided">
    <span class="stat-line__label">Inbox</span>
    ${count(tasks.inbox, "tasks", { tab: "inline", hint: "Open inline tasks tagged #task/inbox" })}
    ${count(tasks.idea, "ideas", { tab: "inline", hint: "Open inline tasks tagged #task/idea" })}
    ${count(orphans, "orphans", { tab: "notes", hint: "Notes without links" })}
  </span>`);

const clickable = (element, handler) => {
  element.tabIndex = 0;
  element.setAttribute("role", "button");
  element.addEventListener("click", handler);
  element.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handler(event);
  });
};

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
  if (target.dataset.tab === "daily") {
    clickable(target, (event) => app.workspace
      .getLeaf(event.metaKey || event.ctrlKey ? "tab" : false)
      .openFile(dailyNote));
    continue;
  }
  const titles = tabs[target.dataset.tab];
  if (Array.isArray(titles)) clickable(target, () => openTabs(titles));
}
