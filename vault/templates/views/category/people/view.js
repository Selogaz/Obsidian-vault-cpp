const { type } = input;

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
let heading;
let isCategory = false;
if (/categories/.test(path)) {
  const category_name = dv.current().file.name;
  if (type == "creator") {
    pages = contains_category(dv.pages("#creator"), category_name);
    heading = "👨‍🎨 Creators";
  } else if (type == "production") {
    pages = contains_category(dv.pages(`#production`), category_name);
    heading = "🏭 Productions";
  } else if (type == "contact") {
    pages = contains_category(dv.pages("#contact"), category_name);
    heading = "👤 Contacts";
  } else {
    pages = contains_category(
      dv.pages("#creator OR #production OR #contact"),
      category_name,
    );
  }
  isCategory = true;
} else {
  if (type == "creator") {
    pages = dv.pages(`#creator`).sort((p) => -p.updated);
    heading = "👨‍🎨 creators";
  } else if (type == "production") {
    pages = dv.pages(`#production`).sort((p) => -p.updated);
    heading = "🏭 Productions";
  } else if (type == "contact") {
    pages = dv.pages(`#contact`).sort((p) => -p.updated);
    heading = "👤 Contacts";
  } else {
    pages = dv
      .pages(`#creator OR #production OR #contact`)
      .sort((p) => -p.updated);
  }
}

pages = pages.sort((p) => -p.updated);

const id = type ? "people_" + type : "people";
const template =
  type == "creator"
    ? "creator template"
    : type == "production"
      ? "production template"
      : "contact template";

const settings = {
  id: id,
  "entries on page": 25,
  "full width": true,
  "add new note button": true,
  "new note name": "Untitled",
  "new note template": template,
};

const props = [
  {
    prop: "file.link",
    name: "🔤 title",
    filter: false,
    column: true,
  },
  {
    prop: "relevant",
    name: "📌",
    multiSelect: false,
    valueOptions: ["true", "false"],
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "tags",
    name: "🗄️ type",
    filter: true,
    multiSelect: false,
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
    prop: "production",
    name: "🏬 production",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  },
];

if (pages.length != 0) {
  if (type && isCategory) {
    dv.header(1, heading);
  }
  await DIViews.renderView(settings, props, pages, dv);
}
