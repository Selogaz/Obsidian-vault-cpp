module.exports = async function note(title, content) {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const noteGenerator = new NoteGenerator(tp);
  return await noteGenerator.generate(title, content);
};

class NoteGenerator {
  constructor(tp) {
    this.tp = tp;
    this.prefixes = null;
  }

  async generate(title, content) {
    title = await this.resolveTitle(title);
    content = this.formatContent(content);

    await this.loadPrefixes();

    const prefixMatch = this.findPrefixMatch(title);
    const template = await this.generateTemplate(prefixMatch, content);
    const finalTitle = this.cleanTitle(title, prefixMatch);

    return { title: finalTitle, template };
  }

  async resolveTitle(title) {
    if (!title) {
      title = this.tp.file.title;
    }

    if (title.startsWith('Untitled')) {
      title = await this.tp.system.prompt('Title');
      await this.tp.file.rename(title);
    }

    return title;
  }

  formatContent(content) {
    return content ? '\n' + content : '';
  }

  async loadPrefixes() {
    try {
      const inputText = await this.tp.file.include('[[home/prefixes.md]]');
      this.prefixes = this.parseTextToDictionaries(inputText);
    } catch (error) {
      console.error('Error loading prefixes:', error);
      this.prefixes = {};
    }
  }

  parseTextToDictionaries(text) {
    const lines = text.trim().split('\n');
    const dictionaries = {};
    let currentCategory = '';

    lines.forEach((line) => {
      line = line.trim();
      if (line.startsWith('# ')) {
        currentCategory = line.replace('# ', '').trim();
        dictionaries[currentCategory] = {};
      } else if (line && /\s–\s/.test(line) && !line.startsWith('//')) {
        const [key, value] = line.split('–').map((part) => part.trim());
        if (currentCategory && key && value) {
          const normalizedKey = key.replace(/ /g, '_');

          if (normalizedKey.includes(',')) {
            const [mainCategory, ...subcategories] = normalizedKey
              .split(',')
              .map((cat) => cat.trim());
            dictionaries[currentCategory][normalizedKey] = {
              prefix: value,
              mainCategory: mainCategory,
              subcategories: subcategories,
              fullPath: `${mainCategory}/${subcategories.join('/')}`,
            };
          } else {
            dictionaries[currentCategory][normalizedKey] = value;
          }
        }
      }
    });

    return dictionaries;
  }

  findPrefixMatch(title) {
    const prefixTypes = ['Categories', 'Specific', 'Code', 'System'];

    for (const type of prefixTypes) {
      const prefixes = this.prefixes[type] || {};

      const allPrefixes = [];
      Object.entries(prefixes).forEach(([key, value]) => {
        if (typeof value === 'object' && value.prefix) {
          if (value.prefix.includes('|')) {
            allPrefixes.push(
              ...value.prefix.split('|').map((p) => ({
                prefix: p.trim(),
                categoryInfo: value,
                originalKey: key,
              }))
            );
          } else {
            allPrefixes.push({
              prefix: value.prefix,
              categoryInfo: value,
              originalKey: key,
            });
          }
        } else if (typeof value === 'string') {
          if (value.includes('|')) {
            allPrefixes.push(
              ...value.split('|').map((p) => ({
                prefix: p.trim(),
                categoryInfo: null,
                originalKey: key,
              }))
            );
          } else {
            allPrefixes.push({
              prefix: value,
              categoryInfo: null,
              originalKey: key,
            });
          }
        }
      });

      for (const prefixData of allPrefixes) {
        const pattern = new RegExp(
          `^(${prefixData.prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}) `
        );
        const match = title.match(pattern);

        if (match) {
          return {
            type: type.toLowerCase(),
            prefix: match[1].trim(),
            pattern,
            prefixes,
            alias: this.generateAlias(title, pattern),
            categoryInfo: prefixData.categoryInfo,
            originalKey: prefixData.originalKey,
          };
        }
      }
    }

    return null;
  }

  generateAlias(title, pattern) {
    return title.replace(pattern, '').replace(/\(\)/, '').trim();
  }

  cleanTitle(title, prefixMatch) {
    if (
      prefixMatch &&
      ['categories', 'specific', 'system'].includes(prefixMatch.type)
    ) {
      return title.replace(prefixMatch.pattern, '').trim();
    }
    return title;
  }

  async generateTemplate(prefixMatch, content) {
    const created = this.tp.date.now('YYYY-MM-DDTHH:mm:ssZ');

    if (!prefixMatch) {
      return this.createBasicTemplate(created, content);
    }

    const templateGenerators = {
      code: () => this.createCodeTemplate(prefixMatch, created, content),
      categories: () =>
        this.createCategoryTemplate(prefixMatch, created, content),
      specific: () =>
        this.createSpecificTemplate(prefixMatch, created, content),
      system: () => this.createSystemTemplate(prefixMatch, created, content),
    };

    const generator = templateGenerators[prefixMatch.type];
    return generator
      ? await generator()
      : this.createBasicTemplate(created, content);
  }

  createBasicTemplate(created, content) {
    return `---
tags:
  - note/basic/primary
aliases: []
created: ${created}
updated: ${created}
---
${content}
`;
  }

