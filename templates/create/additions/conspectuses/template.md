<%*
const source = await tp.user.source()
let source_type
let category

const dv = this.app.plugins.plugins["dataview"].api

if (source) {
	const tags = dv.pages().where(p => p.file.name == source).file.tags.map(x => x.replace("#", ""))

	source_type = tags.filter(item => /source\//.test(item))[0]
	category = tags.filter(item => /category\//.test(item)).map(category => `\n  - ${category}`).join('')
}
-%>
<% "---" %>
tags:<%* if (source_type) { tR += `\n  - ${source_type}` } %><%* if (category != "") { tR += category } %>
  - mark/log/conspectus
aliases: []
status: 🟥
source:<%* if (source) { tR += `\n  - "[[${source}]]"` } %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
next:
url:
icon: <% `"${tp.user.manifest("fields.icon.fixed")}"` %>
color: <% `"${tp.user.manifest("fields.color.fixed")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!toc]+
> ```table-of-contents
> ```

<%* await tp.user.title() -%><% tp.file.cursor(0) %>
