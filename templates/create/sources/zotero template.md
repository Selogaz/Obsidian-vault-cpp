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

const finalFileName = zoteroShortTitle || zoteroTitle;
if (finalFileName) {
    await tp.file.rename(`${finalFileName.replace(/:/g,".")}`);
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
url: "[{{libraryCatalog}}{{publisher}}{{blogTitle}}{{websiteTitle}}]({{url}})"
zotero: "[🇿](zotero://select/items/@{{citekey}})"
---

<%*
const noteFile = tp.file.find_tfile(finalFileName.replace(/:/g,"."));
if (noteFile) {
    app.workspace.getLeaf(true).openFile(noteFile);
}
%>
