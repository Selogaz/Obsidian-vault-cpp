---
tags:
  - note/specific/code
  - category/css
aliases:
  - position
deck: obsidian::css
created: 2026-01-18T18:30:36+03:00
updated: 2026-01-18T18:44:40+03:00
---

**position**
—
```css
#id {
position: static; - по умолчанию
position: relative; - бокс объекта на месте, а содержимое перемещаем относительно старого расположения
position: fixed; - исчезает для других объектов. Позиция относительно экрана. Двигается вместе со скроллом(как всплывающее окно)
position: absolute; - /*как fixed, но не двигается со скроллом*/
position: sticky; - как relative, но вместе со скроллом, как fixed

}
```
Если у родительского объекта - `relative`, а у дочернего - `absolute` - *дочерний позиционируется относительно родительского, а не относительно экрана*
