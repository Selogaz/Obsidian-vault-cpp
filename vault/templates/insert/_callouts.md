<%*
//get selection
noteContent = tp.file.selection();
// list callouts
const callouts = {
  note: "✏ Note",
  info: "ℹ Info",
  todo: "✔️ Todo",
  tip: "🔥 Tip",
  hint: "🔥 Hint",
  important: "🔥 important",
  abstract: "🏁 Abstract",
  summary: "🏁 Summary",
  tldr: "🏁 TLDR",
  question: "❓ Question",
  help: "❓ Help",
  faq: "❓ FAQ",
  quote: "💬 Quote",
  cite: "💬 Cite",
  example: "📑 Example",
  success: "✔ Success",
  check: "✔ Check",
  done: "✔ Done",
  warning: "⚠ Warning",
  caution: "⚠ Caution",
  attention: "⚠ Attention",
  failure: "❌ Failure",
  fail: "❌ Fail",
  missing: "❌ Missing",
  danger: "⚡ Danger",
  error: "⚡ Error",
  bug: "🐞 Bug",
  metadata: "📋 Metadata",
  my: "💎 my",
  image: "🖼️ image",
  link: "🔗 link",
  ai: "🤖 AI generated",
  mind: "🧠 Mindmap",
  toc: "👉 TOC",
};
// return callout
const type = await tp.system.suggester(
  Object.values(callouts),
  Object.keys(callouts),
  true,
  "Select callout type.",
);
//return fold
const fold = await tp.system.suggester(
  ["None", "Expanded", "Collapsed"],
  ["", "+", "-"],
  true,
  "Select callout fold option.",
);

//return title
const title = await tp.system.prompt("Title:", "", true);

//get array of lines
lines = noteContent.split("\n");
//make a new string with > prepended to each line
let newContent = "";
lines.forEach((l) => {
  newContent += "> " + l + "\n";
});
//remove the last newline character
newContent = newContent.replace(/\n$/, "");
//define callout header
header = ">[!" + type + "]" + fold + " " + title + "\n";
// Return the complete callout block
return header + newContent;
%>