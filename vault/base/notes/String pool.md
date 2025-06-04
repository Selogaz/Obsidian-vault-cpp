---
aliases: []
created: 2025-05-28 11:55:22+03:00
deck: obsidian::work
sr-due: 2025-06-10
sr-ease: 268
sr-interval: 8
tags:
- note/specific/code
- category/java
updated: 2025-06-02 07:47:25+03:00
---

Пул строк
—
Набор строк, хранящийся в [[Heap]]
- строки неизменяемы
- экономит память, но занимает больше времени
- при создании с помощью `""` :
	- если в пуле уже есть такая строка, то возвращает ссылку на уже существующую
	- иначе создается новая
	- механизм выше реализуется методом `intern()`
- является примером [[паттерны проектирования|паттерна]] "Приспособленец" (flyweight)

- [ ] #task/inbox #category/work <font color="#ffff00">интернирование строк</font> [^1]

[^1]: [](“интернирования строк” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=ul%3Anth-child(245)%20%3E%20li%3Afirst-child&annotation=LGG3CHJQ)))