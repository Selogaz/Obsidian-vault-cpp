---
tags:
  - note/specific/code
  - category/java
aliases:
  - view
deck: obsidian::java
icon: </>
color: "#ab4642"
created: 2025-09-21T14:04:10+03:00
updated: 2025-10-06T19:28:00+03:00
sr-due: 2025-10-10
sr-interval: 4
sr-ease: 270
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
