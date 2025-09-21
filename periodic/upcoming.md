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

> [!info|hide-icon]+ 🔜 <u>Tomorrow</u> ([[today|📅 today]])
> ```tasks
> not done
> (due tomorrow) OR (scheduled tomorrow)
> group by function reverse task.scheduled.format("%%%%") ? "⌛ Scheduled:" : "📅 Due:"
> sort by function \
>   let m = task.description && task.description.match(/⏰\s*(\d{1,2}:\d{2})/); \
>   return m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99";
> hide task count
> hide scheduled date
> hide due date
> hide on completion
> ```

___

> [!info|hide-icon]- ⬆️ <u>Upcoming</u> ([[periodic/calendar|🗓️ calendar]])
> ```tasks
> not done
> (due after tomorrow) OR (scheduled after tomorrow)
> group by function task.happens.format("**<u>YYYY%%MM%% (MMMM)</u>**")
> group by function task.happens.format("DD-dddd")
> sort by function \
>   let m = task.description && task.description.match(/⏰\s*(\d{1,2}:\d{2})/); \
>   return m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99";
> hide task count
> hide due date
> hide recurrence rule
> hide on completion
> ```
