<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query") || "").replace(/^#/, "")}` %>
aliases:
status: 🟦
priority: 🇨
category:
meta:
problem:
creator:
production:
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
url:
cover:
icon: <% `"${tp.user.manifest("fields.icon.fixed")}"` %>
color: <% `"${tp.user.manifest("fields.color.fixed")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

# Description

<% tp.file.cursor(0) %>
