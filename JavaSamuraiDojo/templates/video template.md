<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: video
aliases: 
- "$ <%* tR += title %>"
status: todo
recommendedby:
---
___
tags:: 
prev:: [[videos|назад в библиотеку]]
category::
url::
children::
___

iframe

___

<% tp.file.cursor(0) %>