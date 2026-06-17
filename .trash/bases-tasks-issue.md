---
tags:
  - note/specific/exact
  - category/obsidian
aliases: []
icon: 📝
color: "#d0a570"
created: 2026-05-31T14:50:59+03:00
updated: 2026-06-17T12:47:31+03:00
---

# `editor.setValue()` On every `editor-change` resets cursor — typing inside wikilinks/inline elements is broken in notes with tasks

**Plugin version:** 0.9.2
**Obsidian:** 1.12+ (Live Preview)

## Summary

In any note that contains task lines (`- [ ]`), the editing cursor jumps out of whatever inline element I'm editing after almost every keystroke. It's especially visible when editing inside a `[[wikilink]]`: type one character → the cursor pops outside the link. Notes without tasks are unaffected. There are no console errors.

## Root cause

In `onload`, the plugin syncs tasks on every `editor-change` (350 ms debounce):

```js
this.registerEvent(this.app.workspace.on("editor-change", async (editor, info) => {
  if (info instanceof MarkdownView) {
    clearTimeout(this.gettingTasksTimeoutID);
    this.gettingTasksTimeoutID = setTimeout(() => this.saveTasks(editor), 350);
  }
}));
```

`saveTasks` rewrites the `tasks:` frontmatter and, if the serialized text differs, replaces the **entire document**:

```js
saveTasks(editor) {
  const before = editor.getValue();
  const after  = this.updateFileTasks(before); // re-stringifies YAML via stringifyYaml
  if (before === after) return;
  const delta = after.split("\n").length - before.split("\n").length;
  const cur = editor.getCursor();
  cur.line += delta;
  editor.setValue(after);   // ← full-document replace
  editor.setCursor(cur);
}
```

Two problems:

1. **`editor.setValue()` replaces the whole document**, which tears down and rebuilds all Live Preview decorations and resets the selection. The `setCursor` afterwards only compensates for the *line* delta, not the inline widget/column context, so the caret lands outside the element being edited (e.g. a wikilink widget).
2. **`updateFileTasks` compares re-serialized YAML strings**, so any task line that doesn't round-trip byte-identically through `stringifyYaml` (tasks containing tags, emoji, wikilinks, special characters) makes `before !== after` true on *every* keystroke → a full `setValue` fires continuously while typing.

## Steps to reproduce

1. Open a note that has several `- [ ]` tasks with tags/emoji/links in the text.
2. Place the cursor inside a `[[wikilink]]` and type.
3. The cursor jumps outside the link after (almost) every character.

## Suggested fix

- Don't sync via `editor.setValue()` on `editor-change`. Either sync on file save / `metadataCache` resolve, or write the frontmatter with `app.fileManager.processFrontMatter()` (which edits properties without replacing the editor document and without disturbing the caret).
- Alternatively, compare the **task arrays** semantically instead of stringified YAML, so the no-op case (`before === after`) is actually hit and nothing is rewritten while the user types.
