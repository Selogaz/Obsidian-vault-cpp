---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 12:26:57+03:00
updated: 2025-06-05T16:58:37+03:00
sr-due: 2025-06-07
sr-interval: 4
sr-ease: 270
---

**Exceptions**
—
- `checked` - должны обрабатываться `catch` или `throws ExceptionName` в заголовке метода
- [[unchecked exceptions|`unchecked`]]
	- [[Error|`Error`]] - обрабатывать не рекомендуется
	- `RuntimeException` и его наследники[^1]

[^1]: Например, NullPointerException
