# PLAN: Reformat `sources/opencode-nj-kit.md`

## Overview

Reformat the Obsidian source note `sources/opencode-nj-kit.md` — currently a wall of text with unformatted commands, no list structure, and missing emphasis. The goal is a clean, readable Obsidian Flavored Markdown document that follows vault conventions.

**File target:** `sources/opencode-nj-kit.md` (single file, in-place edit)
**Project type:** VAULT — single-file markdown cleanup (no web/mobile/backend)

## Problem Statement

The file at `sources/opencode-nj-kit.md` has 5 concrete formatting issues:

| # | Issue | Location | Impact |
|---|-------|----------|--------|
| 1 | Step-by-step instructions written as plain paragraphs instead of lists | Lines 37-42 | Hard to scan, inconsistent numbering |
| 2 | Inline commands (`/plan`, `/create`, `/orchestrate`, etc.) are plain text | Lines 37-42, 45-50 | Looks like prose, not code |
| 3 | File paths (`docs/PLAN-documentation.md`) are plain text | Lines 37, 53 | Easy to miss as path |
| 4 | No **bold** or *italic* emphasis on key agent/role names | Throughout body | Flat tone, no visual hierarchy |
| 5 | Walls of text without paragraph breaks | Lines 37-39, 51-53 | Poor readability |
| 6 | Minor: inconsistent numbering ("Шаг A" + "4.") | Lines 37-41 | Confusing structure |

## Success Criteria

- [ ] All 6 issues resolved (no regressions)
- [ ] File renders correctly in Obsidian reading view (no broken YAML, no unclosed formatting)
- [ ] YAML frontmatter is untouched and valid
- [ ] Every `/command` is wrapped in backticks
- [ ] Every file `path/to/file` is wrapped in backticks
- [ ] Step-by-step instructions use a proper ordered list (`1.`, `2.`, `3.`)
- [ ] Key terms (agent names, roles) have **bold** or *italic* emphasis
- [ ] Long paragraphs are broken at logical points
- [ ] No purple/violet hex codes introduced
- [ ] No new file created — only `sources/opencode-nj-kit.md` is edited

## Tech Stack & Conventions

