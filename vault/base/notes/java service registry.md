---
tags:
  - note/specific/code
  - category/java
aliases:
  - service registry
deck: obsidian::java
created: 2025-06-06T12:54:28+03:00
updated: 2025-06-16T21:40:09+03:00
sr-due: 2025-07-06
sr-interval: 20
sr-ease: 290
---

**service registry**
—
- база данных, хранящая все *адреса и порты сервисов*
- при обращении к другому сервис получает отсюда:
	- актуальный адрес и порт, либо их список
	- делает по ним запрос
