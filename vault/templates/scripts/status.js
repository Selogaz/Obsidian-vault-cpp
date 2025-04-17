module.exports = async function status() {
  const tp =
    app.plugins.plugins["templater-obsidian"].templater
      .current_functions_object;

  const statuses = {
    "🟥 todo": "🟥",
    "🟦 wip": "🟦",
    "⚛ atom": "⚛",
    "🟩 done": "🟩",
    "📢 published": "📢",
    "❄  hold": "❄",
    "⬛ drop": "⬛",
  };

  let status = await tp.system.suggester(
    Object.keys(statuses),
    Object.values(statuses),
    false,
    "Set the status",
  );

  if (status == null) {
    status = "🟥";
  }

  return status;
};
