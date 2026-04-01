---
tags:
  - note/specific/code
  - category/java
aliases:
  - подзапросы, вложенные запросы
deck: obsidian::java
created: 2025-09-26T09:12:59+03:00
updated: 2025-10-08T19:01:12+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**подзапросы, вложенные запросы**
—
Вложенный запрос
```sql
SELECT name FROM employees
WHERE department_id IN (
    SELECT id FROM departments WHERE ...
);

```

Сначала выполнится выборка из departments, затем из employees. Если подзапрос ссылается на поля из внешнего запроса, он называется **коррелированным**:

Пример: найти сотрудников, чья зп выше средней в их отделе:
```sql
SELECT e.name, e.salary, e.department_id FROM employees e
WHERE e.salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e.department_id
);

```
❌ Вложенный коррелированный запрос выполняется для каждой строки основного запроса. Если в employees 1000 строк, подзапрос выполнится 1000 раз.

Основная альтернатива вложенным запросам - CTE или соединение таблиц через JOIN.

# Ключевое слово LATERAL
![[java LATERAL]]

# CTE (Common Table Expressions)
![[java CTE]]

# Дополнительные материалы
[[Документация по CTE]]
[[Демонстрация работы LATERAL]]
