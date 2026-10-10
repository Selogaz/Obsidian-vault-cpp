<%*
const title = (await tp.system.prompt('🔤 Title'))?.trim() || 'Untitled'
const project = await tp.user.project()
await tp.file.move(`projects/${project}/${title}`)
-%>
<% "---" %>
tags:
  - mark/scene
aliases: []
up:<%- project ? `\n  - "[[${project}]]"` : "" %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤
