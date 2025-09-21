module.exports = async function category() {
	const dv = app.plugins.plugins['dataview'].api
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object

	const pages = await dv.pages('#system/category AND -#mark/ignore')
	const categories = pages
		.sort(p => p.file.name)
		.sort(p => (p.file.frontmatter.relevant ? -1 : 1))

	let category
	if (categories.length != 0) {
		category = await tp.system.suggester(
			categories.map(function (page) {
				const icon = page.file.frontmatter?.icon || '🗺️'
				const relevant = page.file.frontmatter.relevant ? '📌' : ''
				return `${relevant}${icon} ${page.file.name}${page.file.frontmatter.aliases?.length ? ' | ' + page.file.frontmatter.aliases.join(', ') : ''}`
			}),
			categories.map(p => p.file.name),
			false,
			'Select the category'
		)
	} else {
		category = ''
	}

	if (category == null) {
		category = ''
	}

	return category
}
