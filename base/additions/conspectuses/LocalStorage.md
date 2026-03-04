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
start: 2026-01-25T20:44:37+03:00
end:
created: 2026-01-25T20:44:37+03:00
updated: 2026-01-25T21:04:35+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# LocalStorage и сессия

- В папке storage можно сохранять те вещи, которые мы хотим сохранить в браузере
- Ранее данные хранились в сессиях, но их минус - работают до закрытия браузера
- Из localStorage можно удалить информацию только с помощью JS
- LocalStorage может хранить информацию неограниченно долго

# Пример использования

Пользователь закрыл окно - это сохранили в localstorage - в следующий раз окно не показываем

```js
localStorage.
```

# Методы

## Полностью очистить localStorage
```js
localStorage.clear()
```

## Получить элемент
```js
localStorage.getItem("name")
```

## Получить значение по индексу
```js
localStorage.key(0)
```

## Количество сохраненных данных

```js
localStorage.length
```

## Prototype

## Удалить элемент
```js
localStorage.removeItem("name")
```

## Положить элемент в localStorage

```js
localStorage.setItem("name", "Alex")//только строки
```

# Просмотреть localstorage

F12 - Application - Storage - Local Storage
