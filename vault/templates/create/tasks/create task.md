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

const statusTags = statusPages.map((p) => "#task/" + p.file.name.slice(1));

let statusTag = await tp.system.suggester(
  statusPages.map((p) => p.file.frontmatter.icon + " " + p.file.name.slice(1)),
  statusTags,
  false,
  "Task type",
);
if (statusTag == null) {
  statusTag = "";
}

// task category
const categoryPages = dv
  .pages('"periodic/categories"')
  .sort((p) => p.file.frontmatter.icon);

const categoryTags = categoryPages.map(
  (p) => "#category/" + p.file.name.slice(1),
);

let categoryTag = await tp.system.suggester(
  categoryPages.map(
    (p) => p.file.frontmatter.icon + " " + p.file.name.slice(1),
  ),
  categoryTags,
  false,
  "Category",
);
if (categoryTag == null) {
  categoryTag = "";
}

// temporary deletion of task mark
const markdownTaskRegex = /- \[ \] /g;
lineContents = lineContents.replace(markdownTaskRegex, "");

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

let tabulation;

let paragraphs = lineContents.split(/\n/);
for (let i = 0; i < paragraphs.length; i++) {
  if (paragraphs[i].trim() !== "") {
    let paragraph = paragraphs[i];

    finalStatus = extractAndUpdate(statusTag, statusRegex, paragraph);
    finalCategory = extractAndUpdate(categoryTag, categoryRegex, paragraph);

    tabulation = /\t/.test(paragraph) ? paragraph.match(/\t/g).join("") : "";
    paragraph = paragraph
      .replace(/^[\t]?-\s/, "")
      .replace(statusRegex, "")
      .replace(categoryRegex, "")
      .trim();

    paragraph =
      tabulation +
      "- [ ] " +
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