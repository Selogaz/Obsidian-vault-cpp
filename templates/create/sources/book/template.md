<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query") || "").match(/#source[\w\/-]+/)[0].replace(/^#/, "")}` %>
aliases: []
description:
published:
addition:
status: <%- await tp.user.status("source") %>
rating:
scientificity:
category:<%* const c = await tp.user.category() %><%- c ? `\n  - "[[${c}]]"` : "" %>
meta:<%* const m = await tp.user.meta(c) %><%- m ? `\n  - "[[${m}]]"` : "" %>
problem:<%* const p = await tp.user.problem(m) %><%- p ? `\n  - "[[${p}]]"` : "" %>
creator:
production:
start:
end:
url:
cover:
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
path includes {{query.file.path}}
group by heading
hide task count
```

tab: ➕ Additions
`BUTTON[add-addition]`
![[interim.base#📋 Workflow: Kanban (v)]]
~~~~

<% tp.user.cursor() %>
