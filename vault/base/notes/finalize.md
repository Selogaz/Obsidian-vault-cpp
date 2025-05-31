---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-30T17:48:08+03:00
updated: 2025-05-31T03:58:21+03:00
sr-due: 2025-06-04
sr-interval: 4
sr-ease: 270
---

**Finalize**
—
переопределяя `finalize` можно запрограммировать:
- закрытие сетевых соединений
- соединений с базой данных
- снятие блокировок на файлы
- ....

вызов метода не гарантируется
может вызвать "возрождение" объекта

- еще один вопрос про finalize[^1]

finalize устарел. - Вместо него применяйте:
    - `try-with-resources` для управления ресурсами.
    - **`PhantomReference` + `ReferenceQueue`** для сложных сценариев.
    - **`Cleaner`** (если нужен аналог `finalize()` в Java 9+).

[^1]: [](“Что произойдет со сборщиком мусора, если выполнение метода finalize() требует ощутимо много времени, или в процессе выполнения будет выброшено исключение?” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=div%3Anth-child(263)%20%3E%20h2&annotation=47TWDNVP)))
