---
aliases: []
created: 2025-05-31 04:09:05+03:00
deck: obsidian::work
sr-due: 2025-06-06
sr-ease: 274
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-02 09:04:38+03:00
---

**String in switch**
—
Используется, начиная с Java 7
- строки чувствительны к регистру
- для сравнения значений используется `equals`, поэтому нужно проверять на null[^1]
- более эффективный [[байт-код]] , чем для конструкций `if-else`

[^1]: во избежание NPE