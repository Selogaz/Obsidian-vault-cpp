---
tags:
  - note/specific/code
  - category/css
aliases:
  - подключение шрифта
deck: obsidian::css
created: 2026-01-19T20:56:48+03:00
updated: 2026-01-19T21:12:40+03:00
---

**подключение шрифта**
—
fonts.google.com
Скачанный шрифт
```css
@font-face {
	font-family: Amatic;
	src:url("../fonts/AmaticSC-Regular.ttf");
}

p.txt {
	font-family: Amatic, sans-serif;
}
```

Удаленный шрифт
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');

p.txt {
	font-family: "Montserrat", sans-serif;
}
```
