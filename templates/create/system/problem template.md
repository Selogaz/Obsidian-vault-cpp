<%* 
await tp.user.name
const category = await tp.user.category()
const meta = await tp.user.meta(category)
-%>
<% "---" %>
tags:
  - system/high/problem<%* if (category != "") { tR += "\n  - category/" + category.replace(/ /g, '_') } %>
aliases:
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
meta:<%* if (category != "" && meta != "") { tR += "\n  - \"[[" + meta + "]]\"" } %>
relevant: false
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