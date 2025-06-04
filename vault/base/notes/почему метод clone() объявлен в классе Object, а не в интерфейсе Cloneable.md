---
aliases: []
created: 2025-06-02 12:20:08+03:00
deck: obsidian::work
sr-due: 2025-06-07
sr-ease: 270
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-03 07:46:41+03:00
---

**Почему метод clone объявлен в классе Object, а не в интерфейсе Cloneable**
—
- объявлен как `navite`
- объявлен как `protected`, чтобы нельзя было вызывать у не переопределивших его объектов
- вызов `clone` у не `Cloneable` объекта вызовет исключение[^1]

[^1]: `CloneNotSupportedException`