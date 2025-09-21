<%*
const cmEditorAct = this.app.workspace.activeLeaf.view.editor;
const currentCursor = cmEditorAct.getCursor();
const currentLine = currentCursor.line;
const originLineContents = cmEditorAct.getLine(currentLine);
let lineContents = originLineContents

let time = await tp.system.prompt("HH:mm (e.g. 20:30)", "")

time = time.trim();
let m = time.match(/^(\d{1,2}):(\d{2})$/);
if (m) {
  let h = +m[1], min = +m[2];
  if (h < 24 && min < 60) time = `${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`;
  else time = "";
} else {
  let digits = time.replace(/\D/g, '');
  if (digits.length === 4 || digits.length === 3) {
    let h = digits.length === 4 ? +digits.slice(0,2) : +digits.slice(0,1);
    let min = digits.length === 4 ? +digits.slice(2) : +digits.slice(1);
    if (h < 24 && min < 60) time = `${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`;
    else time = "";
  } else if (digits.length === 1 || digits.length === 2) {
    let h = +digits;
    if (h < 24) time = `${h.toString().padStart(2,'0')}:00`;
    else time = "";
  } else {
    time = "";
  }
}

if (time) {
  if (/📅/.test(lineContents)) {
    lineContents = lineContents
      .replace(/⏰\s*\d{1,2}:\d{2}\s*/, '')
      .replace(/⏰\s*/, '')
      .replace(/📅/, `⏰ ${time} 📅`)
  } else {
    lineContents = lineContents
      .replace(/⏰\s*\d{1,2}:\d{2}\s*/, '')
      .replace(/⏰\s*/, '')
      .trim() + ` ⏰ ${time}`
  }
} else {
	lineContents = lineContents
      .replace(/⏰\s*\d{1,2}:\d{2}\s*/, '')
      .replace(/⏰\s*/, '')
}

cmEditorAct.replaceRange(
    lineContents.replace(/ +/g, " ").trim(),
    { line: currentLine, ch: 0 },
    { line: currentLine, ch: originLineContents.length },
  );
-%>