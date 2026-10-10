/**
 * Interactive activity heatmap for the Abyss vault.
 *
 * The view follows the vault's manifest boundaries: source logs are additions,
 * discourse notes are still notes, and task notes are separate from inline tasks.
 */

const options = input && typeof input === "object" ? input : {};

const scopes = [
  {
    id: "all",
    icon: "◉",
    label: "All",
    query:
      "#note OR #system OR #periodic OR #project OR #source OR #creator OR #production OR #contact OR #task OR #mark/addition",
  },
  { id: "notes", icon: "📝", label: "Notes", query: "#note" },
  { id: "projects", icon: "🏢", label: "Projects", query: "#project" },
  {
    id: "sources",
    icon: "🗃️",
    label: "Sources",
    query: "#source AND -#mark/log",
  },
  {
    id: "people",
    icon: "👥",
    label: "People",
    query: "#contact OR #creator OR #production",
  },
  { id: "system", icon: "🗺️", label: "System", query: "#system" },
  {
    id: "additions",
    icon: "➕",
    label: "Additions",
    query:
      "(#mark/addition OR #mark/log/conspectus) AND -#mark/addition/aggregator",
  },
  { id: "periodic", icon: "📅", label: "Periodic", query: "#periodic" },
  {
    id: "tasks",
    icon: "✅",
    label: "Task notes",
    query: "#task/default OR #task/milestone",
  },
  {
    id: "completed",
    icon: "✔️",
    label: "Inline tasks",
    eventType: "completed-tasks",
  },
];

const dateField = ["mday", "updated"].includes(options.type)
  ? "updated"
  : "created";
const initialScope =
  scopes.find((scope) => scope.id === options.scope) ?? scopes[0];

const pad = (value) => String(value).padStart(2, "0");
const toDateKey = (value) => {
  if (!value) return null;
  if (typeof value.toISODate === "function") return value.toISODate();
  const match = String(value).match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : null;
};
const keyForDate = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const addDays = (date, amount) => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

const today = new Date();
today.setHours(12, 0, 0, 0);

const mondayOnOrBefore = (date) =>
  addDays(date, -((date.getDay() + 6) % 7));
const sundayOnOrAfter = (date) =>
  addDays(date, 6 - ((date.getDay() + 6) % 7));
const makeWeeks = (start, end) => {
  const weekCount = Math.floor((end - start) / (7 * 86400000)) + 1;
  return Array.from({ length: weekCount }, (_, weekIndex) =>
    Array.from({ length: 7 }, (_, dayIndex) =>
      addDays(start, weekIndex * 7 + dayIndex)
    )
  );
};
const calendarForPeriod = (period) => {
  if (period === "rolling") {
    const start = addDays(mondayOnOrBefore(today), -52 * 7);
    return {
      start,
      end: today,
      weeks: makeWeeks(start, addDays(start, 52 * 7)),
    };
  }

  const year = Number(period);
  const start = new Date(year, 0, 1, 12);
  const end = new Date(year, 11, 31, 12);
  const gridStart = mondayOnOrBefore(start);
  return {
    start,
    end,
    weeks: makeWeeks(gridStart, sundayOnOrAfter(end)),
  };
};

let activePeriod = options.year ? String(options.year) : "rolling";
let { start: periodStart, end: periodEnd, weeks } =
  calendarForPeriod(activePeriod);

const root = dv.el("div", "", { cls: "vault-heatmap" });

const header = document.createElement("header");
header.className = "vault-heatmap__header";
header.setAttribute("role", "toolbar");
header.setAttribute("aria-label", "Heatmap period");
root.append(header);

const toolbar = document.createElement("div");
toolbar.className = "vault-heatmap__toolbar";
toolbar.setAttribute("role", "toolbar");
toolbar.setAttribute("aria-label", "Heatmap scope");

const viewport = document.createElement("div");
viewport.className = "vault-heatmap__viewport";

const calendar = document.createElement("div");
calendar.className = "vault-heatmap__calendar";

const monthsRow = document.createElement("div");
monthsRow.className = "vault-heatmap__months";

const weeksRow = document.createElement("div");
weeksRow.className = "vault-heatmap__weeks";

const footer = document.createElement("div");
footer.className = "vault-heatmap__footer";

const details = document.createElement("div");
details.className = "vault-heatmap__details";
details.hidden = true;

const summary = document.createElement("span");
summary.className = "vault-heatmap__summary";

const legend = document.createElement("div");
legend.className = "vault-heatmap__legend";
legend.append(document.createTextNode("Low"));
for (const level of [0, 2, 4, 6, 8, 10]) {
  const swatch = document.createElement("span");
  swatch.className = "vault-heatmap__swatch";
  swatch.dataset.level = String(level);
  legend.append(swatch);
}
legend.append(document.createTextNode("High"));

