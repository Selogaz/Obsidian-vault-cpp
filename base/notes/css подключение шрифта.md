---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - подключение шрифта
deck: obsidian::css
icon: </>
color: "#ab4642"
created: 2026-01-19T20:56:48+03:00
updated: 2026-06-17T12:56:42+03:00
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

Например, в [[Подземелья Максвелла]] - Firenight и Jost.

```css
--font-firenight: 'Firenight';

.font-firenight {
  font-family: var(--font-firenight, 'Firenight'), sans-serif !important;
}

.font-jost {
  font-family: var(--font-jost), 'Jost', Arial, sans-serif !important;
}

```
