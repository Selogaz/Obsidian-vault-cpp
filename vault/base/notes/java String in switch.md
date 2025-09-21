---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 04:09:05+03:00
updated: 2025-09-21T12:37:05+03:00
sr-due: 2026-12-02
sr-interval: 437
sr-ease: 314
---

**String in switch**
—
Используется, начиная с Java 7
- строки чувствительны к *регистру*
- для сравнения значений используется [[java equals()|equals]], поэтому нужно проверять на *null*[^1]
- более эффективный [[байт-код]] , чем для конструкций `if-else`

[^1]: во избежание NPE
