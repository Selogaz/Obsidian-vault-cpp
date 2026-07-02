---
tags:
  - production/company
aliases:
  - Беркшир Хэтэуэй
description: Американская многопрофильная холдинговая компания во главе с Уорреном Баффетом
category:
meta:
problem:
relevant: false
created: 2026-06-24T21:22:32+03:00
updated: 2026-06-24T21:22:32+03:00
icon: 💼
color: "#c85545"
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
