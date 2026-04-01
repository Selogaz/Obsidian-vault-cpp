module.exports = async function meta(meta) {
	const dv = app.plugins.plugins['dataview'].api
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object

	let problem_notes
	let problem
	let relevant

	if (meta) {
		problem_notes = dv
			.pages('#system/high/problem AND -#mark/ignore')
			.where(p => dv.func.contains(p.file.frontmatter.meta, meta))
			.sort(p => p.file.tags, 'desc')
			.sort(p => (p.file.frontmatter.relevant ? -1 : 1))

		if (problem_notes.length > 0) {
			problem = await tp.system.suggester(
				problem_notes.map(function (value) {
					tags = value.file.tags
					prefix = value.file.frontmatter.icon
						? value.file.frontmatter.icon
						: '⚡'
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
				problem_notes.file.name,
				false,
				'Select the meta-note'
			)
		}
	} else {
		problem = ''
	}

	if (problem == null) {
		problem = ''
	}

	return problem
}
