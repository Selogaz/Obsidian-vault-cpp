<%* 
const full_text = tp.file.selection();
const text_split = full_text.split("\n");
const file_name = text_split[0].trim();
const content = text_split.slice(1).join("\n");
const created = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");

const note = await tp.user.note(file_name, content)
const template = note.template
const title = note.title

await tp.file.create_new(template, title);

tR += "![[" + title + tp.file.cursor() + "]]";

await navigator.clipboard.writeText("[[" + title + "]]");
new Notice("link sent to clipboard", 3000);
%>