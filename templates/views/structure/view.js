const COLORS = {
	HIERARCHY: '#3f2759',
	META: '#211f73',
	PROBLEM: '#4f482f',
	AGGREGATOR_STROKE: '#db7923',
}

const category = dv.current()

const isInCategory = page =>
	dv.func.contains(
		page.file.frontmatter.tags,
		`category/${category.file.name.replace(/ /g, '_')}`
	) || dv.func.contains(page.file.frontmatter.category, category.file.name)

const createNodeStyle = (node, fill, hasAggregator, page) =>
	`class ${node} internal-link; style ${node} fill:${fill}${
		hasAggregator
			? ',stroke:#db7923,stroke-width:6px,stroke-dasharray: 5 5'
			: ''
	}${
		page?.file.tags?.includes('#mark/ignore')
			? ',stroke:#FF6347,stroke-width:2px'
			: ''
	};`

const hierarchies = dv
	.pages('#system/high/hierarchy AND -#mark/ignore')
	.where(isInCategory)
	.sort(p => p.file.name)
	.sort(p => (p.file.tags.includes('#mark/aggregator') ? 0 : 1))

function buildHierarchyStructure() {
	const structure = []
	let nodeCounter = 1

	const mainHierarchies = hierarchies
		.where(
			p => !hierarchies.file.link.some(link => p.file.inlinks.includes(link))
		)
		.where(p => p.meta == null && p.problem == null)

	function processHierarchy(parentIndex, hierarchy) {
		const outgoingHierarchies = hierarchies
			.where(p => p.meta == null && p.problem == null)
			.where(h => hierarchy.file.outlinks.includes(h.file.link))

		outgoingHierarchies.forEach(outHierarchy => {
			const currentIndex = nodeCounter++
			structure.push(
				`hNode${parentIndex} --> hNode${currentIndex}["${outHierarchy.file.name}"];`,
				createNodeStyle(
					`hNode${currentIndex}`,
					COLORS.HIERARCHY,
					outHierarchy.file.tags.includes('#mark/aggregator'),
					outHierarchy
				)
			)
			processHierarchy(currentIndex, outHierarchy)
		})
	}

	mainHierarchies.forEach(hierarchy => {
		const currentIndex = nodeCounter++
		structure.push(
			`hNode0["🧬 hierarhies"] --> hNode${currentIndex}["${hierarchy.file.name}"];`,
			createNodeStyle(
				`hNode${currentIndex}`,
				COLORS.HIERARCHY,
				hierarchy.file.tags.includes('#mark/aggregator'),
				hierarchy
			)
		)
		processHierarchy(currentIndex, hierarchy)
	})

	return structure
}

const isPartOfAnyChain = (targetHierarchy, startHierarchies) => {
	const findInChain = (currentHierarchy, visited = new Set()) => {
		if (visited.has(currentHierarchy.file.link)) return false
		visited.add(currentHierarchy.file.link)

		const outgoingLinks = currentHierarchy.file.outlinks
		if (outgoingLinks.includes(targetHierarchy.file.link)) return true

		return hierarchies
			.where(h => outgoingLinks.includes(h.file.link))
			.some(h => findInChain(h, visited))
	}

	return startHierarchies.some(h => findInChain(h))
}

