<%*
const source = await tp.user.source()
const status = await tp.user.status("source")
const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
-%>
<% "---" %>
tags:<%- source ? `\n  - ${source}` : "" %>
aliases:
status: <%- status || "" %>
rating:
scientificity:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
category:<%- category ? `\n  - "[[${category}]]"` : "" %>
meta:<%- (category && meta) ? `\n  - "[[${meta}]]"` : "" %>
problem:<%- problem ? `\n  - "[[${problem}]]"` : "" %>
creator:
production:
<% "---" %>

<% tp.file.cursor(0) %>