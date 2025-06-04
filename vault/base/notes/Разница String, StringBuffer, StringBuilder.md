---
aliases: []
created: 2025-05-31 04:12:42+03:00
deck: obsidian::work
sr-due: 2025-06-06
sr-ease: 270
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-02 09:00:53+03:00
---

**Разница String, StringBuffer, StringBuilder**
—
- `String` - неизменяемый
- `StringBuffer` - изменяемый. Применять в многопотоке, когда нужно *часто менять содержимое*
- `StringBuilder` - версия `StringBuffer` без синхронизации. А значит, *значительно быстрее*.