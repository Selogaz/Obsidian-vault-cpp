---
type: movie
aliases: "%"
---
%%cssClass: cards%%
## В процессе
**status:** ==wip== *(work in progress)*
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Режиссёр",
	category AS "Категория"
FROM !"templates"
WHERE type = "movie" AND status = "wip"
```
## Ожидают просмотра
**status:** ==todo==
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Режиссёр",
	category AS "Категория"
FROM !"templates"
WHERE type = "movie" AND status = "todo"
```
## Завершённые
**status:** ==done==
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Режиссёр",
	category AS "Категория"
FROM !"templates"
WHERE type = "movie" AND status = "done"
```