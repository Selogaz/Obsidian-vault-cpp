---
tags:
  - mark/gtd
updated: 2025-05-20T14:05:20+03:00
cssclasses:
  - hide-properties
  - hide-backlinks
icon: 🔝
obsidianUIMode: preview
---

> [!todo]+ todo ([[Eisenhower Matrix.canvas|Eisenhower]])
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
> group by function task.tags.filter( (tag) => tag.includes("#category/") ).map( (tag) => tag.split('/')[1] ? "- [[_" + tag.split('/').slice(1, 2) +  "|🗺️ " + tag.split('/').slice(1, 2) + "]]" : '')
> sort by function task.happens.format("YYYY-MM-DD")
> hide on completion
> hide task count
> hide tags
> ```
