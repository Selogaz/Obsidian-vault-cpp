---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-28T07:57:59+03:00
updated: 2025-05-29T18:09:41+03:00
sr-due: 2025-06-02
sr-interval: 4
sr-ease: 270
---

Последовательный сборщик мусора
—
Память делится на 3 пространства:
- [[young generation|Young generation]]. Здесь создаются объекты
- [[old generation|Old generation]]. Сюда перемещаются после [[minor collection|minor GC]]
- Permanent generation. Метаданные об объектах, <font color="#ffff00">CDS</font> , [[String pool]]
	- для чтения-записи
	- только для чтения
		- никогда не чистится

Подходит для большинства приложений, использующих до 200Мб памяти кучи.

Может вызывать длительные паузы в работе, потому что на время сборки мусора приложение останавливается.
Может стать узким местом.
