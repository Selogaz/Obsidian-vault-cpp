/**
 * Task management script for Templater
 * Modes: "new", "delete", "additions"
 *
 * Task structure:
 * - [ ] #task/type #category/name #time/x #effort/x task text 🔺 ➕ YYYY-MM-DD
 * 	- [/] #task/type subtask text ➕ YYYY-MM-DD
 * 		- indented line without a checkbox, left as it is
 *
 * Features:
 * - The checkbox content ([ ], [x], [/] or any custom status) is kept as written
 * - Indentation is kept as written, tabs or spaces, also inside blockquotes
 * - Indented lines without a checkbox (comments, descriptions, time entries) are left as they are
 * - A legacy ⤵️ subtask marker is removed and never added
 * - New and additions modes append today's creation date only when none exists
 */
// ============================================================================
// CONFIGURATION & CONSTANTS
// ============================================================================

const NEXT_ACTION_TAG = '#task/next_action';

const TAG_CONFIGS = {
  status: {
    prefix: '#task/',
    query: '"periodic/statuses"',
    sortKey: (p) => p.file.name,
  },
  category: {
    prefix: '#category/',
    query: '#system/category AND -#mark/task_ignore',
    sortKey: (p) => p.file.frontmatter.icon,
    nameTransform: (name) => name.replace(/ /g, '_'),
  },
  priority: {
    prefix: '',
    tags: ['🔺', '⏫', '🔼', '🔽', '⏬'],
  },
  time: {
    prefix: '#time/',
    tags: ['quick', 'moderate', 'lengthy', 'long'],
  },
  effort: {
    prefix: '#effort/',
    tags: ['easy', 'medium', 'hard'],
  },
};

const MENU_OPTIONS = {
  priority: [
    '🔺 highest (important, urgent)',
    '⏫ high (important, not urgent)',
    '🔼 medium',
    '🔽 low (delegate)',
    '⏬ lowest (eliminate)',
  ],
  time: [
    '🤏 quick (t ⪅15 min)',
    '🐰 moderate (15min < t < 2 hours)',
    '🐢 lengthy (2 hours ⪅ t < 5 hours)',
    '🐌 long (t ⪆ 5 hours)',
  ],
  effort: ['💖 easy', '❤️‍🔥 😓 medium', '🫀 🥵 😨 hard'],
};

// ============================================================================
// TAG MANAGEMENT
// ============================================================================

class TagManager {
  constructor(dv) {
    this.dv = dv;
    this.cache = {};
  }

  /**
   * Get tags and regex for a tag type
   */
  getTagData(type) {
    if (this.cache[type]) {
      return this.cache[type];
    }

    const config = TAG_CONFIGS[type];
    let tags = [];

    if (config.query) {
      // Dynamic tags from dataview
      const pages = this.dv.pages(config.query).sort(config.sortKey);
      tags = pages.map((p) => {
        const name = config.nameTransform
          ? config.nameTransform(p.file.name)
          : p.file.name;
        return config.prefix + name;
      });
      this.cache[type] = {
        tags,
        pages,
        regex: new RegExp(tags.map(this._escapeRegex).join('|'), 'g'),
      };
    } else if (config.tags) {
      // Static tags
      tags = config.tags.map((t) => config.prefix + t);
      this.cache[type] = {
        tags,
        regex: new RegExp(tags.map(this._escapeRegex).join('|'), 'g'),
      };
    }

    return this.cache[type];
  }

  /**
   * Escape special regex characters
   */
  _escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Extract all tags of a specific type from text
   */
  extractTags(type, text) {
    const { regex } = this.getTagData(type);
    return text.match(regex) || [];
  }

  /**
   * Check if text contains a specific tag
   */
  hasTag(text, tag) {
    return text.includes(tag);
  }
}

// ============================================================================
// TAG UPDATE LOGIC
// ============================================================================

class TagUpdater {
  /**
   * Toggle tag: add if not present, remove if present
   * Special case: next_action can coexist with other status tags
   */
  static toggleTag(selectedTag, existingTags, text, type) {
    if (!selectedTag) {
      // User cancelled - return existing tags
      return existingTags.join(' ');
    }

    // Special handling for next_action
    if (selectedTag === NEXT_ACTION_TAG) {
      const hasNextAction = existingTags.includes(NEXT_ACTION_TAG);
      if (hasNextAction) {
        // Remove next_action
        return existingTags.filter((t) => t !== NEXT_ACTION_TAG).join(' ');
      } else {
        // Add next_action (keep other status tags)
        return [...existingTags, NEXT_ACTION_TAG].join(' ');
      }
    }

    // Regular tag toggle
    if (existingTags.includes(selectedTag)) {
      // Remove the tag
      return existingTags.filter((t) => t !== selectedTag).join(' ');
    } else {
      // For status/category: replace existing (except next_action)
      if (type === 'status') {
        const nextAction = existingTags.find((t) => t === NEXT_ACTION_TAG);
        return nextAction ? [selectedTag, nextAction].join(' ') : selectedTag;
      } else if (type === 'category') {
        // Replace existing category
        return selectedTag;
      } else {
        // For priority/time/effort: replace existing
        return selectedTag;
      }
    }
  }

