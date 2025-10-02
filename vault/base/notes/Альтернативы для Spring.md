---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-03 10:43:02+03:00
updated: 2025-10-01T20:20:40+03:00
sr-due: 2026-12-07
sr-interval: 435
sr-ease: 310
---

**Альтернативы для Spring**
—
# Fill the gaps
Micronaut, Quarkus, Vert.x, Play, DropWizard, Guice, Helidon, Javalin, [[Jakarta EE]]. Одни фреймворки заточены на создание веб-приложений, другие - просто [[IoC]]-контейнеры.

# Урванов
- [[Jakarta EE]] можно использовать вместе с одной из реализаций <font color="#ffff00">этой</font>[^1] спецификации:
	- WebSphere
	- WildFly
	- GlassFish
	- Apache Tomcat
	- Jetyy
- Google Guice[^2] - легковесный фреймворк. Построен на принципах [[DI|внедрения зависимостей]] и использует аннотации [[Jakarta EE]]
- JBoss Seam и PicoContainer - устаревшие фреймворки

[^1]: какой нахуй этой???
[^2]: https://github.com/google/guice
