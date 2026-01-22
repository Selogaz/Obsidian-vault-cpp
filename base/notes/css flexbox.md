---
tags:
  - note/specific/code
  - category/css
aliases:
  - flexbox
deck: obsidian::css
created: 2026-01-21T14:12:16+03:00
updated: 2026-01-21T15:44:49+03:00
---

**flexbox**
—
# Определение flexbox
Пришел на смену [[css float|float]]. Альтернатива GRID
```css
display: flex;
```

При применении `display: flex` *к родительскому элементу* блоки:
- автоматически становятся в 1 ряд
- растянуты на всю ширину экрана(будут адаптироваться под ширину экрана)
```html
<ul class="container">
	<li class="flex-item">1</li>
	<li class="flex-item">2</li>
	<li class="flex-item">3</li>
	<li class="flex-item">4</li>
</ul>
```
```css
.container {
	display: flex;
}
```
![[full stack itproger 2026-01-21.png]]

## Основные свойства flexbox

### Flex-direction
`row` - по умолчанию. Точно также, как наверху. В ряд и на всю ширину
```css
.container {
	display: flex;
	flex-direction: row;
}
```
`column` - элементы друг под другом. Удобно использовать для мобильной версии с помощью [[css медиа-запросы|медиа-запросов]]
```css
.container {
	display: flex;
	flex-direction: column;
}
```
![[full stack itproger 2026-01-21-3.png]]
`row-reverse` как `row`, но нумерация элементов справа налево
![[full stack itproger 2026-01-21-2.png]]
`column-reverse` как `column`, но нумерация снизу вверх
![[full stack itproger 2026-01-21-1.png]]

### Flex-wrap
`nowrap` - все элементы в 1 строку, делят пространство или выходят за контейнер. Не переносятся. *Размер сжимается*.
```css
.container {
	display: flex;
	flex-wrap: nowrap;
}
```
`wrap` - элементы могут переноситься на новую строку, элементы *сохраняют заданные размеры*

### Justify-content
Выравнивание элементов. Применяется *к родительскому элементу*

`flex-start` - по началу оси(по умолчанию)
`flex-end` - по концу оси
`center` - по центру
`space-between` - одинаковое расстояние между элементами
`space-around` - одинаковое расстояние между элементами и flex-контейнером
![[full stack itproger 2026-01-21-4.png]]

### Align-items
Выравнивание элементов относительно *поперечной оси*.
`flex-start` - по началу оси(по умолчанию)
`flex-end` - по концу оси
![[Анимация, адаптивность и flexbox 2026-01-21.png]]

`center` - по центру
`stretch`(по умолчанию) - блоки занимают всё доступное место
![[Анимация, адаптивность и flexbox 2026-01-21-1.png]]

`baseline`
![[Анимация, адаптивность и flexbox 2026-01-21-2.png]]

`justify-content: center` + `align-items: center` = по центру всё

### Align-self
Отвечает за расположение отдельных элементов. *Переопределяет* [[#Align-items|align-items]]

### Order
Управляет порядком элементов в flex-контейнере.
По умолчанию все flex-элементы имеют `order: 0`. При указании отрицательного значения, элемент перемещается в начало строки. При указании положительного - в конец. Элементы с одинаковым значением `order` отображаются в соответствии с исходным порядком.
```css
.flex-item3,
.flex-item4 {
	order: -1;
}
```
![[css flexbox 2026-01-21.png]]

# Другие материалы по flex-box

[[Практика по flexbox в CSS]] - [[css flex-basis|flex-basis]]
