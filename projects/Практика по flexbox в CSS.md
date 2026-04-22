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
start: 2026-01-21T15:33:53+03:00
end:
url:
cover:
icon: 🗞️
color: "#a39070"
created: 2026-01-21T15:33:53+03:00
updated: 2026-02-28T23:27:19+03:00
---

# Содержание практики
```html
<body>
	<div class="container"></div>
	<div class="box-1">
		<h3>Box 1</h3>
		<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quo cupiditate excepturi inventore fugitiusto! Laborum repellendus eligendi accusamus dolores voluptatibus.</p>
	</div>
	<div class="box-2">
		<h3>Box 2</h3>
		<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quo cupiditate excepturi inventore fugitiusto! Laborum repellendus eligendi accusamus dolores voluptatibus.</p>
	</div>
	<div class="box-3">
		<h3>Box 3</h3>
		<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.Quo cupiditate excepturi inventore fugitiusto! Laborum repellendus eligendi accusamus dolores voluptatibus.</p>
	</div>
</body>
```
## Flex-basis на элементах

![[css flex-basis]]
```css
.container {
	display: flex;
}

.container > div {
	padding: 10px;
	border: 1px solid silver;
	margin-bottom: 10px;
}

.box-1 {
	flex-basis: 100px;
}
.box-2 {
	flex-basis: 500px;
	margin-right: 80px;
}
.box-3 {
	
}
```

## Flex
![[css flex]]

Дальше описывается работа свойства [[css flexbox#Order|order]], но оно и так понятное

## Flex-basis на контейнере, flex-wrap

Без указания `flex-wrap: wrap` боксы не смогут принять ширину `flex-basis: 90%`
```css
.container {
	display: flex;
	flex-wrap: wrap; /*wrap-reverse, nowrap*/
}

.container > div {
	padding: 10px;
	border: 1px solid silver;
	margin-bottom: 10px;
	flex-basis: 90%;
}

.box-1 {
	flex-basis: 100px;
}
.box-2 {
	flex-basis: 500px;
	margin-right: 80px;
}
.box-3 {
	
}
```
дальше описывается свойство [[css flexbox#Justify-content|justify-content]], но я его уже знаю

14:26 дальше описывается [[css flexbox#Align-items|align-items]]

дальше [[css flexbox#Align-self|align-self]]

# Рефлексия
![[css flex-контейнер]]
