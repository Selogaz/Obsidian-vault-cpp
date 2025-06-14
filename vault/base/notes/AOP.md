---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-23 09:56:33+03:00
updated: 2025-06-06T12:16:06+03:00
sr-due: 2025-06-08
sr-interval: 10
sr-ease: 244
---

**AOP**
—
Аспектно-ориентированное программирование - парадигма программирования, основанная на идее разделения функциональности для улучшения модульности

В Java это происходит путем *отделения общих задач*, таких как ведение журнала или обработка ошибок, *от основной логики программы*

Также называют технологией для обеспечения *сквозной функциональности*.[^1] Логика сквозных процессов не добавляется в [[java слой бизнес-логики|слой бизнес-логики]], а разрабатывается *отдельно* вместе с описанием точек, в которых должна выполняться.

AOP может затруднить понимание основной логики обработки запросов.

![[java термины AOP]]

![[java виды AOP]]

[^1]: с. 29
