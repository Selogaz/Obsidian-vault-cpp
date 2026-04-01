---
tags:
  - production/band
aliases:
  - Of Mice and Men
description: Американская металкор-группа из Коста-Меса, Калифорния
relevant: false
created: 2026-03-31T21:00:00+03:00
updated: 2026-03-31T21:00:00+03:00
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

- Restoring Force
- Would It Kill You
- Another Step
- Fear
- The Darkest Nights

## Альбомы

- Of Mice and Men (2010)
- Breeding in Captivity (2012)
- Restoring Force (2014)
- Cold World (2017)
- Timeless (2024)