| Item | Standard |
|------|----------|
| Markdown flavor | Obsidian Flavored Markdown (CommonMark + GFM + wikilinks) |
| Frontmatter | YAML with `tags`, `aliases`, `status`, `rating`, etc. |
| Lists | Standard Markdown (`1. ` for ordered, `- ` for unordered) |
| Code inline | Single backtick `` ` `` for commands and paths |
| Emphasis | `**bold**` for agent/role names, `*italic*` for secondary terms |
| No-comment rule | Do NOT add `%%comment%%` blocks to files |

## Task Breakdown

### Task 1: Structural Audit (read-only)

**Agent:** `explorer-agent` — codebase discovery, audit-first
**Skills invoked:** `markdown`, `structure`

| Field | Value |
|-------|-------|
| **INPUT** | `sources/opencode-nj-kit.md` raw content |
| **OUTPUT** | List of exact line ranges needing change, categorized by issue type |
| **VERIFY** | Output matches the 6 issues in Problem Statement above; no missed issues |

**Details:**
- Read the file, verify YAML frontmatter validity
- Map each issue to exact line numbers and exact text
- Confirm no restricted directories are touched
- Confirm the file is a source note (belongs in `sources/`)

**Rollback:** Read-only — no changes to undo.

---

### Task 2: Convert Steps to Ordered List & Fix Numbering

**Agent:** `documentation-writer` — formatting and cleanup
**Skills invoked:** `markdown`

| Field | Value |
|-------|-------|
| **INPUT** | Lines 36-42 (from "Как именно создать" through "Вот краткий 'шпаргалка'") |
| **OUTPUT** | Same content as a proper Markdown ordered list with consistent numbering |
| **VERIFY** | `Шаг A:` → `1. Шаг A:` ... `Шаг C:` → `3. Шаг C:` ; `4.` merged into the list; lead-in text "Как именно создать — пошагово" stays as a paragraph above the list |

**Dependencies:** None (parallel with Task 3, but recommended before Task 3 to avoid backtick placement shifting)

**Details:**
- Convert lines 37-40 from 3 prose paragraphs into `1.` / `2.` / `3.` list items
- Merge the orphaned `4. Чтобы научиться...` (line 41) as a separate paragraph or list item
- Keep "Вот краткая шпаргалка:" as a lead-in sentence before the table
- Fix Russian grammar: `"краткий 'шпаргалка'"` → `"краткая шпаргалка"`
- Do NOT touch YAML frontmatter (lines 1-26)

**Rollback:** Undo the edit with `edit` tool — restore original line block.

---

### Task 3: Wrap Commands and File Paths in Backticks

**Agent:** `documentation-writer` — inline code formatting
**Skills invoked:** `markdown`

| Field | Value |
|-------|-------|
| **INPUT** | Raw command names and file paths currently in plain text |
| **OUTPUT** | Every `/command` and `path/to/file` wrapped in backticks |

**Dependencies:** Should run after Task 2 (list restructuring may shift line positions)

**Items to wrap:**
- `/plan` (appears in lines 37, 45)
- `/create` (appears in line 46)
- `/orchestrate` (appears in lines 38, 50)
- `/enhance` (appears in line 47)
- `/debug` (appears in line 48)
- `/test` (appears in line 49)
- `docs/PLAN-documentation.md` (appears in lines 37, 53)
- `docs/` (line 40 as part of "документацию в docs/ folder")
- `project-planner` (agent name — line 37)
- `documentation-writer` (agent name — lines 39, 40)
- `explorer-agent` (agent name — line 38)
- `frontend-specialist` (agent name — line 38)
- `app-builder` (agent name — line 46)
- `debugger` (agent name — line 48)
- `test-engineer` (agent name — line 49)

**Rule:** Commands → `` `command` `` (single backtick). Paths → `` `path/to/file` ``. Do NOT backtick-wrap the entire sentence.

**Rollback:** Undo each `edit` call — restore original text.

---

### Task 4: Add Emphasis & Paragraph Breaks

**Agent:** `documentation-writer` — readability polish
**Skills invoked:** `markdown`

| Field | Value |
|-------|-------|
| **INPUT** | Formatted text from Tasks 2 + 3 |
| **OUTPUT** | File with **bold** on key terms and broken paragraphs |
| **VERIFY** | Every agent/role name has **bold**; every paragraph under 4 lines; no formatting errors |

**Dependencies:** AFTER Task 3 (needs final text positions)

**Emphasis rules:**
- Wrap **agent names** in bold: `**project-planner агента**`, `**documentation-writer**`, `**explorer-agent**`, `**frontend-specialist**`
- Wrap **key roles** in bold: `**project-planner**`, `**debugger агента**`
- Wrap **skill-related terms** in bold: `**скилы**`, `**агентов**`
- Do NOT over-emphasize — max 8-10 bold instances in the file
- Use *italic* sparingly for secondary terms (e.g., `*шпаргалка*`)

**Paragraph breaks:**
- Line 37-39: Split at each "Шаг" boundary (3 paragraphs → for each шаг step)
- Line 51: Break after "Вам не нужно их вызывать вручную."
- Line 52-53: Break after first sentence about маршрутизации

**Rollback:** Undo each `edit` — revert specific bold/break changes.

---

## Dependency Graph

```
Task 1 (Audit) ──read-only──┐
                             ├──► Task 2 (Lists) ──► Task 3 (Backticks) ──► Task 4 (Emphasis)
                             └──► (informs Tasks 2-4 about exact lines)
```

- **Serial path:** 1 → 2 → 3 → 4 (recommended for single-file safety)
- **Parallel possible:** Tasks 2 and 3 could run in parallel if line ranges are distinct, but serial is safer for a single file to avoid edit conflicts

## Verification Phase (Phase X)

After all 4 tasks complete, run these checks:

- [ ] **Read file:** `sources/opencode-nj-kit.md` renders correctly
- [ ] **YAML valid:** Frontmatter `---` ... `---` is intact, no double `---`
- [ ] **No broken markup:** No unclosed backticks, missing `]`, or unmatched `**`
- [ ] **Every `/command` in backticks:** grep for `/plan`, `/create`, `/orchestrate` — none should be plain
- [ ] **Every file path in backticks:** grep for `docs/PLAN-documentation.md` — wrapped in backticks
- [ ] **Steps are list:** Lines 37-40 start with `1.`, `2.`, `3.`
- [ ] **No purple hex codes:** grep for purple/violet — should not exist
- [ ] **Restricted dirs untouched:** `templates/`, `base/categories/`, `home/databases/`, `home/prefixes.md`, `periodic/statuses/` have no changes
- [ ] **No code files written:** Only `sources/opencode-nj-kit.md` was edited

## Summary

| Task | Agent | Effort | Risk |
|------|-------|--------|------|
| 1. Structural Audit | explorer-agent | 2 min | None (read-only) |
| 2. Convert to Lists | documentation-writer | 3 min | Low (single block) |
| 3. Backtick Wrapping | documentation-writer | 3 min | Low (many edits, but each is small) |
| 4. Emphasis & Breaks | documentation-writer | 4 min | Low (visual only) |
| Verification | — | 2 min | — |

**Total estimated effort:** ~15 minutes
**Files modified:** 1 (`sources/opencode-nj-kit.md`)
**Files created:** 0
