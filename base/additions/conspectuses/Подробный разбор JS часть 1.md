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
start: 2026-01-24T20:58:15+03:00
end:
created: 2026-01-24T20:58:15+03:00
updated: 2026-01-24T21:02:18+03:00
---

> [!toc]+
> ```table-of-contents
> ```

[[Подробный разбор JS Часть 2|Продолжение]]

# Переменные и типы данных

var - не выбрасывает ошибок
let - выбрасывает ошибки
const - тоже выбрасывает

## Разница между var и let

```js
for (var i = 0; i < 10; i+++) {
	console.log(i);
}
console.log(i);//i = 10
```
```js
for (let i = 0; i < 10; i+++) {//видна только внутри цикла
	console.log(i);
}
console.log(i);//Uncaught ReferenceError - i is not defined
```

целое число, дробное, строка, булево, null, undefined, объект

# Операторы

Переменные можно разносить по разным файлам. Но тогда играет роль то, в каком порядке файлы подключаются в теге `<script>`. Файлы стоит подключать сверху вниз в порядке использования программами

## Унарный + и унарный -
знак перед переменной меняет знак её содержимого
```js
let x = 15;
x=-x;
console.log(x);//-15
```

## Конкатенация
```js
let x=10;
let y = 15;
console.log("Результат: " + x + y);//1015
console.log("Результат: " + (x + y));//25
```

# Массивы
`array.length` - длина

Если добавить элемент в массив по любому его индексу, то промежуточные элементы будут пустыми, если они не были явно указаны.

`array.pop()` - удалить последний элемент
`array.push()` - добавить элементы в конец. Аналогично записи `array[array.length] = ;`
	- важно! Если допустить ошибку в слове, индекс элемента будет `undefined`
`array.shift()` - удалить первый элемент массива
`array.unshift()` - добавить элемент в начало(остальные сдвигаются)
`delete array[i]` - удалить элемент(без сдвига)

## Создание массива через new

```js
let arr = new Array(5);//5 пустых элементов
let arr = new Array(5,4);// 2 элемента: [5,4]
```

## Строку в массив(split)
```js
str = "Hello, world, 5, 0, qqwe";
let array_split = str.split(", ");
```

## Массив в строку(join)

```js
let array = [1, 2, 3];
let str = array.join(",");//1,2,3
```

## splice()

Удаляет(со сдвигом) элементы, начиная с определенного индекса и выше.

```js
array.splice(indexFromDelete, numberOfElements);
```

## Функции для работы с массивами

```js
let arr = ["BMW","Mercedes","Audi","Volvo"];
```

### forEach
```js
arr.forEach(function(item, i, arr) {
	console.log("Index: " + i + ": " + item + ". Массив: " + arr);
});
```

### Filter
```js
let newArr = arr.filter(function(el) {
	return el.length == 3 || el.length == 4;
});
```

### Map
Функция для преобразования *КАЖДОГО элемента*. В любом случае вернет все элементы, даже если делать фильтрацию. Не прошедшие фильтрацию окажутся [[js undefined|undefined]]
```js
let newArr = arr.map(function(el) {
	return el.toLowerCase();
});
```

### Every и some
```js
function elLength(el) {
	return el.length == 3;
}

console.log(arr.every(elLength));//если каждый вернул тру, то тру
console.log(arr.some(elLength));//если хотя бы 1 вернул тру, то тру
```

### Reduce
```js
let nums = [1,2,3,4,5];

let summa = nums.reduce(function(sum, el) {//sum - результат прошлой операции, el - текущий элемент
	return sum + el;//сумма всех элементов
});
```

```js
let currency = [23.5, 4.56, 33.5];
let average = currency.reduce(function(total, el, index, array) {
	total += el;
	if (index === array.length - 1)
		return total / array.length;
	else
		return total;
});
//index - индекс текущего элемента
//array - currency
//среднее арифметическое
```

#### reduceRight()
Читает элементы справа налево
```js
let currency = [23.5, 4.56, 33.5];
let average = currency.reduceRight(function(total, el, index, array) {
	total += el;
	if (index === 0)
		return total / array.length;
	else
		return total;
});
```

