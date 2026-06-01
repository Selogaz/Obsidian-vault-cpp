---
tags:
  - source/article/paper
  - category/obsidian
aliases:
  - MarkDB-Connect
published:
addition:
zotero: "[🇿](zotero://select/items/@MarkDBConnect)"
status: 📥
rating:
scientificity:
category:
  - "[[obsidian]]"
meta:
problem:
creator:
production:
start: 2026-06-01T15:07:01+03:00
end:
url:
  - "[flowing-abyss](https://flowing-abyss.com/MarkDB-Connect)"
icon: 📃
color: "#7575c0"
created: 2026-06-01T15:07:01+03:00
updated: 2026-06-01T15:31:31+03:00
related:
---

# Description

Добавляет тег к элементу Zotero, *если по нему есть заметка в Obsidian*. Также добавляет пункт, чтобы *открыть* соответствующую заметку в Obsidian

1. Перейдите в настройки [плагина](https://github.com/daeh/zotero-markdb-connect/releases/download/v0.2.1/markdb-connect.xpi)
Edit ➝ Settings ➝ MarkDB-Connect
2. Выберете папку в хранилище Obsidian, где лежат *заметки по источникам* и также укажите *фильтр для названия заметок*
Пример директорий:
Для UNIX: /home/flowing-abyss/data/vault/sources

# Фильтр для названия заметок

- **Первая опция** (Default File Filter) - самый быстрый способ. Минус - **ужасные названия у заметок**.
- **Вторая опция** (Custom File Filter) - через указание регулярного выражения
	- С захватывающей группой `^@(\S+)-.*\.md$`
	- Без захватывающей группы `^.+\.md$`

# Способ сопоставления по содержимому

- **Первая опция** (BetterBibTex citekey - taken from YAML metadata) включена по дефолту и она ищет в метаданных заметки citekey
- **Вторая опция** (BetterBibTex citekey - captured with custom RegExp) ищет ключ цитирования по регулярному выражению во всей заметке. Лучший выбор - нет необходимости дублирования. `zotero://select/items/@([\w.]+)`
- **Третья опция** (Zotero-Item-Key - captured with custom RegExp) делает тоже самое, что предыдущая

# Название хранилища Obsidian

Obsidian-vault-cpp

# Указать тег

💎

Плагин автоматически синхронизирует Zotero и Obsidian

> [!quote|#f19837]+ exact idea/term/example
> «добавляет тег к элементу Zotero, если по нему есть заметка в Obsidian» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=4K7NPMNR))

> [!quote|#f19837]+ exact idea/term/example
> «открывает соответствующую заметку в Obsidian» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=IFKUNJID))

> [!quote|#f19837]+ exact idea/term/example
> «Must-have плагин» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=DAVMLC38))

> [!quote|#f19837]+ exact idea/term/example
> «заметки по источникам» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=CRWQKSF2))

> [!quote|#f19837]+ exact idea/term/example
> «UNIX» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=NKB5A375))

> [!quote|#f19837]+ exact idea/term/example
> «самый быстрый способ» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=L69YDZ7S))

> [!quote|#f19837]+ exact idea/term/example
> «нравится больше» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=CEZC3BUN))

> [!quote|#f19837]+ exact idea/term/example
> «без необходимости дублирования» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=D5FXU4HI))

> [!quote|#f19837]+ exact idea/term/example
> «тоже самое, что предыдущая» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=BDEHSFDK))

> [!quote|#f19837]+ exact idea/term/example
> «автоматически синхронизирует» ([Page](zotero://open-pdf/library/items/ZMR9YCBY?page=&annotation=WBQADRDH))
