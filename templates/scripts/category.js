module.exports = async function category(note) {
	const dv = app.plugins.plugins['dataview'].api
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object

	if (note) {
		const noteFile = app.metadataCache.getFirstLinkpathDest(note, '')
		if (noteFile) {
			const fm = app.metadataCache.getFileCache(noteFile)?.frontmatter
			const links = [fm?.category].flat().filter(Boolean)
			if (links.length > 0) {
				const names = links.map(raw => {
					const match = String(raw).match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)
					return match ? match[1].split('/').pop().replace(/\.md$/, '') : String(raw)
				}).filter(Boolean)
				if (names.length > 0) return names
			}
		}
	}

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