  /**
   * Keep existing tags unchanged
   */
  static keepExisting(existingTags) {
    return existingTags.join(' ');
  }

  /**
   * Remove all tags
   */
  static removeAll() {
    return '';
  }
}

// ============================================================================
// TASK LINE PARSER & BUILDER
// ============================================================================

class TaskLine {
  constructor(line) {
    this.original = line;
    this.blockquote = ''; // kept as written, for example "> " or "> > "
    this.indent = ''; // kept as written, tabs or spaces
    this.taskMarker = '- [ ] ';
    this.legacySubtaskMarker = '⤵️';
    this.isComment = false; // True if this line is a comment, not a task
    this.tags = {
      status: [],
      category: [],
      priority: [],
      time: [],
      effort: [],
    };
    this.text = '';

    this._parse(line);
  }

  _parse(line) {
    if (line.trim() === '') {
      return;
    }

    let remaining = line;

    // Extract blockquote (>), with the single space after each marker
    const blockquoteMatch = remaining.match(/^(?:> ?)+/);
    if (blockquoteMatch) {
      this.blockquote = blockquoteMatch[0];
      remaining = remaining.slice(this.blockquote.length);
    }

    // Extract indentation exactly as written: tabs, spaces or a mix
    this.indent = remaining.match(/^[ \t]*/)[0];
    remaining = remaining.slice(this.indent.length);

    // Check if this is a task (has task marker) or a comment (no task marker).
    // The marker is kept as written, so a custom status like [/] survives.
    const taskMarkerMatch = remaining.match(/^(?:[-*+]|\d+[.)]) \[[^\]]\] /);
    if (taskMarkerMatch) {
      // This is a task
      this.taskMarker = taskMarkerMatch[0];
      remaining = remaining.slice(this.taskMarker.length);

      // Drop a legacy subtask marker if present
      if (remaining.startsWith(this.legacySubtaskMarker)) {
        remaining = remaining
          .slice(this.legacySubtaskMarker.length)
          .replace(/^\uFE0F?[ \t]*/, '');
      }
    } else {
      // This is a comment line (indented, no task marker)
      if (this.indent) {
        this.isComment = true;
      } else {
        // A plain list item becomes a task with the same bullet
        const bulletMatch = remaining.match(/^([-*+]|\d+[.)]) /);
        if (bulletMatch) {
          this.taskMarker = bulletMatch[1] + ' [ ] ';
          remaining = remaining.slice(bulletMatch[0].length);
        }
      }
    }

    this.text = remaining.trim();
  }

  extractTags(tagManager) {
    for (const type of Object.keys(this.tags)) {
      this.tags[type] = tagManager.extractTags(type, this.text);
    }
  }

  removeTags(tagManager) {
    let text = this.text;
    for (const type of Object.keys(this.tags)) {
      const { regex } = tagManager.getTagData(type);
      text = text.replace(regex, '');
    }
    this.text = text.trim();
  }

  build(createdDate = '') {
    // If this is a comment line, return it as-is
    if (this.isComment) {
      return this.original;
    }

    // Blockquote and indentation go back exactly as they were written
    const prefix = this.blockquote + this.indent;

    // Build the rest of the line piece by piece
    let result = this.taskMarker;

    // Collect non-empty tags (priority is excluded: Tasks' emoji-format
    // parser requires the priority signifier to trail the description,
    // not sit among the other tags)
    const tagParts = [
      this.tags.status.filter(Boolean).join(' '),
      this.tags.category.filter(Boolean).join(' '),
      this.tags.time.filter(Boolean).join(' '),
      this.tags.effort.filter(Boolean).join(' '),
    ].filter((part) => part.trim());

    // Add tags if any
    if (tagParts.length > 0) {
      result += tagParts.join(' ');
      // Add space before text if text exists
      if (this.text) {
        result += ' ';
      }
    }

    // Add text
    if (this.text) {
      result += this.text;
    }

    // Keep Obsidian block IDs after all Tasks metadata.
    const blockIdMatch = result.match(/[ \t]+\^[a-zA-Z0-9-]+[ \t]*$/u);
    const blockId = blockIdMatch ? blockIdMatch[0].trim() : '';
    if (blockIdMatch) {
      result = result.slice(0, blockIdMatch.index);
    }

    // Add priority before any new creation-date suffix, per Tasks' emoji format
    const priority = this.tags.priority.filter(Boolean).join(' ');
    if (priority) {
      result += ' ' + priority;
    }

    // Keep an existing creation date wherever it appears in the task text.
    if (createdDate && !/➕\uFE0F?\s*\d{4}-\d{2}-\d{2}\b/u.test(result)) {
      result += ` ➕ ${createdDate}`;
    }

    if (blockId) {
      result += ' ' + blockId;
    }

    // Clean up multiple spaces, but never touch the indentation
    return prefix + result.replace(/ {2,}/g, ' ');
  }
}

