---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-28 07:57:59+03:00
updated: 2025-06-16T21:33:07+03:00
sr-due: 2025-08-09
sr-interval: 54
sr-ease: 290
---

Последовательный сборщик мусора
—
Память делится на 3 пространства:
- [[young generation|Young generation]]. Здесь создаются объекты
- [[old generation|Old generation]]. Сюда перемещаются после [[minor collection|minor GC]]
- Permanent generation. Метаданные об объектах, <font color="#ffff00">CDS</font> , [[java String pool]]
	- для чтения-записи
	- только для чтения
		- никогда не чистится

Подходит для большинства приложений, использующих до 200Мб памяти кучи.

Может вызывать длительные паузы в работе, потому что на время сборки мусора приложение останавливается. (Stop-the-world)
Может стать узким местом.
