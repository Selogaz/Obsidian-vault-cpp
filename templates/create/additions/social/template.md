<% "---" %>
tags:
  - mark/addition/social
status: 🟥
project:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.project()) %>
description:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<%* await tp.user.title() -%>