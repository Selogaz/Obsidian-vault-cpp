<%_
const callouts = {
  "#5fb236": "key idea",
  "#f19837": "exact idea/term/example",
  "#ffd400": "with references or requires clarification",
  "#e56eee": "well-spoken",
};

const callout = callouts[zt.colorHex?.toLowerCase()] ?? "annotation";
const page = zt.pageLabel ?? zt.page;

function formatComment(comment) {
  return comment
    .split(/\r?\n/)
    .map(line => line.trim() ? `- 💎 ${line}` : "")
    .join("\n");
}
_%><% bq(() => { _%>[!quote|<%= zt.colorHex %>]+ <%= callout %>
<% if (zt.text) { _%>
«<%= zt.text %>»<% if (zt.backlink && page != null) { %> ([Page <%= page %>](<%= zt.backlink %>))<% } %>
<% } %><% if (zt.imgLink) { _%>
<%= embed(zt.imgLink) %><% if (zt.backlink && page != null) { %>
[View on page <%= page %>](<%= zt.backlink %>)<% } %>
<% } %><% if (zt.comment) { %>

<%= formatComment(zt.comment) %><% } _%><%_ }) _%>
