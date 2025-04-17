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
  if (type == "meta") {
    pages = contains_category(dv.pages("#system/high/meta"), category_name);
    heading = "🔎 Meta-notes";
  } else if (type == "hierarchy") {
    pages = contains_category(
      dv.pages("#system/high/hierarchy"),
      category_name,
    );
    heading = "🧬 Hierarchy";
  } else if (type == "problem") {
    pages = contains_category(dv.pages("#system/high/problem"), category_name);
    heading = "⚡ Problems";
  } else {
    pages = contains_category(dv.pages("#system/high"), category_name);
  }
  isCategory = true;
} else {
  if (type == "meta") {
    pages = dv.pages("#system/high/meta").sort((p) => -p.updated);
  } else if (type == "hierarchy") {
    pages = dv.pages("#system/high/hierarchy").sort((p) => -p.updated);
  } else if (type == "problem") {
    pages = dv.pages("#system/high/problem").sort((p) => -p.updated);
  } else {
    pages = dv.pages("#system/high").sort((p) => -p.updated);
  }
}

const id = type ? "system_" + type : "system";
const template =
  type == "meta"
    ? "meta-note template"
    : type == "hierarchy"
      ? "hierarchy template"
      : "problem template";

const settings = {
  id: id,
  "entries on page": 25,
  "full width": false,
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
    name: "⇶",
    filter: true,
    multiSelect: true,
    valueOptions: ["#mark/aggregator", "#mark/ignore"],
    column: false,
  },
];

if (type == "hierarchy") {
  props.push({
    prop: "category",
    name: "🗺️ category",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  }),
    props.push({
      prop: "meta",
      name: "🔎 meta",
      multiSelect: false,
      span: true,
      filter: true,
      column: true,
    });
  props.push({
    prop: "problem",
    name: "⚡ problem",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  });
}

if (type == "meta") {
  props.push({
    prop: "category",
    name: "🗺️ category",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  });
}

if (type == "problem") {
  props.push({
    prop: "category",
    name: "🗺️ category",
    multiSelect: false,
    span: true,
    filter: true,
    column: true,
  }),
    props.push({
      prop: "meta",
      name: "🔎 meta",
      multiSelect: false,
      span: true,
      filter: true,
      column: true,
    });
}

props.push({
  prop: "file.outlinks.length",
  name: "*outlinks*",
  filter: false,
  column: true,
});
props.push({
  prop: "file.inlinks.length",
  name: "*inlinks*",
  filter: false,
  column: true,
});

if (pages.length != 0) {
  if (type && isCategory) {
    dv.header(1, heading);
  }
  await DIViews.renderView(settings, props, pages, dv);
}
