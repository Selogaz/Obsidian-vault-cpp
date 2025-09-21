<%* const up = moment(tp.file.title, "YYYY-[W]W").format("YYYY-MM") -%>
<% "---" %>
tags:
  - periodic/week
up:
  - <% "\"[[" + "periodic/monthly/" + up + "|" + up +  "]]\"" %>
reviewed: false
cssclasses:
  - hide-backlinks
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!success]- 🔻 history 🔻
> `$=await dv.view("templates/views/periodic", {type: "day"})`

<% tp.file.cursor(0) %>