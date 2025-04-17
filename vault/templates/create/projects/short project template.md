<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
	title = await tp.system.prompt("Title");
}
await tp.file.rename(title)

const category = await tp.user.category()
const status = await tp.user.status()
-%>
<% "---" %>
tags:
  - project/short<%* if (category != "") { tR += "\n  - category/" + category } %>
aliases:
status: <%* if (status != "") { tR += status } %>
cover:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
published:
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
url:
<% "---" %>

# 🪪 Description

