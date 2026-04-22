<% "---" %>
tags:
  - mark/addition/negotiation
status: 🟥
production:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.production()) %>
description:
summary:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<%* await tp.user.title() -%>