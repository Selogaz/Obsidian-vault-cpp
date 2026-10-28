---
tags:
  - note/specific/code
  - category/programming
aliases:
  - проверка создания ресурса через API
deck: obsidian::programming
cssclasses:
icon: </>
color: "#ab4642"
created: 2026-10-22T12:46:56+04:00
updated: 2026-10-22T12:46:56+04:00
---

**Как убедиться, что POST-запрос действительно создал ресурс?**
—
Не верить одному коду 201: прочитать ресурс отдельным GET по вернувшемуся `id` или найти запись в базе данных.

## Подробнее

Полная проверка `POST /users`:

| Группа | Что проверить |
|---|---|
| Позитив | 201 Created; в теле есть `id`, поля совпадают с отправленными, пароля в ответе нет; заголовки `Content-Type`, иногда `Location` |
| Негатив | невалидные поля → 400; дубликат → [[prog HTTP 409 Conflict\|409]]; без токена → 401, без прав → 403; битый JSON → 400/415 |
| Дополнительно | ответ соответствует JSON-схеме; время ответа; уникальные тестовые данные и удаление созданного после теста |

```java
given()
    .contentType(ContentType.JSON)
    .body(new User("test@mail.ru", "Саша"))
.when()
    .post("/users")
.then()
    .statusCode(201)
    .body("id", notNullValue());
```
