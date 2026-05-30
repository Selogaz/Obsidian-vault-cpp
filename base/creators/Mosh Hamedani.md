---
tags:
  - creator/contentmaker
  - category/webdev
aliases:
  - Code with Mosh
  - Programming with Mosh
description: Программист, преподаватель, YouTube-блогер. Автор курсов по программированию.
category:
  - "[[webdev]]"
meta:
problem:
relevant: false
created: 2026-05-26T21:30:00+03:00
updated: 2026-05-26T21:30:00+03:00
icon: 🦸
color: "#d09060"
---

> [!todo]- tasks (`$=dv.pages().file.tasks.where(t => !t.completed).where(t => dv.func.contains(t.outlinks, dv.current().file.link)).length`)
> > [!info]+ mentions
> > ```dataviewjs
> > const pages = dv.pages().where(p => dv.func.contains(p.file.outlinks, dv.current().file.link));
> > for (let i = 0; i < Math.min(pages.length, 10); i++) {
> >   dv.el("div", `[[${pages[i].file.path.slice(0, -3)}|${pages[i].file.name}]]`);
> > }
> > ```

