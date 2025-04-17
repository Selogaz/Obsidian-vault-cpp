<% "---" %>
tags:
  - periodic/month
up:
  - <% "\"[[" + "periodic/quarterly/" + moment(tp.file.title, "YYYY-MM").format("YYYY-[Q]Q") + "|" + moment(tp.file.title, "YYYY-MM").format("YYYY-[Q]Q") + "]]\"" %>
reviewed: false
<% "---" %>

> [!success]- 🔻 history 🔻
> ```dataview
> LIST
> FROM "periodic/weekly"
> WHERE contains(up, [[]])
> ```

<% tp.file.cursor(0) %>