module.exports = async function milestone(project) {
  const dv = app.plugins.plugins['dataview'].api;
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  let milestone = '';

  if (project) {
    const pages = dv
      .pages('#task/milestone')
      .where((p) => {
        const projs = Array.isArray(p.project) ? p.project : [p.project];
        return projs.some((link) => link?.path === project);
      })
      .sort((p) => p.file.name)
      .sort((p) => {
        const status = p.file.frontmatter?.status;
        if (status === '🟦') return -2;
        if (status === '🟥') return -1;
        return 0;
      });

    if (pages.length > 0) {
      milestone = await tp.system.suggester(
        pages.map((p) => {
          const status = p.file.frontmatter?.status || '';
          return `${status} ${p.file.name}`;
        }),
        pages.map((p) => p.file.name),
        false,
        'Select the milestone'
      );
    }
  }

  if (milestone == null) {
    milestone = '';
  }

  return milestone;
};
