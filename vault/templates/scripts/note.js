module.exports = async function note(title, content) {
  const tp =
    app.plugins.plugins["templater-obsidian"].templater
      .current_functions_object;

  if (!title) {
    title = tp.file.title;
  }
  if (title.startsWith("Untitled")) {
    title = await tp.system.prompt("Title");
    await tp.file.rename(title);
  }

  if (content) {
    content = "\n" + content;
  } else {
    content = "";
  }

  const inputText = await tp.file.include("[[home/prefixes.md]]");

  function parseTextToDictionaries(text) {
    const lines = text.trim().split("\n");
    const dictionaries = {};
    let currentCategory = "";

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith("#")) {
        currentCategory = line.replace("# ", "").trim();
        dictionaries[currentCategory] = {};
      } else if (line) {
        if (/\s–\s/.test(line)) {
          const [key, value] = line.split("–").map((part) => part.trim());
          if (currentCategory) {
            dictionaries[currentCategory][key] = value;
          }
        }
      }
    });

    return dictionaries;
  }

  const prefixes = parseTextToDictionaries(inputText);
  const category_prefixes = prefixes.Categories || {};
  const specific_prefixes = prefixes.Specific || {};
  const code_prefixes = prefixes.Code || {};
  const system_prefixes = prefixes.System || {};

  const code_prefix_pattern = new RegExp(
    `^(${Object.values(code_prefixes).join("|")}) `,
  );
  const category_prefix_pattern = new RegExp(
    `^(${Object.values(category_prefixes).join("|")}) `,
  );
  const specific_prefix_pattern = new RegExp(
    `^(${Object.values(specific_prefixes).join("|")}) `,
  );
  const system_prefix_pattern = new RegExp(
    `^(${Object.values(system_prefixes).join("|")}) `,
  );

  const brackets_pattern = /\(\)/;

  const code_prefix = (title.match(code_prefix_pattern) || [])[1]?.trim();
  const category_prefix = (title.match(category_prefix_pattern) ||
    [])[1]?.trim();
  const specific_prefix = (title.match(specific_prefix_pattern) ||
    [])[1]?.trim();
  const system_prefix = (title.match(system_prefix_pattern) || [])[1]?.trim();

  const code_alias = title
    .replace(code_prefix_pattern, "")
    .replace(brackets_pattern, "")
    .trim();
  const category_alias = title
    .replace(category_prefix_pattern, "")
    .replace(brackets_pattern, "")
    .trim();
  const specific_alias = title
    .replace(specific_prefix_pattern, "")
    .replace(brackets_pattern, "")
    .trim();
  const system_alias = title
    .replace(system_prefix_pattern, "")
    .replace(brackets_pattern, "")
    .trim();

  let template;
  const created = tp.date.now("YYYY-MM-DDTHH:mm:ssZ");
  if (code_prefix) {
    template = `---
tags:
  - note/specific/code
  - category/${Object.keys(code_prefixes).find((k) =>
    code_prefixes[k].includes(code_prefix),
  )}
aliases:
  - ${code_alias}
deck: obsidian::${Object.keys(code_prefixes).find((k) =>
      code_prefixes[k].includes(code_prefix),
    )}
created: ${created}
updated: ${created}
---

**${code_alias}**
—${content}
`;
  } else if (category_prefix) {
    template = `---
tags:
  - note/specific/exact
  - category/${Object.keys(category_prefixes).find((k) =>
    category_prefixes[k].includes(category_prefix),
  )}
aliases: []
deck: obsidian::${Object.keys(category_prefixes).find((k) =>
      category_prefixes[k].includes(category_prefix),
    )}
created: ${created}
updated: ${created}
---

**${category_alias.charAt(0).toUpperCase()}${category_alias.slice(1)}**
—${content}
`;
    title = title.replace(category_prefix_pattern, "").trim();
  } else if (specific_prefix) {
    if (specific_prefix.includes("!")) {
      template = `---
tags:
  - note/specific/exact
aliases:
  - ^${Object.keys(specific_prefixes).find((k) =>
    specific_prefixes[k].includes(specific_prefix),
  )}
created: ${created}
updated: ${created}
---${content}

`;
    } else if (specific_prefix.includes("%")) {
      template = `---
tags:
  - note/specific/code
aliases:
  - ^${Object.keys(specific_prefixes).find((k) =>
    specific_prefixes[k].includes(specific_prefix),
  )}
created: ${created}
updated: ${created}
---${content}

`;
    } else {
      template = `---
tags:
  - note/basic/primary
aliases:
  - ^${Object.keys(specific_prefixes).find((k) =>
    specific_prefixes[k].includes(specific_prefix),
  )}
created: ${created}
updated: ${created}
---${content}

`;
    }
    title = title.replace(specific_prefix_pattern, "").trim();
  } else if (system_prefix) {
    const category = await tp.user.category();
    let meta;
    let problem;

    if (system_prefixes.meta.split("|").includes(system_prefix)) {
      template = `---
tags:
  - system/high/meta${category ? `\n  - category/${category}` : ""}
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ""}
relevant: false
created: ${created}
updated: ${created}
---${content}

😀
`;
    } else if (system_prefixes.problem.split("|").includes(system_prefix)) {
      meta = await tp.user.meta(category);
      template = `---
tags:
  - system/high/problem${category ? `\n  - category/${category}` : ""}
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ""}
meta:${meta ? `\n  - "[[${meta}]]"` : ""}
relevant: false
created: ${created}
updated: ${created}
---${content}

😀
`;
    } else {
      meta = await tp.user.meta(category);
      problem = await tp.user.problem(meta);
      template = `---
tags:
  - system/high/${Object.keys(system_prefixes).find((k) =>
    system_prefixes[k].includes(system_prefix),
  )}${category ? `\n  - category/${category}` : ""}
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ""}
meta:${meta ? `\n  - "[[${meta}]]"` : ""}
problem:${problem ? `\n  - "[[${problem}]]"` : ""}
relevant: false
created: ${created}
updated: ${created}
---${content}

😀
`;
    }

    title = title.replace(system_prefix_pattern, "").trim();
  } else {
    template = `---
tags:
  - note/basic/primary
aliases: []
created: ${created}
updated: ${created}
---${content}

`;
  }

  return { title, template };
};
