<%*
const now = tp.date.now("YYYY-MM-DD");
const name = tp.file.title;
const title = name.replace(" - meetings", "") + " (" + now + ")" + " - meeting";

const template = `---
tags:
  - mark/addition/meeting
status: 🟥
project:
  - "[[${name.replace(" - meetings", "")}]]"
created: ${now}
updated: ${now}
---

`;

if (/- meetings/.test(name)) {
	await tp.file.create_new(template, title, false, "base/additions");
	tR += "[[" + title + "|" + now + "]]";
} else {
	new Notice("sorry, bro", 2000)
}
-%>