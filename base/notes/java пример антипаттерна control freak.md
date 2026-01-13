---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна control freak
deck: obsidian::java
created: 2025-06-05T18:46:57+03:00
updated: 2025-09-21T12:47:38+03:00
sr-due: 2026-11-07
sr-interval: 412
sr-ease: 310
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
