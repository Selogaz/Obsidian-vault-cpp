<% "---" %>
tags:
  - mark/addition/aggregator
source:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.source()) %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<% tp.system.clipboard() %>
