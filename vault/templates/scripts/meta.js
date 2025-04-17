module.exports = async function meta(category) {
  const dv = app.plugins.plugins["dataview"].api;
  const tp =
    app.plugins.plugins["templater-obsidian"].templater
      .current_functions_object;

  let meta_notes;
  let meta;

  if (category) {
    meta_notes = dv
      .pages("#system/high/meta AND -#mark/ignore")
      .where((p) => dv.func.contains(p.file.frontmatter.category, category))
      .sort((p) => p.file.tags, "desc");

    if (meta_notes.length > 0) {
      meta = await tp.system.suggester(
        meta_notes.map(function (value) {
          tags = value.file.tags;
          prefix = "🔎 ";
          if (/mark\/aggregator/.test(tags)) {
            prefix = "⇶ ";
          }
          return prefix + value.file.name;
        }),
        meta_notes.file.name,
        false,
        "Select the meta-note",
      );
    }
  }
  if (meta == null) {
    meta = "";
  }

  return meta;
};
