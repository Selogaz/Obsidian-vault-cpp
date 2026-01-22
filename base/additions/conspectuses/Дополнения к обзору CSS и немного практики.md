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
start: 2026-01-19T23:47:29+03:00
end:
created: 2026-01-19T23:47:29+03:00
updated: 2026-01-19T23:59:51+03:00
---

> [!toc]+
> ```table-of-contents
> ```
## 6 Позиционирование блоков
[[css position|position]]
[[Краткий обзор CSS#CSS-свойства позиционирования]]

## 7 - Свойства списков
css list-style
Изменяет точки у списков. Можно указать картинку
```css
ul {
list-style: url('../img/mountain.jpg');
}
```
Убрать точки
```css
ul {
list-style: none;
}
```
Список в строку
```css
ul li{
display: inline-block;
background: #fcfcfc;
margin-right: 10px;
padding: 10px;
border-radius: 5px;
border: 1px solid silver;
cursor: pointer;
}
```
Действия при наведении и тень
```css
ul li:hover {
background-color: #333;
color: #fff;
box-shadow: 
}
```
box shadow generator в гугл

## 8 - Z-index

## 9 - Переопределение свойств
![[css initial]]
![[css inherit]]
![[css unset]]
![[css all]]
![[css important]]

## Шрифты
![[css подключение шрифта]]

## Верстка из figma

- Определить общий шрифт и применить к body
	- Какой толщины шрифт есть в макете?
- Цвет заднего фона главной страницы
	- пкм-copy/paste as/copy as code/css
- Цвет текста по умолчанию
- Общие отступы margin 0 padding 0( *{})
- header: padding 10px 0px, float: left;
- header > div class=all-header
	- header .all-header width: 60%, margin 0 20%;
- .all-header > div class=lang
	- a en
	- a ru class active
	- .lang text-align: right, width:100%;
- .lang a ;
- .lang a font-size 14px;
	- color: #c4c4c4
- a, a:hover
	- color: #000;
- header-main
	- img alt=logo
	- input search
	- a
	- btn reg
	- btn auth
- при использовании [[css float|float]] у родителя тоже должен быть float, иначе все плывет
- при float: right блоки поменяются местами. Для фикса надо их поменять местами в html
- чтобы текст в [[css button|кнопке]] был по центру, можно увеличить [[css line-height|высоту строки]] *до высоты кнопки*[^1]

[^1]: https://github.com/Selogaz/SoundBurner
