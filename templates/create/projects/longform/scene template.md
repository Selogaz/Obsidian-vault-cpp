<%*
const dv = this.app.plugins.plugins["dataview"].api
const folder = tp.file.folder(true)
const project = dv.pages(`"${folder}"`).where(p => dv.func.contains(p.tags, "project/longform")).file.link[0]
-%>
<% "---" %>
tags:
  - mark/scene
aliases: []
status: 🟥
up:
  - "<% project %>"
icon: ✍️
color: "#d0b580"
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤
