---
tags:
  - note/specific/code
  - category/java
aliases:
  - @Autowired
deck: obsidian::java
created: 2025-06-13T12:26:16+03:00
updated: 2025-06-13T12:26:16+03:00
---

**@Autowired**
—
Используют бины для внедрения своих зависимостей. В сущности, аннотация создает и внедряет ссылку на бин.
```java
@Autowired
private MailSender mailSender;
```
При инициализации бина в поле `mailSender` будет внедрен бин из контейнера бинов Spring с типом `MailSender` или с дочерним от типа `MailSender` типом. Если бина не окажется или будет несколько, то будет брошено исключение.

![[java @Autowired на сеттере]]
