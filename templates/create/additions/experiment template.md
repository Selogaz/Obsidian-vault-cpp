<%*
const now = tp.date.now("YYYY-MM-DD");
const created = tp.date.now("YYYY-MM-DDTHH:mm:ssZ")
const name = tp.file.title;
const title = name.replace(" - experiments", "") + " (" + now + ")" + " - experiments";

const template = `---
tags:
  - mark/addition/experiment
status: 🟥
project:
  - "[[${name.replace(" - experiments", "")}]]"
attribute:
input:
output:
description:
created: ${created}
updated: ${created}
---

`;

if (/experiments/.test(name)) {
	await tp.file.create_new(template, title, false, "base/additions");
	tR += "[[" + title + "|" + now + "]]";
} else {
	new Notice("sorry, bro", 2000)
}
-%>
