<% "---" %>
tags:
  - mark/addition/aggregator
project:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.project()) %>
cssclasses:
  - hide-backlinks
  - full-width
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

`BUTTON[add-report]`
![[interim.base#🚨 Reports]]
