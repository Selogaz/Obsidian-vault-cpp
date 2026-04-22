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
start: 2026-01-26T16:39:07+03:00
end:
next:
url:
icon: 📓
color: "#6f97c8"
created: 2026-01-26T16:39:07+03:00
updated: 2026-01-30T10:35:11+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Событие отправки данных из формы

PostItems.vue

## @submit.prevent

```vue
<template>
	<form @submit.prevent="createNewArticle">
        <label for="title"><b>Название:</b></label>
        <input type="text" id="title">
        <label for="title"><b>Основной текст:</b></label>
        <textarea id="text" type="text" placeholder="Введите основной текст"></textarea>
        <button>Добавить</button>
    </form>
</template>
```

`prevent` - отменяет стандартное действие, происходящее при отправке данных[^1]

## V-model
```vue
<script setup>
import {ref} from 'vue'

const newArticleTitle = ref('')
const newArticleText = ref('')
</script>

<template>
<input type="text" id="title" v-model="newArticleTitle">
<textarea id="text" type="text" placeholder="Введите основной текст" v-model="newArticleText"></textarea>
</template>

```

`v-model` позволяет указать переменную, в которую будут записываться данные, вводимые в поле

## Функция добавления поста

```vue
<script setup>
const createNewArticle = () => {
    if(newArticleTitle.value && newArticleText.value) {
        articles.value.unshift({
            id: articles.value.length + 1,
            text: newArticleText.value,
            title: newArticleTitle.value
        })
        newArticleText.value = ''
        newArticleTitle.value = ''
    }
}
</script>
```

## Полный код компонента

```vue
<script setup>
import {ref} from 'vue'

let articles = ref([
    {id: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero modi maxime asperiores dolor animi reprehenderit repellat recusandae et aspernatur!', title: 'Первая статья'},
    {id: 2, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero modi maxime asperiores dolor animi reprehenderit repellat recusandae et aspernatur!', title: 'Вторая статья'},
    {id: 3, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero modi maxime asperiores dolor animi reprehenderit repellat recusandae et aspernatur!', title: 'Третья статья'}
])
const deletePost = (id) => {
    let newArr = [];
    articles.value.forEach(item => {
        if (item.id != id) 
            newArr.push(item)
    })
    articles.value = newArr
}

const newArticleTitle = ref('')
const newArticleText = ref('')

const createNewArticle = () => {
    if(newArticleTitle.value && newArticleText.value) {
        articles.value.unshift({
            id: articles.value.length + 1,
            text: newArticleText.value,
            title: newArticleTitle.value
        })
        newArticleText.value = ''
        newArticleTitle.value = ''
    }
}
</script>

<template>
    <div id="articles">
        <div v-for="post in articles" :key="post.id">
            <h2>{{ post.title }}</h2>
            <p>{{ post.text }}</p>
            <button @click="deletePost(post.id)">Удалить пост</button>
        </div>
    </div>

    <form @submit.prevent="createNewArticle">
        <label for="title"><b>Название:</b></label>
        <input type="text" id="title" v-model="newArticleTitle">
        <label for="title"><b>Основной текст:</b></label>
        <textarea id="text" type="text" placeholder="Введите основной текст" v-model="newArticleText"></textarea>
        <button>Добавить</button>
    </form>
</template>

<style scoped>

</style>

```

## maxCharacters

```vue
<script setup>
const maxCharacters = computed(() => newArticleText.value.length) 

</script>

<template>
<form @submit.prevent="createNewArticle" :class="{'text-red-800': maxCharacters > 70}" class="flex flex-col max-w-md">
</form>
</template
```

# CreatePost

Сюда мы перенесли блок с формой добавления поста

## Полный код CreatePost
```vue
<script setup>
import {ref, computed} from 'vue'

const newArticleTitle = ref('')
const newArticleText = ref('')

const emit = defineEmits(['add-post'])
const createNewArticle = () => {
    emit('add-post',newArticleText.value, newArticleTitle.value)
}

const maxCharacters = computed(() => newArticleText.value.length) 

</script>

<template>
    <div class="flex flex-col">
        <h3 class="text-xl ">Добавить новый пост</h3>
        <form @submit.prevent="createNewArticle" :class="{'text-red-800': maxCharacters > 70}" class="flex flex-col max-w-md">
            <div>
                <label for="title" class="block invisible"><b>Заголовок:</b></label>
                <input type="text" id="title" v-model="newArticleTitle" placeholder="Введите заголовок" class="p-1 border border-grey">
            </div>
            <div>
                <label for="title" class="block"><b>Основной текст:</b><span>{{ maxCharacters }}/70</span></label>
                <div class="flex flex-col gap-4">
                    <textarea id="text" type="text" placeholder="Введите основной текст" v-model="newArticleText" rows="3" class="p-1 border border-grey"></textarea>
                    <button class="w-fit px-2 py-1 rounded-md bg-dudar-500">Добавить</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>

</style>

```

