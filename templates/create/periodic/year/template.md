<% "---" %>
tags:<% `\n  -  ${String(tp.user.manifest("target.query", "", "templates/create/periodic/year") || "").replace(/^#/, "")}` %>
reviewed: false
cssclasses:
  - hide-backlinks
icon: <% `"${tp.user.manifest("fields.icon.fixed", "", "templates/create/periodic/year")}"` %>
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!success]- 🔻 history 🔻
> `$=await dv.view("templates/views/periodic", {type: "quarter"})`
