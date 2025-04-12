---
type: book
aliases: "&"
---
%%cssClass: cards%%
#📥 
## В процессе
**status:** ==wip== *(work in progress)*

```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Автор(ы)",
	start AS "Начал",
	category AS "Категория"
FROM !"templates"
WHERE type = "book" AND status = "wip"
```

## Ожидают прочтения
**status:** ==todo==

```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author as "Автор(ы)",
	recommendedby AS "Рекомендовано",
	category AS "Категория"
FROM !"templates"
WHERE type = "book" AND status = "todo"
```

## Завершённые
**status:** ==done==
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Автор(ы)",
	start AS "Начал",
	end AS "Закончил",
	category AS "Категория"
FROM !"templates"
WHERE type = "book" AND status = "done"
```