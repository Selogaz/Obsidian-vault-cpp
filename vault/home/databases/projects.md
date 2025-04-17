---
tags:
  - mark/db
aliases:
  - проекты
cssclasses:
  - category
obsidianUIMode: preview
---

> [!tabbed]+
>
> <label>🏢 projects<input type="radio" name="test" checked/></label>
>
> > `$=await dv.view("templates/views/category/projects")`
> 
> <label>🗣️ interim<input type="radio" name="test" /></label>
> 
> > `$=dv.list(dv.pages("#mark/addition").where(p => p.status == "🟥").sort(p => p.file.name, "desc").file.link)`
>
> <label>✅ tasks<input type="radio" name="test" /></label>
> 
> > `$=dv.taskList(dv.pages("#project").where(p => p.status == "🟦").file.tasks)`
>
> <label>🏗 multistep<input type="radio" name="test" /></label>
>
> > ![[_multistep]]
