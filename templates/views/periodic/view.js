const { type } = input

const notes = dv
	.pages(`#periodic/${type}`)
	.where(p => dv.func.contains(p.up, dv.current().file.link))
	.sort(p => p.file.name)

// Collect links into an array
let links = notes.file.link

// Display the list of links
if (links.length > 0) {
	dv.list(links) // Only display the list if there are links

	// Inject CSS for button styling
	const css = `
  .button-container {
      display: block;
      padding: 0px;
      margin: 0px;
  }

  .copy-button,
  .open-button {
      margin: 5px;
  }
  `

	// Create a style element and append it to the head
	const style = document.createElement('style')
	style.type = 'text/css'
	style.innerText = css
	document.head.appendChild(style)

	// Create a container for the buttons
	const buttonContainer = dv.el('div', '', { cls: 'button-container' })

	// Create a button to copy all links
	const copyButton = dv.el('button', '📋 Copy All Links', {
		cls: 'copy-button',
		attr: { title: 'Copy all links to clipboard' },
	})

	// Add event handler for the copy button
	copyButton.onclick = () => {
		// Copy links to clipboard
		navigator.clipboard
			.writeText(notes.file.name.map(item => `[[${item}]]`).join('\n'))
			.then(() => {
				new Notice('Links copied to clipboard!')
			})
			.catch(err => {
				new Notice('Error copying: ' + err)
			})
	}

	// Append the copy button to the button container
	buttonContainer.appendChild(copyButton)

	// Create a button to open all notes
	const openButton = dv.el('button', '↗ Open All Notes', {
		cls: 'open-button',
		attr: { title: 'Open all notes' },
	})

	// Add event handler for the open button
	openButton.onclick = () => {
		// Open each note in a new pane
		notes.file.path.forEach(path => {
			app.workspace.openLinkText('', path, true)
		})
	}

	// Append the open button to the button container
	buttonContainer.appendChild(openButton)

	// Append the button container below the list of links
	dv.el('div', buttonContainer)
}
