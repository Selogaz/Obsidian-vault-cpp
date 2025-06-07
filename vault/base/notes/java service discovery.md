---
tags:
  - note/specific/code
  - category/java
aliases:
  - service discovery
deck: obsidian::java
created: 2025-06-06T12:59:07+03:00
updated: 2025-06-06T13:14:38+03:00
---

**service discovery**
—
механизм обнаружения сервисов и выбора экземпляра из их множества. Нужен для отправки запросов.
В микросервисной архитектуре возможно:
- запустить несколько экземпляров одного сервиса
- поднимать новые экземпляры и останавливать уже запущенные
- выбирать экземпляр из списка запущенных и зарегистрированных в [[java service registry|service registry]]
	- именно для этого нужен service discovery

Виды service discovery
- [[java server-side service discovery|server-side service discovery]]
- [[java client-side service discovery|client-side service discovery]]
