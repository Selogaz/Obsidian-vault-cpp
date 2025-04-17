alt+p (sources)

> [!summary]- libraries
> [[articles]] | [[books]] | [[courses]] | [[movies]] | [[podcasts]] | [[videos]]
> [[creators]]

> [!important]+ 🟦 wip
> ```mdm
> type: source
> view: 🟦 wip
> ```

> [!todo]- 🟥 todo
> ```mdm
> type: source
> view: 🟥 todo
> ```

> [!done]- 🟩 done
> ```mdm
> type: source
> view: 🟩 done
> ```

___
___

> [!attention]- uncategorized sources (`$=dv.pages("#source").where(p => !p.category).length`)
> ```dataviewjs
> const {fieldModifier: f} = MetadataMenu.api
> 
> dv.table(["Source", "Category"], 
>     dv.pages("#source")
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
> FROM #source
> WHERE status = "drop"
> ```