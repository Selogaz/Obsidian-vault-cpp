---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:49:51+03:00
updated: 2025-06-05T16:58:36+03:00
sr-due: 2025-06-07
sr-interval: 4
sr-ease: 270
---

**Почему хэш код в виде 31 * x + y предпочтительнее чем x + y**
—
Есть класс
```java
Point{int x, y;}
```

Множитель создает зависимость значения хэш-функции от очередности обработки полей, поэтому это порождает лучшую хэш-функцию.
