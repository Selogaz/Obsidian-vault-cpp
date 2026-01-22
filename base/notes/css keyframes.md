---
tags:
  - note/specific/code
  - category/css
aliases:
  - keyframes
deck: obsidian::css
created: 2026-01-20T15:35:59+03:00
updated: 2026-01-20T15:47:12+03:00
---

**keyframes**
—
```css
.box-animation {
	animation-duration: 3s;
	animation-name: slide;
}

@keyframes slide {
	from {
		left: 0%;
	}
	50%, 60% {
		left: 50%;
	}
	to {
		left: 100%;
	}
}
```

50-60% анимация будет неподвижна
from - аналог 0%
to - аналог 100%
