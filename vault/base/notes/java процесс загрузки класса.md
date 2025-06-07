---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:03:43+03:00
updated: 2025-06-06T06:51:04+03:00
sr-due: 2025-06-16
sr-interval: 10
sr-ease: 277
---

**Процесс загрузки класса**
—
- Loading. Поиск и физическая загрузка класса
- Linking:
	- Bytecode verification - проверка [[байт-код|байт-кода]]
	- Class preparation - создание и инициализация необходимых структур
	- Resolving - загрузка набора классов, на которые ссылается загружаемый класс.
- Initialization - вызов статических [[блоки инициализации|блоков инициализации]] и присваивание значений полям
