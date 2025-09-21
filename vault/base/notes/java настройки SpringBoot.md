---
tags:
  - note/specific/code
  - category/java
aliases:
  - настройки SpringBoot
deck: obsidian::java
created: 2025-06-15T10:29:02+03:00
updated: 2025-09-21T12:12:14+03:00
sr-due: 2026-09-21
sr-interval: 365
sr-ease: 290
---

**настройки SpringBoot**
—
большая часть настроек находится в файлах `application.yaml`, `application.properties`. Они должны находиться в `src/main/resources`. Например, подключение к бд, JPA, Liauibase и настройки самого проекта

[[java пример application.yaml]]

дополнительно считываются настройки из `application-<активный_профиль>.yaml` и `application-<активный профиль>.properties`. В которых, например, можно указать параметры
 локального запуска. *Настройки конкретного профиля переопределяют основные настройки*

для запуска с нужным профилем необходимо его указать в аргументе командной строки: ```--spring.profiles.active```
