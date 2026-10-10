<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query") || "").replace(/^#/, "")}` %>
aliases: []
description:
category:<%* const c = await tp.user.category() %><%- c ? `\n  - "[[${c}]]"` : "" %>
meta:<%* const m = await tp.user.meta(c) %><%- m ? `\n  - "[[${m}]]"` : "" %>
problem:<%* const p = await tp.user.problem(m) %><%- p ? `\n  - "[[${p}]]"` : "" %>
relevant: false
icon: <% `"${tp.user.manifest("fields.icon.fixed")}"` %>
color: <% `"${tp.user.manifest("fields.color.fixed")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

~~~~tabs
tab: ☰ TOC
```table-of-contents
```

tab: ✔️ Tasks
```tasks
not done
filter by function task.outlinks.some(link => link.linksTo(query.file))
group by function task.tags.includes("#task/waiting_for") ? "%%2%% delegated" : "%%1%% mentions"
```

tab: ➕ Additions
`BUTTON[add-addition]`
![[interim.base#📋 Workflow: Kanban (v)]]
~~~~

<% tp.user.cursor() %>
