<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: podcast
podcast: {{podcast}}
aliases: 
- "` <%* tR += title %>"
cover: {{artwork}}
status: todo
recommendedby:
---
___
tags:: 
prev:: [[podcasts|назад в библиотеку]]
category::
url::
children::
___
{{podcast}}
![cover|150]({{artwork}})
___

<% tp.file.cursor(0) %>