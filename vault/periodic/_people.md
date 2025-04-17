---
tags:
  - mark/gtd
cssclasses:
  - hide-properties
  - hide-backlinks
icon: 👥
obsidianUIMode: preview
---

> [!todo]+ todo
> ```dataviewjs
> const people = dv.pages("#creator OR #production OR #contact").file.link;
> 
> const tasks = dv.pages().file.tasks
>     .where(t => !t.completed)
>     .where(t => people.some(link => dv.func.contains(t.outlinks, link)))
>     .groupBy(t => people.filter(link => dv.func.contains(t.outlinks, link)));
> 
> dv.taskList(tasks);
> ```

> [!success]- archive
> ```dataviewjs
> const people = dv.pages("#creator OR #production OR #contact").file.link
> 
> const tasks = dv.pages().file.tasks
> 	.where(t => t.completed)
> 	.where(t => people.some(link => dv.func.contains(t.outlinks, link)))
> 	.groupBy(t => t.outlinks.filter(link => dv.func.contains(t.outlinks, people)))
> 
> dv.taskList(tasks)
> ```
