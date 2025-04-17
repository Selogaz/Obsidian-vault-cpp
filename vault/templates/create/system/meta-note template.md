<%* 
await tp.user.name
const category = await tp.user.category()
-%>
<% "---" %>
tags:
  - system/high/meta<%* if (category != "") { tR += "\n  - category/" + category } %>
aliases:
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
relevant: false
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

😀