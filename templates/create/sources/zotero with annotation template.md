<%*
let title = tp.file.title;
if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Enter note title:");
    await tp.file.rename(title);
}

const zoteroTitle = "{{title | safe}}";
const zoteroShortTitle = "{{shortTitle | safe}}";
const zoteroAllTags = "{{allTags}}";
const zoteroItemType = "{{itemType}}".toLowerCase();

let sourceSubTag = "";
const sourceTypePatterns = {
    "article/paper": /blogpost|document|conferencepaper|forumpost|journalarticle|letter|preprint|magazinearticle|newspaperarticle|report|thesis|webpage/,
    "book": /book/,
    "course": /manuscript/,
    "cinematic/movie": /film/,
    "podcast": /podcast|radiobroadcast/,
    "video/recording": /videorecording|tvbroadcast/
};

for (const [type, pattern] of Object.entries(sourceTypePatterns)) {
    if (pattern.test(zoteroItemType)) {
        sourceSubTag = type;
        break;
    }
}

if (!sourceSubTag) {
    const sourceNames = Object.keys(sourceTypePatterns);
    sourceSubTag = await tp.system.suggester(sourceNames, sourceNames, false, "Select source type");
}
const finalSourceTag = `source/${sourceSubTag}`;

let status = "";
switch(true) {
    case /todo|📥|🟥/.test(zoteroAllTags): status = "🟥"; break;
    case /wip|🟦/.test(zoteroAllTags): status = "🟦"; break;
    case /done|🟩/.test(zoteroAllTags): status = "🟩"; break;
    default: status = await tp.user.status();
}

const ratings = ["🌕", "🌔", "🌓", "🌒", "🌑"];
const scienceLevels = ["🅰️", "🅱️", "👓", "📢", "💬"];

const rating = ratings.find(tag => zoteroAllTags.includes(tag)) || "";
const scientificity = scienceLevels.find(tag => zoteroAllTags.includes(tag)) || "";

let allCollections = [];
{% for collection in collections -%}
allCollections.push("{{collection.fullPath}}");
{% endfor -%}

const uniquePaths = [...new Set(allCollections.join('/').split('/'))].filter(Boolean);

const extractItems = (regex) => {
    return uniquePaths
        .filter(item => regex.test(item))
        .map(item => item.replace(regex, "").trim());
};

const formatAsYamlList = (items, useWikiLinks = true) => {
    if (!items || items.length === 0) return null;
    const prefix = useWikiLinks ? `\n  - "[[` : `\n  - "`;
    const suffix = useWikiLinks ? `]]"` : `"`;
    return items.map(item => `${prefix}${item.trim()}${suffix}`).join("");
};

const categoryItems = extractItems(/🗺️/g);
const parentItems = extractItems(/⇶|🔬|🔎/g);
const problemItems = extractItems(/⚡️/g);

const categoriesYaml = formatAsYamlList(categoryItems);
const parentsYaml = formatAsYamlList(parentItems);
const problemsYaml = formatAsYamlList(problemItems);

let allYamlTags = [finalSourceTag];
const categoryTagItems = categoryItems.map(item => `category/${item.trim().replace(/ /g, '_')}`);
allYamlTags.push(...categoryTagItems);

const zoteroCreators = "{{authors}},{{directors}}";
const creatorsList = zoteroCreators.split(',').map(name => name.trim()).filter(Boolean);
const creatorsYaml = formatAsYamlList(creatorsList);

const zoteroPublisher = "{{publisher}}";
const publisherList = zoteroPublisher ? [zoteroPublisher] : [];
const publisherYaml = formatAsYamlList(publisherList);

let relatedItems = [];
{% for relation in relations -%}
    {% if relation.shortTitle and relation.shortTitle.trim() !== "" -%}
        relatedItems.push("{{relation.shortTitle | safe}}");
    {%- elif relation.title and relation.title.trim() !== "" -%}
        relatedItems.push("{{relation.title | safe}}");
    {%- endif -%}
{% endfor -%}
const relatedYaml = formatAsYamlList(relatedItems);

const finalFileName = (zoteroShortTitle || zoteroTitle).replace(/:/g,".");
await tp.file.rename(finalFileName);

const hasAnnotations = "{{annotations.length}}" > 0;
let additionsYaml = null;
if (hasAnnotations) {
    additionsYaml = formatAsYamlList([`${finalFileName} - annotations|🖍`]);
}
-%>
---
tags:
  - <% allYamlTags.join("\n  - ") %>
status: <% status %>
rating: <% rating %>
scientificity: <% scientificity %>
aliases:
  - "{{title}}"
published: {% if date %}{{date | format("YYYY")}}{% endif %}
created: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
updated: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
start: <% tp.date.now("YYYY-MM-DDTHH:mm:ssZ") %>
end:
total_hours: 0
category:<%* if (categoriesYaml) { tR += categoriesYaml } %>
meta:<%* if (parentsYaml) { tR += parentsYaml } %>
problem:<%* if (problemsYaml) { tR += problemsYaml } %>
related:<%* if (relatedYaml) { tR += relatedYaml } %>
creator:<%* if (creatorsYaml) { tR += creatorsYaml } %>
production:<%* if (publisherYaml) { tR += publisherYaml } %>
addition:<%* if (additionsYaml) { tR += additionsYaml } %>
url: "[{{libraryCatalog}}{{publisher}}{{blogTitle}}{{websiteTitle}}]({{url}})"
zotero: "[🇿](zotero://select/items/@{{citekey}})"
---

<%*
if (hasAnnotations) {
    const annotationsTemplate = `---
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
    await tp.file.create_new(annotationsTemplate.replace(/(\n\s*\n)+/g, '\n\n'), `${finalFileName} - annotations`, false, "base/additions");
}

const noteFile = tp.file.find_tfile(finalFileName);
if (noteFile) {
    app.workspace.getLeaf(true).openFile(noteFile);
}
%>
