---
icon: 📊
cssclasses:
  - hide-backlinks
obsidianUIMode: preview
---

> [!important|hide-icon]+ ♨️ Heatmap
> `$=await dv.view("templates/views/heatmap")`

___

> [!info|hide-icon]+ 📝 Notes
> <u>Total</u>: `$=dv.pages("#note").length`
> Created today: `$=dv.pages("#note").where(p => dv.func.contains(p.file.frontmatter.created, moment().format("YYYY-MM-DD"))).length`
> Updated today: `$=dv.pages("#note").where(p => dv.func.contains(p.file.frontmatter.updated, moment().format("YYYY-MM-DD"))).length`

> [!info|hide-icon]+ ✅ Tasks
> <u>Total</u>: `$=dv.pages('-"files"').file.tasks.length`
> Completed tasks: `$=dv.pages('-"files"').file.tasks.where(t => t.completed).length`
> Completed today: `$=dv.pages('-"files"').file.tasks.where(t => t.completed).where(t => t.text.includes("✅ " + moment().format('YYYY-MM-DD'))).length`

> [!info|hide-icon]+ 🏢 Projects
> <u>Total</u>: `$=dv.pages("#project").length`
> Active projects: 🟦 `$=dv.pages("#project").where(p => dv.func.contains(p.status, "🟦")).length`
> Completed projects: 🟩 `$=dv.pages("#project").where(p => dv.func.contains(p.status, "🟩")).length` 📢 `$=dv.pages("#project").where(p => dv.func.contains(p.status, "📢")).length`
> Frozen projects: ❄ `$=dv.pages("#project").where(p => dv.func.contains(p.status, "❄")).length`

> [!info|hide-icon]+ 🗃️ Sources
> <u>Total</u>: `$=dv.pages("#source").length`
> Active sources: 🟦 `$=dv.pages("#source").where(p => dv.func.contains(p.status, "🟦")).length` ⚛️ `$=dv.pages("#source").where(p => dv.func.contains(p.status, "⚛️")).length`
> Completed sources: 🟩 `$=dv.pages("#source").where(p => dv.func.contains(p.status, "🟩")).length`

> [!info|hide-icon]+ 👥 People
> <u>Total</u>: `$=dv.pages("#contact OR #creator OR #production").length`
> Contacts: `$=dv.pages("#contact").length`
> Creators `$=dv.pages("#creator").length`
> Productions `$=dv.pages("#production").length`

> [!info|hide-icon]+ 🗺️ High-notes
> <u>Total</u>: `$=dv.pages("#system").length`
> Categories: `$=dv.pages("#system/category").length`
> Meta-notes: `$=dv.pages("#system/high/meta").length`
> Problems `$=dv.pages("#system/high/problem").length`
> Hierarchies `$=dv.pages("#system/high/hierarchy").length`

> [!info|hide-icon]+ ➕ Additions
> <u>Total</u>: `$=dv.pages("(#mark/addition OR #mark/log/conspectus) AND -#mark/addition/aggregator").length`
> Conspectuses: `$=dv.pages("#mark/log/conspectus").length`
> Meetings: `$=dv.pages("#mark/addition/meeting").length`
> Experiments: `$=dv.pages("#mark/addition/experiment").length`
> Reports: `$=dv.pages("#mark/addition/report").length`

> [!info|hide-icon]+ 📅 Periodic notes
> <u>Total</u>: `$=dv.pages("#periodic").length`
> Days: `$=dv.pages("#periodic/day").length`
> Weeks: `$=dv.pages("#periodic/week").length`
> Months: `$=dv.pages("#periodic/month").length`
> Quarters: `$=dv.pages("#periodic/quarter").length`
> Years: `$=dv.pages("#periodic/year").length`

___

> [!question]+ How long I use this vault?
> ```dataviewjs
> const notesWithCreated = dv.pages()
>   .where(p => p.file.frontmatter.created)
>   .sort(p => p.file.frontmatter.created);
> 
> if (notesWithCreated.length === 0) {
>   dv.span("No notes with creation date found");
> } else {
>   const oldestNote = notesWithCreated[0];
>   const oldestNoteDate = moment(oldestNote.file.frontmatter.created);
>   const diffDays = moment().diff(oldestNoteDate, 'days');
>   dv.span(`${diffDays} days`);
> }
> ```
