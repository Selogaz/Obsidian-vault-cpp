module.exports = async function refactor() {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const full_text = tp.file.selection();
  const text_split = full_text.split('\n');
  const file_name = text_split[0].trim();
  const content = text_split.slice(1).join('\n');

  const note = await tp.user.note(file_name, content);
  const template = note.template;
  const title = note.title;

  await tp.file.create_new(template, title);

  await navigator.clipboard.writeText('[[' + title + ']]');
  new Notice('link sent to clipboard', 3000);

  return '![[' + title + tp.file.cursor() + ']]';
};
