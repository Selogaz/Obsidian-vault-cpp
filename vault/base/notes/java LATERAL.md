---
tags:
  - note/specific/code
  - category/java
aliases:
  - LATERAL
deck: obsidian::java
created: 2025-09-26T09:13:13+03:00
updated: 2025-10-08T18:31:31+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**LATERAL**
—
позволяет подзапросу в FROM или JOIN обращаться к столбцам из предыдущих таблиц.

Пример: извлечь для каждого пользователя его последние 3 транзакции из таблицы transactions
```sql
SELECT u.id, u.name, t.* FROM users u,
LATERAL (
  SELECT * FROM transactions t 
  WHERE t.user_id = u.id 
  ORDER BY t.date DESC LIMIT 3
) t;

```
Для каждого пользователя будет выполнен подзапрос, затем результаты объединятся. Итоговая операция похожа на цикл for: "внутренний" запрос выполняется столько раз, сколько элементов во "внешнем".
