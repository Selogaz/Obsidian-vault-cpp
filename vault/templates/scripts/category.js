module.exports = async function category() {
  const dv = app.plugins.plugins["dataview"].api;
  const tp =
    app.plugins.plugins["templater-obsidian"].templater
      .current_functions_object;

  const categories = await dv
    .pages("#system/category AND -#mark/ignore")
    .sort((p) => p.file.name).file.name;

  let category = await tp.system.suggester(
    categories.map(function (value) {
      return "🗺️ " + value;
    }),
    categories,
    false,
    "Select the category",
  );

  if (category == null) {
    category = "";
  }

  return category;
};
