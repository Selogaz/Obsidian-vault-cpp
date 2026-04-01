<%*
const status = await tp.user.status("project")
const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
-%>
<% "---" %>
tags:
  - project/single
aliases:
status: <%- status || "" %>
priority: 🇨
cover:
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

# Description

<% tp.file.cursor(0) %>