<% "---" %>
tags:
  - mark/addition/practice
status: 🟥
source:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.source()) %>
description:
summary:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<%* await tp.user.title() -%>
