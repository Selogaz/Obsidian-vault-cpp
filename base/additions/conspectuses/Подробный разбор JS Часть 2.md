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
start: 2026-01-24T21:00:36+03:00
end:
created: 2026-01-24T21:00:36+03:00
updated: 2026-01-24T21:01:10+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Окружение BOM[^1]
Все кроме html тегов

## Получение ширины и высоты экрана
```js
window.innerWidth;
window.innerHeight;
```

## Открытие окна

Открытие нового окна без предварительных действий пользователя будет заблокировано. Лучше привязывать к нажатию на кнопку.
```js
window.open("https://url.com");
window.open("about:blank", "hello", "width=200,height=200");//пустая страница
window.open("url", "hello", "width=500,height=200");//удобно открыть тут пользовательское соглашение
```

## Navigator
```js
navigator.userAgent;//инфа про пользователя
navigator.platform;//определяет ОС
```

## Location
```js
location.href;//полный адрес до html страницы
location.reload;//перезагрузить страницу
```
- [ ] #task/inbox #category/webdev - Чем отличается `location.href = "url`" от `window.open` ?
```js
location.href = "https://itproger.com";//переход на другую страницу
```

# DOM

## Прямой доступ из document
```js
document.documentElement;//тег html
document.body;//тег body
document.head;//тег head
```

## Дочерние элементы
```js
document.body.firstChild;
document.body.lastChild;
document.body.childNodes;//все дочерние элементы
```
### Перебор элементов
```js
for (var i = 0; i < documents.body.childNodes; i++) {
	console.log(document.body.childNodes[i]);
}
```

## Быстрый вывод элемента с id content
```js
console.log(content);
```
- может быть незаметно перезаписан другой переменной контент
- лучше использовать следующую конструкцию
## Поиск по id
```js
document.getElementById("content");
```
## Поиск по тегу
```js
document.getElementsByTagName("p");//набор элементов, не один
```
### *
```js
let content = document.getElementById("content");
let elements = content.getElementsByTagName("*");//все дочерние элементы
```
### Выбор элемента из массива тегов
```js
content.getElementsByTagName("*")[0];
//elements[0];
```

## Поиск по значению атрибута name
```html
<input name="fname">
```
```js
let el = document.getElementsByName("fname");//массив элементов, не один
```

### Получение имени тега
```js
let el = document.getElementsByName("fname")[0].tagName;
//el.tagName;
```

### Получение имени класса
```js
let el = document.getElementsByName("fname")[0].className;
```
## Поиск по классу
```js
document.getElementsByClassName("section");
```

## Выбор по любому селектору
```js
document.querySelectorAll(".nav");//массив элементов
document.querySelectorAll("#content");
document.querySelectorAll("div");
document.querySelectorAll("ul.test > li");
```

### Выбор первого элемента по совпадению
```js
document.querySelector("#content");//один элемент
```

## Ближайший родительский элемент
```js
document.querySelector("#span-text").closest("li");
```

## Получение содержимого элемента
```js
element.innerHTML;
element.innerHTML = "Новое значение";
```

## Получение значения атрибута
через точку
```js
let input = document.querySelector("input[type='text']");
input.value = "Новое значение";
```
getAttribute()
```js
input.getAttribute("type");
```

## Существует ли атрибут?
```js
input.hasAttribute("type");
```
## Установка нового значения атрибута
```js
input.setAttribute("data-toggle", "some value");
```
## Удаление атрибута
```js
input.removeAttribute("class");
```

## Альтернативный способ добавления классов
```js
input.className = "some new test";
```

- [ ] #task/inbox #category/webdev - Разбить практику с DOM на работу с id, тегами, классами и атрибутами

## Добавление текста с помощью JS
```js
document.write("");//используют для добавления рекламы
```

## Добавление CSS через JS
```js
input.style.color="#333";
input.style.backgroundColor="#333";
input.style.borderLeftColor="#333";
```

[^1]: [[Краткий обзор JavaScript#DOM, BOM, JS]]
