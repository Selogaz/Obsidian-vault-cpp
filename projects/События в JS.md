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
start: 2026-01-24T14:04:06+03:00
end:
created: 2026-01-24T14:04:06+03:00
updated: 2026-01-24T17:49:42+03:00
---

# События мыши

## Краткий список событий[^1]
### Onclick
[[Практика по JS часть 2#Выбор первого элемента по совпадению|querySelector]]
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



[^1]: [Полный перечень событий](https://www.w3schools.com/tags/ref_eventattributes.asp)
[^2]: [[Краткий обзор CSS#Псевдоклассы для ссылок|hover и остальные]]
[^3]: С одним и тем же именем