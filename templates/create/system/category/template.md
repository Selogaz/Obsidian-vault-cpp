<% "---" %>
tags:
  - system/category
  - category/<% await tp.file.title.replace(/ /g, '_') %>
aliases:
cssclasses:
  - category
relevant: false
icon: <% `"${String(tp.user.manifest("fields.icon.fixed") || tp.user.manifest("fields.icon.default") || "")}"` %>
color: <% `"${tp.user.manifest("fields.color.fixed")}"` %>
<% "---" %>

> [!tabbed]+
>
> <label>🗃️ sources<input type="radio" name="test" checked/></label>
>
> > ![[sources.base#📋 Workflow: Kanban (v)]]
>
> <label>🏢 projects<input type="radio" name="test" /></label>
>
> > ![[projects.base#📋 Workflow: Kanban (v)]]
>
> <label>👥 people<input type="radio" name="test" /></label>
>
> > ![[people.base#🗄️ Group: By Type]]
>
> <label>🔬 system<input type="radio" name="test" /></label>
>
> > ![[high-notes.base#🗄️ Group: By Type]]
>
> <label>📋 structure<input type="radio" name="test" /></label>
>
> > `$=await dv.view("templates/views/structure")`
>
> <label>📝 notes<input type="radio" name="test" /></label>
>
> > ![[notes.base]]
>
> <label>✅ tasks<input type="radio" name="test" /></label>
>
> > > [!tabbed]
> > > <label>- [ ] Inline Tasks<input type="radio" name="tasks" checked/></label>
> > >
> > > > `$=await dv.view("templates/views/tasks/category")`
> > >
> > > <label>✔️ Task Notes<input type="radio" name="tasks"/></label>
> > >
> > > > ![[tasks.base#📋 Workflow: Kanban (v)]]
>
> <label>➕<input type="radio" name="test" /></label>
>
> > 💤
