---
updated: 2025-10-23T22:39:43+03:00
---

<%*
const url_regex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

let url = await tp.system.prompt("URL or TITLE (for conspectuses – prefix '!log')", "")
let isLog = 0

if (/^!log /.test(url)) {
	await tp.file.rename(url.replace(/^!log /, ""))
	isLog = 1
} else if (!url_regex.test(url)) {
	await tp.file.rename(url)
}
-%>
<%* if (url_regex.test(url) && (/youtube/.test(url) || /youtu/.test(url))) { %>
<%-
tp.file.include("[[templates/create/sources/meta-templates/youtube template.md]]")
%>
<%* } else if (url_regex.test(url) && /wiki|wikipedia/.test(url)) { %>
<%-
tp.file.include("[[templates/create/sources/meta-templates/wikipedia template.md]]")
%>
<%* } else if (url_regex.test(url) && /imdb/.test(url)) { %>
<%-
tp.file.include("[[templates/create/sources/meta-templates/imdb template.md]]")
%>
<%* } else if (url_regex.test(url) && /letterboxd/.test(url)) { %>
<%-
tp.file.include("[[templates/create/sources/meta-templates/letterboxd template.md]]")
%>
<%* } else if (false) { %>
<%-
tp.file.include("[[]]")
%>
<%* } else if (false) { %>
<%-
tp.file.include("[[]]")
%>
<%* } else if (url_regex.test(url)) { %>
<%-
tp.file.include("[[templates/create/sources/meta-templates/any website template.md]]")
%>
<%* } else if (isLog) { %>
<%-
tp.file.include("[[log template]]")
%>
<%* } else { %>
<%-
tp.file.include("[[source template]]")
%>
<%* } _%>
