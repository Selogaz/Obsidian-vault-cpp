<%*

const dv = app.plugins.plugins["dataview"].api;
// get contents of line under cursor
const cmEditorAct = this.app.workspace.activeLeaf.view.editor;
const currentCursor = cmEditorAct.getCursor();
const currentLine = currentCursor.line;
const originLineContents = cmEditorAct.getLine(currentLine);
// or get selected contents
const lineSelection = await tp.file.selection();
let lineContents = "";
let isSelection;
if (lineSelection.length >= originLineContents.length) {
  lineContents = lineSelection;
  isSelection = true;
} else {
  lineContents = originLineContents;
  isSelection = false;
}

// task status
const statusPages = dv.pages('"periodic/statuses"').sort((p) => p.file.name);

const statusTags = statusPages.map((p) => "#task/" + p.file.name);

let statusTag = await tp.system.suggester(
  statusPages.map((p) => p.file.frontmatter.icon + " " + p.file.name),
  statusTags,
  false,
  "Task type",
);
if (statusTag == null) {
  statusTag = "";
}

// task category
const categoryPages = dv
  .pages("#system/category AND -#mark/task_ignore")
  .sort((p) => p.file.frontmatter.icon);

const categoryTags = categoryPages.map(
  (p) => "#category/" + p.file.name.replace(/ /g, '_'),
);

let categoryTag
if (categoryTags.length != 0) {
  categoryTag = await tp.system.suggester(
    categoryPages.map(
      (p) => (p.file.frontmatter?.icon || '🗺️') + " " + p.file.name + `${p.file.frontmatter.aliases?.length ? (' | ' + p.file.frontmatter.aliases.join(', ')) : ''}`,
    ),
    categoryTags,
    false,
    "Category",
  );
} else {
  categoryTag = "";
}

if (categoryTag == null) {
  categoryTag = "";
}


// converting urls to markdown links
const linkRegex =
  /(?![^[]*\])(https?:\/\/[^\s]+)|\[(.*?)\]\((https?:\/\/[^\s]+)\)/g;
lineContents = lineContents.replace(linkRegex, (match, p1, p2, p3) => {
  if (p2 && p3) {
    return `[${p2}](${p3})`;
  } else {
    const siteName = p1.match(
      /(?:https?:\/\/)?(?:w{3}\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/\S*)?/,
    )[1];
    return `[${siteName}](${match})`;
  }
});

// add or modify the status/category
const statusRegex = new RegExp(statusTags.join("|"), "g");
const categoryRegex = new RegExp(categoryTags.join("|"), "g");

function extractAndUpdate(tag, regex, text) {
  const match = text.match(regex) || [""];
  if (tag === "#task/next_action") {
    return match.includes(tag)
      ? match.join(" ").replace(tag, "")
      : match.join(" ") + " " + tag;
  } else {
    return tag !== "" ? (match.includes(tag) ? "" : tag) : match.join(" ");
  }
}

let finalStatus;
let finalCategory;

let blockquote;
let tabulation;
let taskMarker;

let paragraphs = lineContents.split(/\n/);
for (let i = 0; i < paragraphs.length; i++) {
  if (paragraphs[i].trim() !== "") {
    let paragraph = paragraphs[i];

    finalStatus = extractAndUpdate(statusTag, statusRegex, paragraph);
    finalCategory = extractAndUpdate(categoryTag, categoryRegex, paragraph);

    blockquote = /^>+/.test(paragraph) ? paragraph.match(/^>+/g).join("") : "";
    tabulation = /\t/.test(paragraph) ? paragraph.match(/\t/g).join("") : "";
    taskMarker = paragraph.match(/- \[.\] /) || ["- [ ] "];

    paragraph = paragraph
      .replace(/^>+/, "")
      .replace(/^[\t]?\s/, "")
      .replace(/- \[.\] /, "")
      .replace(statusRegex, "")
      .replace(categoryRegex, "")
      .trim();

    paragraph =
      (blockquote ? blockquote + " ": "") +
      tabulation +
      taskMarker[0] +
      finalStatus +
      " " +
      finalCategory +
      " " +
      paragraph;

    paragraphs[i] = paragraph.replace(/ +/g, " ");
  }
}
lineContents = paragraphs.join("\n");

// line modification
if (isSelection) {
  tR += lineContents;
} else {
  cmEditorAct.replaceRange(
    lineContents,
    { line: currentLine, ch: 0 },
    { line: currentLine, ch: originLineContents.length },
  );
}

if (lineContents == "") {
	lineContents = "- [ ] " + statusTag + " " + categoryTag + " "
	tR += lineContents.replace(/ +/g, " ")
}
-%>