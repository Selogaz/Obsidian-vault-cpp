const path = dv.current().file.path;

function contains_category(pages, category_name) {
  return pages
    .where(
      (p) =>
        dv.func.contains(
          p.file.frontmatter.tags,
          `category/${category_name}`,
        ) || dv.func.contains(p.file.frontmatter.category, `${category_name}`),
    )
    .sort((p) => -p.updated);
}

let pages;
if (/categories/.test(path)) {
  const category_name = dv.current().file.name;
  pages = contains_category(dv.pages("#source AND !#mark/log"), category_name);
} else {
  pages = dv.pages(`#source AND !#mark/log`).sort((p) => -p.updated);
}

const settings = {
  id: "sources",
  "entries on page": 25,
  "full width": true,
  "add new note button": true,
  "new note name": "Untitled",
  "new note template": "_meta-source-template",
};

const props = [
  {
    prop: "file.link",
    name: "🔤 title",
    filter: false,
    column: true,
  },
  {
    prop: "tags",
    name: "🗄️ type",
    filter: true,
    multiSelect: false,
    valueOptions: [
      "#mark/fleeting",
      "#source/article/paper",
      "#source/article/resource",
      "#source/book",
      "#source/course",
      "#source/cinematic/movie",
      "#source/podcast",
      "#source/video/recording",
      "#source/video/playlist",
    ],
    column: false,
  },
  {
    prop: "zotero",
    name: "🇿",
    filter: false,
    column: true,
  },
  {
    prop: "addition",
    name: "➕",
    span: true,
    filter: false,
    column: true,
  },
  {
    prop: "status",
    name: "💯",
    multiSelect: false,
    valueOptions: ["🟥", "🟦", "⚛", "🟩", "⬛"],
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "category",
    name: "🗺️ category",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "meta",
    name: "🔎 meta",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "problem",
    name: "⚡ problem",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "creator",
    name: "👨 creator",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "production",
    name: "🏬 production",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "url",
    name: "🔗 url",
    filter: false,
    column: true,
  },
];

await DIViews.renderView(settings, props, pages, dv);
