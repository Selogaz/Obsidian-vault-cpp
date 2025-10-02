---
tags:
  - note/specific/code
  - category/java
aliases:
  - Adapter
deck: obsidian::java
created: 2025-08-10T11:30:33+03:00
updated: 2025-10-01T18:21:58+03:00
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
