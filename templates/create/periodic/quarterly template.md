<%* const up = moment(tp.file.title, "YYYY-[Q]Q").format("YYYY") -%>
<% "---" %>
tags:
  - periodic/quarter
up:
  - <% "\"[[" + "periodic/yearly/" + up + "|" + up + "]]\"" %>
reviewed: false
cssclasses:
  - hide-backlinks
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>

> [!success]- 🔻 history 🔻
> `$=await dv.view("templates/views/periodic", {type: "month"})`
