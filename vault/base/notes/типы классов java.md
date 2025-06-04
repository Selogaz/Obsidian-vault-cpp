---
aliases: []
created: 2025-05-28 06:40:50+03:00
deck: obsidian::work
sr-due: 2025-06-12
sr-ease: 285
sr-interval: 12
tags:
- note/specific/code
- category/java
updated: 2025-05-31 03:40:42+03:00
---

**Новые типы классов java**
—
- top level (обычные классы)
	- [[модификатор abstract|abstract]] class
	- [[final|final]] class
- [[ключевое слово interface|interfaces]]
- enum
- [[nested class|nested class]]
	- [[static nested class|static nested]]
		- независим от внешнего
		- доступ только к static внешнего
	- [[member inner class|member inner]]
		- связан с экземпляром внешнего
		- доступ ко всем полям внешнего
	- [[local inner class|local inner]]
		- виден только внутри метода
	- [[anonymous inner class|anonymous inner]]
		- класс без имени