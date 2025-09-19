---
tags:
  - note/specific/code
  - category/java
aliases:
  - fail-safe
deck: obsidian::java
created: 2025-09-13T10:33:07+03:00
updated: 2025-09-13T10:33:07+03:00
---

**fail-safe**
—
При возникновении ошибки продолжать работу. Такое поведение наблюдается у `ConcurrentHashMap` и `CopyOnWriteArrayList` потому что они работают с копией коллекции, а не с реальной.
