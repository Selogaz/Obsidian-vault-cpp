module.exports = async function callout(mode) {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  // inline callout
  if (mode === 'inline') {
    const callouts = {
      '💡': '💡 idea',
      '💎': '💎 my thought',
      '📌': '📌 key idea or important, or pay attention',
      '🧩': '🧩 example or case',
      '💬': '💬 comment',
      '👁️‍🗨️': '👁️‍🗨️ reviewed',
      '💭': '💭 quote',
      ℹ️: 'ℹ️ info',
      '🔗': '🔗 reference',
      '❌': '❌ no-no-no',
      '✅': '✅ completed, approved',
      '➡': '➡ output or result',
      '➕': '➕ additional',
      '🤖': '🤖 AI generated',
      '📃': '📃 article',
      '🌐': '🌐 web',
      '📖': '📖 book',
      '🎓': '🎓 course',
      '🎞️': '🎞️ movie',
      '🍿': '🍿 series',
      '🌸': '🌸 anime',
      '📻': '📻 podcast',
      '📹': '📹 video',
      '📼': '📼 playlist',
      '❓': '🔬|❓ Question',
      '👀': '🔬|👀 Observation',
      '❗': '🔬|❗ Claim',
      '🌀': '🔬|🌀 Evidence',
      '🧪': '🔬|🧪 Synthesis',
      '🪧': '🔬|🪧 Context snippet',
    };
    const callout = await tp.system.suggester(
      Object.values(callouts),
      Object.keys(callouts),
      true,
      'Select list-callout:'
    );
    return callout + ' ';
  }
  // block callout
  const noteContent = tp.file.selection();
  const callouts = {
    note: '✏ Note',
    info: 'ℹ Info',
    todo: '✔️ Todo',
    tip: '🔥 Tip',
    hint: '🔥 Hint',
    important: '🔥 important',
    abstract: '🏁 Abstract',
    summary: '🏁 Summary',
    tldr: '🏁 TLDR',
    question: '❓ Question',
    help: '❓ Help',
    faq: '❓ FAQ',
    quote: '💬 Quote',
    cite: '💬 Cite',
    example: '📑 Example',
    success: '✔ Success',
    check: '✔ Check',
    done: '✔ Done',
    warning: '⚠ Warning',
    caution: '⚠ Caution',
    attention: '⚠ Attention',
    failure: '❌ Failure',
    fail: '❌ Fail',
    missing: '❌ Missing',
    danger: '⚡ Danger',
    error: '⚡ Error',
    bug: '🐞 Bug',
    metadata: '📋 Metadata',
    my: '💎 my',
    image: '🖼️ image',
    link: '🔗 link',
    ai: '🤖 AI generated',
    mind: '🧠 Mindmap',
    toc: '👉 TOC',
  };
  const type = await tp.system.suggester(
    Object.values(callouts),
    Object.keys(callouts),
    true,
    'Select callout type.'
  );
  if (type == 'toc') {
    return `> [!toc]+\n> \`\`\`table-of-contents\n> \`\`\`\n`;
  }
  const fold = await tp.system.suggester(
    ['None', 'Expanded', 'Collapsed'],
    ['', '+', '-'],
    true,
    'Select callout fold option.'
  );
  const title = await tp.system.prompt('Title:', '', true);
  lines = noteContent.split('\n');
  let newContent = '';
  lines.forEach((l) => {
    newContent += '> ' + l + '\n';
  });
  newContent = newContent.replace(/\n$/, '');
  header = '>[!' + type + ']' + fold + ' ' + title + '\n';
  return header + newContent;
};
