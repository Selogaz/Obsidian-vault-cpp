---
tags:
  - note/specific/code
  - category/java
aliases:
  - chain of responsibility
deck: obsidian::java
created: 2025-10-01T18:36:58+03:00
updated: 2025-10-01T18:36:58+03:00
---

**chain of responsibility**
—
запрос передаётся по цепочке обработчиков Каждый обработчик применяет свою логику и передаёт запрос следующему участнику. Особенность в том, что обработчик сам решает, передавать запрос дальше или нет.

Пример: фильтры в [[java Spring Security|Spring Security]]. Если один фильтр решит, что запрос не должен идти дальше, обработка прерывается.
