---
type: video
aliases: "$"
---

## В процессе
**status:** ==wip== *(work in progress)*
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	url,
	category AS "Категория"
FROM !"templates"
WHERE type = "video" AND status = "wip"
```
## Ожидают прочтения
**status:** ==todo==
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	url,
	category AS "Категория"
FROM !"templates"
WHERE type = "video" AND status = "todo"
```
## Завершённые
**status:** ==done==
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	url,
	category AS "Категория"
FROM !"templates"
WHERE type = "video" AND status = "done"
```