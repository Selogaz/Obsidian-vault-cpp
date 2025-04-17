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
  pages = contains_category(dv.pages("#project"), category_name);
} else {
  pages = dv.pages("#project").sort((p) => -p.updated);
}

const settings = {
  id: "projects",
  "entries on page": 25,
  "full width": true,
  "add new note button": true,
  "new note name": "Untitled",
  "new note template": "_meta-project-template",
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
    valueOptions: ["#project/single", "#project/longform", "#project/short"],
    column: false,
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
    valueOptions: ["🟥", "🟦", "🟩", "📢", "❄", "⬛"],
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "priority",
    name: "🔥",
    multiSelect: false,
    valueOptions: ["🇦", "🇧", "🇨", "🇩", "🇪"],
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
    prop: "start",
    name: "🚀 start",
    filter: false,
    column: true,
  },
  {
    prop: "end",
    name: "🏁 end",
    filter: false,
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
