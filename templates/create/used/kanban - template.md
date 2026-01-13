<%*
setTimeout(() => {
app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
  if (frontmatter.cssclasses) {
	if (!frontmatter.cssclasses.includes("full-width")) {
	  frontmatter.aliases.push("full-width");
	}
  } else {
	frontmatter.cssclasses = ["full-width"];
  }
  frontmatter.tags = ["mark/kanban"]
});
}, 400);
-%>

> [!kanban]+ KANBAN
> - 💡idea💡
> - 💤wait💤
> - 🟥todo🟥
> - 🟦wip🟦
> - 🟩done🟩
