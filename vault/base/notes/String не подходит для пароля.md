---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-30T19:51:39+03:00
updated: 2025-05-31T03:59:26+03:00
sr-due: 2025-06-04
sr-interval: 4
sr-ease: 270
---

**String не подходит для пароля**
—
Если пароль сделать `String`, то он некоторое время будет оставаться доступным в памяти даже после окончания использования.[^1]

Если использовать `char[]`, то можно очистить его сразу после окончания использования.

[^1]: С момента создания строка остаётся в пуле, до тех пор, пока не будет удалена сборщиком мусора
