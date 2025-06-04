---
aliases: []
created: 2025-05-28 07:52:56+03:00
deck: obsidian::work
sr-due: 2025-06-14
sr-ease: 270
sr-interval: 12
tags:
- note/specific/code
- category/java
updated: 2025-06-02 08:19:53+03:00
---

**Виды сборщиков мусора в HotSpot**
—
- [[Serial Garbage Collector|Serial]] - простой вариант для небольших, нетребовательных приложений
- Parallel - добавляет параллелизм и подстройку под нужную производительность
- Concurrent Mark Sweep(CMS) - нацелен на снижение максимальных задержек
- G1 - замена CMS для серверов с большими данными

у [Backend Interviewer](https://t.me/backend_interviewer) есть классный [пост](https://t.me/backend_interviewer/115) на тему сборщиков мусора.