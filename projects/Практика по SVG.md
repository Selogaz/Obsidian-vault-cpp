---
tags:
  - status/wip
  - project/short
  - priority/c
aliases: []
status: 🟦
priority: 🇨
category:
meta:
problem:
creator:
production:
url:
cover:
start: 2026-01-30T10:56:01+03:00
end:
created: 2026-01-30T10:56:01+03:00
updated: 2026-02-10T15:08:56+03:00
---

# Свойства svg

## Цвет

```xml
<svg fill="none">
<path d="fill: red;"/>
```

## Границы элемента

```xml
<path style="
stroke: #f0f;
stroke-width: 5;
"
```

## Отдельный элемент

```xml
<path d=""
```

# Обработчик события

```xml
<svg id="logo">
<path onclick="changeBG()" id="object"/>
```
```js
function changeBG() {
	let object = document.querySelector("#object");
	object.style.fill = "#b53232";
	object.style.stroke = "#842121";
	object.style.strokeWidth = "2";
}
```
```html
<script src="index.js">
```
```css
#object {
	transition: transform 600ms ease;
	animation: color 3s infinite;
}

#object:hover {
	cursor: pointer;
	transform: translateY(-10px) translateX(10px) scale(1.1);
}

@keyframes color {
	from {fill: red}
	50% {fill: blue}
	to {fill: red}
}
```

# Сайт с логотипами[^1]
# Minify svg сайт[^2]

[^1]: https://worldvectorlogo.com/
[^2]: https://jakearchibald.github.io/svgomg/
