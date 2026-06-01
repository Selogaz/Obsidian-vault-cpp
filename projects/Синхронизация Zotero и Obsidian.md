---
tags:
  - status/done
  - project/single
  - priority/b
aliases: []
addition:
status: 🟩
priority: 🇧
category:
meta:
problem:
creator:
production:
start: 2026-05-29
end: 2026-05-29
url:
cover:
icon: ✏️
color: "#b87535"
created: 2026-05-30T15:31:07+03:00
updated: 2026-05-30T20:48:11+03:00
---

> [!toc]- Table of contents
> ```table-of-contents
> ```

> [!todo]- Tasks
> ```tasks
> path includes {{query.file.path}}
> group by heading
> hide task count
> ```

# Description

Двусторонняя синхронизация между source-заметками хранилища (sources/*.md) и библиотекой Zotero.

## Цель
- Категории/мета-заметки/проблемы как вложенные коллекции Zotero (🗺️ → ⇶ → ⚡)
- Статусы (🟥🟦🟩❄) как теги Zotero
- Библиографические данные текут Zotero → Obsidian через скрипт sync

## Рабочий процесс (поддержка)

Принцип (из [[Философские столпы моей системы знаний]]): **минимализм — одна управляющая поверхность; не переобуваться — один источник истины**.

- **Obsidian = источник истины** для состояния мышления: `status`, `rating`, `scientificity`, `category`, `meta`, `problem`. Меняешь **прямо в заметке**.
- **Zotero = источник истины** для артефакта: PDF, аннотации, библиография (автор/год/url).

| Событие | Действие |
|---|---|
| Сменился статус/рейтинг | Правишь в заметке. Всё. |
| Хочешь увидеть статусы и в Zotero | `python3 files/zotero-sync/.push_status.py` → вставить `.push_status.js` в Zotero (Run JavaScript). Односторонне, Obsidian побеждает. |
| Поменялась категория/мета/проблема | `python3 files/zotero-sync/.assign_all_sources.py` → вставить `.assign_collections.js` в Zotero. |
| Новый источник | Скилл `source` в Obsidian (артефакт — в Zotero через web-коннектор). |
| Аннотации PDF | Zotero → Obsidian через плагин **OZDC** (одно направление). |

⚠️ `zotero_sync.py` + `.zotero_watcher.sh` — это **bootstrap** (Zotero→Obsidian). Постоянно НЕ запускать: затрёт статусы Obsidian. Только для разовых массовых заливок.

## Рабочие файлы
Все скрипты, данные и handoff лежат в `files/zotero-sync/`. Актуальное состояние — в `files/zotero-sync/.zotero_sync_state.md`.

## Статус
✅ **Первичная синхронизация завершена (2026-05-30).** Все 137 source-заметок имеют Zotero-элемент, разложены по категориям (🗺️/⇶/⚡), связаны через `zotero:` ссылку, статусы синхронизированы. Проверено: 0 заметок без категории, ❄-статусы сохранены.

Ключевой баг сессии: `BetterBibTeX KeyManager.find()` возвращал один элемент на любой ключ — перешли на матчинг по itemKey.

### Остаётся (опционально)
- 66 Zotero-элементов без заметки (книги/доки/фрагменты) — намеренно оставлены без дубликата в Obsidian
