---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 07:17:26+03:00
updated: 2025-06-06T06:46:44+03:00
sr-due: 2025-06-17
sr-interval: 11
sr-ease: 270
---

**Какие поля следует использовать при подсчете hashCode**
—
Выбирать поля, которые с большей вероятностью будут разными. Типа `id` и `uuid`. Если поля задействованы при вычислении `hashCode()`, то они должны быть задействованы и при выполнении [[java equals()]]
