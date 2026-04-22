<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query", "", "templates/create/periodic/day") || "").replace(/^#/, "")}` %>
up:<%- (u => `\n  - "[[periodic/weekly/${u}|${u}]]"`)(moment(tp.file.title, "YYYY-MM-DD").format("YYYY-[W]WW")) %>
reviewed: false
cssclasses:
  - hide-backlinks
icon: <% `"${tp.user.manifest("fields.icon.fixed", "", "templates/create/periodic/day")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>
