---
tags:
  - status/done
  - source/article/resource
  - category/webdev
aliases: []
published:
addition:
zotero: "[🇿](zotero://select/items/@opencode_nj_kit)"
status: 🟩
rating:
scientificity: 👓
category:
  - "[[webdev]]"
meta:
problem:
creator:
production:
start: 2026-05-27T15:24:28+03:00
end:
url:
cover:
icon: 🌐
color: "#7575c0"
created: 2026-05-27T15:24:28+03:00
updated: 2026-06-22T00:56:13+03:00
---

## Установка

```zsh
npx opencode-nj-kit
```

## Применение

Как именно создать — пошагово:

1. **Шаг A:** `/plan create project documentation` — запустит `project-planner` агента, который проанализирует проект и создаст план в `docs/PLAN-documentation.md`.
2. **Шаг B:** После утверждения плана используйте `/orchestrate create project docs` — это запустит 3+ агентов параллельно (например, `explorer-agent` для аудита кода, `documentation-writer` для генерации, `frontend-specialist` для документирования компонентов).
3. **Шаг C:** Или проще — используйте `documentation-writer` агента напрямую (всего один вызов). Просто напишите в чат: "Используй `documentation-writer` для создания полной документации проекта в папке `docs/`".
4. Чтобы научиться пользоваться агентами и скилами, вот краткая "шпаргалка":

| Команда                 | Что делает                                      |
| ----------------------- | ----------------------------------------------- |
| `/plan <задача>`        | Создает план через `project-planner` (без кода) |
| `/create <проект>`      | Скаффолдит новый проект через `app-builder`     |
| `/enhance <фича>`       | Добавляет фичу в существующий проект            |
| `/debug <проблема>`     | Систематический дебаг через `debugger` агента   |
| `/test <модуль>`        | Запускает TDD-цикл через `test-engineer`        |
| `/orchestrate <задача>` | Координирует 3+ агентов для сложных задач       |
**Скилы** загружаются автоматически — я сам определяю, какой скил подходит под задачу. Вам не нужно их вызывать вручную.

**Агентов** вы вызываете через меня — я маршрутизирую задачи к нужному специалисту. Если задача сложная, я сам решу, кого подключить.

Похожий плагин для клода: [[shinpr claude-code-workflows]]
