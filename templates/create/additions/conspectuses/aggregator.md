<% "---" %>
tags:
  - mark/addition/aggregator
source:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.source()) %>
cssclasses:
  - hide-backlinks
  - full-width
  - hide-properties
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

`BUTTON[add-conspectus]`
![[interim.base#📓 Conspectuses]]
