<%*
const callouts = {
  "💡": "💡 idea",
  "💎": "💎 my thought",
  "📌": "📌 key idea or important, or pay attention",
  "🧩": "🧩 example or case",
  "💬": "💬 comment",
  "👁️‍🗨️": "👁️‍🗨️ reviewed",
  "💭": "💭 quote",
  "ℹ️": "ℹ️ info",
  "🔗": "🔗 reference",
  "❌": "❌ no-no-no",
  "✅": "✅ completed, approved",
  "➡": "➡ output or result",
  "➕": "➕ additional",
  "🤖": "🤖 AI generated",
  // sources
  "📃": "📃 article",
  "🌐": "🌐 web",
  "📖": "📖 book",
  "🎓": "🎓 course",
  "🎞️": "🎞️ movie",
  "🍿": "🍿 series",
  "🌸": "🌸 anime",
  "📻": "📻 podcast",
  "📹": "📹 video",
  "📼": "📼 playlist",
  // discourse
  "❓": "🔬|❓ Question",
  "👀": "🔬|👀 Observation",
  "❗": "🔬|❗ Claim",
  "🌀": "🔬|🌀 Evidence",
  "🧪": "🔬|🧪 Synthesis",
  "🪧": "🔬|🪧 Context snippet",
};
const callout = await tp.system.suggester(
  Object.values(callouts),
  Object.keys(callouts),
  true,
  "Select list-callout:",
);
-%><% callout + " " %>