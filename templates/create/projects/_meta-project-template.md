<%*
const types = {
  short: "🗞️",
  single: "✏️",
//  longform: "🖊️",
};
const type = await tp.system.suggester(
Object.keys(types).map(
  (value) => types[value] + " " + value,
),
Object.values(types).map((value) => value),
false,
"Project type:",
);
-%>
<%* if (type == "short") { %>
<%- tp.file.include("[[short project template]]") 
%>
<%* } else if (type == "single") { %>
<%- tp.file.include("[[single project template]]") 
%>
<%* } else if (false) { %>
<%- tp.file.include("[[longform project template]]") 
%>
<%* } else { %>
<%- tp.file.include("[[single project template]]") 
%>
<%* } -%>