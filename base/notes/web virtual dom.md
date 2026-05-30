---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - virtual dom
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T20:58:50+03:00
updated: 2026-05-26T20:58:50+03:00
---

**virtual dom**
—
**Virtual DOM** — легковесная копия реального DOM. При изменении состояния:
1. Создаётся новый Virtual DOM
2. React сравнивает (diffing) с предыдущим
3. Применяет минимальные изменения к реальному DOM (reconciliation)

React **не** обновляет DOM целиком — только изменившиеся части.