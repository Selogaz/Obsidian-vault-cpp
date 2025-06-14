---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна service locator
deck: obsidian::java
created: 2025-06-06T08:21:18+03:00
updated: 2025-06-06T08:44:45+03:00
---

**пример антипаттерна service locator**
—
```java
class ServiceLocator {
	private static Set<Object> services = new HashSet<>();

	@SuppressWarnings("unchecked")
	private static <T> T getService(Class<T> clazz) {
		return (T) services.stream()
			.filter(v -> v.getClass().isAssignableFrom(clazz))
			.findFirst()
			.orElseThrow(() -> new IllegalArgumentException(""));
	}

	public static void registerService(Object service) {
		services.add(service);
	}
}

class CollectionsShelf {
//...
}

class Journal {
//...
}

class Achievements {
//...
}

class QuestEngine {
	public void completeQuest() {
		Journal journal = ServiceLocator.getService(Journal.class);
		System.out.println("Quest completed");
	}
}

public class ServiceLocalorExample {
	public static void main(String[] args) {
		//добавляем все зависимости
		ServiceLocator.registerService(new CollectionsShelf());
		ServiceLocator.registerService(new Journal());
		ServiceLocator.registerService(new Achievements());
		ServiceLocator.registerService(new QuestEngine());

		QuestEngine questEngine = ServiceLocator.getService(QuestEngine.class);
		questEngine.completeQuest();
```
