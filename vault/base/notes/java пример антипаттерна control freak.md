---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна control freak
deck: obsidian::java
created: 2025-06-05T18:46:57+03:00
updated: 2025-06-11T08:56:24+03:00
sr-due: 2025-06-30
sr-interval: 19
sr-ease: 290
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
