---
tags:
  - status/done
  - project/short
  - priority/c
aliases: []
addition:
status: 🟩
priority: 🇨
category:
meta:
problem:
creator:
production:
start: 2026-01-21T15:15:59+03:00
end:
url:
cover:
icon: 🗞️
color: "#a39070"
created: 2026-01-21T15:15:59+03:00
updated: 2026-01-21T15:34:09+03:00
---

```html
<body>
	<div id="block"></div>
</body>
```

# Подключение анимации
Без указания длительности анимация не будет работать!
```css
#block {
	width: 100px;
	height: 100px;
	background: silver;
	animation-name: block;
	animation-duration: 3s;
}

@keyframes block {
	from {background: silever}
	to {background: red}
}
```

# Дальнейшее развитие анимации

```css
#block {
	width: 100px;
	height: 100px;
	background: silver;
	animation-name: block;
	animation-duration: 3s;
	animation-delay: 2s;
	animation-iteration-count: infinite;
	animation-direction: alternate /*normal, alternate, reverse*/
}

@keyframes block {
	from {background: silver}
	to {background: red}
}
```

# Добавление 2 анимации

```css
#block {
	width: 100px;
	height: 100px;
	background: silver;
	animation-name: coolAnimation;
	animation-duration: 7s;
	animation-delay: .2s;
	animation-iteration-count: infinite;
	animation-direction: alternate /*normal, alternate, reverse*/
}

@keyframes coolAnimation {
	0% {border-radius: 0px}
	10% {border-radius: 10px}
	40% {border-radius: 20px}
	70% {border-radius: 400px}
	100% {border-radius: 3px}
}
```
