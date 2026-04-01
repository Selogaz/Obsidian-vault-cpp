<%*
const source = await tp.user.conspectus()

let source_names
let source_type
let category
let status

if (source) {
	const dv = this.app.plugins.plugins["dataview"].api
	
	const tags = dv.pages().where(p => p.file.name == source).file.tags.map(x => x.replace("#", ""))

	source_type = tags.filter(item => /source\//.test(item))[0]
	category = tags.filter(item => /category\//.test(item)).map(category => `\n  - ${category}`).join('')
	status = "🟦"

} else {
	source_names = Object.keys(app.metadataCache.getTags())
		.map(x => x.replace("#", ""))
		.filter(item => /source\//.test(item))
	source_type = await tp.system.suggester(source_names, source_names, false, "Source TYPE")
	category = "\n  - category/" + await tp.user.category()
	status = await tp.user.status("source")
}
_%>
<% "---" %>
tags:<%* if (category != "") { tR += category } %>
  - <% source_type %><%* if (source != "") { tR += "\n  - mark/log/conspectus" } %>
aliases:
status: <%* if (status != "") { tR += status } %>
source:<%* if (source != "") { tR += "\n  - \"[[" + source + "]]\"" } %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
next:
url:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!toc]+
> ```table-of-contents
> ```

<% tp.file.cursor(0) %>