---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-31T06:22:37+03:00
updated: 2025-06-02T08:44:16+03:00
sr-due: 2025-06-06
sr-interval: 4
sr-ease: 270
---

**Свойства отношения эквивалентности, порождаемого [[equals()]]**
—
- Рефлексивность: для любой ссылки на `x` отношение `x.equals(x)` вернет `true`
- Симметричность: если `x.equals(y)` равен `true`, то и `y.equals(x)` равен `true`
- Транзитивность: если x$==$y, a y$==$z, то и x$==$z
- Непротиворечивость: если информация не менялась, то `x.equals(y)` всегда будет возвращать одинаковый результат
- `x.equals(null)` равно `false`, если `x!=null`
