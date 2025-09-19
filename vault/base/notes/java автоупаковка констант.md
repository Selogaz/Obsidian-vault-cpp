---
tags:
  - note/specific/code
  - category/java
aliases:
  - автоупаковка констант
deck: obsidian::java
created: 2025-06-05T17:16:41+03:00
updated: 2025-06-11T08:51:17+03:00
sr-due: 2025-07-04
sr-interval: 23
sr-ease: 294
---

**автоупаковка констант**
—
- автоупаковка *констант* допускает неявное сужение/расширение типа:
	- присвоение примитива обертке может производится только оператором =
	- тип левого операнда не должен быть старше чем `Character`, тип правого не должен старше, чем `int`.[^1] Иначе требуется явное преобразование

[^1]:  [](“допустимо расширение/сужение byte в/из short, byte в/из char, short в/из char и только сужение byte из int, short из int, char из int.” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=li%3Alast-child%20%3E%20ol%20%3E%20li%3Alast-child&annotation=5TXYDZG5))
