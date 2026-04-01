---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 04:12:42+03:00
updated: 2025-09-21T12:31:08+03:00
sr-due: 2026-11-27
sr-interval: 432
sr-ease: 310
---

**Разница String, StringBuffer, StringBuilder**
—
- `String` - неизменяемый
- `StringBuffer` - изменяемый. Применять в многопотоке, когда нужно *часто менять содержимое*
- `StringBuilder` - версия `StringBuffer` без синхронизации. А значит, *значительно быстрее*.
