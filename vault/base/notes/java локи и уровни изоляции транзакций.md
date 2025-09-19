---
tags:
  - note/specific/code
  - category/java
aliases:
  - локи и уровни изоляции транзакций
deck: obsidian::java
created: 2025-08-30T11:24:41+03:00
updated: 2025-08-30T11:24:41+03:00
---

**локи и уровни изоляции транзакций**
—
- Read uncommited
	- Транзакции могут читать данные без установки shared lock
- Read commited
	- S-lock устанавливается только на время чтения
	- X-lock снимается после фиксации транзакции
- Repeatable read
	- S и X лок удерживается до завершения транзакции
- Serializable
	- используются range locks для предотвращения добавления новых строк в диапазон запроса
