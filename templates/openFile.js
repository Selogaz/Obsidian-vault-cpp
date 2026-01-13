module.exports = {
  entry: async (params, settings) => {
    const filePath = settings['File Path'];

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

    await params.app.workspace.getLeaf(openInNewTab).openFile(file);
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
    },
  },
};
