---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 04:09:05+03:00
updated: 2025-06-06T07:32:18+03:00
sr-due: 2025-06-22
sr-interval: 16
sr-ease: 294
---

**String in switch**
—
Используется, начиная с Java 7
- строки чувствительны к *регистру*
- для сравнения значений используется `equals`, поэтому нужно проверять на *null*[^1]
- более эффективный [[байт-код]] , чем для конструкций `if-else`

[^1]: во избежание NPE
