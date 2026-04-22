<% "---" %>
tags:
  - mark/addition/research
status: 🟥
project:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.project()) %>
description:
summary:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<%* await tp.user.title() -%>