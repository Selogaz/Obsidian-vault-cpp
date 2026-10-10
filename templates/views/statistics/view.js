const q = (source) => dv.pages(source);
const count = (source) => q(source).length;
const whereCount = (source, predicate) => q(source).where(predicate).length;
const contains = (value, part) => dv.func.contains(value, part);
const statusCount = (source, status) => whereCount(source, (page) => contains(page.status, status));
const missing = (source, field) => whereCount(source, (page) => !page[field] || dv.array(page[field]).length === 0);
const metric = (icon, label, value) => ({ icon, label, value });
const row = (label, ...values) => ({ label, values });
const format = (value) => typeof value === "number" ? value.toLocaleString() : String(value ?? "–");

const today = dv.date("today");
const todayIso = today.toISODate();
const notePages = q("#note");
const taskScope = q('-"files" AND -"templates" AND -"home"').file.tasks;
const taskNotes = "#task/default OR #task/milestone";
const sources = "#source AND -#mark/log";
const additions = "(#mark/addition OR #mark/log/conspectus) AND -#mark/addition/aggregator";
const people = '("base/contacts" OR #contact) OR ("base/creators" OR #creator) OR ("base/productions" OR #production)';
const isClosed = (page) => ["🟩", "📢", "⬛"].includes(String(page.status));
const isDate = (value, date) => {
  try { return value && dv.date(value)?.toISODate() === date; } catch { return false; }
};

const createdDates = q("")
  .where((page) => page.file.frontmatter.created)
  .map((page) => moment(page.file.frontmatter.created))
  .where((date) => date.isValid())
  .array();
const oldestDate = createdDates.reduce(
  (oldest, date) => !oldest || date.isBefore(oldest) ? date : oldest,
  null
);
const vaultAge = oldestDate ? moment().diff(oldestDate, "days") : null;