### Добавили emit и переписали createNewArticle[^2]

```vue
<script setup>
const emit = defineEmits(['add-post'])
const createNewArticle = () => {
    emit('add-post',newArticleText.value. newArticleTitle.value)
}
</script>
```

## PostItems

```vue
<script setup>
import {ref} from 'vue'
import CreatePost from './CreatePost.vue'

let articles = ref([
    {id: 1, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero modi maxime asperiores dolor animi reprehenderit repellat recusandae et aspernatur!', title: 'Первая статья'},
    {id: 2, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero modi maxime asperiores dolor animi reprehenderit repellat recusandae et aspernatur!', title: 'Вторая статья'},
    {id: 3, text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis vero modi maxime asperiores dolor animi reprehenderit repellat recusandae et aspernatur!', title: 'Третья статья'}
])
const deletePost = (id) => {
    let newArr = [];
    articles.value.forEach(item => {
        if (item.id != id) 
            newArr.push(item)
    })
    articles.value = newArr
}

const createNewArticle = (newArticleText, newArticleTitle) => {
    if(newArticleTitle && newArticleText) {
        articles.value.unshift({
            id: articles.value.length + 1,
            text: newArticleText,
            title: newArticleTitle
        })
        newArticleText.value = ''
        newArticleTitle.value = ''
    }
}

</script>

<template>
    <div id="articles" class="">
        <div v-for="post in articles" :key="post.id" class="flex flex-col gap-4 h-30">
            <div>
                <h2 class="text-xl">{{ post.title }}</h2>
                <p class="">{{ post.text }}</p>
            </div>
            <button @click="deletePost(post.id)" class="w-fit px-2 py-1 rounded-md bg-dudar-500">Удалить пост</button>
        
        </div>
        <CreatePost v-on:add-post="createNewArticle"/>
    </div>
</template>

<style scoped>

</style>

```

### Переписали createNewArticle

обрати внимание, переписали этот метод сразу в **двух компонентах**

Убрали `values`, потому что теперь мы обращаемся не к переменным, объявленным через `ref`, а к *параметрам функции*
```js
const createNewArticle = (newArticleText, newArticleTitle) => {
    if(newArticleTitle && newArticleText) {
        articles.value.unshift({
            id: articles.value.length + 1,
            text: newArticleText,
            title: newArticleTitle
        })
        newArticleText.value = ''
        newArticleTitle.value = ''
    }
}
```

### Импортировали и добавили компонент CreatePost
```vue
<script setup>
import CreatePost from './CreatePost.vue'
</script>

<template>
<CreatePost v-on:add-post="createNewArticle"/>
</template>
```

# Объяснение взаимодействия компонентов Vue от AI

## Общая схема

- Родитель может передавать данные дочернему компоненту через `props`
	- [ ] #task/inbox #category/webdev - Что еще за props?
- Дочерний элемент может отправлять данные родителю через события `emit`

## Emit

Это функция, которую *вызывает дочерний компонент*, чтобы *передать сообщение родителю*. Другими словами, создает **кастомное событие**

Объявление
```js
const emit = defineEmits(['add-post'])//Я могу отправлять событие с именем add-post
```

Вызов - отправка события вверх по дереву
```js
emit('add-post', текст, заголовок)
```

## v-on:add-post

Это прослушивание события в родителе:
```js
<CreatePost v-on:add-post="createNewArticle" />
```
Означает:
- 📌 **Когда дочерний компонент CreatePost отправит событие add-post, вызови функцию createNewArticle и передай ей аргументы из emit**
- 💡 Сокращённая запись: `@add-post="..."` — то же самое, что `v-on:add-post`

## Как все работает вместе?

1. Пользователь заполняет форму в `CreatePost.vue`.
2. Нажимает «Добавить» → вызывается локальная `createNewArticle()`.
3. Она вызывает `emit('add-post', текст, заголовок)`.
4. Родительский компонент **ловит событие** через `@add-post`.
5. Вызывается **родительская** функция `createNewArticle(текст, заголовок)`.
6. Новый пост добавляется в `articles`.

[^1]: потому что взаимодействие с сервером не планируется
[^2]: Для того, чтобы вызывать код из другого компонента
