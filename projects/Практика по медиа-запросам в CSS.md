---
tags:
  - status/done
  - project/short
  - priority/c
aliases: []
status: 🟩
priority: 🇨
category:
meta:
problem:
creator:
production:
url:
cover:
start: 2026-01-21T14:58:38+03:00
end:
created: 2026-01-21T14:58:38+03:00
updated: 2026-01-21T15:18:22+03:00
---

# Description
Разрешение экрана можно менять в браузере F12.

# README
```html
<head>
	<meta content="width=device-width, initial-scale=1" name="viewport">
</head>
```
ВНИМАНИЕ! Без данного кода [[css медиа-запросы|медиа-запросы]] работать не будут!!!

# Max-width
```css
@media(max-width: 320px) {
	body {
		background: red;
	}
}
```
Данный код выполнится только если ширина экрана *менее 320px*

# Min-width
```css
@media(min-width: 700px) {
	body {
		background: #000;
	}
}
```
Сработает только если разрешение экрана *больше 700px*

# Комбинирование условий
```css
@media(min-width: 700px) and (max-width: 1000px) {
	body {
		background: blue;
	}
}
```

# Подключение медиа-запросов отдельным файлом

Это важно, когда мобильная версия сайта очень отличается от десктопа.
```html
<meta content="width=device-width, initial-scale=1" name="viewport">
<link rel="stylesheet" media="(min-width: 900px)" href="css/phone-style.css">
```
