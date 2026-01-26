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
start: 2026-01-25T20:13:26+03:00
end:
created: 2026-01-25T20:13:26+03:00
updated: 2026-01-25T20:44:23+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Создание и вызов генератора
```js
function* generator() {
	yield 1
	yield 2
	yield 3
	yield 4
	yield 5
}

let numbers = generator();

console.log(numbers.next());//вывод 1 итерации
console.log(numbers.next());//вывод 2 итерации
console.log(numbers.next());//вывод 3 итерации
```

# Вызов свойств генератора
```js
function* generator() {
	for (let i = 1; i <= 5; i++) 
		yield i
}

let numbers = generator();

console.log(numbers.next().value);
console.log(numbers.next().done);
```

# Переопределение функции next
```js
let obj = {
	generator() {
		let i = 0
		return {
			next() {
				return {value: ++i, done: false}
			}
		}
		
	}
}

let gen = obj.generator()
```
