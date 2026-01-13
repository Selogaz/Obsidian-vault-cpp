---
tags:
  - mark/gtd
aliases:
  - calendar
cssclasses:
  - no-inline-title
  - hide-backlinks
  - full-width
  - hide-properties
obsidianUIMode: preview
icon: 🗓️
---

```dataviewjs
const isMobile = dv.app.isMobile;

const pages = dv.pages('-"files" AND -"classes" AND -"home" AND -"Templates"')
  .file.tasks
  .where(t => t.text.includes('📅') || t.text.includes('⏳'));

const options = " noFilename noIcons noLayer";
const today = moment(Date.now());

dv.header(isMobile ? 6 : 2, `${today.format("D MMMM • dddd")} ([[periodic/daily/${today.format("YYYY-MM-DD")}|${today.format("YYYY-MM-DD")}]])`);

if (isMobile) {
  await window.renderCalendar(dv, {
    pages,
    view: "week",
    firstDayOfWeek: "1",
    options: "style3" + options,
    dailyNoteFolder: "periodic/daily",
    dailyNoteFormat: "YYYY-MM-DD"
  });
} else {
  await window.renderCalendar(dv, {
    pages,
    view: "month",
    firstDayOfWeek: "1",
    options: "style3" + options,
    dailyNoteFolder: "periodic/daily",
    dailyNoteFormat: "YYYY-MM-DD"
  });
} 
```