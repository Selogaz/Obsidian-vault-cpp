---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-28T08:15:57+03:00
updated: 2025-05-29T18:06:04+03:00
sr-due: 2025-06-02
sr-interval: 4
sr-ease: 270
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
