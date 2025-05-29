---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-27T11:11:13+03:00
updated: 2025-05-29T17:18:56+03:00
sr-due: 2025-05-30
sr-interval: 1
sr-ease: 210
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
