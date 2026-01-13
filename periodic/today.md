---
tags:
  - mark/gtd
cssclasses:
  - hide-properties
  - hide-backlinks
obsidianUIMode: preview
icon: 📅
---

> [!todo|hidden]
> `$=dv.span("[[periodic/daily/" + moment().format("YYYY-MM-DD") + "|" + moment().format("D MMMM • dddd") + "]]")` ┃ [[upcoming|upcoming ➡️]] 
> ___
> ```tasks
> (due before tomorrow) OR (scheduled before tomorrow)
> not done
> group by function \
>   const date = task.happens.moment; \
>   const now = moment(); \
>   if (date && date.isBefore(now, 'day')) return '#### %%1%% ❗️ Overdue'; \
>   return '';
> sort by function \
>   let m = task.description && task.description.match(/⏰\s*(\d{1,2}:\d{2})/); \
>   return m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99";
> hide task count
> hide due date
> hide tags
> hide done date
> hide on completion
> ```