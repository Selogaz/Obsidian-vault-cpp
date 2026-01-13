<%* 
const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
-%>
<% "---" %>
tags:
  - system/high/hierarchy
aliases:
category:<%- category ? `\n  - "[[${category}]]"` : "" %>
meta:<%- (category && meta) ? `\n  - "[[${meta}]]"` : "" %>
problem:<%- problem ? `\n  - "[[${problem}]]"` : "" %>
relevant: false
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤<% tp.file.cursor(0) %>