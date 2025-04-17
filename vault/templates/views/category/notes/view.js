const category_name = dv.current().file.name;

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

const pages = contains_category(dv.pages("#note"), category_name);

const settings = {
  id: "notes",
  "entries on page": 25,
  "full width": false,
  "add new note button": false,
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
    name: "🏷 tags",
    filter: true,
    multiSelect: false,
    column: false,
  },
  {
    prop: "deck",
    name: "🃏 deck",
    filter: false,
    multiSelect: false,
    column: true,
  },
  {
    prop: "file.outlinks.length",
    name: "*outlinks*",
    filter: false,
    column: true,
  },
  {
    prop: "file.inlinks.length",
    name: "*inlinks*",
    filter: false,
    column: true,
  },
];

await DIViews.renderView(settings, props, pages, dv);
