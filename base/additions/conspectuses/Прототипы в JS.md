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
start: 2026-01-25T17:37:16+03:00
end:
created: 2026-01-25T17:37:16+03:00
updated: 2026-01-25T17:58:24+03:00
---

> [!toc]+
> ```table-of-contents
> ```

Прототипы позволяют создавать функционал, который будет унаследован всеми объектами

# Переопределение стандартных методов

Считается плохой практикой, опасно
```js
Object.prototype.toString = function() {
	console.log("Object printed");
}

Array.prototype.sort = function() {
	return []
}
```

# Создание новых стандартных методов
```js
Object.prototype.consoleInfo = function() {
	console.log("Console printed");
}
```

# Создание объекта на базе существующего
```js
let audi = {speed: 250}
let bmw = Object.create(audi);//объект будет пустым, но в __proto__ будут лежать свойства как у audi
```
