<%*
const dv = app.plugins.plugins["dataview"].api
const categories = dv.pages("#system/category").file.name
const category = await tp.system.suggester(categories.map(p => "🗺️ " + p),categories, false, "Categories")

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
}, 300);
-%>
> [!kanban]+ PUBLIC PROJECTS
> - 💡idea💡
> - 💤 wait 💤
> 	- `$=dv.list(dv.pages("#project AND #category/<% category %>").where(p => dv.func.contains(p.status, "❄")).file.link)`
> - 🟥todo🟥
> 	- `$=dv.list(dv.pages("#project AND #category/<% category %>").where(p => dv.func.contains(p.status, "🟥")).file.link)`
> - 🟦wip🟦
> 	- `$=dv.list(dv.pages("#project AND #category/<% category %>").where(p => dv.func.contains(p.status, "🟦")).file.link)`
> - 🟩done🟩
> 	- `$=dv.list(dv.pages("#project AND #category/<% category %>").where(p => dv.func.contains(p.status, "🟩")).file.link)`