---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-25T21:22:28+03:00
updated: 2025-05-31T03:44:16+03:00
sr-due: 2025-06-16
sr-interval: 16
sr-ease: 290
---

Можно ли объявить метод абстрактным и статическим одновременно?
—
Нет. [^1]
- abstract - метод будет реализован в другом классе
- static - метод будет доступен по имени класса

[^1]: компилятор выдаст ошибку: `Illegal combination of modifiers: ‘abstract’ and ‘static’`.
