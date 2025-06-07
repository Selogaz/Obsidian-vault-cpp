---
tags:
  - note/specific/code
  - category/java
aliases:
  - server-side service discovery
deck: obsidian::java
created: 2025-06-06T13:06:43+03:00
updated: 2025-06-06T13:17:31+03:00
---

**server-side service discovery**
—
сервис, инициирующий запрос, отправляет его не напрямую конечному сервису, а на *балансировщик нагрузки* (load balancer).
[[java load balancer|Load balancer]] выбирает экземпляр конечного сервиса в соответствии с определенным алгоритмом.

![[java преимущества server-side service discovery]]
