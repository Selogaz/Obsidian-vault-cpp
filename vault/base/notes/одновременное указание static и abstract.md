---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-25T21:22:28+03:00
updated: 2025-05-27T10:09:15+03:00
sr-due: 2025-05-31
sr-interval: 4
sr-ease: 270
---

Можно ли объявить метод абстрактным и статическим одновременно?
—
Нет. [^1]
- abstract - метод будет реализован в другом классе
- static - метод будет доступен по имени класса

[^1]: компилятор выдаст ошибку: `Illegal combination of modifiers: ‘abstract’ and ‘static’`.
