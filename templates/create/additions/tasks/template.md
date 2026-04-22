<% "---" %>
tags:
  - task/default
aliases: []
id: <%* const project = await tp.user.project() %><%- project ? await tp.user.taskID(project) : "" %>
attribute:
description:
project:<%- project ? `\n  - "[[${project}]]"` : "" %>
milestone:<%* const milestone = await tp.user.milestone(project) %><%- milestone ? `\n  - "[[${milestone}]]"` : "" %>
status: 📥
priority: 🇨
related:
blockedBy:
category:<%* const category = await tp.user.category(project) %><%- category && [category].flat().length ? `\n` + [category].flat().map(v => `  - "[[${v}]]"`).join('\n') : "" %>
meta:<%* const meta = await tp.user.meta([category].flat()[0] || '', project) %><%- meta && [meta].flat().length ? `\n` + [meta].flat().map(v => `  - "[[${v}]]"`).join('\n') : "" %>
problem:<%* const problem = await tp.user.problem([meta].flat()[0] || '', project) %><%- problem && [problem].flat().length ? `\n` + [problem].flat().map(v => `  - "[[${v}]]"`).join('\n') : "" %>
creator:
production:
url:
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

<%* await tp.user.title() -%>💤
