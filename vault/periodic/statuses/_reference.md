---
tags:
  - mark/gtd
cssclasses:
  - hide-properties
  - hide-backlinks
icon: 🔗
---

> [!todo]+ todo
> ```tasks
> not done
> tags include #task/reference
> group by function task.tags.filter( (tag) => tag.includes("#category/") ).map( (tag) => tag.split('/')[1] ? "[[_" + tag.split('/').slice(1, 2) +  "|🗺️ " + tag.split('/').slice(1, 2) + "]]" : '')
> group by function \
>   if (task.tags.includes("#time/long"))          return "%%01%% - 🐌 very long"; \
>   if (task.tags.includes("#time/lengthy"))       return "%%02%% - 🐢 long"; \
>   if (task.tags.includes("#time/moderate"))      return "%%03%% - 🐰 1 pomodoro"; \
>   if (task.tags.includes("#time/quick"))         return "%%04%% - 🤏 fast"; \
>   return "%%99%%";
> sort by function task.happens.format("YYYY-MM-DD")
> hide task count
> hide tags
> ```