function buildMetaStructure() {
	const structure = []
	const metaNotes = dv
		.pages('#system/high/meta AND -#mark/ignore')
		.where(isInCategory)
		.sort(p => p.file.name)
		.sort(p => (p.file.tags.includes('#mark/aggregator') ? 0 : 1))

	const processHierarchy = (parentNode, hierarchy, prefix) => {
		hierarchies
			.where(h => hierarchy.file.outlinks.includes(h.file.link))
			.forEach((outHierarchy, i) => {
				const nodeId = `${prefix}h${i + 1}`
				structure.push(
					`${parentNode} --> ${nodeId}["${outHierarchy.file.name}"]`,
					createNodeStyle(
						nodeId,
						COLORS.HIERARCHY,
						outHierarchy.file.tags.includes('#mark/aggregator'),
						outHierarchy
					)
				)
				processHierarchy(nodeId, outHierarchy, `${prefix}h${i + 1}`)
			})
	}

	metaNotes.forEach((meta, i) => {
		const nodeIndex = i + 1
		const metaNodeId = `mNode${nodeIndex}`
		structure.push(
			`mNode0["🔬 meta-notes"] --> ${metaNodeId}["${meta.file.name}"]`,
			createNodeStyle(
				metaNodeId,
				COLORS.META,
				meta.file.tags.includes('#mark/aggregator'),
				meta
			)
		)

		const metasHierarchies = hierarchies
			.where(
				h =>
					dv.func.contains(h.meta, meta.file.link) &&
					h.meta != null &&
					h.problem == null
			)
			.where(
				h =>
					!isPartOfAnyChain(
						h,
						hierarchies.where(h => h.meta != null && h.problem == null)
					)
			)

		const problems = dv
			.pages('#system/high/problem AND -#mark/ignore')
			.where(p => dv.func.contains(p.meta, meta.file.link))

		if (metasHierarchies.length + problems.length > 0) {
			structure.push(`subgraph ${meta.file.name}`)

			metasHierarchies.forEach((hierarchy, k) => {
				const hierarchyNodeId = `mh${nodeIndex}_${k + 1}`
				structure.push(
					`${metaNodeId} --> ${hierarchyNodeId}["${hierarchy.file.name}"]`,
					createNodeStyle(
						hierarchyNodeId,
						COLORS.HIERARCHY,
						hierarchy.file.tags.includes('#mark/aggregator'),
						hierarchy
					)
				)
				processHierarchy(hierarchyNodeId, hierarchy, `mh${nodeIndex}_${k + 1}_`)
			})

			problems.forEach((problem, k) => {
				const problemNodeId = `mp${nodeIndex}_${k + 1}`
				structure.push(
					`${metaNodeId} --> ${problemNodeId}["${problem.file.name}"]`,
					createNodeStyle(
						problemNodeId,
						COLORS.PROBLEM,
						problem.file.tags.includes('#mark/aggregator'),
						problem
					)
				)

				const problemsHierarchies = hierarchies
					.where(h => dv.func.contains(h.problem, problem.file.link))
					.where(
						h =>
							!isPartOfAnyChain(
								h,
								hierarchies.where(h =>
									dv.func.contains(h.problem, problem.file.link)
								)
							)
					)

				problemsHierarchies.forEach((pH, z) => {
					const phNodeId = `mph${nodeIndex}_${k + 1}_${z + 1}`
					structure.push(
						`${problemNodeId} --> ${phNodeId}["${pH.file.name}"]`,
						createNodeStyle(
							phNodeId,
							COLORS.HIERARCHY,
							pH.file.tags.includes('#mark/aggregator'),
							pH
						)
					)
					processHierarchy(phNodeId, pH, `mph${nodeIndex}_${k + 1}_${z + 1}_`)
				})
			})

			structure.push('end')
		}
	})

	return structure
}

const hierarchyStructure = buildHierarchyStructure()
const metaStructure = buildMetaStructure()

const mermaidConfig =
	"%%{init: {'flowchart': {'nodeSpacing': 10, 'rankSpacing': 20}}}%%\n"

if (hierarchyStructure.length > 0) {
	dv.paragraph(
		`\`\`\`mermaid\nflowchart LR\n${mermaidConfig}${hierarchyStructure.join(
			'\n'
		)}\n\`\`\`\n`
	)
	dv.paragraph('\n---\n')
}

if (metaStructure.length > 0) {
	dv.paragraph(
		`\`\`\`mermaid\nflowchart LR\n${mermaidConfig}${metaStructure.join(
			'\n'
		)}\n\`\`\`\n`
	)
}
