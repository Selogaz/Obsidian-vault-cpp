---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-27T13:33:33+03:00
updated: 2025-06-02T07:53:44+03:00
sr-due: 2025-06-22
sr-interval: 20
sr-ease: 290
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
