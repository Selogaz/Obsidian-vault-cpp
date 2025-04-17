module.exports = async function meta(meta) {
  const dv = app.plugins.plugins["dataview"].api;
  const tp =
    app.plugins.plugins["templater-obsidian"].templater
      .current_functions_object;

  let problem_notes;
  let problem;

  if (meta) {
    problem_notes = dv
      .pages("#system/high/problem AND -#mark/ignore")
      .where((p) => dv.func.contains(p.file.frontmatter.meta, meta)).file.name;
    if (problem_notes.length > 0) {
      problem = await tp.system.suggester(
        problem_notes.map(function (value) {
          return "⚡ " + value;
        }),
        problem_notes,
        false,
        "Select the problem",
      );
    }
  } else {
    problem = "";
  }

  if (problem == null) {
    problem = "";
  }

  return problem;
};