const groups = [
  {
    items: [
      {
        icon: "📝", title: "Notes", total: notePages.length, open: true,
        rows: [
          row("Basic", metric("", "Basic notes", count("#note/basic AND -#note/discourse"))),
          row("Primary", metric("", "Primary notes", count("#note/basic/primary AND -#note/discourse"))),
          row("Maturity",
            metric("🌱", "Seed", count("#note/basic/seed AND -#note/discourse")),
            metric("🌿", "Fern", count("#note/basic/fern AND -#note/discourse")),
            metric("♨️", "Incubator", count("#note/basic/incubator AND -#note/discourse")),
            metric("🌲", "Evergreen", count("#note/basic/evergreen AND -#note/discourse"))),
          row("Specific", metric("", "Specific notes", count("#note/specific AND -#note/discourse"))),
          row("Common specific",
            metric("📝", "Exact", count("#note/specific/exact AND -#note/discourse")),
            metric("</>", "Code", count("#note/specific/code AND -#note/discourse"))),
          row("Other specific",
            metric("🏰", "Architecture", count("#note/specific/architecture AND -#note/discourse")),
            metric("🏺", "Artifact", count("#note/specific/artifact AND -#note/discourse")),
            metric("🏋️", "Athlete", count("#note/specific/athlete AND -#note/discourse")),
            metric("🎵", "Composition", count("#note/specific/composition AND -#note/discourse")),
            metric("🎨", "Drawing", count("#note/specific/drawing AND -#note/discourse")),
            metric("💂", "Historical person", count("#note/specific/historical_person AND -#note/discourse")),
            metric("😎", "Outstanding", count("#note/specific/outstanding AND -#note/discourse")),
            metric("📸", "Photo", count("#note/specific/photo AND -#note/discourse")),
            metric("🗿", "Sculpture", count("#note/specific/sculpture AND -#note/discourse")),
            metric("▶️", "Track", count("#note/specific/track AND -#note/discourse"))),
          row("Discourse", metric("", "Discourse notes", count("#note/discourse"))),
          row("Discourse types",
            metric("❓", "Question", count("#note/discourse/question")),
            metric("❗", "Claim", count("#note/discourse/claim")),
            metric("🌀", "Evidence", count("#note/discourse/evidence")),
            metric("🪧", "Context", count("#note/discourse/context")),
            metric("👀", "Observation", count("#note/discourse/observation")),
            metric("🧪", "Synthesis", count("#note/discourse/synthesis"))),
          row("Recent",
            metric("＋", "Created today", notePages.where((page) => isDate(page.created, todayIso)).length),
            metric("↻", "Updated today", notePages.where((page) => isDate(page.updated, todayIso)).length),
            metric("7d", "Created in 7 days", notePages.where((page) => page.created && dv.date(page.created) >= today.minus({ days: 6 })).length),
            metric("⌛", "Stale for 90 days", notePages.where((page) => page.updated && dv.date(page.updated) < today.minus({ days: 90 })).length)),
        ],
      },
      {
        icon: "🗺️", title: "System notes", total: count("#system"), open: false,
        rows: [
          row("Structure",
            metric("🗺️", "Categories", count("#system/category")),
            metric("🔎", "Meta-notes", count("#system/high/meta")),
            metric("⚡", "Problems", count("#system/high/problem")),
            metric("🧬", "Hierarchies", count("#system/high/hierarchy"))),
          row("Missing parents",
            metric("🔎", "Meta without category", missing("#system/high/meta", "category")),
            metric("⚡", "Problem without meta", missing("#system/high/problem", "meta")),
            metric("🧬", "Hierarchy without problem", missing("#system/high/hierarchy", "problem"))),
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: "✅", title: "Tasks", total: taskScope.length, open: true,
        rows: [
          row("Inline tasks",
            metric("○", "Open", taskScope.where((task) => !task.completed).length),
            metric("●", "Completed", taskScope.where((task) => task.completed).length)),
          row("Timing",
            metric("☀️", "Completed today", taskScope.where((task) => task.completed && (isDate(task.completion, todayIso) || task.text.includes(`✅ ${todayIso}`))).length),
            metric("📅", "Due today", taskScope.where((task) => !task.completed && isDate(task.due, todayIso)).length),
            metric("⚠️", "Overdue", taskScope.where((task) => !task.completed && task.due && task.due < today).length)),
          row("Task notes",
            metric("✅", "Default", count("#task/default")),
            metric("📍", "Milestone", count("#task/milestone"))),
          row("Open task notes",
            metric("📥", "Inbox", statusCount(taskNotes, "📥")),
            metric("🟥", "To do", statusCount(taskNotes, "🟥")),
            metric("🟦", "In progress", statusCount(taskNotes, "🟦")),
            metric("❄", "Frozen", statusCount(taskNotes, "❄"))),
          row("Closed task notes",
            metric("🟩", "Completed", statusCount(taskNotes, "🟩")),
            metric("📢", "Published", statusCount(taskNotes, "📢")),
            metric("⬛", "Dropped", statusCount(taskNotes, "⬛"))),
          row("Attention",
            metric("🔺", "High priority", whereCount(taskNotes, (page) => ["🔺", "⏫"].includes(String(page.priority)) && !isClosed(page))),
            metric("⛓", "Blocked", whereCount("#task/default", (page) => page.blockedBy && dv.array(page.blockedBy).length > 0 && !isClosed(page)))),
        ],
      },
      {
        icon: "🏢", title: "Projects", total: count("#project"), open: false,
        rows: [
          row("Types",
            metric("✏️", "Single", count("#project/single")),
            metric("🗞️", "Short", count("#project/short")),
            metric("🖊️", "Longform", count("#project/longform"))),
          row("Queue",
            metric("📥", "Inbox", statusCount("#project", "📥")),
            metric("🟥", "To do", statusCount("#project", "🟥"))),
          row("Progress",
            metric("🟦", "Active", statusCount("#project", "🟦")),
            metric("🟩", "Completed", statusCount("#project", "🟩")),
            metric("📢", "Published", statusCount("#project", "📢")),
            metric("❄", "Frozen", statusCount("#project", "❄")),
            metric("⬛", "Dropped", statusCount("#project", "⬛"))),
          row("Attention",
            metric("🔺", "High priority active", whereCount("#project", (page) => ["🔺", "⏫"].includes(String(page.priority)) && ["🟥", "🟦"].includes(String(page.status)))),
            metric("⚠️", "Overdue", whereCount("#project", (page) => page.end && dv.date(page.end) < today && !isClosed(page))),
            metric("∅", "Without category", missing("#project", "category")),
            metric("?", "Legacy status", whereCount("#project", (page) => page.status && !["⬛", "📥", "❄", "🟥", "🟦", "🟩", "📢"].includes(String(page.status))))),
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: "🗃️", title: "Sources", total: count(sources), open: true,
        rows: [
          row("Reading",
            metric("📖", "Books", count("#source/book AND -#mark/log")),
            metric("🎓", "Courses", count("#source/course AND -#mark/log")),
            metric("📃", "Papers", count("#source/article/paper AND -#mark/log")),
            metric("🌐", "Resources", count("#source/article/resource AND -#mark/log"))),
          row("Video and cinema",
            metric("📹", "Recordings", count("#source/video/recording AND -#mark/log")),
            metric("📼", "Playlists", count("#source/video/playlist AND -#mark/log")),
            metric("🎞️", "Movies", count("#source/cinematic/movie AND -#mark/log")),
            metric("🍿", "Series", count("#source/cinematic/series AND -#mark/log")),
            metric("🌸", "Anime", count("#source/cinematic/anime AND -#mark/log"))),
          row("Other types",
            metric("📻", "Podcasts", count("#source/podcast AND -#mark/log")),
            metric("🎮", "Games", count("#source/game AND -#mark/log")),
            metric("💽", "Albums", count("#source/music/album AND -#mark/log")),
            metric("🎧", "Tracklists", count("#source/music/tracklist AND -#mark/log"))),
          row("Status",
            metric("📥", "Inbox", statusCount(sources, "📥")),
            metric("🟥", "Queue", statusCount(sources, "🟥")),
            metric("🟦", "Active", statusCount(sources, "🟦")),
            metric("⚛", "Processing", statusCount(sources, "⚛")),
            metric("🟩", "Completed", statusCount(sources, "🟩")),
            metric("⬛", "Dropped", statusCount(sources, "⬛"))),
          row("Rating",
            metric("🌕", "Five", whereCount(sources, (page) => contains(page.rating, "🌕"))),
            metric("🌔", "Four", whereCount(sources, (page) => contains(page.rating, "🌔"))),
            metric("🌓", "Three", whereCount(sources, (page) => contains(page.rating, "🌓"))),
            metric("🌒", "Two", whereCount(sources, (page) => contains(page.rating, "🌒"))),
            metric("🌑", "One", whereCount(sources, (page) => contains(page.rating, "🌑"))),
            metric("∅", "Missing", whereCount(sources, (page) => !page.rating))),
          row("Scientificity",
            metric("🅰️", "A", whereCount(sources, (page) => contains(page.scientificity, "🅰️"))),
            metric("🅱️", "B", whereCount(sources, (page) => contains(page.scientificity, "🅱️"))),
            metric("👓", "Expert", whereCount(sources, (page) => contains(page.scientificity, "👓"))),
            metric("📢", "Popular", whereCount(sources, (page) => contains(page.scientificity, "📢"))),
            metric("💬", "Opinion", whereCount(sources, (page) => contains(page.scientificity, "💬"))),
            metric("∅", "Missing", whereCount(sources, (page) => !page.scientificity))),
        ],
      },
      {
        icon: "👥", title: "People", total: count(people), open: false,
        rows: [
          row("Contacts",
            metric("🧑‍🤝‍🧑", "Personal", count("#contact/personal")),
            metric("👤", "Working", count("#contact/working")),
            metric("🤝", "Clients", count("#contact/client")),
            metric("🧟", "Routine", count("#contact/routine"))),
          row("Creators",
            metric("🦸", "Content makers", count("#creator/contentmaker")),
            metric("👩🏻‍💻", "Writers", count("#creator/writer")),
            metric("😎", "Experts", count("#creator/expert")),
            metric("🧑‍🔬", "Researchers", count("#creator/researcher")),
            metric("🤵", "Actors", count("#creator/actor")),
            metric("🧑‍🎤", "Musicians", count("#creator/musician"))),
          row("Productions",
            metric("💼", "Companies", count("#production/company")),
            metric("🏢", "Organizations", count("#production/organization")),
            metric("🌐", "Websites", count("#production/website")),
            metric("🏨", "Platforms", count("#production/platform")),
            metric("🎛️", "Studios and labels", count("#production/art_studio OR #production/film_studio OR #production/game_studio OR #production/label")),
            metric("🔔", "Channels and podcasts", count("#production/channel OR #production/podcast"))),
          row("Relevant",
            metric("👤", "Contacts", whereCount('"base/contacts" OR #contact', (page) => page.relevant)),
            metric("👨", "Creators", whereCount('"base/creators" OR #creator', (page) => page.relevant)),
            metric("🏢", "Productions", whereCount('"base/productions" OR #production', (page) => page.relevant))),
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: "➕", title: "Additions", total: count(additions), open: false,
        rows: [
          row("Foundation",
            metric("🗂️", "Aggregators", count("#mark/addition/aggregator")),
            metric("📚", "Conspectuses", count("#mark/log/conspectus"))),
          row("Project work",
            metric("🗣️", "Meetings", count("#mark/addition/meeting")),
            metric("🧪", "Experiments", count("#mark/addition/experiment")),
            metric("🚨", "Reports", count("#mark/addition/report")),
            metric("🕵", "Research", count("#mark/addition/research")),
            metric("💪", "Practice", count("#mark/addition/practice"))),
          row("Communication",
            metric("👅", "Conversations", count("#mark/addition/conversation")),
            metric("🤝", "Negotiations", count("#mark/addition/negotiation")),
            metric("💬", "Social", count("#mark/addition/social")),
            metric("🤖", "Generated", count("#mark/addition/generated"))),
          row("Status",
            metric("📥", "Inbox", statusCount(additions, "📥")),
            metric("🟥", "Queue", statusCount(additions, "🟥")),
            metric("🟦", "Active", statusCount(additions, "🟦")),
            metric("🟩", "Completed", statusCount(additions, "🟩"))),
        ],
      },
      {
        icon: "📅", title: "Periodic notes", total: count("#periodic"), open: true,
        rows: [
          row("Periods",
            metric("🇩", "Days", count("#periodic/day")),
            metric("🇼", "Weeks", count("#periodic/week")),
            metric("🇲", "Months", count("#periodic/month")),
            metric("🇶", "Quarters", count("#periodic/quarter")),
            metric("🇾", "Years", count("#periodic/year"))),
          row("Reviewed",
            metric("🇩", "Days", whereCount("#periodic/day", (page) => page.reviewed)),
            metric("🇼", "Weeks", whereCount("#periodic/week", (page) => page.reviewed)),
            metric("🇲", "Months", whereCount("#periodic/month", (page) => page.reviewed)),
            metric("🇶", "Quarters", whereCount("#periodic/quarter", (page) => page.reviewed)),
            metric("🇾", "Years", whereCount("#periodic/year", (page) => page.reviewed))),
          row("Rated days", metric("", "Rated days", whereCount("#periodic/day", (page) => ["focus", "learn", "routine", "move", "connect", "rest"].some((field) => page[field] != null)))),
          row("Daily averages",
            ...[["🧿", "Focus", "focus"], ["💡", "Learn", "learn"], ["🔄", "Routine", "routine"], ["🧗", "Move", "move"], ["💬", "Connect", "connect"], ["🌙", "Rest", "rest"]]
              .map(([icon, label, field]) => {
                const values = q("#periodic/day").where((page) => page[field] != null).map((page) => Number(page[field]));
                return metric(icon, label, values.length ? values.avg().toFixed(1) : "–");
              })),
        ],
      },
    ],
  },
];

const root = dv.el("section", "", { cls: "vault-inventory" });
root.innerHTML = `<header class="vault-inventory__header"><span>Vault age</span><strong>${vaultAge == null ? "age unavailable" : `${vaultAge.toLocaleString()} days observed`}</strong></header>`;

for (const group of groups) {
  for (const item of group.items) {
    const details = document.createElement("details");
    details.className = "vault-inventory__section";
    details.open = item.open;
    const summary = document.createElement("summary");
    summary.innerHTML = `<span>${item.icon} <strong>${item.title}</strong></span><span><b>${format(item.total)}</b> total</span>`;
    details.append(summary);

    const body = document.createElement("div");
    body.className = "vault-inventory__body";
    for (const entry of item.rows) {
      const line = document.createElement("div");
      line.className = "vault-inventory__line";
      const label = document.createElement("span");
      label.textContent = entry.label;
      const values = document.createElement("div");
      values.className = "vault-inventory__values";
      for (const itemValue of entry.values) {
        const value = document.createElement("span");
        value.className = "vault-inventory__value";
        value.textContent = `${itemValue.icon ? `${itemValue.icon} ` : ""}${format(itemValue.value)}`;
        value.setAttribute("aria-label", `${itemValue.label}: ${format(itemValue.value)}`);
        value.setAttribute("data-tooltip-position", "top");
        values.append(value);
      }
      line.append(label, values);
      body.append(line);
    }
    details.append(body);
    root.append(details);
  }
}
