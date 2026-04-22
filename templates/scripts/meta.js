module.exports = async function meta(category, note) {
	const dv = app.plugins.plugins['dataview'].api
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object

	if (note) {
		const noteFile = app.metadataCache.getFirstLinkpathDest(note, '')
		if (noteFile) {
			const fm = app.metadataCache.getFileCache(noteFile)?.frontmatter
			const links = [fm?.meta].flat().filter(Boolean)
			if (links.length > 0) {
				const names = links.map(raw => {
					const match = String(raw).match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)
					return match ? match[1].split('/').pop().replace(/\.md$/, '') : String(raw)
				}).filter(Boolean)
				if (names.length > 0) return names
			}
		}
	}

	let meta_notes
	let meta
	let relevant

	if (category) {
		meta_notes = dv
			.pages('#system/high/meta AND -#mark/ignore')
			.where(p => dv.func.contains(p.file.frontmatter.category, category))
			.sort(p => p.file.tags, 'desc')
			.sort(p => (p.file.frontmatter.relevant ? -1 : 1))

		if (meta_notes.length > 0) {
			meta = await tp.system.suggester(
				meta_notes.map(function (value) {
					tags = value.file.tags
					prefix = value.file.frontmatter.icon
						? value.file.frontmatter.icon
						: '🔎'
					relevant = value.file.frontmatter.relevant ? '📌' : ''
					if (/mark\/aggregator/.test(tags)) {
						prefix = '⇶' + prefix
					}
					return (
						relevant +
						prefix +
						' ' +
						value.file.name +
						(value.file.frontmatter.aliases?.length
							? ' | ' + value.file.frontmatter.aliases.join(', ')
							: '')
					)
				}),
				meta_notes.file.name,
				false,
				'Select the meta-note'
			)
		}
	}
	if (meta == null) {
		meta = ''
	}

	return meta
}
