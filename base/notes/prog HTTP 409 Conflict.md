---
tags:
  - note/specific/code
  - category/programming
aliases:
  - HTTP 409 Conflict
deck: obsidian::programming
cssclasses:
icon: </>
color: "#ab4642"
created: 2026-10-22T12:46:55+04:00
updated: 2026-10-22T12:46:55+04:00
---

**Какой HTTP-код вернуть при попытке создать дубликат, например пользователя с занятым email?**
—
409 Conflict: запрос конфликтует с текущим состоянием ресурса на сервере.

## Подробнее

Некоторые API отвечают на дубликат 400 Bad Request или 422 Unprocessable Content, поэтому в тесте сверяются со спецификацией API, а не с догадкой. Соседние коды ошибок клиента: [[java HTTP 401 Unauthorized]], [[java HTTP 403 Forbidden]].
