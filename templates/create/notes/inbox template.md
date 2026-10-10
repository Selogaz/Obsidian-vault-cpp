<%* const ctx = await tp.user.context() -%>
<% "---" %>
tags:
  - note/basic/primary<%- ctx.category ? `\n  - category/${ctx.category.replace(/ /g, "_").toLowerCase()}` : "" %>
aliases: []
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<% tp.user.cursor() %>