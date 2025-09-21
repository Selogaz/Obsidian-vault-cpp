---
tags:
  - mark/gtd
cssclasses:
  - hide-properties
  - hide-backlinks
obsidianUIMode: preview
icon: 📅
---

> [!important|hide-icon]- ❗ <u>Overdue</u> (<font color="#646a73">today: `$=dv.span("[[periodic/daily/" + moment().format("YYYY-MM-DD") + "|" + moment().format("YYYY-MM-DD") + "]]")`)</font>
> ```tasks
> (due before today) OR (scheduled before today)
> not done
> hide task count
> hide on completion
> ```

___

> [!abstract|hide-icon]+ 📅 <u>Today</u> ([[upcoming|upcoming ➡️]])
> ```tasks
> (due today) OR (scheduled today)
> sort by function \
>   let m = task.description && task.description.match(/⏰\s*(\d{1,2}:\d{2})/); \
>   return m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99";
> hide task count
> hide due date
> hide tags
> hide done date
> hide on completion
> ```
