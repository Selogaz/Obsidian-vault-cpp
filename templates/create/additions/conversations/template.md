<% "---" %>
tags:
  - mark/addition/conversation
status: 🟥
contact:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.contact()) %>
description:
summary:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<%* await tp.user.title() -%>