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
start: 2026-01-24T23:01:02+03:00
end:
next:
url:
icon: 📓
color: "#6f97c8"
created: 2026-01-24T23:01:02+03:00
updated: 2026-01-24T23:59:19+03:00
---

> [!toc]+
> ```table-of-contents
> ```

ECMAScript - стандарт. А JavaScript - его реализация.
ES5 - ES2015

BABEL - транспилятор. Позволяет писать на современных стандартах языка, не опасаясь, что браузер пользователя что-то не поддерживает. Babel транспилирует новые стандарты в старые.

# Установка BABEL
https://babeljs.io/

## Встраивание в проект
```html
<body>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
	var num = 5
	var some = "some 123"
</script>
</body>
```
```js

```

## Используя npm

Перед этим скачать nodejs LTS
```zsh
npm init --yes
npm i --save-dev babel-cli babel-preset-env
```

Создать папки `src` и `js` в корне. Создать файл `src/main.js`

Добавить в `package.json` там где scripts и test:
```json
"build": "babel src -d js"//берем все файлы из папки src и кладем в папку js
```

Создать в корне `.babelrc` и поместить туда с сайта babel:
```json
{
	"presets": ["env"]
}
```

```zsh
npm run build
```

В итоге код из файла `src/main.js` будет переписываться в стандарт ES5 и копироваться в `js/main.js`
```js
let num = 5
let some = "some 123"
console.log(`Variable: ${num + 5}, second var: ${some}`)

let arr_1 = [5, 6, 2]
let arr_2 = [5, 9, ...arr_1]

function some() {
    return "hello";
}

const mult = (a, b) => {a ** b}
console.log(func());

setTimeout(() => {
    console.log("some")
},500)
```
Превратится в
```js
"use strict";

var num = 5;
var some = "some 123";
console.log("Variable: " + (num + 5) + ", second var: " + some);

var arr_1 = [5, 6, 2];
var arr_2 = [5, 9].concat(arr_1);

function some() {
    return "hello";
}

var mult = function mult(a, b) {
    Math.pow(a, b);
};
console.log(func());

setTimeout(function () {
    console.log("some");
}, 500);
```
