const type = input?.type ?? dv.current().file.name.replace(/ /g, '_');

const groupByCategory = `
group by function \\
  task.tags \\
    .filter(tag => tag.includes("#category/")) \\
    .map(tag => "[[" + tag.split("/")[1].replace("_", " ") + "]]")
`;

const groupByPriority = `
group by function \\
  if (task.tags.includes("#priority/a")) return "- %%01%%🇦 Important and urgent"; \\
  if (task.tags.includes("#priority/b")) return "- %%02%%🇧 Important"; \\
  if (task.tags.includes("#priority/c")) return "- %%03%%🇨 Сommon task"; \\
  if (task.tags.includes("#priority/d")) return "- %%04%%🇩 Delegate"; \\
  if (task.tags.includes("#priority/e")) return "- %%05%%🇪 Eliminate"; \\
  return "%%99%%";
`;

const groupByTime = `
group by function \\
  if (task.tags.includes("#time/quick")) return "- %%01%%🤏 quick (t ⪅ 15 min)"; \\
  if (task.tags.includes("#time/moderate")) return "- %%02%%🐰 moderate (15min < t < 2 hours)"; \\
  if (task.tags.includes("#time/lengthy")) return "- %%03%%🐢 lengthy (2 hours ⪅ t < 5 hours)"; \\
  if (task.tags.includes("#time/long")) return "- %%04%%🐌 long (t ⪆ 5 hours)"; \\
  return "%%99%%";
`;

const groupByEffort = `
group by function \\
  if (task.tags.includes("#effort/easy")) return "- %%01%%❤ easy"; \\
  if (task.tags.includes("#effort/medium")) return "- %%02%%❤️‍🔥 😓 medium"; \\
  if (task.tags.includes("#effort/hard")) return "- %%03%%🫀 🥵 😨 hard"; \\
  return "%%99%%";
`;

const groupByBacklink =
  type !== 'inbox'
    ? `
group by function \\
  if (task.file.folder.includes("periodic/")) return "%%_%%"; \\
  return "- [[" + task.file.filenameWithoutExtension + "]]";
`
    : `
group by backlink
`;

const sortByTime = `
sort by function \\
  let dateStr = task.happens ? task.happens.format("YYYY-MM-DD") : "9999-99-99"; \\
  let m = task.description && task.description.match(/⏰\\s*(\\d{1,2}:\\d{2})/); \\
  let timeStr = m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99"; \\
  return dateStr + "T" + timeStr;
`;

const blockIdSuffix = Math.random().toString(36).slice(2, 9);

let activeGroups = {
  category: type === 'inbox' ? false : true,
  priority: false,
  time: false,
  effort: false,
  backlink: type === 'inbox' ? true : false,
};

const groupBlocks = [
  { key: 'category', code: groupByCategory },
  { key: 'priority', code: groupByPriority },
  { key: 'time', code: groupByTime },
  { key: 'effort', code: groupByEffort },
  { key: 'backlink', code: groupByBacklink },
];

function buildQuery() {
  const activeCode = groupBlocks
    .filter((block) => activeGroups[block.key])
    .map((block) => block.code)
    .join('\n');

  let query = `
not done
tags include #task/${type}
${activeCode}
${sortByTime}
hide task count
hide tags
`;
  // So far, this feature is too slow
  // if (type === 'multistep') {
  // 	query += '\nshow tree'
  // }

  return query;
}

function renderDataviewContent() {
  dv.container.innerHTML = '';

  const query = buildQuery();

  const buttonDefinitions = groupBlocks.map((btn) => ({
    key: btn.key,
    emoji:
      btn.key === 'category'
        ? '🗺️'
        : btn.key === 'priority'
          ? '🔺'
          : btn.key === 'time'
            ? '⏳'
            : btn.key === 'effort'
              ? '❤️'
              : btn.key === 'backlink'
                ? '🔗'
                : '',
    title: `Group by ${btn.key.charAt(0).toUpperCase() + btn.key.slice(1)}`,
    id: `btn-${blockIdSuffix}-${btn.key}`,
  }));

  let buttonsHtml = `<div data-task-buttons="${blockIdSuffix}" style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 10px; padding: 8px; background: transparent;">\n`;

  for (const btn of buttonDefinitions) {
    buttonsHtml += `   <button id="${btn.id}" style="background: ${
      activeGroups[btn.key] ? 'rgba(128, 128, 128, 0.1)' : 'transparent'
    }; border: 1px solid rgba(128, 128, 128, 0); border-radius: 6px; padding: 6px 10px; margin: 2px; cursor: pointer; font-size: 16px; transition: all 0.2s ease; box-shadow: ${
      activeGroups[btn.key]
        ? '0 2px 4px rgba(0,0,0,0.2)'
        : '0 1px 2px rgba(0,0,0,0.1)'
    };" title="${btn.title}">${btn.emoji}</button>\n`;
  }

  buttonsHtml += '</div>\n';

  let contentString = '';
  contentString += buttonsHtml + '\n';

  contentString += `\`\`\`tasks\n${query}\n\`\`\`\n`;

  dv.paragraph(contentString);

  for (const btn of buttonDefinitions) {
    const buttonElement = dv.container.querySelector(`#${btn.id}`);
    if (buttonElement) {
      buttonElement.addEventListener('click', () => {
        activeGroups[btn.key] = !activeGroups[btn.key];
        renderDataviewContent();
      });
    }
  }
}

renderDataviewContent();
