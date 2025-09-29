---
tags:
  - note/specific/code
  - category/java
aliases:
  - view
deck: obsidian::java
created: 2025-09-21T14:04:10+03:00
updated: 2025-09-26T08:47:06+03:00
---

**временная таблица**
—
Временная таблица
```sql
CREATE TEMPORARY TABLE Temp_Table (
    column1 datatype,
    column2 datatype
);

```
Создается в рамках конкретного соединения, удаляется в конце сессии.

👁️‍🗨️ Область видимости и жизни: один сеанс

Когда подойдет:
✅ Когда необходимо сохранить промежуточные этапы работы
✅ Временное хранение большого количества строк

# View (представление)
![[java view]]

# Matrialized VIEW
![[java matrialized view]]

# Дополнительные материалы

[[Документация по view]]
[[Сложности при работе с временными таблицами]]
