<% "---" %>
tags:
  - mark/addition/aggregator
production:<%- (p => p ? `\n  - "[[${p}]]"` : "")(await tp.user.production()) %>
cssclasses:
  - hide-backlinks
  - full-width
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

`BUTTON[add-negotiation]`
![[interim.base#🤝 Negotiations]]
