---
tags:
  - note/specific/code
  - category/java
aliases:
  - Hibernate
deck: obsidian::java
created: 2025-06-06T10:17:00+03:00
updated: 2025-09-16T17:09:09+03:00
sr-due: 2025-07-16
sr-interval: 30
sr-ease: 290
---

**Hibernate**
—
одна из реализаций подхода [[java ORM|ORM]]
Автоматически превращает записи в БД в объекты Java и обратно
![[java Hibernate 2025-09-16.png]]

подключение Hibernate в gradle:
![[java Hibernate 2025-09-16-1.png]]
Объект Video *не может существовать* без объекта Preview
![[java Hibernate 2025-09-16-2.png]]
[[2025-09-16]]

@OneToMany
**One** относится к той *сущности, внутри которой* объявлена аннотация.
**Many** относится *к полю*, над которым указана аннотация
![[java Hibernate 2025-09-16-3.png]]

@JoinColumn указывается на той стороне, где нет mappedBy. Т.е. на стороне *зависимой сущности*.

![[java Hibernate 2025-09-16-4.png]]

@ManyToMany
![[java Hibernate 2025-09-16-5.png]]

Session создает подключение между бекендом и бд.
важно закрывать
![[java Hibernate 2025-09-16-6.png]]
![[java Hibernate 2025-09-16-8.png]]

Обновление сущностей с помощью Session
![[java Hibernate 2025-09-16-9.png]]

Добавление сущностей с помощью Session:
![[java Hibernate 2025-09-16-10.png]]

SessionFactory
![[java Hibernate 2025-09-16-7.png]]
