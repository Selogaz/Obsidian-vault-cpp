---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна bastard injection
deck: obsidian::java
created: 2025-06-05T18:53:30+03:00
updated: 2025-09-21T12:47:51+03:00
sr-due: 2026-11-04
sr-interval: 409
sr-ease: 310
---

**пример антипаттерна bastard injection**
—
вызов параметризированного конструктора внутри [[конструктор по умолчанию|конструктора по умолчанию]]
```java
class QuestEngine {
	private CollectionsShelf collectionsShelf;
	private Journal journal;

	QuestEngine() {
		this(
			CollectionsShelf collectionsShelf,
			Journal journal)
	}
}

```
