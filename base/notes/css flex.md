---
tags:
  - note/specific/code
  - category/css
aliases:
  - flex
deck: obsidian::css
created: 2026-01-21T15:55:06+03:00
updated: 2026-01-21T15:55:06+03:00
---

**flex**
—
свойство, показывающее занимаемое пространство в пропорциях. *Менее предпочтителен*, чем [[css flex-basis|flex-basis]] или px/%. 
```css
.container {
	display: flex;
}

.container > div {
	padding: 10px;
	border: 1px solid silver;
	margin-bottom: 10px;
}

.box-1 {
	flex: 1;
}
.box-2 {
	flex: 2;/*в 2 раза больше, чем flex: 1*/
}
.box-3 {
	flex: 1;
}
```
