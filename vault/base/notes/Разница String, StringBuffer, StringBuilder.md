---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-31T04:12:42+03:00
updated: 2025-05-31T04:15:21+03:00
---

**Разница String, StringBuffer, StringBuilder**
—
- `String` - неизменяемый
- `StringBuffer` - изменяемый. Применять в многопотоке, когда нужно *часто менять содержимое*
- `StringBuilder` - версия `StringBuffer` без синхронизации. А значит, *значительно быстрее*.
