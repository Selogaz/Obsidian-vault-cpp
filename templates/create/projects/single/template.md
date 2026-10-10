<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query") || "").replace(/^#/, "")}` %>
aliases:
description:
addition:
status: <%- await tp.user.status("project") %>
priority: ◽
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
~~~tabs
tab: 🗣️ Interim
`BUTTON[add-addition]`
![[interim.base#📋 Workflow: Kanban (v)]]

tab: ✅ Task notes
`BUTTON[add-task-note]` `BUTTON[add-milestone-note]`
![[tasks.base#📋 Workflow: Kanban (v)]]
~~~
~~~~

# Description

<% tp.user.cursor() %>

# Tasks
