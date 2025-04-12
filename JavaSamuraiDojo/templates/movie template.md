<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: movie
aliases: 
- "% <%* tR += title %>"
cover: {{VALUE:Poster}}
status: todo
recommendedby:
---
___
tags:: 
prev:: [[movies|назад в библиотеку]]
category::
author:: {{VALUE:directorLink}}
children::
___
![cover|150]({{VALUE:Poster}})
___

<% tp.file.cursor(0) %>