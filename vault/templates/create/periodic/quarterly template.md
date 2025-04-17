<% "---" %>
tags:
  - periodic/quarter
up:
  - <% "\"[[" + "periodic/yearly/" + moment(tp.file.title, "YYYY-[Q]Q").format("YYYY") + "|" + moment(tp.file.title, "YYYY-[Q]Q").format("YYYY") + "]]\"" %>
reviewed: false
<% "---" %>

> [!success]- 🔻 history 🔻
> ```dataview
> LIST
> FROM "periodic/monthly"
> WHERE contains(up, [[]])
> ```

<% tp.file.cursor(0) %>