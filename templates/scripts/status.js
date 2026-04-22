module.exports = async function status(type) {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  let statuses;

  if (type === 'project') {
    statuses = {
      '📥 inbox': '📥',
      '❄  hold': '❄',
      '🟥 todo': '🟥',
      '🟦 wip': '🟦',
      '🟩 done': '🟩',
      '📢 published': '📢',
      '⬛ drop': '⬛',
    };
  } else if (type === 'source') {
    statuses = {
      '📥 inbox': '📥',
      '🟥 todo': '🟥',
      '🟦 wip': '🟦',
      '⚛ atom': '⚛',
      '🟩 done': '🟩',
      '⬛ drop': '⬛',
    };
  } else if (type === 'task') {
    statuses = {
      '📥 inbox': '📥',
      '❄  hold': '❄',
      '🟥 todo': '🟥',
      '🟦 wip': '🟦',
      '🟩 done': '🟩',
      '⬛ drop': '⬛',
    };
  } else if (type === 'heading') {
    statuses = {
      '⬛': '⬛ abandoned',
      '⚙️': '⚙️ service structure',
      '🟥': '👀 | 🟥 todo or queue',
      '💡': '👀 | 💡 idea',
      '🧠': '🛠 | 🧠 blob or brainstorming',
      '🔎': '🛠 | 🔎 aggregation or research',
      '🟦': '✍ | 🟦 wip',
      '📋': '✍ | 📋 revising or improve structure',
      '🖍': '✍ | 🖍 editing or critique',
      '🟩': '📨 | 🟩 completed or pending distribution',
      '📦': '📨 | 📦 preparation for distribution or compilation',
      '📢': '📨 | 📢 distributed',
    };

    const status = await tp.system.suggester(
      Object.values(statuses),
      Object.keys(statuses),
      true,
      'Select status:'
    );

    const cmEditorAct = app.workspace.activeLeaf.view.editor;
    const currentCursor = cmEditorAct.getCursor();
    const currentLine = currentCursor.line;
    const originLineContents = cmEditorAct.getLine(currentLine);
    const lineSelection = tp.file.selection();

    let lineContents = '';
    let isSelection = false;
    if (lineSelection.length >= originLineContents.length) {
      lineContents = lineSelection;
      isSelection = true;
    } else {
      lineContents = originLineContents;
      isSelection = false;
    }

    const statusRegex = new RegExp(Object.keys(statuses).join('|'), 'g');

    if (statusRegex.test(lineContents)) {
      lineContents = lineContents.replace(statusRegex, status);
    } else {
      lineContents = lineContents.replace(/# /, '# ' + status + ' ');
    }

    if (isSelection) {
      return lineContents;
    } else {
      cmEditorAct.replaceRange(
        lineContents,
        { line: currentLine, ch: 0 },
        { line: currentLine, ch: originLineContents.length }
      );
      return '';
    }
  } else {
    statuses = {
      '📥 inbox': '📥',
      '🟥 todo': '🟥',
      '🟦 wip': '🟦',
      '⚛ atom': '⚛',
      '🟩 done': '🟩',
    };
  }

  let status = await tp.system.suggester(
    Object.keys(statuses),
    Object.values(statuses),
    false,
    'Set the status'
  );

  if (status == null) {
    status = '📥';
  }

  return status;
};
