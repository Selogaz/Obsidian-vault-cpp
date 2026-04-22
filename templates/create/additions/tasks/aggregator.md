<% "---" %>
tags:
  - mark/addition/aggregator
project:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.project()) %>
cssclasses:
  - hide-backlinks
  - full-width
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!col-2]- Statistics
> ![[tasks.base#📈 Statistics: By Attribute]]
>
> ![[tasks.base#📈 Statistics: By Status]]
>
> ![[tasks.base#📈 Statistics: By Priority]]

`BUTTON[add-task-note]` `BUTTON[add-milestone-note]` `BUTTON[task-update-relation]`
![[tasks.base#📋 Workflow: Kanban (h)]]
