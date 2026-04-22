---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - keyframes
deck: obsidian::css
icon: </>
color: "#ab4642"
created: 2026-01-20T15:35:59+03:00
updated: 2026-03-04T19:43:36+03:00
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
