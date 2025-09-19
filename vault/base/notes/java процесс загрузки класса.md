---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:03:43+03:00
updated: 2025-06-16T21:47:02+03:00
sr-due: 2025-07-25
sr-interval: 39
sr-ease: 297
---

**Процесс загрузки класса**
—
- Loading. Поиск и физическая загрузка класса
- Linking:
	- Bytecode verification - проверка [[байт-код|байт-кода]]
	- Class preparation - создание и инициализация необходимых структур
	- Resolving - загрузка набора классов, на которые ссылается загружаемый класс.
- Initialization - вызов статических [[блоки инициализации|блоков инициализации]] и присваивание значений полям
