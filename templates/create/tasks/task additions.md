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
let priorityTag = await tp.system.suggester(
  ["🇦 important, urgently", "🇧 important, not urgently", "🇨 common task", "🇩 delegate", "🇪 estimate"],
  priorityTags,
  false,
  "Task priority",
);
if (priorityTag == null) { priorityTag = "" }

const timeTags = ["#time/quick", "#time/moderate", "#time/lengthy", "#time/long"]
let timeTag = await tp.system.suggester(
  ["🤏 quick (t ⪅15 min)", "🐰 moderate (15min < t < 2 hours)", "🐢 lengthy (2 hours ⪅ t < 5 hours)", "🐌 long (t ⪆ 5 hours)"],
  timeTags,
  false,
  "Time estimation",
);
if (timeTag == null) { timeTag = "" }

const effortTags = ["#effort/easy", "#effort/medium", "#effort/hard"]
let effortTag = await tp.system.suggester(
  [ "💖 easy", "❤️‍🔥 😓 medium", "🫀 🥵 😨 hard"],
  effortTags,
  false,
  "Effort",
);
if (effortTag == null) { effortTag = "" }

// temporary deletion of task mark
const markdownTaskRegex = /- \[ \] /g;
lineContents = lineContents.replace(markdownTaskRegex, "");

// add or modify the status/category
const statusRegex = new RegExp(dv.pages('"periodic/statuses"').map((p) => "#task/" + p.file.name).join("|"), "g");
const categoryRegex = new RegExp(dv.pages("#system/category AND -#mark/task_ignore").map((p) => "#category/" + p.file.name.replace(/ /g, '_')).join("|"), "g");

const priorityRegex = new RegExp(priorityTags.join("|"), "g");
const timeRegex = new RegExp(timeTags.join("|"), "g");
const effortRegex = new RegExp(effortTags.join("|"), "g");

function extractAndUpdate(tag, regex, text) {
  const match = text.match(regex) || [""];
  return tag !== "" ? (match.includes(tag) ? "" : tag) : match.join(" ");
}

let finalStatus;
let finalCategory;
let finalPriority
let finalTime
let finalEffort

let blockquote;
let tabulation;
let taskMarker;

let paragraphs = lineContents.split(/\n/);
for (let i = 0; i < paragraphs.length; i++) {
  if (paragraphs[i].trim() !== "") {
    let paragraph = paragraphs[i];
    
    finalStatus =  (paragraph.match(statusRegex) || [""]).join(" ")
    finalCategory = (paragraph.match(categoryRegex) || [""]).join(" ")
    
    finalPriority = extractAndUpdate(priorityTag, priorityRegex, paragraph);
    finalTime = extractAndUpdate(timeTag, timeRegex, paragraph);
    finalEffort = extractAndUpdate(effortTag, effortRegex, paragraph);

    blockquote = /^>+/.test(paragraph) ? paragraph.match(/^>+/g).join("") : "";
    tabulation = /\t/.test(paragraph) ? paragraph.match(/\t/g).join("") : "";
    taskMarker = paragraph.match(/- \[.\] /) || ["- [ ] "];

    paragraph = paragraph
      .replace(/^>+/, "")
      .replace(/^[\t]?\s/, "")
      .replace(/- \[.\] /, "")
      .replace(statusRegex, "")
      .replace(categoryRegex, "")
      .replace(priorityRegex, "")
      .replace(effortRegex, "")
      .replace(timeRegex, "")
      .trim();

    paragraph =
      (blockquote ? blockquote + " ": "") +
      tabulation +
      taskMarker[0] +
      finalStatus +
      " " +
      finalCategory +
      " " +
      finalPriority + 
      " " +
      finalTime + 
      " " +
      finalEffort + 
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

-%>