// ============================================================================
// USER INPUT HANDLERS
// ============================================================================

class UserInputHandler {
  constructor(tp, tagManager) {
    this.tp = tp;
    this.tagManager = tagManager;
  }

  async promptStatus() {
    const { tags, pages } = this.tagManager.getTagData('status');
    if (!pages || pages.length === 0) {
      return '';
    }

    const options = pages.map(
      (p) => (p.file.frontmatter?.icon || '📋') + ' ' + p.file.name
    );

    const result = await this.tp.system.suggester(
      options,
      tags,
      false,
      'Task type (ESC to skip)'
    );
    return result || '';
  }

  async promptCategory() {
    const { tags, pages } = this.tagManager.getTagData('category');
    if (!pages || pages.length === 0) {
      return '';
    }

    const options = pages.map((p) => {
      const icon = p.file.frontmatter?.icon || '🗺️';
      const name = p.file.name;
      const aliases = p.file.frontmatter?.aliases?.length
        ? ' | ' + p.file.frontmatter.aliases.join(', ')
        : '';
      return icon + ' ' + name + aliases;
    });

    const result = await this.tp.system.suggester(
      options,
      tags,
      false,
      'Category (ESC to skip)'
    );
    return result || '';
  }

  async promptPriority() {
    const { tags } = this.tagManager.getTagData('priority');

    const result = await this.tp.system.suggester(
      MENU_OPTIONS.priority,
      tags,
      false,
      'Task priority (ESC to skip)'
    );
    return result || '';
  }

  async promptTime() {
    const { tags } = this.tagManager.getTagData('time');

    const result = await this.tp.system.suggester(
      MENU_OPTIONS.time,
      tags,
      false,
      'Time estimation (ESC to skip)'
    );
    return result || '';
  }

  async promptEffort() {
    const { tags } = this.tagManager.getTagData('effort');

    const result = await this.tp.system.suggester(
      MENU_OPTIONS.effort,
      tags,
      false,
      'Effort (ESC to skip)'
    );
    return result || '';
  }
}

// ============================================================================
// MODE PROCESSORS
// ============================================================================

class ModeProcessor {
  constructor(tp, tagManager, inputHandler) {
    this.tp = tp;
    this.tagManager = tagManager;
    this.inputHandler = inputHandler;
  }

  async processNew(taskLine, content) {
    // Always show both prompts
    const selectedStatus = await this.inputHandler.promptStatus();
    const selectedCategory = await this.inputHandler.promptCategory();

    // Convert URLs to markdown links (only if we got valid selections)
    if (selectedStatus || selectedCategory) {
      content = this._convertUrlsToLinks(content);
    }

    const createdDate = this.tp.date.now('YYYY-MM-DD');

    // Parse and process lines
    const lines = content.split('\n');

    const processedLines = lines.map((line) => {
      if (line.trim() === '') return line;

      const task = new TaskLine(line);

      // If this is a comment line, return it unchanged
      if (task.isComment) {
        return line;
      }

      task.extractTags(this.tagManager);
      task.removeTags(this.tagManager);

      // Update status (only if a tag was selected, not just empty string)
      if (selectedStatus && selectedStatus !== '') {
        task.tags.status = TagUpdater.toggleTag(
          selectedStatus,
          task.tags.status,
          task.text,
          'status'
        )
          .split(' ')
          .filter(Boolean);
      }

      // Update category (only if a tag was selected, not just empty string)
      if (selectedCategory && selectedCategory !== '') {
        task.tags.category = TagUpdater.toggleTag(
          selectedCategory,
          task.tags.category,
          task.text,
          'category'
        )
          .split(' ')
          .filter(Boolean);
      }

      return task.build(createdDate);
    });

    return processedLines.join('\n');
  }

