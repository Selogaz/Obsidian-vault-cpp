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
start: 2026-01-25T21:22:17+03:00
end:
created: 2026-01-25T21:22:17+03:00
updated: 2026-01-25T23:37:11+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Описание
К сожалению, курс на vue 2, а сейчас актуальная версия - 3. Поэтому я буду с помощью ИИ переписывать код из видео на vue 3

# CDN
```js
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="js/main.js"></script>
```
# Vue 2
```html
<div id="app">

</div>
```
```js
new Vue({
	el: '#app',
	data: {

	}
);
```

# Первый div
К сожалению, курс на vue 2, а сейчас актуальная версия - 3. Поэтому я буду с помощью ИИ переписывать код из видео на vue 3
## 1
```html
<div id="app">
	<h1>{{ title }}</h1>
	<p>{{ isTrue }}</p>
</div>
```
```js
const { createApp } = Vue;

createApp({
	data() {
		return {
			title: 'Hello World',
			isTrue: true
		};
	}
)).mount('#app');
```

## События в vue
```html
<div id="app">
	<h1>{{ title }}</h1>
	<p>{{ isTrue }}</p>
	<button @click="title='Новый текст'">Нажми на меня</button>
	<button v-on:click="title='v-on-текст'">Нажми на меня снова</button>
</div>
```

## Methods
```html
<button @click="changeText">Нажми на меня</button>
```
```js
const { createApp } = Vue;

createApp({
	data() {
		return {
			title: 'Hello World',
			isTrue: true
		};
	},
	methods: {
		changeText() {
			this.title = 'Новый текст'
		}
	}
)).mount('#app');
```

## Input

Обрати внимание, что атрибут указан как `:style`[^1] и значение без фигурных скобок.
Сам код позволяет через поле `input` применять css-свойства к другому полю(круто!)
```html
<div id="app">
	<h1>{{ title }}</h1>
	<p :style="style">{{ isTrue }}</p>
	<input type="text" @input="style = $event.target.value">
	<button @click="changeText">Нажми на меня</button>
</div>
```
```js
createApp({
	data() {
		return {
			title: 'Hello World',
			isTrue: true,
            style: ''
		};
	},
    methods: {
		changeText() {
			this.title = 'Новый текст'
		}
	}
}).mount('#app');
```

# Второй div

```html
<div id = "second">
	<input type="text" @input="increment($event.target.value)">
	<p>{{ first_num }}</p>
	<p><b>{{ second_num }}</b></p>
</div>
```
```js
createApp({
    data() {
        return {
            first_num: 2,
            second_num: 1
        };
    },
    methods: {
        increment(val) {
            this.first_num = val,
            this.second_num = parseInt(val) + 10
        }
    }
}).mount('#second');
```

## Свойство computed
```js
createApp({
    data() {
        return {
            first_num: 2
        };
    },
    methods: {
        increment(val) {
            this.first_num = val
        }
    },
    computed: {
        second_num() {
           return parseInt(this.first_num) + 10
        }
    }
    
}).mount('#second');
```

[^1]: Можно было указать как `v-bind:style`
