/*
 * @Author          : 稻米鼠
 * @Date            : 2022-10-28 08:32:52
 * @LastEditTime    : 2022-11-23 15:57:29
 * @FilePath        : \ob-templates\Dataview\Heatmap-dataview\view.js
 * @Description     : Note Heatmap
 * @HomePage        : https://github.com/dmscode/Obsidian-Templates
 */
/** @type {array} All notes */
const allNotes = dv.pages(
  "#note OR #system OR #periodic OR #project OR #source OR #creator OR #production OR #contact OR #mark/addition"
);
/** Represents a simple +1 value */
const addOne = () => 1;

/** @type {object} Preset data acquisition methods */
const defaultMethods = {
  cday: {
    /** Note creation date (from frontmatter) */ source: allNotes,
    getDate: (p) => {
      const d = p.file.frontmatter.created;
      if (!d) return "";
      return String(d).slice(0, 10);
    },
    getValue: addOne,
  },
  mday: {
    /** Note modification date (from frontmatter) */ source: allNotes,
    getDate: (p) => {
      const d = p.file.frontmatter.updated;
      if (!d) return "";
      return String(d).slice(0, 10);
    },
    getValue: addOne,
  },
  created: {
    /** Note creation date (from frontmatter) */ source: allNotes,
    getDate: (p) => {
      const d = p.file.frontmatter.created;
      if (!d) return "";
      return String(d).slice(0, 10);
    },
    getValue: addOne,
  },
  updated: {
    /** Note modification date (from frontmatter) */ source: allNotes,
    getDate: (p) => {
      const d = p.file.frontmatter.updated;
      if (!d) return "";
      return String(d).slice(0, 10);
    },
    getValue: addOne,
  },
  name: {
    /** Note name */ source: allNotes,
    getDate: (p) => p.file.name,
    getValue: addOne,
  },
  task: {
    /** Task completion date */
    source: dv.pages().file.tasks.filter((t) => t.completed),
    getDate: (t) => dv.func.dateformat(t.completion, "yyyy-MM-dd"),
    getValue: addOne,
  },
};

/**
 * Get specified input
 *
 * @param {string} key
 * @param {any} defaultVal
 * @return {any}
 */
const getInput = (key, defaultVal) => {
  return input && input[key] ? input[key] : defaultVal;
};
/**
 * Call method according to the corresponding type to get data
 *
 * @return {object}
 */
const dataGetter = () => {
  const type = getInput("type", "cday");
  const method = defaultMethods[type]
    ? defaultMethods[type]
    : defaultMethods["cday"];
  const source = getInput("source", method.source);
  const getDate = getInput("getDate", method.getDate);
  const getValue = getInput("getValue", method.getValue);
  const data = {};
  source.filter((p) => {
    const md = getDate(p);
    const val = getValue(p);
    data[md] = data[md] ? data[md] + val : val;
  });
  return data;
};
/**
 * Level calculation method
 *
 * @param {number} count Quantity
 * @returns {number} Corresponding level
 */
const levelGetter = getInput("levelGetter", (count) => (count < 5 ? count : 5));

/** @type {object} Data source */
const heatData = getInput("heatData", dataGetter());

/** @type {Date} */
const today = new Date();
/** @type {number} One day in milliseconds */
const daylong = 24 * 60 * 60 * 1000;
/** @type {number} Day of the week (0=Sunday, 1=Monday, ...) */
const todayDay = today.getDay();
/** @type {number} Offset to the nearest previous Monday */
const mondayOffset = todayDay === 0 ? 6 : todayDay - 1;
/** @type {number} Start date: Monday 53 weeks ago */
const startDay = today - (mondayOffset + 52 * 7) * daylong;

/**
 * Two-digit number
 *
 * @param {number} num Integer from 0 to 99
 * @return {string}
 */
const dbNum = (num) => (num > 9 ? String(num) : "0" + num);

