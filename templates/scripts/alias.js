module.exports = async function alias() {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  let selectedText = tp.file.selection();
  let alias = 'new';

  if (selectedText) {
    setTimeout(() => {
      app.fileManager.processFrontMatter(
        tp.config.target_file,
        (frontmatter) => {
          if (frontmatter.aliases) {
            if (!frontmatter.aliases.includes(selectedText)) {
              frontmatter.aliases.push(selectedText);
              new Notice(`Alias "${selectedText}" added`);
            }
          } else {
            frontmatter.aliases = [selectedText];
            new Notice(`Alias "${selectedText}" added`);
          }
        }
      );
    }, 200);
    return selectedText;
  } else {
    while (alias != null && alias != '') {
      alias = await tp.system.prompt('new alias');

      if (alias != null && alias != '') {
        setTimeout(() => {
          app.fileManager.processFrontMatter(
            tp.config.target_file,
            (frontmatter) => {
              if (frontmatter.aliases) {
                if (!frontmatter.aliases.includes(alias)) {
                  frontmatter.aliases.push(alias);
                  new Notice(`Alias "${alias}" added`);
                }
              } else {
                frontmatter.aliases = [alias];
                new Notice(`Alias "${alias}" added`);
              }
            }
          );
        }, 200);
      }
    }
    return '';
  }
};
