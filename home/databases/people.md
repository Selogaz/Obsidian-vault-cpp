---
tags:
  - mark/db
aliases:
  - creators
  - contacts
  - productions
cssclasses:
  - category
isCategory: false
---

> [!tabbed]+
>
> <label>👤 contacts<input type="radio" name="test" checked/></label>
>
> > `$=await dv.view("templates/views/filter", {type: "contact"})`
> > ![[contacts.base]]
>
> <label>👨‍🎨 creators<input type="radio" name="test" /></label>
> 
> > `$=await dv.view("templates/views/filter", {type: "creator"})`
> > ![[creators.base]]
>
> <label>🏭 productions<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/filter", {type: "production"})`
> > ![[productions.base]]
> 
> <label>✅ tasks<input type="radio" name="test" /></label>
> 
> > `$=await dv.view("templates/views/tasks/people", {type: "production"})`
