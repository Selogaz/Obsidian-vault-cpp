---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-27 11:02:58+03:00
updated: 2025-06-05T16:58:36+03:00
sr-due: 2025-06-22
sr-interval: 20
sr-ease: 290
---

**Static nested class**
—
- независим от внешнего
- прямой доступ только к static внешнего
	- доступ к nonstatic через ссылку на внешний объект(`Classname.this.field)

создается если каждому экземпляру такого класса необходима ссылка на включающий его экземпляр[^1]

не может быть классом верхнего уровня (из-за `static`)

[^1]: [](“если каждому экземпляру такого класса необходима ссылка на включающий его экземпляр” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=p%3Anth-child(147)&annotation=JYXCD5VL)))
