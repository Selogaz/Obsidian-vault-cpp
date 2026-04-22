<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query", "", "templates/create/periodic/quarter") || "").replace(/^#/, "")}` %>
up:<%- (u => `\n  - "[[periodic/yearly/${u}|${u}]]"`)(moment(tp.file.title, "YYYY-[Q]Q").format("YYYY")) %>
reviewed: false
cssclasses:
  - hide-backlinks
icon: <% `"${tp.user.manifest("fields.icon.fixed", "", "templates/create/periodic/quarter")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!success]- 🔻 history 🔻
> `$=await dv.view("templates/views/periodic", {type: "month"})`
