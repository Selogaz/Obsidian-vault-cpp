const category = dv.current().file.name.replace(/ /g, '_');

const groupByType = `
group by function \
  for (let i = 0; i < task.tags.length; i++) { \
    let t = task.tags[i]; \
    if (t.startsWith("#task/")) { \
      let k = t.slice(6); \
      if (k === "inbox")         return "%%01%% [[inbox|inbox]]"; \
      if (k === "next_action")   return "%%02%% [[next_action|next action]]"; \
      if (k === "one-off")       return "%%03%% [[one-off|one-off]]"; \
      if (k === "multistep")     return "%%04%% [[multistep|multistep]]"; \
      if (k === "waiting_for")   return "%%05%% [[waiting_for|waiting for]]"; \
      if (k === "regular")       return "%%06%% [[regular|regular]]"; \
      if (k === "idea")          return "%%07%% [[idea|ideas]]"; \
      if (k === "reference")     return "%%08%% [[reference|references]]"; \
      if (k === "someday")       return "%%09%% [[someday|someday]]"; \
    } \
  } \
  return "%%00%% Without status";
`;

const groupByPriority = `
group by function \\
  if (task.priorityName === "Highest") return "- %%01%%🔺 Important and urgent"; \\
  if (task.priorityName === "High") return "- %%02%%⏫ Important"; \\
  if (task.priorityName === "Medium") return "- %%03%%🔼 Medium"; \\
  if (task.priorityName === "Normal") return "- %%04%%⚪ Normal"; \\
  if (task.priorityName === "Low") return "- %%05%%🔽 Delegate"; \\
  if (task.priorityName === "Lowest") return "- %%06%%⏬ Eliminate"; \\
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

const groupByBacklink = `
group by function \\
  if (task.file.folder.includes("periodic/")) return "%%_%%"; \\
  return "- [[" + task.file.filenameWithoutExtension + "]]";
`;

const sortByTime = `
sort by function \\
  let cache = query.searchCache.sortTime || (query.searchCache.sortTime = new Map()); \\
  let cached = cache.get(task); \\
  if (cached) return cached; \\
  let dateStr = task.happens ? task.happens.format("YYYY-MM-DD") : "9999-99-99"; \\
  let m = task.description && task.description.match(/⏰\\s*(\\d{1,2}:\\d{2})/); \\
  let timeStr = m ? (m[1].length == 4 ? "0" + m[1] : m[1]) : "99:99"; \\
  let result = dateStr + "T" + timeStr; \\
  cache.set(task, result); \\
  return result;
`;

const blockIdSuffix = Math.random().toString(36).slice(2, 9);

let activeGroups = {
  type: true,
  priority: false,
  time: false,
  effort: false,
  backlink: false,
};

const groupBlocks = [
  { key: 'type', code: groupByType },
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
(not done) OR (done today)
tags include #category/${category}
${activeCode}
${sortByTime}
hide task count
hide tags
`;

  return query;
}

function renderDataviewContent() {
  dv.container.innerHTML = '';

  const query = buildQuery();

  const buttonDefinitions = groupBlocks.map((btn) => ({
    key: btn.key,
    emoji:
      btn.key === 'type'
        ? '☑️'
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
