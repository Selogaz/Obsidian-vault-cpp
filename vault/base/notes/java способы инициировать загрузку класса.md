---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:00:34+03:00
updated: 2025-06-06T06:47:05+03:00
sr-due: 2025-06-22
sr-interval: 16
sr-ease: 290
---

**Способы инициировать загрузку класса**
—
явный: вызов `ClassLoader.loadClass()` или `Class.forName()`
	- по умолчанию используется загрузчик, создавший класс
- неявный: загрузку инициирует JVM, если для работы приложения нужен ранее не загруженный класс
