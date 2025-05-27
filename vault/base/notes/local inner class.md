---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-27T11:11:13+03:00
updated: 2025-05-27T13:15:54+03:00
---

**Local inner class**
—
- внутри метода
- виден только в этом методе
- не может быть private/public/protected или static
- не может иметь внутри себя static
	- но может содержать static final = const
- если локальные переменные и параметры метода `final`, то может к ним обращаться

создается если класс необходим только внутри какого-то метода[^1]

[^1]: [](“только внутри какого-то метода” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=p%3Anth-child(147)&annotation=DFEZDULV)))
