---
tags:
  - mark/gtd
aliases:
  - скоро
  - запланировано
  - завтра
  - upcoming
  - tomorrow
  - scheduled
  - due
cssclasses:
  - hide-properties
  - hide-backlinks
obsidianUIMode: preview
icon: ➡️
---

>[!todo|hidden]
> `$=dv.span("[[periodic/daily/" + moment().format("YYYY-MM-DD") + "|" + moment().format("D MMMM • dddd") + "]]")` ┃ [[today|📅 today]] ┃ [[calendar|🗓️ calendar]]
> ___
> ```tasks
> not done
> (due after today) OR (scheduled after today)
> group by function \
>   const date = task.happens.moment; \
>   const tomorrow = moment().add(1, 'days'); \
>   if (date && date.isSame(tomorrow, 'day')) return '%%1%% 🔜 Tomorrow'; \
>   return '%%2%% ⬆️ Upcoming';
> group by function \
>   const date = task.happens.moment; \
>   const tomorrow = moment().add(1, 'days'); \
>   if (date && !date.isSame(tomorrow, 'day')) { \
>     return date.format("<u>YYYY-MM (MMMM)</u>"); \
>   } \
>   return '';
> group by function \
>   const date = task.happens.moment; \
>   const tomorrow = moment().add(1, 'days'); \
>   if (date && !date.isSame(tomorrow, 'day')) { \
>     return date.format("DD-dddd"); \
>   } \
>   return '';
> sort by function \
>   let m = task.description && task.description.match(/⏰\s*(\d{1,2}:\d{2})/); \
>   return m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99";
> hide task count
> hide scheduled date
> hide due date
> hide recurrence rule
> hide on completion
> ```