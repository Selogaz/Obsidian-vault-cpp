<%*
const sourceTypes = {
  article: ["🧾", "article/paper"],
  book: ["📖", "book"],
  course: ["🎓", "course"],
  movie: ["🎬", "cinematic/movie"],
  podcast: ["📻", "podcast"],
  video: ["📺", "video/recording"],
};
const sourceType = await tp.system.suggester(
Object.keys(sourceTypes).map(
  (value) => sourceTypes[value][0] + " " + value,
),
Object.values(sourceTypes).map((value) => value[1]),
false,
"Source type:",
);

const status = await tp.user.status()
const category = await tp.user.category()
const meta = await tp.user.meta(category)
const problem = await tp.user.problem(meta)
-%>
<% "---" %>
tags:
  - source/<%sourceType%><%* if (category != "") { tR += "\n  - category/" + category.replace(/ /g, '_') } %>
status: <%* if (status != "") { tR += status } %>
rating:
scientificity:
aliases:
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:<%* if (category != "") { tR += "\n  - \"[[" + category + "]]\"" } %>
meta:<%* if (category != "" && meta != "") { tR += "\n  - \"[[" + meta + "]]\"" } %>
problem:<%* if (problem != "") { tR += "\n  - \"[[" + problem + "]]\"" } %>
creator:
production:
<% "---" %>
