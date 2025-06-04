---
aliases: []
created: 2025-05-28 07:57:59+03:00
deck: obsidian::work
sr-due: 2025-06-14
sr-ease: 270
sr-interval: 12
tags:
- note/specific/code
- category/java
updated: 2025-06-02 08:11:14+03:00
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

Может вызывать длительные паузы в работе, потому что на время сборки мусора приложение останавливается. (Stop-the-world)
Может стать узким местом.