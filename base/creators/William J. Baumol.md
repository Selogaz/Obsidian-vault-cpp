---
tags:
  - creator/contentmaker
  - category/study
aliases: []
description:
category:
  - "[[study]]"
meta:
  - "[[jurisprudence]]"
problem:
relevant: false
created: 2026-06-23T19:06:04+03:00
updated: 2026-06-23T19:06:13+03:00
icon: 🦸
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
