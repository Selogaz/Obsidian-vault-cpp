---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна bastard injection
deck: obsidian::java
created: 2025-06-05T18:53:30+03:00
updated: 2025-06-06T07:37:49+03:00
sr-due: 2025-06-10
sr-interval: 4
sr-ease: 270
---

**пример антипаттерна bastard injection**
—
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
