<%*

// file name
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
// source type and status
const source_names = ["article", "book", "course", "movie", "podcast", "video"]

const article_pattern = /blogpost|document|conferencepaper|forumpost|journalarticle|letter|magazinearticle|newspaperarticle|report|thesis|webpage/;
const book_pattern = /book/;
const course_pattern = /manuscript/;
const movie_pattern = /film/;
const podcast_pattern = /podcast|radiobroadcast/;
const video_pattern = /videorecording|tvbroadcast/;

let input_source_tag = "{{itemType}}" 
input_source_tag = input_source_tag.toLowerCase();

switch(true) {
	case article_pattern.test(input_source_tag):
		input_source_tag = "article/paper";
		break;
	case book_pattern.test(input_source_tag):
		input_source_tag = "book";
		break;
	case course_pattern.test(input_source_tag):
		input_source_tag = "course";
		break;
	case movie_pattern.test(input_source_tag):
		input_source_tag = "cinematic/movie";
		break;
	case podcast_pattern.test(input_source_tag):
		input_source_tag = "podcast";
		break;
	case video_pattern.test(input_source_tag):
		input_source_tag = "video/recording";
		break;
	default:
		input_source_tag = await tp.system.suggester(source_names, source_names, false, "Source TYPE")
}

let statuses = "{{allTags}}"
let status
switch(true) {
	case /todo|📥/.test(statuses):
		status = "🟥";
		break;
	case /wip/.test(statuses):
		status = "🟦";
		break;
	case /done/.test(statuses):
		status = "🟩";
		break;
	default:
		status = await tp.user.status()
}

// automate category and parents
let colletions = "";

{% for collection in collections -%}
colletions = colletions + "/" +  "{{collection.fullPath}}";
{% endfor -%}

const categoryRegex = /🗺️/g
const parentRegex = /⇶|🔬|🔎/g
const problemRegex = /⚡/g
colletions = [...new Set(colletions.split("/"))];
const categories = colletions.filter((item) => categoryRegex.test(item));
const parents = colletions.filter((item) => parentRegex.test(item));
const problems = colletions.filter((item) => problemRegex.test(item));

let category = ""
let categoryTag = ""
let parent = ""
let problem = ""
let temp = ""
categories.forEach(function(item) {
  temp = item.replace(categoryRegex, " ").replace(/ /g, "")
  category = category + "\n  - \"[[" + temp + "]]\""
  categoryTag = categoryTag + "\n  - category/" + temp
})
parents.forEach(function(item) {
  temp = item.replace(parentRegex, "").slice(1)
  parent = parent + "\n  - \"[[" + temp + "]]\""
});
problems.forEach(function(item) {
  temp = item.replace(problemRegex, "").slice(1)
  problem = problem + "\n  - \"[[" + temp + "]]\""
});

// rename
let source_title = "{{shortTitle | safe}}";
if (source_title) {
	await tp.file.rename(`${source_title.replace(/:/g,".")}`);
} else {
	source_title = "{{title | safe}}";
	await tp.file.rename(`${source_title.replace(/:/g,".")}`);
}

_%>
<% "---" %>
tags:
  - <% "source/" + input_source_tag %><% categoryTag %>
status: <%* if (status != "") { tR += status } %>
aliases:
  - "{{title}}"
published:{% if date %} {{date | format("YYYY")}}{% endif %}
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:<% category %>
meta:<% parent %>
problem:<% problem %>
related:{% for relation in relations -%}
{%- if relation.shortTitle -%}
 <% "\n  - " %>"[[{{relation.shortTitle}}]]"{% endif -%}
{%- if not relation.shortTitle -%}
 <% "\n  - " %>"[[{{relation.title}}]]"{% endif -%}
{% endfor -%}
<% "\n" %>creator:<%*
let creators = "{{authors}},{{directors}}"
creators = creators.split(",")
creators.forEach(function(value) {
  value = value.trim()
  if (value != "") {tR+= "\n  - \"[[" + value + "]]\""}
})
%>
production:<%* const publisher = "{{publisher}}"; if (publisher != "") { tR+= "\n  - \"[[" + publisher + "]]\""} %>
addition:
  - "<% "[[" + source_title + " - annotations|"  + "🖍" + "]]" %>"
url: "[{{publisher}}{{blogTitle}}{{websiteTitle}}]({{url}})"
zotero: "[🇿](zotero://select/items/@{{citekey}})"
<% "---" %>

<%*
const note = tp.file.find_tfile(source_title);
await app.workspace.getLeaf(true).openFile(note);
-%>
<%*
const template = `---
tags:
  - mark/addition/aggregator
---

{% for annotation in annotations -%}

{% set isTargetCallout = 0 -%}
{% if annotation.color == "#5fb236" -%}
    {%- set callout = "[!quote|#5fb236]+ key idea" -%}
    {% set isTargetCallout = 1 -%}
{%- elif annotation.color == "#f19837" -%}
    {%- set callout = "[!quote|#f19837]+ exact idea/term/example" -%}
    {% set isTargetCallout = 1 -%}
{%- elif annotation.color == "#ffd400" -%}
    {%- set callout = "[!quote|#ffd400]+ with references or requires clarification" -%}
    {% set isTargetCallout = 1 -%}
{%- elif annotation.color == "#e56eee" -%}
    {%- set callout = "[!quote|#e56eee]+ well-spoken" -%}
    {% set isTargetCallout = 1 -%}
{%- endif -%}

{%- if isTargetCallout == 1 %}
> {{callout}}
> {%- if annotation.annotatedText -%}«{{annotation.annotatedText}}» ([Page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}&annotation={{annotation.id}})){% endif %}{% if annotation.imageRelativePath %}![[{{annotation.imageRelativePath}}]][View on page {{annotation.page}}](zotero://open-pdf/library/items/{{annotation.attachment.itemKey}}?page={{annotation.page}}){% endif %}{% if annotation.comment %}
>
> - 💎 {{annotation.comment}}{%- endif %}{%- endif %}

{% endfor %}

`;

await tp.file.create_new(template.replace(/(\n\s*\n)+/g, '\n\n'), source_title + " - annotations", false, "base/additions");
-%>