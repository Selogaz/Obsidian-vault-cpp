---
tags:
  - production/band
aliases:
  - Bury Tomorrow
description: Британская металкор-группа из Лондона
category:
meta:
problem:
relevant: false
created: 2026-03-31T21:00:00+03:00
updated: 2026-03-31T19:21:01+03:00
icon: 🎸
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

## Избранные треки

- Black Flames
- Restore My Soul
- The Eternal
- Message
- Failsafe

## Альбомы

- The Equilibrium (2012)
- Skeptics (2014)
- Britannia (2016)
- The Unified (2020)
