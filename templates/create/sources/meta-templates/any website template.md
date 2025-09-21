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
  - source/article/paper<%* if (category != "") { tR += "\n  - category/" + category.replace(/ /g, '_') } %>
aliases:
status: <%* if (status != "") { tR += status } %>
rating:
scientificity:
cover: <% tp.user.website('image', tp, doc) %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
meta:<%* if (category != "" && meta != "") { tR += "\n  - \"[[" + meta + "]]\"" } %>
problem:<%* if (problem != "") { tR += "\n  - \"[[" + problem + "]]\"" } %>
url: "[Website](<% tp.user.website('url', tp, doc) %>)"
<% "---" %>
<%* 
let title = await tp.user.website('title', tp, doc)
title = title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '').replace(/\s+/g, ' ').trim()
await tp.file.rename(title)
-%>

![cover|150](<% tp.user.website('image', tp, doc) %>)

# Abstract

<% tp.user.website('description', tp, doc) %>
