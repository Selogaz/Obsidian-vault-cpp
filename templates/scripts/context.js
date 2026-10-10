// Structural context of the note a creation was started from.
//
// Everything hangs on Category → Meta-note → Problem, and every creation script
// needs the same answer: where does the note I am standing on sit in that chain.
// Reading it in one place keeps the scripts predictable — they ask the user only
// when the context cannot answer.
//
// The note the creation started from is:
//   a category  → { category: itself }
//   a meta-note → { category: its category, meta: itself }
//   a problem   → { category: its category, meta: its meta, problem: itself }
//   a hierarchy → whatever its own category / meta / problem say
//   anything else → {} and the scripts ask, exactly as they did before
//
// A note can also be created already in its place: the Structure view in Bases
// writes category, meta and problem into the new file before Templater fills
// the folder template. Such a note answers itself, marked as prefilled, and the
// scripts take what it holds without asking.
//
// Only structural notes answer. A source or a plain note carries a category too,
// but creating from one should not silently file the new note under it.
//
// Pass a file to read that file instead of the active one.
module.exports = async function context(file) {
	if (!file) {
		const prefilled = await placeOfCreatedNote()
		if (prefilled) return prefilled
	}

	const active = file ?? app.workspace.getActiveFile()
	if (!active) return {}

	const cache = app.metadataCache.getFileCache(active)
	if (!cache) return {}

	const fm = cache.frontmatter ?? {}
	const tags = [fm.tags]
		.flat()
		.filter(Boolean)
		.map(tag => String(tag).replace(/^#/, ''))
	const hasTag = tag => tags.some(value => value === tag || value.startsWith(tag + '/'))

	const structural =
		hasTag('system/category') ||
		hasTag('system/high/meta') ||
		hasTag('system/high/problem') ||
		hasTag('system/high/hierarchy')
	if (!structural) return {}

	const result = {
		category: linkedNameOf(fm.category),
		meta: linkedNameOf(fm.meta),
		problem: linkedNameOf(fm.problem),
	}

	// A structural note is its own answer for its own level.
	if (hasTag('system/category')) result.category = active.basename
	if (hasTag('system/high/meta')) result.meta = active.basename
	if (hasTag('system/high/problem')) result.problem = active.basename

	return result
}

// The place already written into the note Templater is filling. The file is read
// directly: the metadata cache may not have caught up with a file this new.
async function placeOfCreatedNote() {
	const tp =
		app.plugins.plugins['templater-obsidian'].templater.current_functions_object
	const target = tp?.config?.target_file
	if (!target) return null

	const { frontmatter } = tp.obsidian.getFrontMatterInfo(await app.vault.read(target))
	if (!frontmatter) return null
	let fm
	try {
		fm = tp.obsidian.parseYaml(frontmatter) ?? {}
	} catch {
		return null
	}

	const place = {
		category: linkedNameOf(fm.category),
		meta: linkedNameOf(fm.meta),
		problem: linkedNameOf(fm.problem),
	}
	if (!place.category && !place.meta && !place.problem) return null
	return { ...place, prefilled: true }
}

function linkedNameOf(value) {
	const raw = [value].flat().filter(Boolean)[0]
	if (!raw) return null
	const match = String(raw).match(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/)
	const name = (match ? match[1] : String(raw)).split('/').pop().replace(/\.md$/, '').trim()
	return name || null
}
