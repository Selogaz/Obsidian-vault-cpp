module.exports = async function source(category) {
	const dv = app.plugins.plugins['dataview'].api
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object

	let sources
	let source

	if (category) {
		sources = await dv
			.pages('#source AND !#mark/log')
			.where(p => dv.func.contains(p.file.frontmatter.category, category))
			.sort(p => p.file.cday, 'desc')
	} else {
		sources = await dv
			.pages('#source AND !#mark/log')
			.sort(p => p.file.cday, 'desc')
	}

	source = await tp.system.suggester(
		sources.map(function (value) {
			tags = value.file.tags
			categories = value.file.tags
				.filter(item => /category\//.test(item))
				.map(x => x.replace('#category/', '🗺 '))

			prefix = ''
			switch (true) {
				case /article/.test(tags):
					prefix = '🧾'
					break
				case /book/.test(tags):
					prefix = '📖'
					break
				case /course/.test(tags):
					prefix = '🎓'
					break
				case /movie/.test(tags):
					prefix = '🎬'
					break
				case /podcast/.test(tags):
					prefix = '📻'
					break
				case /video/.test(tags):
					prefix = '📺'
					break
			}

			return (
				prefix +
				' ' +
				value.file.name +
				' ' +
				(categories.length > 0 ? categories : '')
			)
		}),
		sources.file.name,
		false,
		'Select the source'
	)

	if (source == null) {
		source = ''
	}

	return source
}
