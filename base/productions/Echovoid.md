---
tags:
  - production/band
aliases: []
description:
category:
meta:
problem:
relevant: false
created: 2026-05-03T11:05:00+03:00
updated: 2026-05-03T17:14:42+03:00
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

# Echovoid

## О группе

https://www.youtube.com/channel/UCUtNL64bT1xnbV0vu0o8OcQ
https://music.youtube.com/watch?v=WS0Ra5KTn-0&list=OLAK5uy_nWpZ0CVmKEPZbN5ACrElJEhYkUOtJiWfs

Hi, my name is Andrew, i am from Ukraine, create electronic music and share it with you. I like music in the style of synthwave and retrowave, I try to create something similar. I would appreciate everyone's support on this journey
