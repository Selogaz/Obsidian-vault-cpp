<%*
const now = tp.date.now("YYYY-MM-DD");
const name = tp.file.title;
const title = name.replace(" - experiments", "") + " (" + now + ")" + " - experiments";

const template = `---
tags:
  - mark/addition/experiment
status: 🟥
project:
  - "[[${name.replace(" - experiments", "")}]]"
created: ${now}
updated: ${now}
---

input::
output::
description::
attribute::
`;

if (/experiments/.test(name)) {
	await tp.file.create_new(template, title, false, "base/additions");
	tR += "[[" + title + "|" + now + "]]";
} else {
	new Notice("sorry, bro", 2000)
}

-%>
