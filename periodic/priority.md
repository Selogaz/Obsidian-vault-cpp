---
tags:
  - time/quick
  - time/moderate
  - time/long
  - time/lengthy
  - priority/e
  - priority/d
  - priority/c
  - priority/b
  - priority/a
  - mark/gtd
  - effort/medium
  - effort/hard
  - effort/easy
cssclasses:
  - hide-properties
  - hide-backlinks
obsidianUIMode: preview
icon: 🔝
---

> [!todo|hidden]
> [[tasks (grouped by priority).canvas|priority]] - [[tasks (grouped by time).canvas|time]] - [[tasks (grouped by effort).canvas|effort]]
> ___
> ```tasks
> not done
> tags include #priority
> group by function \
>   if (task.tags.includes("#priority/a"))         return "%%01%% 🇦 Important and urgent"; \
>   if (task.tags.includes("#priority/b"))         return "%%02%% 🇧 Important and non-urgent"; \
>   if (task.tags.includes("#priority/c"))         return "%%03%% 🇨 Сommon task"; \
>   if (task.tags.includes("#priority/d"))         return "%%04%% 🇩 Delegate"; \
>   if (task.tags.includes("#priority/e"))         return "%%05%% 🇪 Eliminate"; \
>   return "%%99%%";
> group by function \
> 	if (task.file.folder.includes("periodic/")) return "%%_%%"; \
> 	return "-- [[" + task.file.filenameWithoutExtension + "]]"
> sort by function \
>   let dateStr = task.happens ? task.happens.format("YYYY-MM-DD") : "9999-99-99"; \
>   let m = task.description && task.description.match(/⏰\s*(\d{1,2}:\d{2})/); \
>   let timeStr = m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99"; \
>   return dateStr + "T" + timeStr;
> hide on completion
> hide tags
> hide task count
> ```
