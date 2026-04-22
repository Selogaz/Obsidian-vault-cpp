---
tags:
  - status/wip
  - source/article/paper
  - category/obsidian
aliases: []
addition:
status: 🟦
rating:
scientificity:
category:
  - "[[obsidian]]"
meta:
problem:
creator:
production:
start: 2025-05-20T12:24:31+03:00
end:
url:
  - "[Website](https://disk.yandex.ru/d/UwTfGDTMJOhl-w/instruction.mp4)"
cover: https://yastatic.net/s3/psf/disk-public/_/6jthIYkBdecaLwm8yXZPKuI1HW7.png
icon: 📃
color: "#7575c0"
created: 2025-05-20T12:24:31+03:00
updated: 2026-04-02T14:56:23+03:00
total_hours: 0
---

![cover|150](https://yastatic.net/s3/psf/disk-public/_/6jthIYkBdecaLwm8yXZPKuI1HW7.png)

# Abstract

[[таймкоды Obsidian vault]]

# Сделать заметку не повторяющейся
```yaml
sr-due: null
sr-interval: null
sr-ease: null
```

alt+shift+h
alt+shift+q - настройки задач
alt-shift-f - сделать сноску
[[Общий алгоритм формирования заметок]]

# Table of contents
Чтобы сделать удобный список заголовков(table of contents) нужно написать ```table-of-contents```, но закрывающие кавычки перенести вниз с помощью enter, как это сделано ниже:
Это реализовано с помощью плагина "Automatic Table Of Contents"
```table-of-contents
```

# Агрегатор технологий

```dataviewjs
// dataviewjs
const notes = dv.pages("#note").where(p => p.file.frontmatter.image)

const container = dv.el("div", "", {
  attr: {
    style: "display: flex; flex-wrap: wrap; gap: 8px;"
  }
})

notes.forEach(p => {
  const noteElement = dv.el("span", "", {
    attr: {
      style: `
        display: inline-flex; 
        align-items: center; 
        padding: 6px 10px; 
        background-color: var(--background-secondary); 
        border-radius: 6px;
        border: 1px solid var(--background-modifier-border);
        white-space: nowrap;
      `
    }
  })
  
  dv.el("img", "", {
    container: noteElement,
    attr: {
      src: p.file.frontmatter.image,
      style: `
	    width: 30px;
	    height: 30px;
	    margin-right: 6px;
	    border: none;
	  `
    }
  })
  
  dv.el("span", p.file.link, {
    container: noteElement
  })
  
  container.appendChild(noteElement)
})
```

Нужно добавить в метаданные тег "image" и ссылку на картинку в двойных кавычках. Если скопировать ссылку на изображение в поисковом запросе, получится ссылка в `base64` формате и не придется искать новую ссылку, если старая станет битой
![[vault 2025-05-31.png]]

alt + F - выделив текст, сделать его заметкой. Первая строка будет названием, все что ниже - телом заметки. Можно сразу поставить префикс для присвоения категории.
Например "w Интерфейс Cloneable"

# Использование иерархических заметок

## Простое правило

- **Мета-заметка** = "это большая тема, вокруг которой я буду собирать знания"
- **Иерархия** = "это конкретная группа заметок, которая относится к теме"

![[vault 2026-01-18.png]]
![[vault 2026-01-18-1.png]]
![[vault 2026-01-18-2.png]]

# Boosty
https://boosty.to/flowing-abyss

# Digital garden

https://flowing-abyss.com/

# Видос
https://www.youtube.com/watch?**v=4wB-Ph5XYV0

# Skills
Вот 22 скила в твоём хранилище:

**Работа с заметками:**
- `obsidian-notes` — создание обычных заметок
- `obsidian-markdown` — wikilinks, embeds, callouts, frontmatter
- `obsidian-system-notes` — мета-заметки, проблемы, иерархии

**Проекты и задачи:**
- `obsidian-projects` — управление проектами (статусы, приоритеты)
- `obsidian-tasks` — GTD задачи с тегами #task/, #category/
	- [[Типы задач в Obsidian]]

**Базы и источники:**
- `obsidian-bases` — .base файлы (таблицы, карточки, фильтры)
- `obsidian-sources` — трекинг книг, статей, видео, курсов
- `obsidian-people` — контакты, авторы, компании, продукции

**Визуализация:**
- `excalidraw-diagram` — диаграммы Excalidraw
- `mermaid-visualizer` — диаграммы Mermaid
- `json-canvas` — JSON Canvas доски

**Обзоры (автогенерация):**
- `daily` (секретный) — ежедневный брифинг
- `weekly-review` — итоги недели
- `monthly-review` — итоги месяца
- `quarterly-review` — итоги квартала
- `yearly-review` — итоги года

**Утилиты:**
- `obsidian-cli` — работа с Obsidian из командной строки
- `obsidian-additions` — эксперименты, заметки к заметкам
- `obsidian-flashcards` — карточки для Anki
- `text-editor` — редактирование аннотированного текста
- `skill-creator` — создание новых скилов
- `discourse-graph` — структурированная аргументация
- `obsidian-structure` — справочник по структуре хранилища

# Почему-то не пользуюсь этим

[[breadcrumbs.base]]
[[fleetings.base]]
[[fleetings]]
[[notes.base]]
[[recent.base]]
[[sources.base]]

# Opencode

[[My AI#Opencode]]

# LATEX
![[vault 2026-03-16.png]]

# Obsidian hybrid search

## Настройка с помощью big pickle
![[Снимок экрана от 2026-03-19 22-07-50.png]]

## Rerank
Команда для включения cross-encoder reranking через `bge-reranker-v2-m3` для более точного ранжирования:
```
ohs "запрос" --rerank
```
