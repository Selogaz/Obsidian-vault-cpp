---
tags:
  - mark/db
BC-tag-note: "#mark/fleeting"
BC-tag-note-field: down
cssclasses:
  - hide-backlinks
  - no-inline-title
  - remove-dataview-title
aliases:
  - inbox
icon: 📥
---

> [!tabbed]+
>
> <label>📥 inbox<input type="radio" name="test" checked/></label>
>
> > `$=await dv.view("templates/views/inbox", {type: "note"})`
> > `$=await dv.view("templates/views/inbox", {type: "source"})`
>
> <label>🗣️ interim<input type="radio" name="test" /></label>
> 
> > `$=dv.list(dv.pages("#mark/addition").where(p => p.status == "🟥").sort(p => p.file.name, "desc").file.link)`
> 
> <label>⌛ recent<input type="radio" name="test" /></label>
> 
> > [[last created-updated#Last updated|last updated]]
> > [[last created-updated#Last created|last created]]
> 
> <label>🌲 evergreen<input type="radio" name="test" /></label>
> 
> > `$=dv.list(dv.pages("#note/basic/evergreen").sort(p => p.file.frontmatter.updated, "desc").file.link)`
> > `$=dv.list(dv.pages("#note/basic/incubator").sort(p => p.file.frontmatter.updated, "desc").file.link)`
> > `$=dv.list(dv.pages("#note/basic/fern").sort(p => p.file.frontmatter.updated, "desc").file.link)`
> > `$=dv.list(dv.pages("#note/basic/seed").sort(p => p.file.frontmatter.updated, "desc").file.link)`

