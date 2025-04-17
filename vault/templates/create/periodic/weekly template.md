<% "---" %>
tags:
  - periodic/week
up:
  - <% "\"[[" + "periodic/monthly/" + moment(tp.file.title, "YYYY-[W]W").format("YYYY-MM") + "|" + moment(tp.file.title, "YYYY-[W]W").format("YYYY-MM") +  "]]\"" %>
reviewed: false
<% "---" %>

> [!success]- 🔻 history 🔻
> ```dataview
> LIST
> FROM "periodic/daily"
> WHERE contains(up, [[]])
> ```

<% tp.file.cursor(0) %>