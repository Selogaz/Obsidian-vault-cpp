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
  - source/video/recording<%* if (category != "") { tR += "\n  - category/" + category } %>
status: <%* if (status != "") { tR += status } %>
aliases:
cover: <% tp.user.youtube('thumbnail', tp, doc) %>
published: <% tp.user.youtube('published', tp, doc) %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
meta:<%* if (category != "" && meta != "") { tR += "\n  - \"[[" + meta + "]]\"" } %>
problem:<%* if (problem != "") { tR += "\n  - \"[[" + problem + "]]\"" } %>
production:
  - "[[<% tp.user.youtube('channel', tp, doc) %>]]"
url: "[Youtube](<% tp.user.youtube('url', tp, doc) %>)"
<% "---" %>
<%* 
let title = await tp.user.youtube('title', tp, doc)
title = title.replace(/[<>:"/\\|?*]/g, " ").replace(/\+/g, 'and')
await tp.file.rename(title)
-%>

>[!link]- Youtube
> <iframe title="<% title %>" src="https://www.youtube.com/embed/<% tp.user.youtube('id', tp, doc) %>?feature=oembed" height="150" width="200" style="aspect-ratio: 1.33333 / 1; width: 100%; height: 100%;" allowfullscreen="" allow="fullscreen"></iframe>

