---
aliases: []
created: 2025-05-25 21:22:28+03:00
deck: obsidian::work
sr-due: 2025-06-16
sr-ease: 290
sr-interval: 16
tags:
- note/specific/code
- category/java
updated: 2025-05-31 03:44:16+03:00
---

Можно ли объявить метод абстрактным и статическим одновременно?
—
Нет. [^1]
- abstract - метод будет реализован в другом классе
- static - метод будет доступен по имени класса

[^1]: компилятор выдаст ошибку: `Illegal combination of modifiers: ‘abstract’ and ‘static’`.