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
input:
output:
description:
attribute:
created: ${created}
updated: ${created}
---

\`INPUT[text(placeholder('🔖 Attribute')):attribute]\`
\`INPUT[text(placeholder('✍️ Description')):description]\`
\`INPUT[text(placeholder('⬇️ Input')):input]\`
\`INPUT[text(placeholder('⬆️ Output')):output]\`

`;

if (/experiments/.test(name)) {
	await tp.file.create_new(template, title, false, "base/additions");
	tR += "[[" + title + "|" + now + "]]";
} else {
	new Notice("sorry, bro", 2000)
}

-%>
