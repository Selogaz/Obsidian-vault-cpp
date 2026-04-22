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
start: 2026-01-26T00:10:21+03:00
end:
next:
url:
icon: 📓
color: "#6f97c8"
created: 2026-01-26T00:10:21+03:00
updated: 2026-01-26T16:09:27+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Node JS и npm

Установить node js LTS - https://nodejs.org

Следующие команды вводить в папке проекта:

# DEPRECATED

```zsh
npm install -g @vue/cli
```

vue/cli больше не поддерживается, нужно использовать vite

# Установка vue + vite

```zsh
npm create vue@latest

Project name (target directory):
│  my-vue-app
│
◇  Select features to include in your project: (↑/↓ to navigate, space to select, a to toggle all, enter to confirm)
│  Pinia (state management), ESLint (error prevention), Prettier (code formatting)
│
◇  Select experimental features to include in your project: (↑/↓ to navigate, space to select, a to toggle all, enter
to confirm)
│  none
│
◇  Skip all example code and start with a blank Vue project?
│  No
```

## Запуск проекта

```zsh
cd my-vue-app
npm install
npm run format
npm run dev
```

## Чето про typescript

Надо добавить в файл jsconfig.json, иначе ошибку видит
```json
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
```

# Папки в проекте

## Src - для разработки

### App.vue

внутрь переменной msg передается текст
```html
<HelloWorld msg="Welcome"/>
```

#### Script setup

Подключение компонентов

вместо `export default` используется `<script setup>` - автоматически делает компонент "экспортируемым". [^1]
Было:
```js
export default {
  setup() {
    // ваши импорты и логика
    return { /* всё, что нужно для шаблона */ }
  },
  components: { HelloWorld }
}
```
Стало:
```js
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
```

- 🤖 Вроде бы все это часть [[js Composition API vs Options API|Composition API]]

#### Template
Тут находится html код. Здесь используются компоненты
Нельзя запустить проект с пустым template

#### Style scoped
Тут css. Scoped - css применяется только к этому компоненту, а не сразу ко всем.

### components/
Очевидно, здесь лежат компоненты

## Public - продакшн?
Только эту папку можно поместить на сервер

# Удаляем старое и добавляем свой код
App.vue

старый код
```vue
<style scoped>

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction:column;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
```

## User и ratings
```js
<script setup>
import {reactive, ref} from 'vue'

const user = reactive({
  id: 1,
  login: 'Gosha',
  name: 'George',
  surname: 'Dudar',
  email: 'admin@itproger.com',
  isAdmin: true
})
const ratings = ref(0)


// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
</script>
```
```html
<template>
  
  <header>
    <p>Привет, {{ user.name }}</p>
    <p>Твой рейтинг: {{ ratings }}</p>
    <button @click="ratings++"> Увеличить рейтинг</button>
  </header>
  
  
  <!-- <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main> -->
</template>
```
## Computed
```js
<script setup>
import {reactive, ref, computed} from 'vue'

const user = reactive({
  id: 1,
  login: 'Gosha',
  name: 'George',
  surname: 'Dudar',
  email: 'admin@itproger.com',
  isAdmin: true
})
const ratings = ref(0)
const fullName = computed(() => `${user.name} ${user.surname}`) 

</script>
```

```html
<template>
  <header>
    <p>Привет, {{ user.name }}</p>
    <h2>{{ fullName }}</h2>
    <p>Твой рейтинг: {{ ratings }}</p>
    <button @click="ratings++"> Увеличить рейтинг</button>
  </header>
  
</template>
```

## Метод addRating

```js
let ratings = ref(0)
const addRating = () => `${ratings.value++}`
```
```html
<template>
	Твой рейтинг: {{ ratings }}<br>
	<button @click="addRating"> Увеличить рейтинг</button>
</template>
```

## Метод onMounted

Применяется при загрузке страницы

```js
import {reactive, ref, computed, onMounted} from 'vue'
let ratings = ref(0)
onMounted(() => ratings.value++)
```
```html
<template>
	Твой рейтинг: {{ ratings }}<br>
	<button @click="addRating"> Увеличить рейтинг</button>
</template>
```
## Watch

Отслеживает изменения

```js
import {reactive, ref, computed, onMounted, watch} from 'vue'
let ratings = ref(0)
watch(ratings,(newValue, oldValue) => {
	console.log(`Новое значение: ${newValue}, старое значение ${oldValue}`)
})
```
```html
<template>
  <header>
    <div>Привет, {{ user.name }}</div>
    <div>{{ fullName }}</div>
    Твой рейтинг: {{ ratings }}
    <button @click="addRating"> Поставить лайк</button>
  </header>
  
</template>
```

# Создание компонента

Копируем из App.vue всё в components/UserInfo.vue. Удаляем весь JS и html[^2] в App.vue и добавляем следующие строки:

App.vue
```js
import UserInfo from './components/UserInfo.vue'
```
```html
<template>
  <UserInfo/>
</template>
```

[^1]: script setup - синтаксический сахар над export default
[^2]: кроме `<template></template>`
