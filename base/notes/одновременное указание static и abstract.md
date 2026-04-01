---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-25 21:22:28+03:00
updated: 2025-09-28T06:22:52+03:00
sr-due: 2026-12-18
sr-interval: 446
sr-ease: 330
---

Можно ли объявить метод абстрактным и статическим одновременно?
—
Нет. [^1]
- abstract - метод будет реализован в другом классе
- static - метод будет доступен по имени класса

[^1]: компилятор выдаст ошибку: `Illegal combination of modifiers: ‘abstract’ and ‘static’`.
