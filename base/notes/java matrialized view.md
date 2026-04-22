---
tags:
  - note/specific/code
  - category/java
aliases:
  - matrialized view
deck: obsidian::java
icon: </>
color: "#ab4642"
created: 2025-09-26T08:45:37+03:00
updated: 2025-10-06T19:34:49+03:00
sr-due: 2025-10-10
sr-interval: 4
sr-ease: 270
---

**matrialized view**
—
представление, которое физически хранит данные на диске.

```sql
CREATE MATERIALIZED VIEW view_name AS
   SELECT … ;

```

По сути создается временная таблица с копией данных

✅ Ускоряет выполнение сложных запросов (данные предварительно вычисляются)
❌ Возможны расхождения данных. Если исходные данные поменяются, они не влияют на данные в MATERIALIZED VIEW. Для актуализации данных надо отдельно вызвать команду REFRESH.

👁️‍🗨️ Область видимости: вся схема
👁️‍🗨️ Время жизни: пока не удалена через DROP.
