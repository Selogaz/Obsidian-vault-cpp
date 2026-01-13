---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-27 11:12:48+03:00
updated: 2025-10-02T18:21:43+03:00
sr-due: 2025-10-26
sr-interval: 24
sr-ease: 210
---

**Anonymous inner class**
—
- класс без имени
- объявление *одновременно* с созданием экземпляра
- *static/nonstatic* в зависимости от контекста
- ограничения:
	- использовать только в месте создания
	- нельзя ссылаться на объект
	- не может объявлять новых методов

используется если класс нужен только в одном месте и уже существует тип, характеризующий этот класс[^1]

применяются для:
- создания объекта функции[^2]
- создания объекта процесса[^3]
- в [[статический метод генерации|статических методах генерации]][^4]
- полей с (сложным) перечислением типов, где для каждого экземпляра нужен отдельный подкласс[^5]

- [x] #task/inbox #category/work доделать на свежую голову ✅ 2025-05-28

[^1]: [](“уже существует тип, характеризующий этот класс,” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=p%3Anth-child(147)&annotation=TEVSB8N7)))
[^2]: например, реализация интерфейса Comparator;
[^3]: такого как экземпляры классов Thread, Runnable и подобных;
[^4]: [](“в статическом методе генерации” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=ul%3Anth-child(165)%20%3E%20li%3Anth-child(3)&annotation=HUD4SSX3)) где?)
[^5]: [](“инициализации открытого статического поля final, которое соответствует сложному перечислению типов, когда для каждого экземпляра в перечислении требуется отдельный подкласс.” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=ul%3Anth-child(165)%20%3E%20li%3Alast-child&annotation=I4E5YLMZ)) вернуться потом и осмыслить)
