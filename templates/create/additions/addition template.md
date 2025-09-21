<%*
const additions = [
   // universal
  "💪 practice",
  "📁 attachments",
  "🕵 researches",
  "⬜ canvases",
  "🤖 AI",
  "➕ other",
  // source
  "📓 conspectuses",
  "🖍 annotations",
  // project
  "✅️ tasks",
  "🚨 reports",
  "🧪 experiments",
  "🗣️ meetings",
];

const addition = await tp.system.suggester(
  additions,
  additions.map((value) => value.replace(/^[^\s]*\s*/, "")),
  true,
  "Addition TYPE:",
);

const title = tp.file.title + " - " + addition;
const emoji = additions.find((k) => k.includes(addition)).split(" ")[0];

const template = `---
tags:
  - mark/addition/aggregator
---

`;

await tp.file.create_new(template, title, true, "base/additions");

setTimeout(() => {
  app.fileManager.processFrontMatter(tp.config.target_file, (frontmatter) => {
    if (frontmatter.addition) {
      frontmatter.addition.push("[[" + title + "|" + emoji + "]]");
    } else {
      frontmatter.addition = ["[[" + title + "|" + emoji + "]]"];
    }
  });
}, 200);
-%>