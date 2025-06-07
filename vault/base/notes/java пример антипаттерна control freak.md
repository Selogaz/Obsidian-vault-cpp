---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна control freak
deck: obsidian::java
created: 2025-06-05T18:46:57+03:00
updated: 2025-06-06T07:34:51+03:00
sr-due: 2025-06-10
sr-interval: 4
sr-ease: 270
---

**пример антипаттерна control freak**
—
```java
class QuestEngine {
	private CollectionsShelf collectionsShelf;
	private Journal journal;

	QuestEngine() {
		collectionsShelf = new CollectionsShelf();
		journal = new Journal();
	}
}
```
