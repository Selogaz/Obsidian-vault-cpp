---
aliases: []
created: 2025-05-27 13:33:33+03:00
deck: obsidian::work
sr-due: 2025-06-22
sr-ease: 290
sr-interval: 20
tags:
- note/specific/code
- category/java
updated: 2025-06-02 07:53:44+03:00
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