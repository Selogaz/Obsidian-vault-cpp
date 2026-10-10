---
icon: 🤖
cssclasses:
  - hide-backlinks
  - hide-properties
---

# Abyss Vault

Personal knowledge vault using Obsidian Markdown, YAML properties, and the hierarchy `Category → Meta-note → Problem → Hierarchy`. Its structure is managed through metadata and links.

## Start with the matching skill

Load the matching skill before answering any request about this vault. It must be the first action.

- Use skills to create or edit vault files, frontmatter, wikilinks, and note content.
- Use the existing directory structure. Never create new directories.
- When the user asks how to create something, create it through the matching skill.

## Metadata engine

`python3 .claude/_engine/vault.py` validates and edits note metadata by the manifests in `templates/create/`. Create notes and change properties through it (`types`, `schema`, `values`, `find`, `new`, `set`, `add`, `remove`, `check`, `fix`); the matching skill names the exact commands. Edit note bodies directly.

- It refuses invalid input and writes nothing. Fix what the message names. Never write frontmatter by hand to get around an error.
- After a direct edit of a note, a hook lists the problems that edit introduced and counts older errors. Hook silence means the edit added nothing, not that the note is clean. Without hooks, run `check` on the file.
- The first edit of a file in a protected zone is stopped once with a notice. Repeat it only if the user approved this exact change. Otherwise ask first.

## Changes controlled by the user

Categories are the only fully human-owned part of the vault. Never create, edit, rename, or delete anything in `base/categories/`.

Other files that define the vault may change after the user approves the exact edit. This includes `home/databases/`, `home/prefixes.md`, `templates/`, and `periodic/statuses/`.

Before changing them, inspect the current structure and explain what will change, why it fits, and what it affects. Mention a safer existing option when one exists, then wait for explicit approval.

One approval is enough. Apply the agreed change without asking again unless its scope changes.
