---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 12:20:08+03:00
updated: 2025-10-02T17:24:33+03:00
sr-due: 2025-10-11
sr-interval: 9
sr-ease: 250
---

**Почему метод clone объявлен в классе Object, а не в интерфейсе Cloneable**
—
- объявлен как `navite`
- объявлен как `protected`, чтобы нельзя было вызывать у не переопределивших его объектов
- вызов `clone` у не `Cloneable` объекта вызовет исключение[^1]

[^1]: `CloneNotSupportedException`
