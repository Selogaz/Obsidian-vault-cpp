---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 12:20:08+03:00
updated: 2025-10-13T16:31:55+03:00
sr-due: 2025-11-21
sr-interval: 39
sr-ease: 270
---

**Почему метод clone объявлен в классе Object, а не в интерфейсе Cloneable**
—
- объявлен как `navite`
- объявлен как `protected`, чтобы нельзя было вызывать у не переопределивших его объектов
- вызов `clone` у не `Cloneable` объекта вызовет исключение[^1]

[^1]: `CloneNotSupportedException`
