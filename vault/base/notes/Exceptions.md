---
aliases: []
created: 2025-06-02 12:26:57+03:00
deck: obsidian::work
sr-due: 2025-06-07
sr-ease: 270
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-03 07:44:51+03:00
---

**Exceptions**
—
- `checked` - должны обрабатываться `catch` или `throws ExceptionName` в заголовке метода
- [[unchecked exceptions|`unchecked`]]
	- [[Error|`Error`]] - обрабатывать не рекомендуется
	- `RuntimeException` и его наследники[^1]

[^1]: Например, NullPointerException