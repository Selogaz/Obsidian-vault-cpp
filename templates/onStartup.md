<%*
const dv = app.plugins.plugins["dataview"].api;
const isMobile = dv.app.isMobile;
if (isMobile) {
  return;
}

const workspaceName = 'default'
const workspacePlugin = app.internalPlugins.plugins.workspaces.instance

// Helper function to get all leaves
const getAllLeaves = () => {
	return app.workspace
		.getLeavesOfType('markdown')
		.concat(app.workspace.getLeavesOfType('pdf'))
		.concat(app.workspace.getLeavesOfType('canvas'))
}

// Function for collecting information about all tabs
const getOpenTabs = async () => {
	// Get all leaves
	const allLeaves = getAllLeaves()

	// Remember active leaf to return to it later
	const activeLeaf = app.workspace.activeLeaf

	// Collection for storing tab data
	const tabs = []

	// Iterate through all leaves
	for (const leaf of allLeaves) {
		// Activate the leaf to force it to load
		try {
			app.workspace.setActiveLeaf(leaf, { focus: true })
			// Wait a small pause for loading
			await new Promise(resolve => setTimeout(resolve, 300))

			// Now file data should be available
			if (leaf.view && leaf.view.file) {
				tabs.push({
					path: leaf.view.file.path,
					leaf: leaf.id,
					viewState: leaf.getViewState(),
				})
			}
		} catch (e) {
			console.error('Error processing leaf:', e)
		}
	}

	// Return to the original active leaf
	if (activeLeaf) {
		app.workspace.setActiveLeaf(activeLeaf, { focus: true })
	}

	return tabs
}

// Function for restoring tabs
const restoreTabs = async tabs => {
	for (const tab of tabs) {
		const tfile = app.vault.getAbstractFileByPath(tab.path)
		if (tfile) {
			const leaf = app.workspace.getLeaf(true)
			await leaf.openFile(tfile)

			if (tab.viewState) {
				leaf.setViewState({
					...tab.viewState,
					state: { ...tab.viewState.state },
				})
			}

			// Small pause between opening tabs
			await new Promise(resolve => setTimeout(resolve, 200))
		}
	}
}

// Helper function to load workspace with notification
const loadWorkspace = async () => {
	await workspacePlugin.loadWorkspace(workspaceName)
	new Notice().noticeEl.innerHTML = `<span style="color: green; font-weight: bold;">Workspace "${workspaceName}" loaded!</span>`;
}

// Main function
const switchWorkspace = async () => {
	try {
		// Wait for Obsidian to fully load
		await new Promise(resolve => setTimeout(resolve, 2000))

		// Get all leaves to check if there are any open tabs
		const allLeaves = getAllLeaves()

		// If there are no open tabs, just load the workspace
		if (allLeaves.length === 0) {
			new Notice('No open tabs detected. Loading workspace...', 3000)
			await loadWorkspace()
			return
		}

		// Ask user if they want to save tabs
		const choice = await tp.system.suggester(
			['💾 Save open tabs', '🔳 Load a clean workspace'],
			['save', 'load']
		)

		if (choice === 'save') {
			// Collect information about tabs
			const openTabs = await getOpenTabs()

			// Load workspace
			await loadWorkspace()

			// Wait after loading workspace
			await new Promise(resolve => setTimeout(resolve, 1500))

			// Restore tabs
			await restoreTabs(openTabs)

			new Notice(`Restored ${openTabs.length} tabs`, 3000)
		} else if (choice === 'load') {
			// Just load the workspace without saving tabs
			await loadWorkspace()
		} else {
			new Notice('Operation cancelled', 3000)
		}
	} catch (error) {
		console.error('Error:', error)
		new Notice(`An error occurred: ${error.message}`, 5000)
	}
}

// Run the whole process
switchWorkspace()
%>