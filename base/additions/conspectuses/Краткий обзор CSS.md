---
tags:
  - source/article/paper
  - mark/log/conspectus
  - category/webdev
aliases: []
status: 🟦
source:
  - "[[full stack itproger]]"
next:
url:
start: 2026-01-18T16:03:30+03:00
end:
created: 2026-01-18T16:03:30+03:00
updated: 2026-03-04T19:54:36+03:00
---

> [!toc]+
> ```table-of-contents
> ```
# 📋 CSS синтаксис

```css
селектор {
	свойство: значение;
	свойство: значение;
}
```
## Способы подключения css
- тег `<link>
- тег `<style></style>`
- атрибут `style`
```html
<link rel="stylesheet" href="style.css">
<style> немного стилей </style>
<div style="немного стилей"</div>
```
## Селекторы CSS

`*{}` - по всем тегам на странице
`div {}` - по тегу
`.container {}` - по классу
`div.container` - по тегу с классом
`#header {}` - по id(должен быть уникальным)
`.header a {}` - по тегу внутри тега с классом
`.header .logo {}` - по классу внутри тега с классом
`.logo + .menu {}` - соседние
`.header .logo + .menu {}` - контекстные и соседние
`ul > li` - только дочерние
`input[checked]` - по атрибуту
`unput[type="text"]` - по атрибуту со значением

## Псевдоклассы CSS

`селектор:псевдокласс {}`

### Первый и последний элемент
`:first-child` - первый дочерний элемент родителя
`:last-child` - последний дочерний элемент родителя
```css
li:last-child {}
```

### По порядковому номеру
`селектор:nth-child(выражение) {}`

В качестве выражения может быть порядковый номер или функция

```css
li:nth-child(5) {} - пятый элемент
li:nth-child(2n) {} - четные элементы
li:nth-child(2n + 1) {} - нечетные элементы
li:nth-child(even) {} - четные элементы
li:nth-child(odd) {} - нечетные элементы
```

### Псевдоклассы для ссылок
`селектор:link {}` - не посещенные ссылки
`селектор:visited {}` - посещенные
`селектор:hover {}` - при наведении
`селектор:active {}` - активные ссылки

`селектор:focus {}` - когда используем навигацию TAB или поставили в поле курсор. По умолчанию обводка голубого цвета
`селектор:empty {}` - пустые элементы
`селектор:not(селектор) {}` - не соответствующие селектору функции
```css
div:not(.red) /*- все блоки, у которых нет класса red*/
body:not(p) /*все элементы которые не p*/
```

## Псевдоэлементы CSS
`селектор::before {}` - первый потомок
`селектор::after {}` - последний потомок

`селектор::first-line {}` - первая строка
Применяет стили к первой строке блочного элемента. К этому псевдоэлементу можно применить свойства, связанные со шрифтами, цветом, фоном.

`селектор::first-letter {}` - первая буква
Применяет стили к первой букве первой строки. Только если перед первой строкой нет другого элемента.

## Категории CSS-свойств
- Оформление текста
- Блочная модель (размеры и отступы)
- Управление потоком элементов
- Управление позиционированием
- Фоны
- Декоративные элементы
- Анимация и динамические эффекты

## Цифровые значения CSS

### Абсолютные
`height: 100px;`
`font-size: 18px;`

### Относительные
`height: 100%;`
`font-size: 1em;`
`font-size: 2rem;`

## Цветовые значения CSS

`color: #000;` - короткая запись
`color: #000000;` - полная запись
`color: rgb(255,255,255);`
`color: rgba(255,255,255,0.5);`
`color: hsl(0,100%,50%);`
`color: hsla(0,100%,50%,0.5);`

## CSS-свойства для текста
```css
.text {
	font-family:;- вид и семейство шрифта
	font-size:; - размер шрифта в px или %
	font-style: italic; - курсивный текст
	font-weight: bold; - жирный текст
	letter-spacing:; - расстояние между символами в px
	text-align:; - выравнивание
	text-decoration: underline; - подчеркнутый текст
	text-transform: uppercase; - преобразует буквы в заглавные
	line-height:; - междустрочный интервал
}
```

