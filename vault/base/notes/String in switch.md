---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-31T04:09:05+03:00
updated: 2025-05-31T04:12:22+03:00
---

**String in switch**
—
Используется, начиная с Java 7
- строки чувствительны к регистру
- для сравнения значений используется `equals`, поэтому нужно проверять на null[^1]
- более эффективный [[байт-код]] , чем для конструкций `if-else`

[^1]: во избежание NPE