/** @type {string} */
let code = `
<style>
.dms-heatmap {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  width: 100%;
  overflow: visible;
}
.dms-heatmap-weekrow {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  min-width: 18px;
  position: relative;
  padding-top: 28px;
}
.dms-heatmap-month {
  position: absolute;
  top: 0;
  line-height: 28px;
  font-size: 14px;
}
.dms-heatmap-day {
  border: 1px solid rgba(128, 128, 128, .08);
  background-color: rgba(128, 128, 128, .05);
  border-radius: 3px;
  margin: 0 1px 1px 0;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
}
.dms-heatmap-day:hover::before,
.dms-heatmap-day:hover::after {
  display: none !important;
}
.dms-heatmap-day.dms-heatmap-future-day {
  opacity: 0;
}
.dms-heatmap-day > img {
  position: relative;
  border: none;
  background: none;
  width: 100%;
  display: block;
  opacity: 0;
  z-index: -100;
}
.dms-heatmap-level-1 { background-color: hsl(120, 60%, 80%, .5); }
.dms-heatmap-level-2 { background-color: hsl(120, 60%, 70%, .5); }
.dms-heatmap-level-3 { background-color: hsl(120, 60%, 60%, .5); }
.dms-heatmap-level-4 { background-color: hsl(120, 60%, 50%, .5); }
.dms-heatmap-level-5 { background-color: hsl(120, 60%, 40%, .5); }

.dms-heatmap-weekday-mark {
  border: 1px solid rgba(128, 128, 128, 0);
  background: none;
}

.dms-heatmap-weekday-0 { background-color: hsl(10, 100%, 60%, .3); }
.dms-heatmap-weekday-3 { background-color: hsl(200, 100%, 60%, .3); }
.dms-heatmap-weekday-6 { background-color: hsl(200, 100%, 60%, .3); }

.dms-heatmap-mark-show {
  width: 100%;
  flex-grow: 0;
  text-align: right;
  font-size: 12px;
  line-height: 2em;
}
.dms-heatmap-level-mark {
  display: inline-block;
  width: 12px;
  height: 12px;
}

.dms-heatmap-day.dms-heatmap-day-first:hover::after {
  left: 0;
  transform: none;
  margin-left: 4px;
}
.dms-heatmap-day.dms-heatmap-day-first:hover::before {
  left: 8px;
  transform: none;
}
.dms-heatmap-day.dms-heatmap-day-last:hover::after {
  left: 100%;
  transform: translate(-100%, 0);
  margin-left: -4px;
}
.dms-heatmap-day.dms-heatmap-day-last:hover::before {
  left: calc(100% - 8px);
  transform: none;
}

@media screen and (max-width: 480px) {
  .dms-heatmap-weekrow {
	min-width: 32px;
  }
}
</style>
<div class="dms-heatmap">`;
/** @type {number} */
let dayCount = 0;

/**
 * Append code for one day
 *
 * @param {array} className
 * @param {string} tipLabel
 */
const addDay = (className, tipLabel) => {
  code += `<div class="${className.join(" ")}" ${tipLabel} data-heatmap-tooltip>
		<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAADElEQVQImWP4//8/AAX+Av5Y8msOAAAAAElFTkSuQmCC">
	  </div>`;
};

