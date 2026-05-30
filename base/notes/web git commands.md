---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - git commands
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T17:47:29+03:00
updated: 2026-05-26T17:47:29+03:00
---

**git commands**
—
`git checkout -b <name> main` - создать новую ветку из main
`git branch -d name`) - удалить ветку
`git rebase main` - влить в текущую ветку все недостающие коммиты из main
```zsh
git checkout main
git merge --ff-only name
//переключиться на main и влить в неё ветку name
```