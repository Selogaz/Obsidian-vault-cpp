---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-25 18:39:07+03:00
updated: 2025-06-05T16:58:37+03:00
sr-due: 2025-06-09
sr-interval: 7
sr-ease: 250
---

**Exception в блоке инициализации**
—
- для нестатических блоков:
	- нужно указать объявления исключений в `throws` всех конструкторов класса. Иначе ошибка компиляции
- для статических блоков:
	- исключение в явном виде всегда приводит к ошибке компиляции
- в остальных случаях:
	- в нестатическом блоке: объект не будет создан
	- в статическом: класс не будет проинициализирован
