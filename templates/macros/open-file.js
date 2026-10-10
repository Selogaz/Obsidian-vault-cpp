module.exports = {
  entry: run,

  settings: {
    name: 'Open Specific File',
    author: 'User',
    options: {
      'File Path': {
        type: 'text',
        defaultValue: '',
        placeholder: 'Folder/Note Name.md',
        description: 'Full path to the file relative to vault root',
      },
      'View Mode': {
        type: 'dropdown',
        defaultValue: 'default',
        options: ['default', 'preview', 'source'],
        description: 'Mode to open the file in',
      },
    },
  },
};

async function run(params, settings) {
  const { app, obsidian } = params;
  const { Notice } = obsidian;

  const filePath = settings['File Path'];
  const viewMode = settings['View Mode'] || 'default';

  if (!filePath) {
    new Notice('Error: File path not set in QuickAdd settings.');
    return;
  }

  const file = app.vault.getAbstractFileByPath(filePath);

  if (!file) {
    new Notice(`File not found: ${filePath}`);
    return;
  }

  const openInNewTab = !app.isMobile;
  const leaf = await app.workspace.getLeaf(openInNewTab);
  await leaf.openFile(file);

  if (viewMode !== 'default') {
    const viewState = leaf.getViewState();
    viewState.state.mode = viewMode;
    await leaf.setViewState(viewState);
  }
}
