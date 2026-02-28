module.exports = {
  entry: async (params, settings) => {
    const filePath = settings['File Path'];
    const viewMode = settings['View Mode'] || 'default';

    if (!filePath) {
      new Notice('Error: File path not set in QuickAdd settings.');
      return;
    }

    const file = params.app.vault.getAbstractFileByPath(filePath);

    if (!file) {
      new Notice(`File not found: ${filePath}`);
      return;
    }

    const isMobile = params.app.isMobile;
    const openInNewTab = !isMobile;

    const leaf = await params.app.workspace.getLeaf(openInNewTab);
    await leaf.openFile(file);

    // Установка режима просмотра, если указан
    if (viewMode !== 'default') {
      const viewState = leaf.getViewState();
      viewState.state.mode = viewMode;
      await leaf.setViewState(viewState);
    }
  },
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
