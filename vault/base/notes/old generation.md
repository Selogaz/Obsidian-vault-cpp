---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-28T08:35:35+03:00
updated: 2025-05-29T18:01:27+03:00
sr-due: 2025-06-02
sr-interval: 4
sr-ease: 270
---

**Old generation**
—
Сюда перемещаются долгоживущие объекты

Сборка происходит с помощью алгоритма mark-sweep-compact:
- Mark. Помечаются все живые объекты
- Sweep. Непомеченные удаляются
- Compact. Живые перемещаются в начало Old generation
	- выполняется для избегания фрагментации и упрощения выделения памяти
	- в результате свободная память становится <font color="#ffff00">непрерывной</font>(смежной?)

Для непрерывной памяти можно использовать *очень быстрый* алгоритм [[bump-the-pointer]]

- [ ] #task/inbox #category/work непрерывная(смежная?) память
