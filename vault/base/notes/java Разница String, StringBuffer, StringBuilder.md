---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 04:12:42+03:00
updated: 2025-06-06T07:06:22+03:00
sr-due: 2025-06-21
sr-interval: 15
sr-ease: 290
---

**Разница String, StringBuffer, StringBuilder**
—
- `String` - неизменяемый
- `StringBuffer` - изменяемый. Применять в многопотоке, когда нужно *часто менять содержимое*
- `StringBuilder` - версия `StringBuffer` без синхронизации. А значит, *значительно быстрее*.
