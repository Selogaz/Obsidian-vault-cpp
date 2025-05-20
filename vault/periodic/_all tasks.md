---
tags:
  - mark/gtd
updated: 2025-05-20T08:43:23+03:00
cssclasses:
  - hide-properties
  - hide-backlinks
icon: ✅
---

> [!todo]- archive
> ```tasks
> done
> tags include #task 
> group by function task.tags.filter( (tag) => tag.includes("#task/") )
> hide task count
> ```

> [!missing]- don’t have tags
> ```tasks
> not done
> tags regex does not match /./i
> ```

> [!todo]+ todo
> ```tasks
> not done
> tags include #task 
> group by function task.tags.filter( (tag) => tag.includes("#task/") ).map( (tag) => tag.split('/')[1] ? tag.split('/').slice(1, 2) : '')
> sort by function task.happens.format("YYYY-MM-DD")
> hide task count
> hide scheduled date
> hide due date
> hide tags
> ```
