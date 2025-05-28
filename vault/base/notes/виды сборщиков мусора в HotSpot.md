---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-28T07:52:56+03:00
updated: 2025-05-28T07:57:58+03:00
---

**Виды сборщиков мусора в HotSpot**
—
- [[Serial Garbage Collector|Serial]] - простой вариант для небольших, нетребовательных приложений
- Parallel - добавляет параллелизм и подстройку под нужную производительность
- Concurrent Mark Sweep(CMS) - нацелен на снижение максимальных задержек
- G1 - замена CMS для серверов с большими данными
