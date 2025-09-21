<%* const up = moment(tp.file.title, "YYYY-MM").format("YYYY-[Q]Q")  -%>
<% "---" %>
tags:
  - periodic/month
up:
  - <% "\"[[" + "periodic/quarterly/" + up + "|" + up + "]]\"" %>
reviewed: false
cssclasses:
  - hide-backlinks
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!success]- 🔻 history 🔻
> `$=await dv.view("templates/views/periodic", {type: "week"})`

<% tp.file.cursor(0) %>