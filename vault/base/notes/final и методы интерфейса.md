---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-25 17:59:50+03:00
updated: 2025-06-05T16:58:37+03:00
sr-due: 2025-06-12
sr-interval: 12
sr-ease: 270
---

Почему нельзя объявить метод интерфейса с модификатором final?
—
final запрещает переопределение методов. А методы интерфейсов как раз предназначены для того, чтобы быть переопределенными. Выходит, указание final *бессмысленно*.
