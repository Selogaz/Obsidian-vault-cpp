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
cover: <% tp.user.imdb('image', tp, doc) %>
genre:<% tp.user.imdb('genresW', tp, doc) %>
published: <% tp.user.imdb('published', tp, doc) %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
creator:<% tp.user.imdb('directorsW', tp, doc) %>
url: "[IMDb](<% tp.user.imdb('url', tp, doc) %>)"
<% "---" %>
<%* 
let title = await tp.user.imdb('title', tp, doc)

title = title.replace(/[<>:"/\\|?*]/g, " ")
await tp.file.rename(title)
-%>

![cover|150](<% tp.user.imdb('image', tp, doc) %>)

