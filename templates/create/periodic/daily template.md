<%* const up = await moment(tp.file.title, "YYYY-MM-DD").format("YYYY-[W]WW") -%>
<% "---" %>
tags:
  - periodic/day
up:
  - <% "\"[[" + "periodic/weekly/" + up + "|" + up + "]]\"" %>
reviewed: false
cssclasses:
  - hide-backlinks
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
<% "---" %>
