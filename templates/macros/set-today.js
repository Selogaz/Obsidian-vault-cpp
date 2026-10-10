const FIELD_NAME = 'Field name';
const OVERWRITE = 'Overwrite existing value';

module.exports = {
  entry: async (params, settings) => {
    const { app } = params;

    const fieldName = String(settings[FIELD_NAME] ?? '').trim();
    if (!fieldName) {
      throw new Error('Field name is not configured.');
    }

    const file = app.workspace.getActiveFile();
    if (!file || file.extension !== 'md') {
      throw new Error('No active Markdown file.');
    }

    const now = new Date();
    const today =
      `${now.getFullYear()}-` +
      `${String(now.getMonth() + 1).padStart(2, '0')}-` +
      `${String(now.getDate()).padStart(2, '0')}`;

    await app.fileManager.processFrontMatter(file, (fm) => {
      const currentValue = fm[fieldName];

      if (
        !settings[OVERWRITE] &&
        currentValue !== undefined &&
        currentValue !== null &&
        currentValue !== ''
      ) {
        return;
      }

      fm[fieldName] = today;
    });
  },

  settings: {
    name: 'Set field to today',
    author: 'Custom',
    options: {
      [FIELD_NAME]: {
        type: 'text',
        defaultValue: '',
        placeholder: 'start',
        description: "Frontmatter property that should receive today's date.",
      },

      [OVERWRITE]: {
        type: 'checkbox',
        defaultValue: false,
      },
    },
  },
};
