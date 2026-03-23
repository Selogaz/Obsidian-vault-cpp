---
tags:
  - system/high/hierarchy
  - category/computer_science
aliases:
  - roadmap java
  - java learning path
category:
  - "[[computer science]]"
meta:
  - "[[microservices]]"
relevant: false
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T22:56:49+03:00
---

# Roadmap: Java Core

> **Когда:** Семестр 1-2 (2026-2027)
> **Цель:** Фундамент для Spring Boot
> **Время:** ~10 часов в неделю

## Зачем это нужно

Java Core — prerequisite для Spring Boot, который является основой твоих микросервисов. Без понимания JVM, коллекций, concurrency ты не сможешь эффективно отлаживать production проблемы.

## Что изучать

### Основы (Неделя 1-4)
- [x] Типы данных, переменные, операторы ✅ 2026-03-21
- [x] Управляющие конструкции (if, for, while) ✅ 2026-03-21
- [x] Методы и параметры — [[java передача параметров в методы (ИИ версия)]] ✅ 2026-03-21
- [x] Массивы — [[java ArrayList]] (основы: int[], String[]), [[java ссылочные типы]] (массивы как ссылочные типы) ✅ 2026-03-21

### OOP (Неделя 5-8)
- [x] Классы и объекты [[класс]] [[объект]] ✅ 2026-03-21
- [x] Наследование, полиморфизм [[наследование]] [[Преимущества полиморфизма]] [[польза полиморфизма]] ✅ 2026-03-21
- [x] Абстракция и интерфейсы [[абстракция]] [[интерфейс]] ✅ 2026-03-21
- [x] [[Порождающие паттерны и идиомы]] ✅ 2026-03-21

### Collections Framework (Неделя 9-12)
- [x] List (ArrayList, LinkedList) = [[java ArrayList]] [[LinkedList]] ✅ 2026-03-21
- [x] Map (HashMap, TreeMap) [[HashMap]] [[TreeMap]] ✅ 2026-03-21
- [x] Set, Queue [[java set]] ✅ 2026-03-21
- [x] Stream API [[java Stream API]] ✅ 2026-03-21

### Concurrency (Неделя 13-16) [[java Многопоточность]]
- [x] Threads, Runnable [[java green thread]] [[java как запустить задачу в другом потоке]] ✅ 2026-03-21
- [x] Synchronized [[java примитивы синхронизации]] ✅ 2026-03-21
- [x] ExecutorService [[java ExecutorService|ExecutorService]] ✅ 2026-03-21
- [x] CompletableFuture [[Наглядно про CompletableFuture]] ✅ 2026-03-21

### JVM Internals (Неделя 17-20)
- [x] How JVM works [[JVM]] ✅ 2026-03-21
- [x] Garbage Collection basics [[java сборка мусора|сборка мусора]] ✅ 2026-03-21
- [x] Classloaders [[classloader]] ✅ 2026-03-21
- [x] JIT compilation [[execution engine]] ✅ 2026-03-21

## Ресурсы

| Тип      | Название                                                   | Приоритет |
| -------- | ---------------------------------------------------------- | --------- |
| Книга    | [[Философия Java]] (Bruce Eckels)                          | 🇦        |
| Книга    | Effective Java (Joshua Bloch)                              | 🇧        |
| Курс     | JetBrains Academy Java Developer                           | 🇦        |
| Практика | [[типичные требования вакансий к языкам программирования]] |           |

## Критерии завершения

- [ ] Реализовал 3+ проекта на Java
	- [ ] ⤵️ #task/reference #category/computer_science #time/moderate #effort/medium Console Todo API
	- [ ] ⤵️ #task/reference #category/computer_science #priority/b #time/lengthy #effort/hard In-Memory Cache
	- [ ] ⤵️ #task/reference #category/computer_science #priority/b #time/lengthy #effort/hard Mini Message Broker
- [x] Можешь объяснить difference между HashMap и ConcurrentHashMap ✅ 2026-03-21
- [x] Понимаешь как работает Garbage Collector ✅ 2026-03-21
- [ ] #task/reference #category/computer_science #priority/b #time/long #effort/hard Решил 50+ задач на Codeforces (Java)

## Связь с дипломом

Без Java Core невозможна разработка Spring Boot сервисов. Это база для всех последующих этапов.
