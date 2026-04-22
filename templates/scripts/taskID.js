module.exports = async function taskID(project) {
	if (!project) return ''

	const file = app.metadataCache.getFirstLinkpathDest(project, '')
	if (!file) return ''

	const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter || {}

	// Generate prefix fallback from project name
	let prefix = frontmatter.prefix
	if (!prefix) {
		const words = project.trim().split(/\s+/)
		if (words.length >= 3) {
			prefix = words
				.slice(0, 3)
				.map(w => w[0].toUpperCase())
				.join('')
		} else if (words.length === 2) {
			prefix = (words[0].slice(0, 2) + words[1][0]).toUpperCase()
		} else {
			prefix = words[0].slice(0, 3).toUpperCase()
		}
	}

	// Compute new task count
	const newCount = (frontmatter.taskCount ?? 0) + 1
	const id = `${prefix}-${newCount}`

	// Write prefix (if generated) and updated counter back to project
	await app.fileManager.processFrontMatter(file, fm => {
		if (!fm.prefix) fm.prefix = prefix
		fm.taskCount = newCount
	})

	return id
}