  async processAdditions(taskLine, content) {
    // Always show all prompts
    const selectedPriority = await this.inputHandler.promptPriority();
    const selectedTime = await this.inputHandler.promptTime();
    const selectedEffort = await this.inputHandler.promptEffort();

    const createdDate = this.tp.date.now('YYYY-MM-DD');

    // Parse and process lines
    const lines = content.split('\n');

    const processedLines = lines.map((line) => {
      if (line.trim() === '') return line;

      const task = new TaskLine(line);

      // If this is a comment line, return it unchanged
      if (task.isComment) {
        return line;
      }

      task.extractTags(this.tagManager);
      task.removeTags(this.tagManager);

      // Keep existing status and category
      // (already extracted, no changes needed)

      // Update priority (only if a tag was selected, not just empty string)
      if (selectedPriority && selectedPriority !== '') {
        task.tags.priority = TagUpdater.toggleTag(
          selectedPriority,
          task.tags.priority,
          task.text,
          'priority'
        )
          .split(' ')
          .filter(Boolean);
      }

      // Update time (only if a tag was selected, not just empty string)
      if (selectedTime && selectedTime !== '') {
        task.tags.time = TagUpdater.toggleTag(
          selectedTime,
          task.tags.time,
          task.text,
          'time'
        )
          .split(' ')
          .filter(Boolean);
      }

      // Update effort (only if a tag was selected, not just empty string)
      if (selectedEffort && selectedEffort !== '') {
        task.tags.effort = TagUpdater.toggleTag(
          selectedEffort,
          task.tags.effort,
          task.text,
          'effort'
        )
          .split(' ')
          .filter(Boolean);
      }

      return task.build(createdDate);
    });

    return processedLines.join('\n');
  }

  processDelete(taskLine, content) {
    // Parse and process lines
    const lines = content.split('\n');
    const processedLines = lines.map((line) => {
      if (line.trim() === '') return line;

      const task = new TaskLine(line);

      // If this is a comment line, return it unchanged
      if (task.isComment) {
        return line;
      }

      task.extractTags(this.tagManager);
      task.removeTags(this.tagManager);

      // Clear all tags
      task.tags = {
        status: [],
        category: [],
        priority: [],
        time: [],
        effort: [],
      };

      return task.build();
    });

    return processedLines.join('\n');
  }

  _convertUrlsToLinks(content) {
    const linkRegex =
      /(?![^[]*\])(https?:\/\/[^\s]+)|\[(.*?)\]\((https?:\/\/[^\s]+)\)/g;

    return content.replace(linkRegex, (match, p1, p2, p3) => {
      if (p2 && p3) {
        // Already a markdown link
        return `[${p2}](${p3})`;
      } else {
        // Plain URL - extract site name
        const siteMatch = p1.match(
          /(?:https?:\/\/)?(?:w{3}\.)?([a-zA-Z0-9-]+)\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?(?:\/\S*)?/
        );
        const siteName = siteMatch ? siteMatch[1] : 'link';
        return `[${siteName}](${p1})`;
      }
    });
  }
}

// ============================================================================
// MAIN FUNCTION
// ============================================================================

async function task(tp, mode = 'new') {
  const dv = tp.app.plugins.plugins['dataview'].api;

  // Initialize managers
  const tagManager = new TagManager(dv);
  const inputHandler = new UserInputHandler(tp, tagManager);
  const modeProcessor = new ModeProcessor(tp, tagManager, inputHandler);

  // Get editor content
  const cmEditorAct = tp.app.workspace.activeLeaf.view.editor;
  const currentCursor = cmEditorAct.getCursor();
  const currentLine = currentCursor.line;
  const originLineContents = cmEditorAct.getLine(currentLine);
  const lineSelection = await tp.file.selection();

  // Determine if we're working with selection or single line
  let content = '';
  let isSelection = false;

  if (lineSelection.length >= originLineContents.length) {
    content = lineSelection;
    isSelection = true;
  } else {
    content = originLineContents;
    isSelection = false;
  }

  // Handle empty content for "new" mode
  if (content.trim() === '' && mode === 'new') {
    const selectedStatus = await inputHandler.promptStatus();
    const selectedCategory = await inputHandler.promptCategory();

    // Build task with selected tags
    const parts = ['- [ ]'];
    if (selectedStatus) parts.push(selectedStatus);
    if (selectedCategory) parts.push(selectedCategory);

    return `${parts.join(' ')} ${tp.file.cursor()} ➕ ${tp.date.now('YYYY-MM-DD')}`;
  }

  // Process based on mode
  let processedContent = content;

  if (mode === 'new') {
    processedContent = await modeProcessor.processNew(null, content);
  } else if (mode === 'additions') {
    processedContent = await modeProcessor.processAdditions(null, content);
  } else if (mode === 'delete') {
    processedContent = modeProcessor.processDelete(null, content);
  }

  // Update editor or return content
  if (isSelection) {
    return processedContent;
  } else {
    cmEditorAct.replaceRange(
      processedContent,
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: originLineContents.length }
    );
    return '';
  }
}

module.exports = task;
