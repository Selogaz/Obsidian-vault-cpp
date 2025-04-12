---
type: article
aliases: ";"
---

## В процессе
**status:** ==wip== *(work in progress)*
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	url,
	category AS "Категория"
FROM !"templates"
WHERE type = "article" AND status = "wip"
```
## Ожидают прочтения
**status:** ==todo==
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	url,
	category AS "Категория"
FROM !"templates"
WHERE type = "article" AND status = "todo"
```
## Завершённые
**status:** ==done==
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	url,
	category AS "Категория"
FROM !"templates"
WHERE type = "article" AND status = "done"
```