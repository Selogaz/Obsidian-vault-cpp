<%*
await tp.user.title()
const project = await tp.user.project()
const milestone = await tp.user.milestone(project)
const category = await tp.user.category(project)
const meta = await tp.user.meta([category].flat()[0] || '', project)
const problem = await tp.user.problem([meta].flat()[0] || '', project)
-%>
<% "---" %>
tags:
  - task/default
aliases: []
id: <%- project ? await tp.user.taskID(project) : "" %>
description:
attribute:
project:<%- project ? `\n  - "[[${project}]]"` : "" %>
milestone:<%- milestone ? `\n  - "[[${milestone}]]"` : "" %>
status:
priority:
related:
blockedBy:
category:<%- category && [category].flat().length ? `\n` + [category].flat().map(v => `  - "[[${v}]]"`).join('\n') : "" %>
meta:<%- meta && [meta].flat().length ? `\n` + [meta].flat().map(v => `  - "[[${v}]]"`).join('\n') : "" %>
problem:<%- problem && [problem].flat().length ? `\n` + [problem].flat().map(v => `  - "[[${v}]]"`).join('\n') : "" %>
creator:
production:
url:
start:
end:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

💤
