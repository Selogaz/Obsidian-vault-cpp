<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title.replace(/[<>:"/\\|?*\x00-\x1f]/g, '').replace(/\s+/g, ' ').trim())

const status = await tp.user.status()
const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
-%>
<% "---" %>
tags:
  - project/longform<%* if (category != "") { tR += "\n  - category/" + category.replace(/ /g, '_') } %>
aliases: []
status: <%* if (status != "") { tR += status } %>
priority: 🇨
cover:
longform:
  format: scenes
  title: <%* tR += title %>
  workflow: Default Workflow
  sceneFolder: /
  scenes: []
  sceneTemplate: templates/create/projects/longform scene template.md
  ignoredFiles: []
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start:
end:
published:
total_hours: 0
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
meta:<%* if (category != "" && meta != "") { tR += "\n  - \"[[" + meta + "]]\"" } %>
problem:<%* if (problem != "") { tR += "\n  - \"[[" + problem + "]]\"" } %>
creator:
production:
url:
<% "---" %>

> [!toc]- Table of contents
> ```table-of-contents
> ```

> [!todo]+ Tasks
> ```dataview
> TASK
> WHERE file.link = this.file.link
> GROUP BY meta(section).subpath
> ```

> [!todo]+ Scene tasks
> ```dataviewjs
> const scenes = dv
>   .pages(`"${dv.current().file.folder}"`)
>   .where((p) => p.file.path != dv.current().file.path);
> dv.taskList(scenes.file.tasks);
> dv.span(dv.current().file.link)
> ```

# 🪪 Description

<% await tp.file.move("projects/" + title + "/" + title) %>
