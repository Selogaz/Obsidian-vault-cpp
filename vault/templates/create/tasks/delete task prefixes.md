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

const priorityTags = ["#priority/a", "#priority/b", "#priority/c", "#priority/d", "#priority/e"]
const timeTags = ["#time/quick", "#time/moderate", "#time/lengthy", "#time/long"]
const effortTags = ["#effort/easy", "#effort/medium", "#effort/hard"]

// temporary deletion of task mark
const markdownTaskRegex = /- \[ \] /g;
lineContents = lineContents.replace(markdownTaskRegex, "");

// add or modify the status/category
const statusRegex = new RegExp(dv.pages('"periodic/statuses"').map((p) => "#task/" + p.file.name.slice(1)).join("|"), "g");
const categoryRegex = new RegExp(dv.pages('"periodic/categories"').map((p) => "#category/" + p.file.name.slice(1)).join("|"), "g");

const priorityRegex = new RegExp(priorityTags.join("|"), "g");
const timeRegex = new RegExp(timeTags.join("|"), "g");
const effortRegex = new RegExp(effortTags.join("|"), "g");

let tabulation;

let paragraphs = lineContents.split(/\n/);
for (let i = 0; i < paragraphs.length; i++) {
  if (paragraphs[i].trim() !== "") {
    let paragraph = paragraphs[i];

    tabulation = /\t/.test(paragraph) ? paragraph.match(/\t/g).join("") : "";
    paragraph = paragraph
      .replace(/^[\t]?-\s/, "")
      .replace(statusRegex, "")
      .replace(categoryRegex, "")
      .replace(priorityRegex, "")
      .replace(effortRegex, "")
      .replace(timeRegex, "")
      .trim();

    paragraph =
      tabulation +
      "- [ ] " +
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

-%>