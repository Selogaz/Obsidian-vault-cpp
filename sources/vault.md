---
tags:
  - status/wip
  - source/article/paper
  - category/obsidian
aliases: []
status: 🟦
category:
  - "[[obsidian]]"
meta:
problem:
url: "[Website](https://disk.yandex.ru/d/UwTfGDTMJOhl-w/instruction.mp4)"
cover: https://yastatic.net/s3/psf/disk-public/_/6jthIYkBdecaLwm8yXZPKuI1HW7.png
start: 2025-05-20T12:24:31+03:00
end:
total_hours: 0
created: 2025-05-20T12:24:31+03:00
updated: 2026-01-18T17:52:27+03:00
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
![[vault 2026-01-18.png]]
![[vault 2026-01-18-1.png]]
![[vault 2026-01-18-2.png]]

# Boosty
https://boosty.to/flowing-abyss

# Видос
https://www.youtube.com/watch?**v=4wB-Ph5XYV0
