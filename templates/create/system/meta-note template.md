<%* 
const category = await tp.user.category()
-%>
<% "---" %>
tags:
  - system/high/meta
aliases:
category:<%- category ? `\n  - "[[${category}]]"` : "" %>
relevant: false
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤<% tp.file.cursor(0) %>