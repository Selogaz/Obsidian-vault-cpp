---
aliases:
  - categories
---

> [!attention]- orphan categories (`$=dv.pages("#system/category").where(l => !dv.func.contains(l.file.inlinks, dv.current().file.link)).length`)
> > [!info]-
> > Категории ниже есть в системе, но они не перечислены в индексном (текущем) файле. Такие ситуации лучше исправлять.
> ```dataview
> LIST
> FROM #system/category
> WHERE !contains(file.inlinks, this.file.link)
> ```

> [!attention]- uncategorized high-notes (`$=dv.pages("#system/meta or #system/hierarchy").where(p=> !p.category).length`)
> 
> > [!info]-
> > Далее перечислены иерархии и мета-заметки, которые не имеют категории. Такое лучше исправлять.
> ```dataviewjs
> const {fieldModifier: f} = MetadataMenu.api
> 
> dv.table(["High-note", "Category"], 
>     dv.pages("#system/hierarchy OR #system/meta")
>     .where(p => !p.category)
>     .map(p => [
>         p.file.link, 
>         f(dv, p, "category"),
>         ])
> )
> ```

# categories

> [!Info]-
> Если вы хотите красивое отображение на графе, то категории стоит вкладывать друг в друга. Однако тогда придётся переделать реализации некоторых функций.

- [[category 1]]
- [[category 2]]
	- [[category 2.1]]
	- [[category 2.2]]
- [[category 3]]
- [[programming]]
	- [[java]]