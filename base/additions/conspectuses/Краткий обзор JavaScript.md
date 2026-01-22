---
tags:
  - source/article/paper
  - mark/log/conspectus
  - category/js
  - category/html
  - category/css
aliases: []
status: 🟦
source:
  - "[[full stack itproger]]"
next:
url:
start: 2026-01-22T15:04:59+03:00
end:
created: 2026-01-22T15:04:59+03:00
updated: 2026-01-22T16:55:57+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Подключение JS

Перед закрывающимся тегом `body`

## В HTML документе:
```html
<body>
	<script>
		console.log("Привет, Вася");
	</script>
</body>
```
## Отдельным файлом:
```html
<body>
	<script src="script.js"></script>
</body>
```

# Переменные

## Типы переменных
3 типа переменных:

### Var
Область видимости - глобальная
```js
var lesson = "JavaScript";
lesson = "JS Уровень 1";
```

### Let
Другая(какая?) область видимости
```js
let day = "16 April";
```

### Const
```js
const FOOTER_COLOR = "#ccc";
```

## Именование переменных и классов

### [[prog camelCase|camelCase]]
- для переменных
- констант, получающих значение [[динамическое создание в языках программирования|динамически]]
- [ ] #task/inbox #category/programming - Сделать заметку по статическому созданию в языках программирования, чтобы связать все вещи, создаваемые на этапе написания кода.
```js
const user = fetchUser(); // ❌ не UPPER_SNAKE_CASE
```

### [[prog PascalCase|PascalCase]]
- для конструкторов и классов
- типов в [[js TypeScript|TypeScript]]

### [[prog UPPER_SNAKE_CASE|UPPER_SNAKE_CASE]]
значение *не меняется* и известно на этапе *написания кода*
```js
const MAX_PLAYERS = 4;
const API_BASE_URL = 'https://api.example.com';
const DEFAULT_TIMEOUT_MS = 5000;
```

### Регистрозависимость

В JavaScript регистр *имеет значение*

# Типы данных

## Number
Используется для целых и дробных чисел.

## String
```js
var txt = "asdfgfdg";
```

## Boolean
```js
var hasFocus = true;
hasFocus = false;

var isFocus = 1;
isFocus = 0;
```

## [[#Object|Object]]

## Специальные значения

### Infinity
```js
console.log(1/0); //infinity
```

### NaN
```js
console.log("текст" * 2);//NaN
```

### Null
значение неизвестно
```js
var cars=null;
```

### Undefined
Значение не присвоено
```js
var cars;
console.log(cars);//undefined
```

# [[логические операторы|Операторы]]

- унарный плюс `+2`
	- явно указывает, что число положительное
- унарный минус `x = -x;`

Дальше условия - они обычные, if/else, switch case.

## [[тернарный оператор]]
```js
var message = "Привет" + (isUser ? userName : 'друг');
```

# Массивы

```js
var empty = [];
var misc = [1.1, true, "a",]; //пустой элемент в конце

var arrObj = [
		[1, {x:1, y:2}],
		[2, {x:3, y:4}]
];
```

# Функции

```js
function showMessage() {
	console.log('Привет');
}
showMessage();

function showMessage(name) {
	console.log('Привет' + name);
}
showMessage('Вася');
```

# Циклы

- while
- for
- do/while
- for/in
```js
while(true) {

}

for (;;;) {

}

do {

}
while (false);

for (variable in object) {
	//intruction;
}
```

# Взаимодействие с пользователем
## alert()
```js
alert(message); //окно с сообщением и приостанавливает выполнение скрипта, пока пользователь не нажмет ок.
```

## prompt(,)

```js
prompt(title, default);//выводит сообщение и ждет, пока пользователь введет текст. Возвращает введенное значение или [[#Null]], если ввод отменен
```
`title` - добавляет заголовок окну
`default` - добавляет в поле ввода текст по умолчанию

```js
var days = prompt('Сколько дней у вас отпуск?', 21);
alert('Количество дней'+ days + 'записано!');
```

## confirm()
```js
confirm(text); //выводит сообщение и ждет, пока пользователь нажмет ок или cancel и возвращает true/false
```

```js
var agree = confirm("Вы согласны на обработку данных?");
alert(agree);
```

# Object
Используется для коллекций данных и инструкций по работе с ними
```js
var car = {name: "LADA"};//представлены в виде ключ: значение
```
## Создание объектов через new

### Описание [[конструктор|конструктора]]
```js
function Car(name, color, year) {
	this.name = name;
	this.color = color;
	this.year = year;
}
```

### Создание экземпляра
```js
var car1 = new Car("Nissan", "green", 1992);
```
## Доступ к элементам объекта
```js
var car = {
	name: "LADA",
	color: "red"
};

console.log(car.name, car["color"]);//2 способа
```

## Определение методов в объекте
```js
function Car(name, color, year) {
	displayCarName: function(name){
	
	}
}

var car1 = new Car("Nissan", "green", 1992);
car1.displayCarName();
```

Функции - функции отдельно от объектов. Метод - функция объекта.

# JSON

Формат передачи данных для общения клиента и сервера.
```json
{
	"model":"lada",
	"color":"red",
	"price":12000,
	"condition":"new"
}
```

`JSON.parse` - из JSON в объект
`JSON.stringify` - объект в JSON. Используется, когда нужно из JavaScript *передать данные по сети*.

## JSON.parse()
```js
var json = '{"result":true,"count":42}';
var obj = JSON.parse(json);

console.log(obj.count);//42
console.log(obj["result"]);//true
```

## JSON.stringify()
```js
var myObj = {
	name: 'Ivan',
	age: 22,
	favouriteFood: 'Beef'
};

var myObjStr = JSON.stringify(myObj);

console.log(myObjStr);//str
console.log(JSON.parse(myObjStr));//Object
```

# DOM, BOM, JS

- Window
	- DOM - описывает структуру страницы объектами JavaScript
		- document
			- html
				- head
				- body
					- ...
	- BOM
		- navigator
			- user browser
		- screen
			- width
			- height
		- location
			- url
			- reload
		- frames
		- history
		- XMLHttpRequest
			- позволяет отправлять асинхронные запросы(без перезагрузки страницы) - AJAX
	- JS
		- Object
		- Array
		- Function

# Поиск элементов в DOM

```js
document.children[0];//через свойство
document.getElementsByTagName('li');//по тегу
document.getElementById('car');//по атрибуту id
document.getElementsByClassName('text');//по атрибуту класс
```