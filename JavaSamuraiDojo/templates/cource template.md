<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: course
aliases: 
- "{ <%* tR += title %>"
status: todo
recommendedby:
---
___
tags:: 
prev:: [[courses|назад в библиотеку]]
category::
url::
children::
___

<% tp.file.cursor(0) %>