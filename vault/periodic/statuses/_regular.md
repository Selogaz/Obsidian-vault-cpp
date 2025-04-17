---
tags:
  - mark/gtd
cssclasses:
  - hide-properties
  - hide-backlinks
icon: 🔁
---

> [!todo]+ todo
> ```tasks
> not done
> tags include #task/regular
> group by function task.tags.filter( (tag) => tag.includes("#category/") ).map( (tag) => tag.split('/')[1] ? "[[_" + tag.split('/').slice(1, 2) +  "|🗺️ " + tag.split('/').slice(1, 2) + "]]" : '')
> group by function \
>   if (task.tags.includes("#effort/hard"))        return "%%01%% - 🫀 hard"; \
>   if (task.tags.includes("#effort/medium"))      return "%%02%% - ❤️‍🔥 medium"; \
>   if (task.tags.includes("#effort/easy"))        return "%%03%% - ❤ easy"; \
>   return "%%99%%";
> sort by function task.happens.format("YYYY-MM-DD")
> hide task count
> hide tags
> hide on completion
> ```