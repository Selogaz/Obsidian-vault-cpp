<%*
// get contents of line under cursor
const cmEditorAct = this.app.workspace.activeLeaf.view.editor;
const currentCursor = cmEditorAct.getCursor();
const currentLine = currentCursor.line;
const originLineContents = cmEditorAct.getLine(currentLine);
// or get selected contents
const lineSelection = await tp.file.selection();

let lineContents = "";
let isSelection = "";
if (lineSelection.length >= originLineContents.length) {
  lineContents = lineSelection;
  isSelection = true;
} else {
  lineContents = originLineContents;
  isSelection = false;
}

// symbols
const statuses = {
  "⬛": "⬛ abandoned",
  "⚙️": "⚙️ service structure",
  "🟥": "👀 | 🟥 todo or queue",
  "💡": "👀 | 💡 idea",
  "🧠": "🛠 | 🧠 blob or brainstorming",
  "🔎": "🛠 | 🔎 aggregation or research",
  "🟦": "✍ | 🟦 wip",
  "📋": "✍ | 📋 revising or improve structure",
  "🖍": "✍ | 🖍 editing or critique",
  "🟩": "📨 | 🟩 completed or pending distribution",
  "📦": "📨 | 📦 preparation for distribution or compilation",
  "📢": "📨 | 📢 distributed",
};
const status = await tp.system.suggester(
  Object.values(statuses),
  Object.keys(statuses),
  true,
  "Select status:",
);

const statusRegex = new RegExp(Object.keys(statuses).join("|"), "g");

if (statusRegex.test(lineContents)) {
  lineContents = lineContents.replace(statusRegex, status);
} else {
  lineContents = lineContents.replace(/# /, "# " + status + " ");
}

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