---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-28 07:52:56+03:00
updated: 2025-06-16T21:07:02+03:00
sr-due: 2025-08-08
sr-interval: 53
sr-ease: 290
---

**Виды сборщиков мусора в HotSpot**
—
- [[Serial Garbage Collector|Serial]] - простой вариант для небольших, нетребовательных приложений
- Parallel - добавляет параллелизм и подстройку под нужную производительность
- Concurrent Mark Sweep(CMS) - нацелен на снижение максимальных задержек
- G1 - замена CMS для серверов с большими данными

у [Backend Interviewer](https://t.me/backend_interviewer) есть классный [пост](https://t.me/backend_interviewer/115) на тему сборщиков мусора.
