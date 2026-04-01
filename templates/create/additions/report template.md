<%*
const now = tp.date.now("YYYY-MM-DD");
const name = tp.file.title;
const title = name.replace(" - reports", "") + " (" + now + ")" + " - reports";

const template = `---
tags:
  - mark/addition/report
status: 🟥
project:
  - "[[${name.replace(" - reports", "")}]]"
created: ${now}
updated: ${now}
---

`;

if (/reports/.test(name)) {
	await tp.file.create_new(template, title, false, "base/additions");
	tR += "[[" + title + "|" + now + "]]";
} else {
	new Notice("sorry, bro", 2000)
}
-%>
