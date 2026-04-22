<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query", "", "templates/create/periodic/month") || "").replace(/^#/, "")}` %>
up:<%- (u => `\n  - "[[periodic/quarterly/${u}|${u}]]"`)(moment(tp.file.title, "YYYY-MM").format("YYYY-[Q]Q")) %>
reviewed: false
cssclasses:
  - hide-backlinks
icon: <% `"${tp.user.manifest("fields.icon.fixed", "", "templates/create/periodic/month")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!success]- 🔻 history 🔻
> `$=await dv.view("templates/views/periodic", {type: "week"})`
