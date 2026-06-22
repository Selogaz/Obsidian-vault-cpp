---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - state vs props
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T21:22:12+03:00
updated: 2026-06-21T23:19:44+03:00
---

**state vs [[web props|props]]**
—

| [[web props\|props]]            | [[java state\|state]]        |
| ------------------------------- | ---------------------------- |
| Передаются от родителя          | Внутренние данные компонента |
| Read-only (иммутабельны)        | Изменяемые через setState    |
| Нельзя менять внутри компонента | Изменение → ре-рендер        |
| Аналог аргументов функции       | Аналог локальных переменных  |
