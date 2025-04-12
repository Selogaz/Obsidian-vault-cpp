---
type: podcast
aliases: 
- "`"
---

## В процессе
**status:** ==wip== *(work in progress)*
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	podcast AS "Подкаст",
	category AS "Категория"
FROM !"templates"
WHERE type = "podcast" AND status = "wip"
```
## Ожидают прослушивания
**status:** ==todo==
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	podcast AS "Подкаст",
	category AS "Категория"
FROM !"templates"
WHERE type = "podcast" AND status = "todo"
```
## Завершённые
**status:** ==done==
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	podcast AS "Подкаст",
	category AS "Категория"
FROM !"templates"
WHERE type = "podcast" AND status = "done"
```