footer.append(summary, legend);
calendar.append(monthsRow, weeksRow);
viewport.append(calendar);
root.append(toolbar, viewport, footer, details);

const monthFormatter = new Intl.DateTimeFormat(undefined, { month: "short" });
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const taskTarget = (task) => {
  const link = task.link ?? task.section;
  const path = link?.path ?? task.path;
  if (!link?.subpath) return path;
  const subpath = link.type === "block" ? `^${link.subpath}` : link.subpath;
  return `${path}#${subpath}`;
};

const taskLabel = (task) =>
  String(task.text ?? "")
    .replace(/(^|\s)#(?:task|category|time|effort)\/[^\s]+/gu, " ")
    .replace(/\s*✅\s*\d{4}-\d{2}-\d{2}\b/gu, " ")
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const dataForScope = (scope) => {
  const entries = new Map();
  const addEntry = (key, entry) => {
    if (!key) return;
    if (!entries.has(key)) entries.set(key, []);
    entries.get(key).push(entry);
  };

  if (scope.eventType !== "completed-tasks") {
    const pages = options.source ?? dv.pages(scope.query);
    for (const page of pages) {
      const value = page.file?.frontmatter?.[dateField] ?? page[dateField];
      addEntry(toDateKey(value), {
        kind: "note",
        label: page.file.name,
        page,
      });
    }
  }

  if (scope.id === "all" || scope.eventType === "completed-tasks") {
    const pages = options.source ?? dv.pages("");
    for (const page of pages) {
      for (const task of page.file?.tasks ?? []) {
        if (!task.completion) continue;
        addEntry(toDateKey(task.completion), {
          kind: "task",
          label: taskLabel(task),
          task,
        });
      }
    }
  }

  for (const eventsForDay of entries.values()) {
    eventsForDay.sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
    );
  }

  return entries;
};

const intensityFor = (count, scaleMax) => {
  if (count <= 0) return 0;
  return Math.max(1, Math.ceil(Math.min(count / scaleMax, 1) * 10));
};

let activeScope = initialScope;
let selectedDateKey = null;

const openInternalLink = (event, target) => {
  event.preventDefault();
  event.stopPropagation();
  app.workspace.openLinkText(
    target,
    dv.current()?.file?.path ?? "",
    event.metaKey || event.ctrlKey
  );
};

const renderDetails = (date, events) => {
  details.replaceChildren();

  const header = document.createElement("div");
  header.className = "vault-heatmap__details-header";

  const dateLabel = document.createElement("span");
  dateLabel.className = "vault-heatmap__details-date";
  dateLabel.textContent = dateFormatter.format(date);

  const countLabel = document.createElement("span");
  countLabel.className = "vault-heatmap__details-count";
  const taskCount = events.filter((entry) => entry.kind === "task").length;
  const noteCount = events.length - taskCount;
  if (activeScope.id === "all") {
    countLabel.textContent = [
      noteCount ? `${noteCount} notes` : "",
      taskCount ? `${taskCount} tasks` : "",
    ]
      .filter(Boolean)
      .join(" · ");
  } else if (activeScope.eventType === "completed-tasks") {
    countLabel.textContent = `${taskCount} completed`;
  } else {
    const action = dateField === "created" ? "created" : "updated";
    countLabel.textContent = `${noteCount} ${action}`;
  }

  const close = document.createElement("button");
  close.type = "button";
  close.className = "vault-heatmap__details-close";
  close.setAttribute("aria-label", "Close day details");
  close.textContent = "×";
  close.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    selectedDateKey = null;
    render();
  });

  header.append(dateLabel, countLabel, close);

  const list = document.createElement("div");
  list.className = "vault-heatmap__details-list";

  for (const entry of events) {
    if (entry.kind === "task") {
      const row = document.createElement("div");
      row.className = "vault-heatmap__task";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = true;
      checkbox.tabIndex = -1;
      checkbox.className =
        "task-list-item-checkbox vault-heatmap__task-checkbox";
      checkbox.setAttribute("aria-hidden", "true");

      const link = document.createElement("a");
      const target = taskTarget(entry.task);
      link.className =
        "internal-link vault-heatmap__link vault-heatmap__task-link";
      link.dataset.href = target;
      link.href = target;
      link.title = `${entry.task.path}:${entry.task.line + 1}`;
      link.textContent = entry.label || "Completed task";
      link.addEventListener("click", (event) => openInternalLink(event, target));

      row.append(checkbox, link);
      list.append(row);
      continue;
    }

    const page = entry.page;
    const link = document.createElement("a");
    link.className = "internal-link vault-heatmap__link";
    link.dataset.href = page.file.path;
    link.href = page.file.path;
    link.title = page.file.path;

    const icon = document.createElement("span");
    icon.className = "vault-heatmap__link-icon";
    icon.textContent = page.icon || activeScope.icon || "•";

    const name = document.createElement("span");
    name.textContent = page.file.name;

    link.append(icon, name);
    link.addEventListener("click", (event) =>
      openInternalLink(event, page.file.path)
    );

    list.append(link);
  }

  details.append(header, list);
  details.hidden = false;
};