## CSS-свойства блочных элементов
```css
.box {
	display: block; - отображение на странице
	float: right; - обтекание
	width:; - ширина
	max-width:;
	min-width:;
	height:; - высота
	max-height:;
	min-height:;
	margin:; - внешние отступы
	padding:; - внутренние отступы
	overflow:; - действия при переполнении(скролл, скрыть и тд)
}
```

### Display
```css
.block {
display:none; - скрывает
display:block; - делает элемент блочным
display:inline-block; - блок(умеет в margin,padding, background) , но в один ряд
display:inline; - делает элемент строчным
display:table; - делает элемент таблицей
display:flex; -
}
```

## CSS-свойства позиционирования
```css
.box-position {
	position: absolute; - позиционирование
	top: 100px; - отступ сверху
	right: 100px; - отступ справа
	bottom: 100px; - снизу
	left: 100px; - слева
	z-index: 25; - индекс слоя(элемент будет поверх тех элементов, у которых индекс ниже)
	float:left; - прижат к левому краю, обтекают справа
	clear:none; - может обтекать объекты с любой стороны
	clear:both; - запретить обтекание
}
```
[[css position]]
[[css float]]
## CSS-свойства оформления
```css
.box-style {
	background-color: red; - цвет фона
	border-radius: 50px; - закругление углов
	border: 1px solid red; - рамка
	color: green; - цвет текста
	opacity: 0.5; - уровень прозрачности
}
```
### Background

```css
.image {
background-image: url("../img/mountain.jpg");
background-position: right top;
background-repeat: repeat-x;
background-size: 50%; - /*конфликтует c background-attachment*/
background-size: cover; - растягивает на размер род. элемента
background-attachment: fixed; - /*parallax эффект + body {height:2000px}*/
background: url("../img/mountain.jpg") right top repeat fixed;
background-blend-mode: multiply; - способ наложения слоев на изображение(и картинка и цветной фон одновременно)
background-color: #red;
}
```

## Наследование в CSS
Механизм, с помощью которого значения свойств элемента-родителя передаются его элементам-потомкам.
```html
<div class="big-text">
	<p>Самые крутые машины на этом сайте</p>
</div>
```
```css
.big-text { font-size: 50px; }
```
Не все свойства могут наследоваться дочерними элементами

### Наследуемые
Свойства стилизации текста и некоторые другие
![[full stack itproger 2026-01-14-1.png]]

### Не наследуемые
Параметры позиционирования, размеров, отступов, фона, рамок и тд
![[full stack itproger 2026-01-14-2.png]]

## Каскадность в CSS
К одному и тому же элементу может применяться несколько CSS-правил. В этом случае правила комбинируются.
```html
<p class="color-red bold">
	Самые крутые машины на этом сайте!
</p>
```
```css
.color-red { color: red; }
.bold {font-weight: bold; }
```

## Переопределение в CSS
Когда в разных CSS-правилах есть разные свойства, то одно переопределяет другое.

```html
<p class="container bg-color">
	Самые крутые машины на этом сайте!
</p>
```
```css
.container { background-color: green; }
.bg-color { background-color: red; }
```
*Нижние свойства переопределяют верхние!*

### Специфичность и приоритеты
Расположены от большего приоритета к меньшему(сверху вниз). Тот, что выше будет переопределять те, что ниже.
```css
#container {}

.hero .title {}

div .title {}

.title {}

div {}
```
```html
<div id="container" class="hero title"></div>
```

## Подключение шрифтов
```css
@font-face {
	font-family: Output Sans;
	src: url(fonts/output-sans.woff2) format('woff2'),
		url(fonts/output-sans.woff) format('woff');
}
```

### Шрифты google
fonts.google.com

```html
<link href="https:///fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
```
Альтернатива тегу link
```css
body {
	font-family: 'Roboto', sans-serif;
}
```
