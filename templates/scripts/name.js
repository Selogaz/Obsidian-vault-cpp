module.exports = async function meta(name) {
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object

	let title = tp.file.title
	if (title.startsWith('Untitled')) {
		title = await tp.system.prompt('Title')
	}
	await tp.file.rename(
		title
			.replace(/[<>:"/\\|?*\x00-\x1f]/g, '')
			.replace(/\s+/g, ' ')
			.trim()
	)
}
