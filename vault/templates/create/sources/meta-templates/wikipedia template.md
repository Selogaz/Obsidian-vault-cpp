<%*
let url = await tp.system.clipboard()
let page = await tp.obsidian.request({url})
let p = new DOMParser()
let doc = p.parseFromString(page, "text/html")

const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
const status = await tp.user.status()
-%>
<% "---" %>
tags:
  - source/article/paper<%* if (category != "") { tR += "\n  - category/" + category } %>
aliases:
status: <%* if (status != "") { tR += status } %>
cover: <% tp.user.wikipedia('image', tp, doc) %>
published:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
meta:<%* if (category != "" && meta != "") { tR += "\n  - \"[[" + meta + "]]\"" } %>
problem:<%* if (problem != "") { tR += "\n  - \"[[" + problem + "]]\"" } %>
url: "[Wikipedia](<% tp.user.wikipedia('url', tp, doc) %>)"
<% "---" %>
<%* 
let title = await tp.user.wikipedia('title', tp, doc)
title = title.replace(/[<>:"/\\|?*]/g, " ")
await tp.file.rename(title)
-%>

![cover|150](<% tp.user.wikipedia('image', tp, doc) %>)

# Abstract

<% tp.user.wikipedia('headline', tp, doc) %>