---
tags:
  - status/todo
  - source/article/paper
  - category/webdev
aliases:
  - Vue.js
published:
addition:
zotero: "[🇿](zotero://select/items/@Vuejs)"
status: 🟥
rating:
scientificity:
category:
  - "[[webdev]]"
meta:
problem:
creator:
production:
start: 2026-01-13T22:43:43+03:00
end:
url:
  - "[ru.vuejs.org](https://vuejs.org/)"
icon: 📃
color: "#7575c0"
created: 2026-01-13T22:43:43+03:00
updated: 2026-03-04T19:31:03+03:00
related:
---

https://ru.vuejs.org

# Введение

js определение vue js
JavaScript фреймворк для создания пользовательских интерфейсов

[[Vue.js]]

## Пример кода
```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

```html
<div id="app">
  <button @click="count++">
    Счётчик: {{ count }}
  </button>
</div>
```

*две главные особенности* vue:
- **Декларативная отрисовка**: vue расширяет стандартный html синтаксисом шаблонов, позволяет [[Декларативный подход|декларативно]] описывать финальный html *на основе состояния JavaScript*
- **Реактивность**: Vue автоматически *отслеживает изменение состояния* JavaScript и эффективно *обновляет* DOM, когда происходят изменения
