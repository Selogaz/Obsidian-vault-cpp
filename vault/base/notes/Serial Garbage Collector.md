---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-28T07:57:59+03:00
updated: 2025-05-28T08:15:56+03:00
---

Последовательный сборщик мусора
—
На время сборки мусора приложение останавливается.
Память делится на 3 пространства:
- [[young generation|Young generation]]. Здесь создаются объекты
- Old generation. Сюда перемещаются после minor garbage collection
- Permanent generation. Метаданные об объектах, <font color="#ffff00">CDS, String pool</font>
