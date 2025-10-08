---
tags:
  - note/specific/code
  - category/java
aliases:
  - Adapter
deck: obsidian::java
created: 2025-08-10T11:30:33+03:00
updated: 2025-10-08T18:36:20+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**Adapter**
—
# Fill the gaps
Преобразует интерфейс одного класса в другой, который ожидает клиент.

Пример: адаптация массива к интерфейсу List
```java
String[] array = …
List<String> list = Arrays.asList(array);
```

Пример из жизни - адаптер для розетки

# Refactoring guru
Позволяет объектам с несовместимыми интерфейсами работать вместе. Выступает в роли посредника, преобразуя интерфейс одного объекта в интерфейс, ожидаемый клиентом.