#### Значение по умолчанию
Если в процессе выполнения reduce возникла ошибка,[^1] то используется указанное вторым параметром значение по умолчанию
```js
let currency = [23.5, 4.56, 33.5];
let average = currency.reduce(function(total, el, index, array) {
	total += el;
	if (index === array.length - 1)
		return total / array.length;
	else
		return total;
}, 0);//в случае ошибки average станет 0
```

# Циклы и операторы в них

## forEach
Наиболее удобный способ перебора массива
```js
arr.forEach(function(item, i, array) {
	console.log("Элемент под номером №" + i + ": " + item + ". Массив: " + array);
});
```

## [[Краткий обзор JavaScript#Циклы|forIn]]
Для перебора *объектов*, но для примера будет массив
```js
for(var key in arr) {
	console.log("Элемент под номером №" + key + ": " + arr[key] + ". Массив: " + arr);
}
```

Дальше будет разница между var и let, но я запишу её [[#Разница между var и let|в самом начале]] для экономии места

# [[Краткий обзор JavaScript#Функции|Функции]]

## Область видимости, локальные и глобальные переменные

Вызов локальной переменной вне её области видимости
```js
function show() {
	var el = "Element";//Видна только внутри функции, даже несмотря на то, что это var
	console.log(el);
}
console.log(el);//Uncaught ReferenceError - el is not defined
```

Вызов глобальной переменной
```js
var i = 0; //глобальная переменная, видна во всех вложенных блоках кода. Var или let - неважно
function show() {
	console.log(i);//0
}
console.log(i);//0
```

Переменные, создаваемые вне функций видны во всем документе? Создаваемые внутри функции - только внутри этой функции

параметры функции - тоже локальные переменные
```js
function calc(a,b) {//a и b нельзя вызвать вне функции
	if (b == undefined) {
		b = 10;
	}
	var res = a + b;
	console.log(res);
}

calc(56);
```

## Оператор return
Хах, тут нет никаких void, private/static и прочего

```js
function multiply(a,b,c) {
	var res = a * b * c;
	return res;
}

let mult = multiply(5,2,2);
```

## Значение по умолчанию для параметров

```js
function calc(a, b = 10) {

}
```

## Присвоение функции переменной Оо(hoisting)

- [x] #task/inbox #category/webdev Это че такое блять? ✅ 2026-01-23
- 🤖 [[js функция как объект первого класса]]

```js
function calc(a, b = 10) {
	var res = a + b;
	console.log(res);
}

let func = calc;//копируем ссылку на саму функцию. Почти как дать ей второе имя
func();
```
calс ничего не возвращает, но она *неявно возвращает* [[js undefined|undefined]]

### Вызов функции внутри переменной до её объявления[^2]

```js
func();//Uncaught ReferenceError - cannot access before initialization

let func = function(message = "Bob") {//функциональное выражение
	console.log("Привет: " + message);
};
```

В случае обычной функции - никаких ошибок не будет.[^3]

```js
func();//Привет: Bob

function func(message = "Bob") {//объявление функции
	console.log("Привет: " + message);
};
```

- 🤖 Ага, это дерьмище называется *hoisting*.[^4]

## Отложенное выполнение функции
```js
function test(a,b) {
	console.log("Hello World");
}

setTimeout(test, 1500, valueA, valueB);
```

```js
setTimeout("console.log('Привет')", 1500);
```

### <font color="#ffff00">Анонимная функция</font>?
```js
setTimeout(function() {
	console.log('Привет');
}, 1500);
```

### clearTimeout()

отключает timeOut(функция вообще не исполнится)
```js
let timeOut = setTimeout(function() {
	console.log('Привет');
}, 1500);
clearTimeout(timeOut);
```

### setInterval()

код *вызывается через равные промежутки времени*
```js
function test(words) {
	console.log(words);
}
setInterval(test, 2000, "setInterval");
```

### clearInterval()
```js
let interval = setInterval(function() {
	console.log('Привет');
}, 2000);

setTimeout(function() {
	clearInterval(interval);
	console.log("Стоп");
}, 5000);
```

# Взаимодействие с пользователем
тоже самое, что и [[Краткий обзор JavaScript#Взаимодействие с пользователем]]

# Объекты и классы
[[Краткий обзор JavaScript#Object]]

[[класс]] - специальная конструкция, на основе которой можно создавать множество объектов

## This
this означает, что мы обращаемся к тому классу, в котором вызывается `this`
```js
function Car(marka, color, type, speed) {
	this.marka = marka;
	this.color = color;
	this.type = type;
	this.speed = speed;
}
```

## Создание объекта

```js
let bmw = new Car ("M3","Синий","Sedan",270);
```

## Обращение к свойству объекта
```js
bmw.color;
bmw["color"];
```

## Перебор элементов объекта [[#Краткий обзор JavaScript Циклы forIn|forIn]]
```js
let car = {
	marka: "Volvo",
	color: "Белый"
};
for (let key in car) {
	console.log("Элемент по ключу " + key + ": " + car[key]);
}
```

## Функции внутри класса

- [ ] #task/inbox #category/webdev - Разница между `function Car` и `class Car`?

### [[конструктор]]

```js
class Car() {
	constructor(marka, color, type, speed) {
		this.marka = marka;
		this.color = color;
		this.type = type;
		this.speed = speed;
	}
}
```

### Методы класса

#### Объявление метода
```js
class Car() {
	info() {
		console.log(this.marka + this.color + this.type + this.speed);
	}
}
```

#### Вызов метода
```js
bmw.info();
```

## Создание нового свойства у конкретного объекта

```js
let bmw = new Car ("M3","Синий","Sedan",270);
let volvo = new Car ("cxx","White","Sedan",200);

bmw.weight = 1800;
console.log(bmw.weight);//1800
console.log(volvo.weight);//undefined
```

# JSON
[[Краткий обзор JavaScript#JSON]]

## parse()

JSON -> объект
```js
var json = '{"result":true,"count":42}';
var obj = JSON.parse(json);//объект

let array = '[56, 7, 2, 89]';
array = JSON.parse(array);//массив
```

Для корректного преобразования в JSON все *свойства объекта должны быть в двойных кавычках*. *Значения свойств тоже* только в двойных кавычках, за исключением булевых значений и цифр.

## stringify()

объект -> JSON

### Второй параметр

Вторым параметром можно указать какие свойства будут содержаться в итоговом JSON
```js
var object = {
	"name": "Андрей",
	"age": 45,
	"state": "US"
};

let str = JSON.stringify(object, ["name","state"]);
let ptr = JSON.stringify(object, "");//пустая строка позволит включить все свойства, либо можно не указывать 2 параметр
```

### Третий параметр
Третий параметр - отступ слева у свойств. Выведется не в 1 строку, а каждое свойство с новой строки и с отступами.
```js
let ptr = JSON.stringify(object, "", 4);
```

# Коллекции Set и Map

## Set
[[java set]]
[[коллекция|Коллекция]] без повторяющихся элементов
```js
let mySet = new Set();
mySet.add(5);
```

### Перебор сета

```js
for (let el of mySet) {
	console.log(el);
}
```

```js
mySet.forEach(function(el) {
	console.log(el);
);
```

### Удаление элемента
```js
mySet.delete(5);
```

### Проверка существует ли элемент
```js
let hasElement = mySet.has(5);
```

## Map
[[java map]]
[[коллекция|Коллекция]] из пар ключ-значение

### Разница между Map и объектом

В объектах *ключ - всегда строка*
В Map *ключ - любой тип данных*. Не будет преобразован к строке.

### Создание Map
```js
let map = new Map();
```

### Добавление нового элемента
```js
map.set("first", "str1");
map.set(2, "str2");
map.set({"name":"alex"}, "str4");
```

### Удаление элемента
```js
map.delete(2);//удаление по КЛЮЧУ, не по значению
```

### Размер коллекции
```js
map.size;
```

### Существует ли элемент
```js
let hasEl = map.has(2);
```

### Перебор ключей
 ```js
 for (let el of map.keys()) {
	 console.log(el);
 }
 
 for (let el of map) {
	 console.log(el[0]);
 }
 ```

### Перебор значений
 ```js
 for (let el of map.values()) {
	 console.log(el);
 }
 
 for (let el of map) {
	 console.log(el[1]);
 }
 ```

[^1]: Например, пустой массив
[^2]: Иначе говоря, использование [[js hoisting#Function expression|функционального выражения]]
[^3]: Потому что это [[js hoisting#Function declaration|объявление функции]]
[^4]: [[js hoisting|hoisting]]
