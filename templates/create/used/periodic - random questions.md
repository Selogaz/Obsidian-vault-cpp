<%*
const file = await app.vault.getAbstractFileByPath("templates/lists/list of questions.md");
const content = await app.vault.read(file);
const questions = content.split("\n").filter(l => l.trim());
const picked = questions.sort(() => Math.random() - 0.5).slice(0, 3);
tR += picked.join("\n");
%>
