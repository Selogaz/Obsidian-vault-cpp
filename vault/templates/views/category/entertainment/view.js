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
  pages = contains_category(
    dv.pages(
      "(#source/music OR #source/game OR #source/comic OR #source/cinematic) AND !#mark/log",
    ),
    category_name,
  );
} else {
  pages = dv
    .pages(
      "(#source/music OR #source/game OR #source/comic OR #source/cinematic) AND !#mark/log",
    )
    .sort((p) => -p.updated);
}

const settings = {
  id: "entertainment",
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
      "#source/comic",
      "#source/cinematic/movie",
      "#source/cinematic/series",
      "#source/cinematic/anime",
      "#source/music/album",
      "#source/music/tracklist",
      "#source/game",
    ],
    column: false,
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
    prop: "rating",
    name: "🏆",
    multiSelect: false,
    valueOptions: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
    span: true,
    filter: true,
    column: true,
  },
  {
    prop: "genre",
    name: "🎡 genre",
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
