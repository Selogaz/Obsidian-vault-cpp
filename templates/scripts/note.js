module.exports = async function note(title, content) {
  const tp =
    app.plugins.plugins['templater-obsidian'].templater
      .current_functions_object;

  const noteGenerator = new NoteGenerator(tp);
  return await noteGenerator.generate(title, content);
};

const PREFIXES_PATH = 'home/prefixes.md';
const SECTIONS = ['Categories', 'Specific', 'Code', 'System'];
const SYSTEM_TYPES = ['meta', 'hierarchy', 'problem'];

// Any dash a person might type is accepted as the separator; ` – ` stays canonical.
const DASH_CLASS = '[\\u002d\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015\\u2212]';
const SEPARATOR_RE = new RegExp('\\s' + DASH_CLASS + '\\s');
const ANY_DASH_RE = new RegExp(DASH_CLASS);

// Non-breaking / typographic spaces are invisible but break every match.
const ODD_SPACES_RE = /[   -   　]/g;

// Leading markdown a refactored selection drags along: bullets, tasks, quotes, headings.
const LIST_MARKERS_RE =
  /^(?:(?:[-*+]\s+\[[ xX]\]|[-*+]|\d+[.)]|>+|#{1,6})\s+)+/;

// Letters that look Latin but are not. Used only to explain a failed match.
const HOMOGLYPHS = {
  а: 'a', е: 'e', о: 'o', р: 'p', с: 'c', у: 'y', х: 'x', ѕ: 's', і: 'i',
  ј: 'j', ԁ: 'd', ԛ: 'q', ԝ: 'w', м: 'm', т: 't', н: 'h', к: 'k', в: 'b',
  А: 'A', В: 'B', Е: 'E', К: 'K', М: 'M', Н: 'H', О: 'O', Р: 'P', С: 'C',
  Т: 'T', Х: 'X', Ѕ: 'S', І: 'I', Ј: 'J',
  α: 'a', ο: 'o', ρ: 'p', τ: 't', υ: 'u', χ: 'x', ν: 'v',
  Α: 'A', Β: 'B', Ε: 'E', Ζ: 'Z', Η: 'H', Ι: 'I', Κ: 'K', Μ: 'M', Ν: 'N',
  Ο: 'O', Ρ: 'P', Τ: 'T', Υ: 'Y', Χ: 'X',
};

class NoteGenerator {
  constructor(tp) {
    this.tp = tp;
    this.prefixes = {};
    this.entries = [];
    this.issues = [];
    this.rawLines = [];
    this.parsedLines = new Set();
    this.diagnostics = [];
  }

  async generate(title, content) {
    title = await this.resolveTitle(title);
    content = this.formatContent(content);

    await this.loadPrefixes();

    const prefixMatch = this.findPrefixMatch(title);
    if (prefixMatch) {
      this.checkMatch(prefixMatch);
    } else {
      this.diagnoseNoMatch(title);
    }

    const template = await this.generateTemplate(prefixMatch, content);
    const finalTitle = this.cleanTitle(title, prefixMatch);

    this.report();

    return { title: finalTitle, template };
  }

  // ---------------------------------------------------------------- input

  async resolveTitle(title) {
    if (!title) {
      title = this.tp.file.title;
    }

    if (title && title.startsWith('Untitled')) {
      const prompted = await this.tp.system.prompt('Title');
      if (prompted) {
        title = prompted;
        await this.tp.file.rename(title);
      }
    }

    return this.normalizeTitle(title || '');
  }

  // Strips list/quote/heading markers and folds exotic spaces, so a title
  // copied out of a bullet or a callout still reaches the prefix matcher.
  normalizeTitle(title) {
    return String(title)
      .replace(ODD_SPACES_RE, ' ')
      .trim()
      .replace(LIST_MARKERS_RE, '')
      .trim();
  }

  formatContent(content) {
    return content ? '\n' + content : '';
  }

  // ------------------------------------------------------------- prefixes

  async loadPrefixes() {
    const text = await this.readPrefixesFile();
    if (text === null) return;
    this.parsePrefixes(text);
  }

  async readPrefixesFile() {
    try {
      let file = app.vault.getAbstractFileByPath(PREFIXES_PATH);
      if (!file) {
        file = app.metadataCache.getFirstLinkpathDest(
          PREFIXES_PATH.replace(/\.md$/, ''),
          ''
        );
      }
      if (!file) {
        this.diagnostics.push(
          `Cannot find "${PREFIXES_PATH}". Prefixes were not applied.`
        );
        return null;
      }
      return await app.vault.cachedRead(file);
    } catch (error) {
      console.error('note.js: could not read prefixes', error);
      this.diagnostics.push(
        `Could not read "${PREFIXES_PATH}": ${error.message}`
      );
      return null;
    }
  }

  parsePrefixes(text) {
    this.rawLines = text.split('\n');
    SECTIONS.forEach((section) => (this.prefixes[section] = {}));

    let section = null;
    let heading = null;
    let seenSection = false;
    let fence = null;
    let order = 0;

    this.rawLines.forEach((rawLine, index) => {
      const lineNo = index + 1;
      const line = rawLine.replace(ODD_SPACES_RE, ' ').trim();

      // Fenced blocks hold documentation examples, never real entries.
      const fenceMatch = line.match(/^(`{3,}|~{3,})/);
      if (fenceMatch) {
        const marker = fenceMatch[1][0].repeat(3);
        if (!fence) fence = marker;
        else if (marker === fence) fence = null;
        return;
      }
      if (fence) return;

      const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
      if (headingMatch) {
        heading = headingMatch[1].trim();
        const canonical = SECTIONS.find(
          (s) => s.toLowerCase() === heading.toLowerCase()
        );
        section = canonical || null;
        if (canonical) seenSection = true;
        return;
      }

      if (!line || line.startsWith('//')) return;

      const separator = line.match(SEPARATOR_RE);

      if (!separator) {
        // Everything above the first section heading is prose documentation.
        if (seenSection && section && ANY_DASH_RE.test(line)) {
          this.issues.push({
            lineNo,
            line,
            reason: 'no separator found. Put a space on each side of the dash',
          });
        }
        return;
      }

      const key = line.slice(0, separator.index).trim();
      const value = line.slice(separator.index + separator[0].length).trim();

      if (!seenSection) return;

      if (!key || !value) {
        this.issues.push({
          lineNo,
          line,
          reason: 'the category or the prefix is empty',
        });
        return;
      }

      if (!section) {
        this.issues.push({
          lineNo,
          line,
          reason: heading
            ? `it sits under an unknown heading "${heading}". Only these headings work: ${SECTIONS.join(', ')}`
            : 'it sits outside every known heading',
        });
        return;
      }

      const normalizedKey = key.replace(/ /g, '_');
      const prefixList = value
        .split('|')
        .map((p) => p.trim())
        .filter(Boolean);

      if (!prefixList.length) {
        this.issues.push({ lineNo, line, reason: 'the prefix could not be read' });
        return;
      }

      const entry = {
        section,
        key: normalizedKey,
        value,
        prefixes: prefixList,
        lineNo,
        line,
        order: order++,
        categoryInfo: null,
      };

      if (normalizedKey.includes(',')) {
        const [mainCategory, ...subcategories] = normalizedKey
          .split(',')
          .map((cat) => cat.trim());
        entry.categoryInfo = {
          prefix: value,
          mainCategory,
          subcategories,
          fullPath: `${mainCategory}/${subcategories.join('/')}`,
        };
      }

      this.entries.push(entry);
      this.parsedLines.add(lineNo);
      this.prefixes[section][normalizedKey] = entry.categoryInfo || value;
    });
  }

  // -------------------------------------------------------------- matching

  // Longest prefix first so a new `cs2` can never be shadowed by `cs`;
  // section order (Categories → Specific → Code → System) breaks ties.
  candidatePrefixes() {
    const candidates = [];
    this.entries.forEach((entry) => {
      entry.prefixes.forEach((prefix) => {
        candidates.push({
          prefix,
          entry,
          rank: SECTIONS.indexOf(entry.section) * 100000 + entry.order,
        });
      });
    });
    return candidates.sort(
      (a, b) => b.prefix.length - a.prefix.length || a.rank - b.rank
    );
  }

  findPrefixMatch(title) {
    if (!title) return null;

    for (const candidate of this.candidatePrefixes()) {
      // The prefix must be followed by whitespace AND real title text.
      const pattern = new RegExp(
        `^(${this.escapeRegExp(candidate.prefix)})\\s+(?=\\S)`
      );
      const match = title.match(pattern);
      if (!match) continue;

      return {
        type: candidate.entry.section.toLowerCase(),
        prefix: match[1].trim(),
        pattern,
        entry: candidate.entry,
        alias: this.generateAlias(title, pattern),
        categoryInfo: candidate.entry.categoryInfo,
        originalKey: candidate.entry.key,
      };
    }

    return null;
  }

  // Escaped values are always interpolated outside a character class, where
  // `-` is literal. Escaping it would break the `u`-flagged regex below.
  escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

  // ----------------------------------------------------------- diagnostics

  // Runs only on a successful match, and only speaks up when the match is
  // ambiguous or the entry sits in a section that cannot do what it promises.
  checkMatch(prefixMatch) {
    const entry = prefixMatch.entry;

    const duplicates = this.entries.filter(
      (other) => other !== entry && other.prefixes.includes(prefixMatch.prefix)
    );
    if (duplicates.length) {
      const where = [entry, ...duplicates]
        .map((e) => `line ${e.lineNo} (${e.key})`)
        .join(', ');
      this.diagnostics.push(
        `The prefix "${prefixMatch.prefix}" is set more than once: ${where}. The first one was used: "${entry.key}".`
      );
    }

    if (entry.section === 'System' && !SYSTEM_TYPES.includes(entry.key)) {
      this.diagnostics.push(
        `"${entry.key}" (line ${entry.lineNo}) is in the "# System" section, which only allows ${SYSTEM_TYPES.join(', ')}. This note gets the tag system/high/${entry.key}, with no deck and no category. If it is a normal category, move the line to "# Categories".`
      );
    }

    const mixed = this.findMixedScript(entry);
    if (mixed) {
      this.diagnostics.push(
        `"${mixed}" (line ${entry.lineNo}) mixes Latin letters with look-alike letters from another alphabet. Type the word again in one keyboard layout.`
      );
    }
  }

  // Runs only when nothing matched. Explains why, instead of silently
  // falling back to a basic note.
  diagnoseNoMatch(title) {
    const token = title.split(/\s+/)[0];
    if (!token || !/^[\p{L}\p{N}_%!^+-]+$/u.test(token)) return;

    const all = [];
    this.entries.forEach((entry) =>
      entry.prefixes.forEach((prefix) => all.push({ prefix, entry }))
    );

    const exact = all.find((p) => p.prefix === token);
    if (exact) {
      this.diagnostics.push(
        `"${token}" is the prefix for "${exact.entry.key}", but there is no title text after it. Write it like this: "${token} note title".`
      );
      return;
    }

    const caseOnly = all.find(
      (p) => p.prefix.toLowerCase() === token.toLowerCase()
    );
    if (caseOnly) {
      this.diagnostics.push(
        `The prefix is set as "${caseOnly.prefix}" (line ${caseOnly.entry.lineNo}), but the title starts with "${token}". Upper and lower case letters are not the same here.`
      );
      return;
    }

    const folded = this.foldHomoglyphs(token);
    const lookalike = all.find((p) => this.foldHomoglyphs(p.prefix) === folded);
    if (lookalike) {
      this.diagnostics.push(
        `"${token}" looks like the prefix "${lookalike.prefix}", but it is typed with letters from another alphabet.`
      );
      return;
    }

    const reported = this.issues.filter((issue) =>
      this.containsToken(issue.line, token)
    );
    reported.forEach((issue) =>
      this.diagnostics.push(
        `Line ${issue.lineNo} in ${PREFIXES_PATH}: "${issue.line}" — ${issue.reason}.`
      )
    );
    if (reported.length) return;

    this.scanUnparsedLines(token);
  }

  // Catches a line that mentions the token but never became an entry
  // (missing separator, stray indentation, wrong place in the file).
  scanUnparsedLines(token) {
    let fence = null;
    let seenSection = false;

    this.rawLines.forEach((rawLine, index) => {
      const lineNo = index + 1;
      const line = rawLine.replace(ODD_SPACES_RE, ' ').trim();

      const fenceMatch = line.match(/^(`{3,}|~{3,})/);
      if (fenceMatch) {
        const marker = fenceMatch[1][0].repeat(3);
        if (!fence) fence = marker;
        else if (marker === fence) fence = null;
        return;
      }
      if (fence) return;

      if (/^#{1,6}\s+/.test(line)) {
        if (
          SECTIONS.some(
            (s) => s.toLowerCase() === line.replace(/^#+\s+/, '').toLowerCase()
          )
        ) {
          seenSection = true;
        }
        return;
      }

      if (!seenSection || !line || line.startsWith('//')) return;
      if (this.parsedLines.has(lineNo)) return;
      // Prose, not a malformed entry.
      if (line.split(/\s+/).length > 3) return;
      if (!this.containsToken(line, token)) return;

      this.diagnostics.push(
        `Line ${lineNo} in ${PREFIXES_PATH}: "${line}" — this is not a "category – prefix" line.`
      );
    });
  }

  containsToken(line, token) {
    const pattern = new RegExp(
      `(^|[^\\p{L}\\p{N}_])${this.escapeRegExp(token)}([^\\p{L}\\p{N}_]|$)`,
      'u'
    );
    return pattern.test(line);
  }

  foldHomoglyphs(value) {
    return value
      .split('')
      .map((char) => HOMOGLYPHS[char] || char)
      .join('');
  }

  // Flags a token that is mostly Latin but carries one or two lookalikes.
  findMixedScript(entry) {
    const parts = [entry.key, ...entry.prefixes];
    for (const part of parts) {
      for (const token of part.split(/[_,\s/]+/).filter(Boolean)) {
        const latin = (token.match(/[A-Za-z]/g) || []).length;
        const foreign = token
          .split('')
          .filter((c) => /\p{L}/u.test(c) && !/[A-Za-z]/.test(c));
        if (!latin || !foreign.length) continue;
        if (foreign.length > 2 || foreign.length > latin) continue;
        if (foreign.every((c) => HOMOGLYPHS[c])) return token;
      }
    }
    return null;
  }

  report() {
    if (!this.diagnostics.length) return;

    const message =
      'Prefixes: this note was made without the tags or the deck you expected.\n\n' +
      this.diagnostics.map((d) => '• ' + d).join('\n');

    console.warn('note.js:', this.diagnostics);
    new Notice(message, 20000);
  }

  // ------------------------------------------------------------- templates

  async generateTemplate(prefixMatch, content) {
    const created = this.tp.date.now('YYYY-MM-DDTHH:mm:ssZ');
    // Where writing starts once the note opens: the first line after the
    // frontmatter, the answer of a card, the end of what the selection brought.
    this.cursor = this.tp.user.cursor();

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
${this.cursor}`;
  }

  resolveCategory(prefixMatch) {
    if (prefixMatch.categoryInfo) {
      return {
        category: prefixMatch.categoryInfo.fullPath,
        deckPath: prefixMatch.categoryInfo.fullPath.replace(/\//g, '::'),
      };
    }
    return {
      category: prefixMatch.entry.key,
      deckPath: prefixMatch.entry.key,
    };
  }

  createCodeTemplate(prefixMatch, created, content) {
    const { category, deckPath } = this.resolveCategory(prefixMatch);
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
—${content || '\n'}${this.cursor}`;
  }

  createCategoryTemplate(prefixMatch, created, content) {
    const { category, deckPath } = this.resolveCategory(prefixMatch);
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

${content}${this.cursor}
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
—${content || '\n'}${this.cursor}`;
  }

  createSpecificTemplate(prefixMatch, created, content) {
    const key = prefixMatch.entry.key;

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
  - ^${key}
created: ${created}
updated: ${created}
---${content}

${this.cursor}`;
  }

  async createSystemTemplate(prefixMatch, created, content) {
    const category = await this.tp.user.category();
    const key = prefixMatch.entry.key;

    if (key === 'meta') {
      return this.createMetaSystemTemplate(category, created, content);
    }

    if (key === 'problem') {
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
    return `---
tags:
  - system/high/meta
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ''}
relevant: false
created: ${created}
updated: ${created}
---${content}

💤${this.cursor}`;
  }

  async createProblemSystemTemplate(category, created, content) {
    const meta = await this.tp.user.meta(category);

    return `---
tags:
  - system/high/problem
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ''}
meta:${meta ? `\n  - "[[${meta}]]"` : ''}
relevant: false
created: ${created}
updated: ${created}
---${content}

💤${this.cursor}`;
  }

  async createGenericSystemTemplate(prefixMatch, category, created, content) {
    const systemType = prefixMatch.entry.key;
    const meta = await this.tp.user.meta(category);
    const problem = await this.tp.user.problem(meta);

    return `---
tags:
  - system/high/${systemType}
aliases: []
category:${category ? `\n  - "[[${category}]]"` : ''}
meta:${meta ? `\n  - "[[${meta}]]"` : ''}
problem:${problem ? `\n  - "[[${problem}]]"` : ''}
relevant: false
created: ${created}
updated: ${created}
---${content}

💤${this.cursor}`;
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  normalizeCategory(category) {
    return category ? category.replace(/ /g, '_').toLowerCase() : category;
  }
}