  createCodeTemplate(prefixMatch, created, content) {
    let category, deckPath;

    if (prefixMatch.categoryInfo) {
      category = prefixMatch.categoryInfo.fullPath;
      deckPath = prefixMatch.categoryInfo.fullPath.replace(/\//g, '::');
    } else {
      category = this.findPrefixKey(prefixMatch.prefixes, prefixMatch.prefix);
      deckPath = category;
    }

    const normalizedCategory = this.normalizeCategory(category);

    return `---
tags:
  - note/specific/code
  - category/${normalizedCategory}
aliases:
  - ${prefixMatch.alias}
deck: obsidian::${deckPath}
created: ${created}
updated: ${created}
---

**${prefixMatch.alias}**
—${content}`;
  }

  createCategoryTemplate(prefixMatch, created, content) {
    let category, deckPath;

    if (prefixMatch.categoryInfo) {
      category = prefixMatch.categoryInfo.fullPath;
      deckPath = prefixMatch.categoryInfo.fullPath.replace(/\//g, '::');
    } else {
      category = this.findPrefixKey(prefixMatch.prefixes, prefixMatch.prefix);
      deckPath = category;
    }

    const normalizedCategory = this.normalizeCategory(category);

    if (prefixMatch.prefix.startsWith('-')) {
      return `---
tags:
  - note/basic/primary
  - category/${normalizedCategory}
aliases: []
created: ${created}
updated: ${created}
---

${content}
`;
    }

    const capitalizedAlias = this.capitalizeFirst(prefixMatch.alias);

    return `---
tags:
  - note/specific/exact
  - category/${normalizedCategory}
aliases: []
deck: obsidian::${deckPath}
created: ${created}
updated: ${created}
---

**${capitalizedAlias}**
—${content}`;
  }

  createSpecificTemplate(prefixMatch, created, content) {
    const key = this.findPrefixKey(prefixMatch.prefixes, prefixMatch.prefix);
    const aliasPrefix =
      prefixMatch.prefix.includes('!') || prefixMatch.prefix.includes('%')
        ? '^'
        : '^';

    let tag = 'note/basic/primary';
    if (prefixMatch.prefix.includes('!')) {
      tag = 'note/specific/exact';
    } else if (prefixMatch.prefix.includes('%')) {
      tag = 'note/specific/code';
    }

    return `---
tags:
  - ${tag}
aliases:
  - ${aliasPrefix}${key}
created: ${created}
updated: ${created}
---${content}

`;
  }

  async createSystemTemplate(prefixMatch, created, content) {
    const systemPrefixes = this.prefixes.System || {};
    const category = await this.tp.user.category();

    if (
      systemPrefixes.meta &&
      systemPrefixes.meta.split('|').includes(prefixMatch.prefix)
    ) {
      return this.createMetaSystemTemplate(category, created, content);
    }

    if (
      systemPrefixes.problem &&
      systemPrefixes.problem.split('|').includes(prefixMatch.prefix)
    ) {
      return await this.createProblemSystemTemplate(category, created, content);
    }

    return await this.createGenericSystemTemplate(
      prefixMatch,
      category,
      created,
      content
    );
  }

  createMetaSystemTemplate(category, created, content) {
    const normalizedCategory = this.normalizeCategory(category);

    return `---
tags:
  - system/high/meta${
    normalizedCategory ? `\n  - category/${normalizedCategory}` : ''
  }
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ''}
relevant: false
created: ${created}
updated: ${created}
---${content}

💤`;
  }

  async createProblemSystemTemplate(category, created, content) {
    const meta = await this.tp.user.meta(category);
    const normalizedCategory = this.normalizeCategory(category);

    return `---
tags:
  - system/high/problem${
    normalizedCategory ? `\n  - category/${normalizedCategory}` : ''
  }
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ''}
meta:${meta ? `\n  - "[[${meta}]]"` : ''}
relevant: false
created: ${created}
updated: ${created}
---${content}

💤`;
  }

  async createGenericSystemTemplate(prefixMatch, category, created, content) {
    const systemType = this.findPrefixKey(
      this.prefixes.System,
      prefixMatch.prefix
    );
    const meta = await this.tp.user.meta(category);
    const problem = await this.tp.user.problem(meta);
    const normalizedCategory = this.normalizeCategory(category);

    return `---
tags:
  - system/high/${systemType}${
      normalizedCategory ? `\n  - category/${normalizedCategory}` : ''
    }
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ''}
meta:${meta ? `\n  - "[[${meta}]]"` : ''}
problem:${problem ? `\n  - "[[${problem}]]"` : ''}
relevant: false
created: ${created}
updated: ${created}
---${content}

💤`;
  }

  findPrefixKey(prefixes, prefix) {
    return Object.keys(prefixes).find((k) => {
      const value = prefixes[k];
      if (typeof value === 'object' && value.prefix) {
        return value.prefix.includes('|')
          ? value.prefix.split('|').includes(prefix)
          : value.prefix === prefix;
      } else if (typeof value === 'string') {
        return value.includes('|')
          ? value.split('|').includes(prefix)
          : value === prefix;
      }
      return false;
    });
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  normalizeCategory(category) {
    return category ? category.replace(/ /g, '_').toLowerCase() : category;
  }
}
