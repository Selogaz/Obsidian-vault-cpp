---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-28 08:15:57+03:00
updated: 2025-06-16T20:58:51+03:00
sr-due: 2025-08-09
sr-interval: 54
sr-ease: 290
---

**Young generation**
—
Часть кучи для хранения недавно созданных объектов.
Состоит из 3 областей:
- Eden. Создается большинство объектов
- Survivor spaces. Объекты, которые пережили хотя бы 1 сборку мусора, но не достигли порога старости[^1]
	- To space - выжившие после последующих [[minor collection]]
	- from space - выжившие после первого [[minor collection]]

Когда заполняется, запускается [[minor collection|minor collection]][^2]
Если to space переполняется, объекты из Eden и From space отправляются в Old generation.

Является копирующим, т.к. переносит объекты из одной области в другую.

Применяется для небольших, по сравнению с общей памятью, областей памяти. Около 10% кучи.

Далее заполняется [[old generation]]

[^1]: tenuring threshold
[^2]: процесс легкой сборки
