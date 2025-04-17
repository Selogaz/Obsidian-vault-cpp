<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)

const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
const status = await tp.user.status()

-%>
<% "---" %>
tags:
  - project/longform<%* if (category != "") { tR += "\n  - category/" + category } %>
aliases: []
status: <%* if (status != "") { tR += status } %>
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

> [!todo]- Tasks
> ```dataviewjs
> const scenes = dv
>   .pages(`"${dv.current().file.folder}"`)
>   .where((p) => p.file.link != dv.current().file.link);
> dv.taskList(scenes.file.tasks);
> ```

# 🪪 Description

<% await tp.file.move("projects/" + title + "/" + title) %>