/** Loop output for 53 weeks */
for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
  /** If it has exceeded today, stop */
  if (startDay + dayCount * daylong > today) break;
  /** Output one week (column) */
  code += `<div class="dms-heatmap-weekrow">`;
  for (let d = 0; d < 7; d++) {
    /** The date of the day */
    const theDay = new Date(startDay + dayCount * daylong);
    /** Calculate year, month, day */
    const year = theDay.getFullYear();
    const month = dbNum(theDay.getMonth() + 1);
    const day = dbNum(theDay.getDate());
    /** Generate date string */
    const theDayStr = `${year}-${month}-${day}`;
    /** If it is the beginning of the month, add a month indicator */
    if (day === "01") code += `<div class="dms-heatmap-month">${month}</div>`;
    /** Get level, a total of five levels */
    const level = levelGetter(heatData[theDayStr] ? heatData[theDayStr] : 0);
    /** class array */
    const className = ["dms-heatmap-day", "dms-heatmap-level-" + level];
    /** @type {boolean} Is it a future time? Only display up to today, so the future will not be displayed */
    const future = dayCount > 364 && theDay - today >= daylong - 1;
    if (future) className.push("dms-heatmap-future-day");
    if (d === 0) className.push("dms-heatmap-day-first");
    if (d === 6) className.push("dms-heatmap-day-last");

    /** Tooltip in the style of '3 notes on Apr 27, 2024' */
    const count = heatData[theDayStr] || 0;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateLabel = `${
      months[theDay.getMonth()]
    } ${theDay.getDate()}, ${theDay.getFullYear()}`;
    const tipLabel = !future
      ? `aria-label="${count} note${count !== 1 ? "s" : ""} on ${dateLabel}"`
      : "";

    addDay(className, tipLabel);
    dayCount++;
  }
  /** End of the week */
  code += `</div>`;
}
code += `</div>`;
/** Add level legend */
code += `<div class="dms-heatmap-mark-show">Low `;
for (let d = 0; d < 6; d++) {
  const className = [
    "dms-heatmap-day",
    "dms-heatmap-level-mark",
    `dms-heatmap-level-${d}`,
  ];
  const tipLabel = `aria-label="level-${d}"`;
  addDay(className, tipLabel);
}
code += ` Hight</div>`;

const root = dv.el("div", "", { cls: "dms-heatmap-container" });
const rootShadow = root.attachShadow({ mode: "open" });
rootShadow.innerHTML = code;

// Tooltip logic outside Shadow DOM
if (!document.getElementById("dms-heatmap-tooltip")) {
  const tooltip = document.createElement("div");
  tooltip.id = "dms-heatmap-tooltip";
  tooltip.style.position = "fixed";
  tooltip.style.pointerEvents = "none";
  tooltip.style.zIndex = "9999";
  tooltip.style.background = "#333336";
  tooltip.style.color = "#CCCCCE";
  tooltip.style.borderRadius = "3px";
  tooltip.style.boxShadow = "0 2px 6px rgba(0,0,0,.1)";
  tooltip.style.fontSize = "12px";
  tooltip.style.lineHeight = "12px";
  tooltip.style.padding = "3px 6px";
  tooltip.style.whiteSpace = "nowrap";
  tooltip.style.display = "none";
  document.body.appendChild(tooltip);
}
const tooltip = document.getElementById("dms-heatmap-tooltip");

function showTooltip(text, x, y) {
  tooltip.textContent = text;
  tooltip.style.display = "block";
  // Смещение: 10px вправо и 20px вверх от курсора
  const margin = 10;
  tooltip.style.left = x + margin + "px";
  tooltip.style.top = y - 20 + "px";
  // Проверка выхода за правый край
  const rect = tooltip.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    tooltip.style.left = window.innerWidth - rect.width - margin + "px";
  }
  // Проверка выхода за левый край
  if (rect.left < 0) {
    tooltip.style.left = margin + "px";
  }
  // Проверка выхода за верх
  if (rect.top < 0) {
    tooltip.style.top = margin + "px";
  }
}
function hideTooltip() {
  tooltip.style.display = "none";
}

// Навешиваем обработчики на все ячейки после рендера
setTimeout(() => {
  const shadow = root.shadowRoot;
  if (!shadow) return;
  shadow.querySelectorAll("[data-heatmap-tooltip]").forEach((el) => {
    el.addEventListener("mouseenter", (e) => {
      const label = el.getAttribute("aria-label");
      if (!label) return;
      const rect = el.getBoundingClientRect();
      showTooltip(label, rect.right, rect.top);
    });
    el.addEventListener("mousemove", (e) => {
      const label = el.getAttribute("aria-label");
      if (!label) return;
      showTooltip(label, e.clientX, e.clientY);
    });
    el.addEventListener("mouseleave", hideTooltip);
  });
}, 0);
