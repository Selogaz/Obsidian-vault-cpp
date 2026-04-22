<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query") || "").replace(/^#/, "")}` %>
aliases: []
longform:
  format: scenes
  title: <%* const title = await tp.file.title %><% title %>
  workflow: Default Workflow
  sceneFolder: /
  scenes: []
  sceneTemplate: templates/create/projects/longform/scene template.md
  ignoredFiles: []
status: <%- await tp.user.status("project") %>
priority: 🇨
cover:
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
category:<%* const c = await tp.user.category() %><%- c ? `\n  - "[[${c}]]"` : "" %>
meta:<%* const m = await tp.user.meta(c) %><%- m ? `\n  - "[[${m}]]"` : "" %>
problem:<%* const p = await tp.user.problem(m) %><%- p ? `\n  - "[[${p}]]"` : "" %>
creator:
production:
url:
icon: <% `"${tp.user.manifest("fields.icon.fixed")}"` %>
color: <% `"${tp.user.manifest("fields.color.fixed")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!toc]- Table of contents
> ```table-of-contents
> ```

> [!todo]- Tasks
> ```tasks
> path includes {{query.file.path}}
> group by heading
> hide task count
> ```

> [!todo]- Scene tasks
> ```tasks
> path includes {{query.file.folder}}
> path does not include {{query.file.path}}
> group by backlink
> hide task count
> ```

# Description

<% await tp.file.move("projects/" + title + "/" + title) %><% tp.file.cursor(0) %>