const hideDetails = () => {
  details.replaceChildren();
  details.hidden = true;
};

const render = () => {
  const entries = dataForScope(activeScope);
  const visibleCounts = weeks
    .flat()
    .filter((date) => date >= periodStart && date <= periodEnd && date <= today)
    .map((date) => entries.get(keyForDate(date))?.length ?? 0);
  const nonZeroCounts = visibleCounts.filter(Boolean).sort((a, b) => a - b);
  const percentileIndex = Math.floor((nonZeroCounts.length - 1) * 0.9);
  const scaleMax = Math.max(1, nonZeroCounts[percentileIndex] ?? 1);
  const total = visibleCounts.reduce((sum, count) => sum + count, 0);
  const peak = Math.max(0, ...visibleCounts);

  monthsRow.replaceChildren();
  weeksRow.replaceChildren();
  calendar.style.setProperty("--heatmap-week-count", String(weeks.length));

  for (const days of weeks) {
    const monthCell = document.createElement("div");
    monthCell.className = "vault-heatmap__month";
    const monthStart = days.find(
      (date) =>
        date >= periodStart && date <= periodEnd && date.getDate() === 1
    );
    if (monthStart) monthCell.textContent = monthFormatter.format(monthStart);
    monthsRow.append(monthCell);

    const week = document.createElement("div");
    week.className = "vault-heatmap__week";

    for (const date of days) {
      const key = keyForDate(date);
      const events = entries.get(key) ?? [];
      const count = events.length;
      const future = date < periodStart || date > periodEnd || date > today;
      const day = document.createElement("div");
      day.className = "vault-heatmap__day";
      day.dataset.level = String(intensityFor(count, scaleMax));
      day.dataset.count = String(count);
      day.dataset.future = String(future);
      day.dataset.today = String(key === keyForDate(today));
      day.dataset.selected = String(key === selectedDateKey);

      if (!future) {
        const noun =
          activeScope.eventType === "completed-tasks"
            ? count === 1
              ? "task"
              : "tasks"
            : count === 1
              ? "event"
              : "events";
        const label = `${count} ${noun} on ${dateFormatter.format(date)}`;
        day.setAttribute("aria-label", label);
        day.setAttribute("data-tooltip-position", "top");
      }

      if (!future && count > 0) {
        day.setAttribute("role", "button");
        day.tabIndex = 0;

        const selectDay = (event) => {
          event.preventDefault();
          event.stopPropagation();
          selectedDateKey = selectedDateKey === key ? null : key;
          render();
        };

        day.addEventListener("click", selectDay);
        day.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") selectDay(event);
        });
      }

      week.append(day);
    }

    weeksRow.append(week);
  }

  const summaryNoun =
    activeScope.eventType === "completed-tasks" ? "tasks" : "events";
  summary.textContent = `${activeScope.label}: ${total} ${summaryNoun} · peak ${peak}/day`;

  if (selectedDateKey) {
    const selectedDate = weeks
      .flat()
      .find((date) => keyForDate(date) === selectedDateKey);
    const selectedEvents = entries.get(selectedDateKey) ?? [];
    if (selectedDate && selectedEvents.length > 0) {
      renderDetails(selectedDate, selectedEvents);
    } else {
      selectedDateKey = null;
      hideDetails();
    }
  } else {
    hideDetails();
  }

  for (const button of toolbar.querySelectorAll("button")) {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.scope === activeScope.id)
    );
  }

  for (const button of header.querySelectorAll("button")) {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.period === activePeriod)
    );
  }
};

const availableYears = Array.from(
  new Set(
    Array.from(dataForScope(scopes[0]).keys(), (key) => Number(key.slice(0, 4)))
  )
)
  .filter((year) => year >= 1970 && year <= today.getFullYear())
  .sort((a, b) => b - a);

for (const period of [
  { id: "rolling", label: "53 weeks" },
  ...availableYears.map((year) => ({ id: String(year), label: String(year) })),
]) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "vault-heatmap__range";
  button.dataset.period = period.id;
  button.textContent = period.label;
  button.setAttribute("aria-pressed", String(period.id === activePeriod));
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    activePeriod = period.id;
    ({ start: periodStart, end: periodEnd, weeks } =
      calendarForPeriod(activePeriod));
    selectedDateKey = null;
    render();
  });
  header.append(button);
}

for (const scope of scopes) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "vault-heatmap__filter";
  button.dataset.scope = scope.id;
  button.textContent = `${scope.icon} ${scope.label}`;
  button.setAttribute("aria-pressed", String(scope.id === activeScope.id));
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    activeScope = scope;
    selectedDateKey = null;
    render();
  });
  toolbar.append(button);
}

render();
