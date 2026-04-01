---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 12:26:57+03:00
updated: 2025-09-28T06:26:38+03:00
sr-due: 2026-11-27
sr-interval: 425
sr-ease: 290
---

**Exceptions**
—
- `checked` - должны обрабатываться `catch` или `throws ExceptionName` в заголовке метода
- [[java unchecked exceptions|`unchecked`]]
	- [[Error|`Error`]] - обрабатывать не рекомендуется
	- `RuntimeException` и его наследники[^1]

[^1]: Например, NullPointerException
