---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-27 13:33:33+03:00
updated: 2025-09-21T12:37:14+03:00
sr-due: 2026-12-11
sr-interval: 446
sr-ease: 310
---

**Assert**
—
- используется чтобы проверить предположение
- упрощает локализацию ошибок
- отключают в релизе
- не должны менять поведение программы
- формы записи:
	- `assert [boolean];`Если `false`, то бросит исключение[^1]
	- `assert [boolean] : [Выражение любого типа, кроме void]`; После двоеточия - детальное сообщение об ошибке[^2]

[^1]: java.lang.AssertionError
[^2]: будет передано конструктору `AssertionError`
