---
tags:
  - system/category
  - category/work
next:
  - "[[_work]]"
hierarchy:
  - "[[base/_hierarchy/work hierarchy|work]]"
cssclasses:
  - category
sort_projects: priority
sort_direction_projects: desc
show_search_sources: true
search_sources: ""
pagination_notes: 0
pagination_sources: 0
---

> [!tabbed]+
>
> <label>🗃️ sources<input type="radio" name="test" checked/></label>
>
> > `$=await dv.view("templates/views/category/sources")`
>
> <label>🏢 projects<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/category/projects")`
>
> <label>👥 people<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/category/people", {type: "contact"})` `$=await dv.view("templates/views/category/people", {type: "creator"})` `$=await dv.view("templates/views/category/people", {type: "production"})`
>
> <label>🔬 system<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/category/system", { type: "hierarchy"})` `$=await dv.view("templates/views/category/system", { type: "meta"})` `$=await dv.view("templates/views/category/system", { type: "problem"})`
>
> <label>📋 structure<input type="radio" name="test" /></label>
> 
> > `$=await dv.view("templates/views/category/structure")`
>
> <label>📝 notes<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/category/notes")`
>
> <label>✅ tasks<input type="radio" name="test" /></label>
>
> > ![[periodic/categories/_work]]
>
> <label>➕<input type="radio" name="test" /></label>
>
> >