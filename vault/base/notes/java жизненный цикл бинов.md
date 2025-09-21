---
tags:
  - note/specific/code
  - category/java
aliases:
  - жизненный цикл бинов
deck: obsidian::java
created: 2025-06-15T11:28:28+03:00
updated: 2025-09-21T12:12:59+03:00
sr-due: 2026-09-20
sr-interval: 364
sr-ease: 290
---

**жизненный цикл бинов**
—
создаются и уничтожаются контейнером

три способа обращения к жизненному циклу:
1. через `@PostConstruct` и `@PreDestroy` из `jakarta.annotation`
2. через интерфейсы `InitializingBean` и `DisposableBean`
3. через атрибуты `init-method` и `destroy-method` из XML-конфигурации бина
порядок вызова при создании бина указан выше

[[java PostConstruct и @PreDestroy]]
[[java атрибуты init-method и destroy-method]]
[[java интерфейсы InitializingBean и DisposableBean]]
