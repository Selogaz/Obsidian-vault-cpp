---
tags:
  - note/specific/code
  - category/java
aliases:
  - объявление дочернего контекста
deck: obsidian::java
icon: </>
color: "#ab4642"
created: 2025-06-13T10:41:48+03:00
updated: 2026-06-11T00:39:50+03:00
sr-due: 2026-08-20
sr-interval: 333
sr-ease: 270
---

**объявление дочернего [[java контекст Spring|контекста]]**
—
- объявляется в параметре `contextConfigLocation` сервлета [[java DispatcherServlet|DispatcherServlet]]
- Сервлетов `DispatcherServlet` может быть *несколько*
- бины дочернего доступны из корневого
