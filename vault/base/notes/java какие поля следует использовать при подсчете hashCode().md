---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 07:17:26+03:00
updated: 2025-10-02T18:03:12+03:00
sr-due: 2026-12-02
sr-interval: 426
sr-ease: 310
---

**Какие поля следует использовать при подсчете hashCode**
—
Выбирать поля, которые с большей вероятностью будут разными. Типа `id` и `uuid`. Если поля задействованы при вычислении `hashCode()`, то они должны быть задействованы и при выполнении [[java equals()]]
