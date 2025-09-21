<%*
let title = tp.file.title
let title_strip = title.replace(/ /g,"_")
if (title.startsWith("Untitled")) {
	title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>
<% "---" %>
tags: 
  - system/category
  - category/<% title.replace(/ /g, '_') %>
cssclasses:
  - category
<% "---" %>

> [!tabbed]+
>
> <label>🗃️ sources<input type="radio" name="test" checked/></label>
>
> > `$=await dv.view("templates/views/filter", {type: "source"})`
> > ![[sources.base]]
>
> <label>🏢 projects<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/filter", {type: "project"})`
> > ![[projects.base]]
>
> <label>👥 people<input type="radio" name="test" /></label>
>
> > > [!note|hide-icon]+ 👤 Contacts
> > > `$=await dv.view("templates/views/filter", {type: "contact"})`
> > > ![[contacts.base]]
> >
> > > [!note|hide-icon]+ 👨‍🎨 Creators
> > > `$=await dv.view("templates/views/filter", {type: "creator"})`
> > > ![[creators.base]]
> >
> > > [!note|hide-icon]+ 🏭 Productions
> > > `$=await dv.view("templates/views/filter", {type: "production"})`
> > > ![[productions.base]]
>
> <label>🔬 system<input type="radio" name="test" /></label>
>
> > > [!note|hide-icon]+ 🧬 Hierarchies
> > > `$=await dv.view("templates/views/filter", { type: "hierarchy"})`
> > > ![[hierarchies.base]]
> >
> > > [!note|hide-icon]+ 🔎 Meta-notes
> > > `$=await dv.view("templates/views/filter", { type: "meta"})`
> > > ![[meta-notes.base]]
> >
> > > [!note|hide-icon]+ ⚡️ Problems
> > > `$=await dv.view("templates/views/filter", { type: "problem"})`
> > > ![[problems.base]]
>
> <label>📋 structure<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/structure")`
>
> <label>📝 notes<input type="radio" name="test" /></label>
>
> > 🔤 Title:`INPUT[text:note_title]` 🏷️ Tags: `INPUT[text:note_tags]`
> > ![[notes.base]]
>
> <label>✅ tasks<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/tasks/category")`
>
> <label>➕<input type="radio" name="test" /></label>
>
> > 💤
