---
tags:
  - note/specific/code
  - category/js
aliases:
  - hoisting
deck: obsidian::js
created: 2026-01-23T19:42:41+03:00
updated: 2026-01-23T19:48:49+03:00
---

**hoisting**
—
В JavaScript объявления функций(function decalarations) и объявления переменных обрабатываются по-разному на этапе создания контекста выполнения

# Function declaration
```js
func();//Привет: Bob

function func(message = "Bob") {
	console.log("Привет: " + message);
};
```
- такая функция *полностью поднимается (вместе с телом) в начало области видимости*(это и есть hoisting)
- её можно *вызывать до объявления в коде*

# Function expression
Функциональное выражение
```js
func();//Uncaught ReferenceError - cannot access before initialization

let func = function(message = "Bob") {
	console.log("Привет: " + message);
};
```
- Переменные, объявленные через [[js let|let]]/[[js const|const]] *не поднимаются* в привычном смысле
- Они находятся в <font color="#ffff00">Temporal Dead Zone</font> (TDZ) - временной мертвой зоне - от начала блока до строки их инициализации

## Hoisting при использовании var

При использовании var ошибка будет другой
```js
func();//TypeError: func is not a function

var func = function(message = "Bob") {
	console.log("Привет: " + message);
};
```
Потому что [[js var|var]] поднимается как [[js undefined|undefined]]

Источник - https://chat.qwen.ai/s/4acc4bdd-e600-42f2-a869-7e902378adf3?fev=0.1.34
