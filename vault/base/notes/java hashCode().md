---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:57:20+03:00
updated: 2025-06-06T07:09:08+03:00
sr-due: 2025-06-22
sr-interval: 16
sr-ease: 290
---

**HashCode**
—
Для одного и того же объекта хэш-код всегда будет одинаковым.

Хэш-коды разных объектов могут совпасть:[^1]
- если хэш-коды разные, то объекты *гарантированно разные*
- если хэш-коды одинаковые, то объекты *не обязательно равны*

[^1]: в Java множество возможных хэш кодов ограничено типом int, а множество объектов ничем не ограничено.[](“в Java множество возможных хэш кодов ограничено типом int, а множество объектов ничем не ограничено.” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=p%3Anth-child(399)&annotation=IK4LU9KX)))
