<%*
let url = await tp.system.clipboard()
let page = await tp.obsidian.request({url})
let p = new DOMParser()
let doc = p.parseFromString(page, "text/html")
-%>
<% "---" %>
tags:
  - source/cinematic/movie
aliases:
status: 🟥
title_translation:
cover: <% tp.user.letterboxd('image', tp, doc) %>
published: <% tp.user.letterboxd('published', tp, doc) %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
genre:<% tp.user.letterboxd('genresW', tp, doc) %>
creator:<% tp.user.letterboxd('directorsW', tp, doc) %>
url: "[Letterboxd](<% tp.user.letterboxd('url', tp, doc) %>)"
<% "---" %>
<%* 
let title = await tp.user.letterboxd('title', tp, doc)
title = title.replace(/[<>:"/\\|?*]/g, " ")
await tp.file.rename(title)
-%>

![cover](<% tp.user.letterboxd('image', tp, doc) %>)

