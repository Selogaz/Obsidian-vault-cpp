---
tags:
  - source/article/paper
  - mark/log/conspectus
  - category/webdev
  - category/html
  - category/css
aliases: []
status: 🟦
source:
  - "[[full stack itproger]]"
next:
url:
start: 2026-01-24T21:04:50+03:00
end:
created: 2026-01-24T21:04:50+03:00
updated: 2026-01-24T21:06:00+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# События мыши

## Краткий список событий[^1]
### Onclick
[[Подробный разбор JS Часть 2#Выбор первого элемента по совпадению|querySelector]]
```html
<a href="#" onclick="clickHref()" class="href">Click me!</a>
```
```js
function clickHref() {
	document.querySelector("a.href").style.display="none";
}
```

#### С параметром
```html
<p onclick="clickText('p')">Текст</p>
```
```js
function clickText(selector) {
	document.querySelector(selector).style.color="#fff";
}
```
### Ondblclick
Двойной клик. Все как у onclick

### Ondrag
При перетаскивании

### Ondragend
После завершения перетаскивания

### Onfocus
```html
<input onfocus="focusEvent()">
```
```js
function focusEvent() {
	document.querySelector("input").style.backgroundColor = "#333";
	document.querySelector("input").style.padding = "10px";
}
```

### Oblur
выход из фокуса
```html
<input onfocus="focusEvent()" onblur="focusEndEvent()">
```
```js
function focusEndEvent() {
		document.querySelector("input").style.backgroundColor = "#fff";
	document.querySelector("input").style.padding = "0px";
}
```

### Onmouseover
Аналог `:hover`,[^2] но эффект не исчезает, если мышь убрать. Чтобы эффект исчез, нужно использовать `onmouseout`

### Onmouseout
```html
<input onfocus="focusEvent()" onblur="focusEndEvent()" onmouseover="focusEvent()" onmouseout="focusEndEvent()">
```

### Onmousedown
Зажали лкм и держим

### Onmouseup
Отпустили лкм

### Oncontextmenu
Нажали пкм

### Onmouseenter

### Onmouseleave

### Onmousemove
Свойство отслеживает движение мыши

#### Реализация подсказки под мышкой
```html
<input class="input">
<div class="hint">Подсказка при наведении</div>
```
```js
let inputField = document.querySelector('.input');
let helpField = document.querySelector('.hint');

inputField.onmousemove = function(e) {
	helpField.style.left = e.offsetX + "px";//заменили pageX
	helpField.style.top = e.offsetY + "px";//заменили pageY
};
```

## Предпочтительный способ управления событиями

Так не будет засоряться html разными свойствами с js-функциями
```js
let input = document.querySelector("input");
input.onclick = function() {
	//do it
};
```

# Window
```js
window.onclick = function() {//действие при любом клике на странице
	
};
```
## Некоторый список свойств window
### Onresize
```js
window.onresize = function() {//действие при изменении размеров экрана
};
```

### Onload
```js
window.onload = function() {//действие при полной загрузке страницы
};
```

### Onscroll
Действие, очевидно, при скролле

# Eventlisteners

## Добавить обработчик событий
```js
let block = document.querySelector("div.block");
function handler() {
	block.innerHTML = "Обработчик сработал";
}

block.addEventListener("click", handler);
block.addEventListener("mouseover", handler);
block.addEventListener("mouseout", function() {
	block.innerHTML = "Обработчик сработал";
});
```

## Удалить обработчик событий

- ❌ Обработчик не удалится, потому что *2 анонимные функции считаются разными, даже если они одинаковые*
```js
block.removeEventListener("mouseout", function() {
	block.innerHTML = "Обработчик удален";
});
```
- ✅ Если использовать обычную[^3] функцию как для создания, так и для удаления, то обработчик корректно удалится
```js
function handler() {
	block.innerHTML = "Обработчик создан";
}
block.addEventListener("mouseout", handler);
block.removeEventListener("mouseout",handler);
```

# События клавиатуры

## Краткий список событий[^4]

### Oninput

- ❌ oninput не позволяет отследить какая клавиша была нажата, но позволяет отследить ctrl+c/ctrl+v
```js
let text = document.querySelector(".full-text");

text.oninput = function(e) {
	console.log(e.key);//undefined
};
```

### Onkeydown

- Срабатывает когда начали нажатие клавиши
- ✅ Покажет клавишу, но не покажет ctrl+c/ctrl+v
```js
text.onkeydown = function(e) {
	console.log(e.key);//покажет нажатую клавишу, но не ctrl+c/ctrl+v
};
```

### Onkeypress
Полностью нажали клавишу, но не отпустили

### Onkeyup
Отпустили клавишу

# Серийное обращение к событиям
```js
let boldText = document.querySelectorAll("p > b.bolt-txt");

boldText.forEach(function(el) {
	el.onmousedown = function() {
		el.style.color = "red";
	};
	
	el.onmouseup = function() {
		el.style.color = "blue";
	};
});
```

# События сенсорного экрана

## Список событий

### Touchstart

Срабатывает, когда нажали на экран
```js
let tap = document.getElementById("tap");

window.addEventListener('touchstart', function(e) {
	tap.style.background = "#333";
});
```

### Touchend

Срабатывает, когда отпустили нажатие
```js
window.addEventListener('touchend', function(e) {
	tap.style.background = "#eee";
});
```

### Touchmove

Срабатывает при движении пальца.
```css
#tap {
	position: fixed;
	display: inline-block;
	transition: all .2s linear.
}
```
```js
window.addEventListener('touchmove', function(e) {
	tap.style.left = e.targetTouches[0].pageX + "px";
	tap.style.top = e.targetTouches[0].pageY + "px";
});
```
`targetTouches` - массив пальцев

[^1]: [Полный перечень событий](https://www.w3schools.com/tags/ref_eventattributes.asp)
[^2]: [[Краткий обзор CSS#Псевдоклассы для ссылок|hover и остальные]]
[^3]: С одним и тем же именем
[^4]: [Полный перечень событий](https://www.w3schools.com/tags/ref_eventattributes.asp)
