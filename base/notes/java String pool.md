---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-28 11:55:22+03:00
updated: 2025-10-06T18:47:14+03:00
sr-due: 2031-01-15
sr-interval: 1927
sr-ease: 328
---

Пул строк
—
Набор строк, хранящийся в [[java Heap]]
- строки неизменяемы
- экономит память, но занимает больше времени
- при создании с помощью `""` :
	- если в пуле уже есть такая строка, то возвращает ссылку на уже существующую
	- иначе создается новая
	- механизм выше реализуется методом `intern()`
- является примером [[java паттерны проектирования|паттерна]] "Приспособленец" ([[java паттерны gof#java flyweight Flyweight|flyweight]])

- [ ] #task/inbox #category/work <font color="#ffff00">интернирование строк</font> [^1]
- [x] #task/inbox #category/work паттерн "Приспособленец" (flyweight) ✅ 2025-10-02

[^1]: [](“интернирования строк” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=ul%3Anth-child(245)%20%3E%20li%3Afirst-child&annotation=LGG3CHJQ)))
