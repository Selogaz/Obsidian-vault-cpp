---
tags:
  - note/specific/code
  - category/js
aliases:
  - Composition API vs Options API
deck: obsidian::js
created: 2026-01-26T01:34:52+03:00
updated: 2026-01-26T01:34:52+03:00
---

**Composition API vs Options API**
—

Options API
```js
export default {
  data() {
    return {
      count: 0,
      name: 'Vue'
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    }
  },
  watch: {
    count(newVal) {
      console.log('Счётчик изменился:', newVal)
    }
  }
}
```

Composition API
```js
<script setup>
import { ref, computed, watch } from 'vue'

// Реактивные данные
const count = ref(0)
const name = ref('Vue')

// Вычисляемое свойство
const doubleCount = computed(() => count.value * 2)

// Метод
function increment() {
  count.value++
}

// Наблюдатель
watch(count, (newVal) => {
  console.log('Счётчик изменился:', newVal)
})
</script>
```

Преимущества Composition API:
- Лучшая организация кода
	- группировка по смыслу, а не по типу[^2]
- Переиспользование логики
	- Можно создавать кастомные хуки и переиспользовать в компонентах
- Типизация в [[js TypeScript|TypeScript]]
- Производительность
	- Меньше накладных расходов при рендеринге