// Cursor mark that leaves no trace.
//
// Templater turns the mark into the cursor only in a note open in an editor. A
// note filled in the background — created from a Bases view, a script, another
// plugin — would keep the mark as text.
//
// Once every template has run, the note gets a moment to open: QuickAdd fills a
// note first, opens it next and places the cursor after a wait. A note still
// open nowhere after that moment is not going to be edited, and the mark is
// removed from the file.
const OPEN_GRACE_MS = 2000

module.exports = function cursor(order = 0) {
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object
	const path = tp.config.target_file.path

	tp.hooks.on_all_templates_executed(() => {
		window.setTimeout(async () => {
			const open = app.workspace
				.getLeavesOfType('markdown')
				.some(leaf => leaf.view.file?.path === path)
			const file = app.vault.getFileByPath(path)
			if (open || !file) return
			await app.vault.process(file, data =>
				data.replace(/<%\s*tp\.file\.cursor\(\d*\)\s*%>/g, '')
			)
		}, OPEN_GRACE_MS)
	})

	return tp.file.cursor(order)
}
