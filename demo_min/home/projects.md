---
aliases:
- "projects"
---
alt+p (projects)
Одна заметка = один проект

> [!important]+ 🟦 wip
> ```mdm
> type: project
> view: 🟦 wip
> ```

> [!todo]- 🟥 todo
> ```mdm
> type: project
> view: 🟥 todo
> ```

> [!done]- 🟩 done
> ```mdm
> type: project
> view: 🟩 done
> ```

___
___

> [!attention]- uncategorized projects (`$=dv.pages("#project").where(p => !p.category).length`)
> ```dataviewjs
> const {fieldModifier: f} = MetadataMenu.api
> 
> dv.table(["Project", "Category"], 
>     dv.pages("#project")
>     .where(p => !p.category)
>     .map(p => [
>         p.file.link, 
>         f(dv, p, "category"),
>         ])
> )
> ```

> [!info]- ⬛ drop
> ```dataview
> LIST
> FROM #project 
> WHERE status = "drop"
> ```