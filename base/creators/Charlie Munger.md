---
tags:
  - creator/businessman
aliases:
  - Чарли Мангер
description: Американский инвестор, бизнесмен и вице-председатель Berkshire Hathaway
category:
meta:
problem:
relevant: false
created: 2026-06-24T21:22:30+03:00
updated: 2026-06-24T21:26:37+03:00
icon: 🫅
color: "#d09060"
---

> [!todo]- tasks (`$=dv.pages().file.tasks.where(t => !t.completed).where(t => dv.func.contains(t.outlinks, dv.current().file.link)).length`)
> > [!info]+ mentions
> > ```dataviewjs
> > dv.taskList(dv.pages().file.tasks
> >  .where(t => !t.completed)
> >  .where(t => !t.text.includes("#task/waiting_for"))
> >  .where(t => dv.func.contains(t.outlinks, dv.current().file.link))
> >  .groupBy(t => ""))
> > ```
>
> > [!check]+ delegated
> > ```dataviewjs
> > dv.taskList(dv.pages().file.tasks
> >  .where(t => !t.completed)
> >  .where(t => t.text.includes("#task/waiting_for"))
> >  .where(t => dv.func.contains(t.outlinks, dv.current().file.link))
> >  .groupBy(t => ""))
> > ```

Призывает искать **самые действенные концепции в каждой дисциплине**. Он регулярно ищет ответы на вопрос: "Какие ментальные модели оказались наиболее полезными для понимания рынков и человеческого поведения".

[[Важно иметь широкий спектр ментальных моделей]]
