---
tags:
  - status/wip
  - project/short
  - priority/c
aliases: []
status: 🟦
priority: 🇨
category:
meta:
problem:
creator:
production:
url:
cover:
start: 2026-01-22T12:55:12+03:00
end:
created: 2026-01-22T12:55:12+03:00
updated: 2026-01-22T14:54:14+03:00
---

# Блок__элемент

у блока должно быть максимально простое и логичное имя
классы должны быть уникальны
- menu
	- menu__list
		- menu__item
			- menu__link
```html
<div class="menu">
        <ul class="menu__list">
            <li class="menu__item"><a class="menu__link" href="#"></a>Главная 1</li>
            <li class="menu__item"><a class="menu__link" href="#"></a>Главная 2</li>
            <li class="menu__item"><a class="menu__link" href="#"></a>Главная 3</li>
            <li class="menu__item"><a class="menu__link" href="#"></a>Главная 4</li>
        </ul>
    </div>
```
Блок только один - `menu`. Все что внутри - элементы блока. Получается, шаблон бэм - *блок__элемент--модификатор*

# Блок внутри блока

Если блок находится внутри другого блока, то ему присваивается дополнительный класс, указывающий на принадлежность к родительскому блоку.
Например, блок `menu` находится внутри блока `header`, поэтому у него должен быть класс `header__menu`:
```html
<header class="header">
      <div class="menu header__menu">
        <ul class="menu__list">
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 1
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 2
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 3
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 4
          </li>
        </ul>
      </div>
    </header>
    <footer class="footer">
      <div class="menu footer_menu">
        <ul class="menu__list">
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 1
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 2
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 3
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 4
          </li>
        </ul>
      </div>
    </footer>
```

```css
.menu {}

.menu.header__menu {}
```

# Модификаторы

Чтобы добавить модификатор к элементу, нужно прописать в нем дополнительный класс по шаблону *блок__элемент--модификатор*

```html
          <li class="menu__item">
            <a class="menu__link menu__link--active" href="#"></a>Главная 1
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 2
          </li>
          <li class="menu__item">
            <a class="menu__link" href="#"></a>Главная 3
          </li>
          <li class="menu__item">
            <a class="menu__link menu__link--deactive" href="#"></a>Главная 4
          </li>
        </ul>
```
```css
.menu__link {
    color: red;
}

.menu__link--active {color: blue;}

.menu__link--deactive {
    color: grey;
    cursor: default;
}
```

# Переменные в CSS

Чтобы объявить и инициализировать переменную, нужно создать область `:root {}`. Имена переменных внутри начинаются с `--`, а между словами в переменных указывается одинарный дефис `-`. Как выяснилось, это [[css kebab-case|kebab-case]]

## Поддержка браузерами
Функции и переменные *не работают на старых браузерах*, вышедших до 2016 года. В IE не работают вообще

## Var
Для использования переменной применяется функция `var()`:
```css
:root {
    --main-color: grey;
}

.menu__link--active {
	color: var(--main-color);
}
```

## Calc

Применяется для математических расчетов:
```css
.menu__link {
	width: calc(100% - 40px);
	padding: 20px;
```
