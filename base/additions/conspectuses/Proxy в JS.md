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
start: 2026-01-25T19:04:25+03:00
end:
created: 2026-01-25T19:04:25+03:00
updated: 2026-01-25T20:12:16+03:00
---

> [!toc]+
> ```table-of-contents
> ```

Создание [[java Proxy|Proxy]] - изменение объекта с целью добавления функциональности
```js
const car = {
	model: 'BMW',
	speed: 230,
	weight: 1.3
}

const prox = new Proxy(car, {
	get(target, prop) {
		return target[prop]
	}
})
```

# Get
```js
const car = {
	model: 'BMW',
	speed: 230,
	weight: 1.3
}

const prox = new Proxy(car, {
	get(target, prop) {//Отслеживает получение значения
		if(prop === "model")//=== - проверка на тип данных
			console.log("Модель вам не узнать!")
		else 
			return target[prop]
	}
})
```

# Set
```js
const car = {
	model: 'BMW',
	speed: 230,
	weight: 1.3
}

const prox = new Proxy(car, {
	get(target, prop) {
		if(prop === "model")
			console.log("Модель вам не узнать!")
		else 
			return target[prop]
	},
	set(target, prop, value) {//Отслеживает изменение значений
		console.log(`Попытка установить ${prop} со значением ${value}`);
		if (prop === "model" && value === "Audi")
			target[prop] = value
		else
			console.error("Такое установить нельзя")
	}
})
```

```js
const car = {
	model: 'BMW',
	speed: 230,
	weight: 1.3
}

const prox = new Proxy(car, {
	get(target, prop) {
		if(prop === "model")
			console.log("Модель вам не узнать!")
		else 
			return target[prop]
	},
	set(target, prop, value) {
		if (['color', 'height', 'width', 'speed'].indexOf(prop !== -1)
			throw Error("Такое значение установить нельзя")
		console.log(`Попытка установить ${prop} со значением ${value}`);
		if (prop === "model" && value === "Audi")
			target[prop] = value
		else
			console.error("Такое установить нельзя")
	}
})
```

# Has
```js
const prox = new Proxy(car, {
	has(target, prop)//проверка существует ли такое свойство у объекта
})
```

```js
const prox = new Proxy(car, {//позволяет указать пользователю с какими полями можно работать, а с какими нет
	has(target, prop) {
		if (prop === 'color')
			return true
	}
})
```

# deleteProperty
```js
deleteProperty(target, prop) {
	if (prop !== 'model')
		delete target[prop]
	else
		throw Error("Модель удалить нельзя!")
}
```

# Создание функций с помощью Proxy
```js
function carMove() {//равнозначные записи
	return 'yeap, we are moving'
}

const carMove = () => 'yeap, we are moving'//равнозначные записи

const proxMove = new Proxy(carMove, {
	apply(target, thisArg, argArray) {
		return target().toUpperCase()
	}
})

console.log(proxMove())
```
`target` - `carMove`
`argArray` - параметры, которые могут передаваться в функцию `carMove`
`thisArg` - параметры, которые можем передать внутрь `apply`

# Использование прокси на практике

[[Ввод через нижнее подчеркивание, а вывод через пробел с помощью Proxy|Использование Прокси на практике]]
