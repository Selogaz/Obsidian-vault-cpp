---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-31T04:12:42+03:00
updated: 2025-06-02T09:00:53+03:00
sr-due: 2025-06-06
sr-interval: 4
sr-ease: 270
---

**Разница String, StringBuffer, StringBuilder**
—
- `String` - неизменяемый
- `StringBuffer` - изменяемый. Применять в многопотоке, когда нужно *часто менять содержимое*
- `StringBuilder` - версия `StringBuffer` без синхронизации. А значит, *значительно быстрее*.
