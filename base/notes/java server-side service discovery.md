---
tags:
  - note/specific/code
  - category/java
aliases:
  - server-side service discovery
deck: obsidian::java
created: 2025-06-06T13:06:43+03:00
updated: 2025-09-21T12:40:38+03:00
sr-due: 2026-10-15
sr-interval: 389
sr-ease: 290
---

**server-side service discovery**
—
сервис, инициирующий запрос, отправляет его не напрямую конечному сервису, а на *балансировщик нагрузки* (load balancer).
[[java load balancer|Load balancer]] выбирает экземпляр конечного сервиса в соответствии с определенным алгоритмом.

![[java преимущества server-side service discovery]]
