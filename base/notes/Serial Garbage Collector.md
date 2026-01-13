---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-28 07:57:59+03:00
updated: 2025-10-06T18:47:41+03:00
sr-due: 2027-01-02
sr-interval: 453
sr-ease: 310
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

Может вызывать длительные паузы в работе, потому что на время сборки мусора приложение останавливается. ([[java stop the world|Stop-the-world]])
Может стать узким местом.
