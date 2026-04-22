<% "---" %>
tags:
  - system/high/meta
aliases:
relevant: false
category:<%* const c = await tp.user.category() %><%- c ? `\n  - "[[${c}]]"` : "" %>
icon: <% `"${String(tp.user.manifest("fields.icon.fixed") || tp.user.manifest("fields.icon.default") || "")}"` %>
color: <% `"${tp.user.manifest("fields.color.fixed")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤<% tp.file.cursor(0) %>
