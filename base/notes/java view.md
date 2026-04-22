---
tags:
  - note/specific/code
  - category/java
aliases:
  - view
deck: obsidian::java
icon: </>
color: "#ab4642"
created: 2025-09-26T08:45:29+03:00
updated: 2025-10-06T19:19:47+03:00
sr-due: 2025-10-10
sr-interval: 4
sr-ease: 276
---

**view**
—
виртуальная таблица, основанная на результате SQL-запроса.

```sql
CREATE VIEW view_name AS 
   SELECT column1, column2 FROM table WHERE condition;
```

VIEW - это просто сокращение запроса, результат выполнения не сохраняется. При каждом FROM view_name запрос выполняется заново.

✅ Упрощает сложные запросы. Пользователи работают с VIEW, как с обычной таблицей
✅ Ограничивает данные - можно закрыть доступ к исходным таблицам и предоставить VIEW "разрешенных" данных

👁️‍🗨️ Область видимости: вся схема
👁️‍🗨️ Время жизни: пока не удалена через DROP
