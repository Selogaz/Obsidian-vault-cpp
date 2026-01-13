---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-28 08:35:35+03:00
updated: 2025-10-02T17:39:51+03:00
sr-due: 2027-01-03
sr-interval: 458
sr-ease: 330
---

**Old generation**
—
Сюда перемещаются долгоживущие объекты

Сборка происходит с помощью алгоритма mark-sweep-compact:
- Mark. Помечаются все живые объекты
- Sweep. Непомеченные удаляются
- Compact. Живые перемещаются в начало Old generation
	- выполняется для избегания фрагментации и упрощения выделения памяти
	- в результате свободная память становится <font color="#ffff00">непрерывной</font>

Для непрерывной памяти можно использовать *очень быстрый* алгоритм [[bump-the-pointer]]

- [ ] #task/inbox #category/work непрерывная(смежная?) память
