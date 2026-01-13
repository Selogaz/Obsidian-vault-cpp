<%* 
const category = await tp.user.category()
const meta = await tp.user.meta(category)
-%>
<% "---" %>
tags:
  - system/high/problem
aliases:
category:<%- category ? `\n  - "[[${category}]]"` : "" %>
meta:<%- (category && meta) ? `\n  - "[[${meta}]]"` : "" %>
relevant: false
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤<% tp.file.cursor(0) %>