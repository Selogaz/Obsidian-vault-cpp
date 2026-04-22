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
start: 2026-01-25T18:10:01+03:00
end:
next:
url:
icon: 📓
color: "#6f97c8"
created: 2026-01-25T18:10:01+03:00
updated: 2026-01-25T19:04:13+03:00
---

> [!toc]+
> ```table-of-contents
> ```

За счет промисов можно выполнять код асинхронно

# Создание промиса
```js
let p = new Promise(function(resolve, reject){
	let isGoodVideo = true
	if (isGoodVideo) {
		resolve("Video is nice")//сообщение поместится в параметр mess
	} else {
		reject('Video is failed')
	}
})

p.then((mess) => {
	console.log("Mess: " + mess)
}).catch((mess) => {
	console.log("Mess: " + mess)
})
```
`resolve` - вызывает код, который выполнится в случае, если код успешно обработался
`reject` - если код обработался с ошибкой
`then()` - выполнится после вызова `resolve`
`catch()` - выполнится после вызова `reject`

# Без промисов
```js
let jsBetterThanPhp = true;
let nodeJsIsGreat = true;

function isJsWorthCallback(success, error) {
	if(jsBetterThanPhp && nodeJsIsGreat) {
		success({
			isWorth: true,
			name: "JS"
		})
	} else {
		error("JS isn't so great :(")
	}
}

isJsWorthCallback((mess) => {
	console.log("Success: " + mess.name)
}, (error) => {
	console.error("Err: " + error)
})
```

# С промисами
```js
let jsBetterThanPhp = true;
let nodeJsIsGreat = true;

function isJsWorthCallback() {
	return new Promise((resolve, reject) => {
		if(jsBetterThanPhp && nodeJsIsGreat) {
			resolve({
				isWorth: true,
				name: "JS"
			})
		} else {
			reject("JS isn't so great :(")
		}
	})
	
}

isJsWorthCallback().then((mess) => {
	console.log("Success: " + mess.name)
}).catch((mess) => {
	console.error("Err: " + error)
})
```

# Многоэтажный then
```js
isJsWorthCallback().then((mess) => {
	console.log("Success: " + mess.name)
}).then(() => {
	console.log("Next message")
}).catch((mess) => {
	console.error("Err: " + error)
})
```

# Finally
```js
isJsWorthCallback().then((mess) => {
	console.log("Success: " + mess.name)
}).then(() => {
	console.log("Next message")
}).catch((mess) => {
	console.error("Err: " + error)
}).finally(() => {
	console.warn("ALL is done")
})
```

# Действие после каждого промиса
```js
const p1 = new Promise((resolve. reject) => {
	setTimeout(() => {
		console.log("Starting")
		resolve()
	}, 1000)
})

const p1 = new Promise((resolve, reject) => {})
const p1 = new Promise((resolve, reject) => {})

Promise.all([p1, p2, p3]).then(() => {
	console.log("App finished")
}).catch(() => {
	console.error("Error")
})
```

# Практика по Промисам
reqres.in/api/users

## Fetch
Считывает url адрес и возвращает промис
```js
console.log(fetch('https://reqres.in/api/users'))
```
`headers` - ответ соединения

### Короткая запись
```js
fetch('https://reqres.in/api/users')
	.then(res => res.json())//объект Promise
	.then(data => console.log(data))//JSON
```

### Получение поля json
```js
fetch('https://reqres.in/api/users')
	.then(res => res.json())
	.then((data) => {
	console.log(data)
	console.log(data.data[2].email)
	})
```
