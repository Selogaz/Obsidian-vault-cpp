<%*
const title = await tp.file.title
const status = await tp.user.status("project")
const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
-%>
<% "---" %>
tags:
  - project/longform
aliases: []
status: <%- status || "" %>
priority: 🇨
cover:
longform:
  format: scenes
  title: <%* tR += title %>
  workflow: Default Workflow
  sceneFolder: /
  scenes: []
  sceneTemplate: templates/create/projects/longform scene template.md
  ignoredFiles: []
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start:
end:
category:<%- category ? `\n  - "[[${category}]]"` : "" %>
meta:<%- (category && meta) ? `\n  - "[[${meta}]]"` : "" %>
problem:<%- problem ? `\n  - "[[${problem}]]"` : "" %>
creator:
production:
url:
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