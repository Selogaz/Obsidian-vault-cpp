---
tags:
  - mark/db
aliases:
  - проекты
cssclasses:
  - category
obsidianUIMode: preview
isCategory: false
---

> [!tabbed]+
>
> <label>🏢 projects<input type="radio" name="test" checked/></label>
>
> > `$=await dv.view("templates/views/filter", {type: "project"})`
> > ![[projects.base]]
> 
> <label>🗣️ interim<input type="radio" name="test" /></label>
> 
> > ![[interim.base]]
>
> <label>✅ tasks<input type="radio" name="test" /></label>
> 
> > `$=dv.taskList(dv.pages("#project").where(p => p.status == "🟦").file.tasks)`
>
> <label>🏗 multistep<input type="radio" name="test" /></label>
>
> > ![[multistep]]
