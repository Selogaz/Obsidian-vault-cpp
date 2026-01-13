---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-27 11:11:13+03:00
updated: 2025-10-02T17:24:00+03:00
sr-due: 2026-11-09
sr-interval: 403
sr-ease: 290
---

**Local inner class**
—
- виден только внутри метода
- не может иметь *модификаторов доступа*[^1]
- не может иметь *static* как внутри себя, так и на себе
	- но может содержать *статические константы*
- если локальные переменные и параметры метода `final`, то может к ним обращаться(интересно, почему так?)

создается если класс необходим *только внутри какого-то метода*[^2]

[^1]: private/public/protected
[^2]: [](“только внутри какого-то метода” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=p%3Anth-child(147)&annotation=DFEZDULV)))
