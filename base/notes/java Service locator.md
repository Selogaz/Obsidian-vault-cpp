---
tags:
  - note/specific/code
  - category/java
aliases:
  - Service locator
deck: obsidian::java
created: 2025-06-06T08:14:50+03:00
updated: 2025-10-02T18:13:28+03:00
sr-due: 2026-12-21
sr-interval: 445
sr-ease: 312
---

**Service locator**
—
получение зависимостей через единый локатор служб, который создает зависимости либо возвращает уже созданные ранее.

Все классы будут зависеть от `ServiceLocator`, что увеличит связанность, затруднит тестирование. Такой подход приводит к
![[java сокрытие зависимостей класса]]

![[java пример антипаттерна service locator]]
