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
updated: 2025-03-20T11:17:29+07:00
cssclasses:
  - hide-properties
  - hide-backlinks
icon: ➡️
obsidianUIMode: preview
---

> [!info]+ <u>🔜 Tomorrow</u> ([[_today|📅 today]])
>
> ```tasks
> not done
> (due tomorrow) OR (scheduled tomorrow)
> group by function reverse task.scheduled.format("%%%%") ? "⌛ Scheduled:" : "📅 Due:"
> hide task count
> hide scheduled date
> hide due date
> hide on completion
> ```

___

> [!info]- <u>⬆️ Upcoming</u> ([[monthly calendar|🗓️ calendar]])
> ```tasks
> not done
> (due after tomorrow) OR (scheduled after tomorrow)
> group by function task.happens.format("**<u>YYYY%%MM%% (MMMM)</u>**")
> group by function task.happens.format("DD-dddd")
> hide task count
> hide due date
> hide recurrence rule
> hide on completion
> ```
