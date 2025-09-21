<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
	title = await tp.system.prompt("Title");
}
await tp.file.rename(title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '').replace(/\s+/g, ' ').trim())
-%>
<% "---" %>
tags:
  - project/short
aliases:
status: 🟦
priority: 🇨
cover:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
published:
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:
meta:
problem:
creator:
production:
url:
<% "---" %>

# 🪪 Description
