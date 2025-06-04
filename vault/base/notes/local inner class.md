---
aliases: []
created: 2025-05-27 11:11:13+03:00
deck: obsidian::work
sr-due: 2025-06-13
sr-ease: 250
sr-interval: 11
tags:
- note/specific/code
- category/java
updated: 2025-06-02 08:17:04+03:00
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