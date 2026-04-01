---
tags:
  - note/specific/code
  - category/java
aliases:
  - Decorator
deck: obsidian::java
created: 2025-08-06T14:31:41+03:00
updated: 2025-10-08T18:36:10+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**Decorator**
—
# Fill the gaps
класс-обёртка, который добавляет новое поведение объекту. Декоратор использует тот же интерфейс, что и объект, который он оборачивает.

Альтернатива созданию подклассов.

Пример: пакет IO.FileReader читает из файла, BufferedReader добавляет буферизацию:
```java
FileReader filereader = new FileReader(…)
BufferedReader reader = new BufferedReader(filereader);
```

# Refactoring guru
Позволяет добавлять объектам новое поведение, оборачивая их в другой объект, содержащий это поведение.
Является гибкой альтернативой наследованию, так как он позволяет расширять поведение объектов во время выполнения программы
