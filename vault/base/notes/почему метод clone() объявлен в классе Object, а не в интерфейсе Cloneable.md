---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 12:20:08+03:00
updated: 2025-06-05T16:58:35+03:00
sr-due: 2025-06-07
sr-interval: 4
sr-ease: 270
---

**Почему метод clone объявлен в классе Object, а не в интерфейсе Cloneable**
—
- объявлен как `navite`
- объявлен как `protected`, чтобы нельзя было вызывать у не переопределивших его объектов
- вызов `clone` у не `Cloneable` объекта вызовет исключение[^1]

[^1]: `CloneNotSupportedException`
