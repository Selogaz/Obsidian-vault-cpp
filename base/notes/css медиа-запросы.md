---
tags:
  - note/specific/code
  - category/css
aliases:
  - медиа-запросы
deck: obsidian::css
created: 2026-01-21T12:51:35+03:00
updated: 2026-01-21T14:59:02+03:00
---

**медиа-запросы**
—
# Введение в медиа-запросы CSS

Медиа запросы позволяют адаптировать страницу для разных устройств: принтеры, речевые браузеры, устройства Брайля, телевизоры, телефоны и тд.

```css
@media print {} - стили для принтеров
@media screen, print {}
```
Внешнее подключение media query(будет подключаться только на указанных устройствах!) <font color="#ffff00">screen - десктоп?</font>
```html
<link rel="stylesheet" media="only screen and print" href="css/style.css" />
```

## Примеры медиа запросов CSS
```css
@media (max-width: 480px) { /*на экранах шириной менее 480px*/
	.sidebar {
		float: none;
		width: 100%;
	}
}

@media (min-width: 1300px) {
	.sidebar {
		float: left;
		width: 30%;
	}
}
```
Ориентации экрана смартфона
```css
@media (orientation: landscape) {}
@media (orientation: portrait) {}
```

[[Практика по медиа-запросам в CSS]]
