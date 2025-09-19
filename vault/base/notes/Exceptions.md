---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 12:26:57+03:00
updated: 2025-06-08T22:51:31+03:00
sr-due: 2025-06-19
sr-interval: 11
sr-ease: 270
---

**Exceptions**
—
- `checked` - должны обрабатываться `catch` или `throws ExceptionName` в заголовке метода
- [[java unchecked exceptions|`unchecked`]]
	- [[Error|`Error`]] - обрабатывать не рекомендуется
	- `RuntimeException` и его наследники[^1]

[^1]: Например, NullPointerException
