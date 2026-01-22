---
tags:
  - note/specific/code
  - category/css
aliases:
  - transitions
deck: obsidian::css
created: 2026-01-20T15:51:04+03:00
updated: 2026-01-20T15:51:04+03:00
---

**transitions**
—
позволяет изменять css-свойства плавно и в течение некоторого времени. Таким образом, вы получаете возможность контролировать процесс перехода элемента от одного состояния к другому.

```css
.box-transition {
	width: 150px;
	height: 150px;
	transition-property: width;
	transition-duration: .3s;
	transition-timing-function: ease;
	transition-delay: 2s;
}

.box-transition:hover {
	width: 300px;
}
```