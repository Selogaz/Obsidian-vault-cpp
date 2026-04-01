---
tags:
  - system/high/hierarchy
  - category/computer_science
aliases:
  - spring boot learning
  - roadmap spring
category:
  - "[[computer science]]"
meta:
  - "[[microservices]]"
relevant: false
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T22:42:44+03:00
---

# Roadmap: Spring Boot

> **Когда:** Семестр 2-3 (2027)
> **Цель:** REST API development
> **Время:** ~10 часов в неделю
> **Prerequisite:** [[roadmap-java-core]]

## Зачем это нужно

Spring Boot — основной фреймворк для построения микросервисов в enterprise. После изучения ты сможешь создавать production-ready REST API.

## Что изучать

### Spring Boot Basics (Неделя 1-4)
- [ ] Spring Initializr
- [ ] Application structure
- [ ] @SpringBootApplication
- [ ] Profiles и Configuration

### REST API (Неделя 5-8)
- [ ] @RestController, @RequestMapping
- [ ] @GetMapping, @PostMapping, etc.
- [ ] Request/Response DTOs
- [ ] HTTP status codes
- [ ] Error handling (@ExceptionHandler)

### Data Access (Неделя 9-12)
- [ ] Spring Data JPA
- [ ] Entities, Repositories
- [ ] Transactions (@Transactional)
- [ ] Database migrations (Flyway/Liquibase)

### Testing (Неделя 13-16)
- [ ] JUnit 5 + Mockito
- [ ] @WebMvcTest
- [ ] Integration tests
- [ ] TestContainers basics

### Advanced (Неделя 17-20)
- [ ] Caching (Redis)
- [ ] Validation (Bean Validation)
- [ ] Security basics (Spring Security)
- [ ] Actuator для мониторинга

## Проекты

1. **Todo API** — CRUD с БД
2. **Blog API** — более сложная модель данных
3. **REST клиент** — интеграция с внешним API

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Книга | [[Spring и Spring Boot. Разработка облачных приложений на Java]] | 🇦 |
| Документация | Spring.io guides | 🇦 |
| Курс | Baeldung Spring courses | 🇧 |

## Критерии завершения

- [ ] Реализовал 3 REST API проекта
- [ ] Понимаешь разницу между @Component, @Service, @Repository
- [ ] Умеешь писать unit и integration тесты
- [ ] Использовал Spring Data JPA

## Связь с дипломом

Spring Boot — основа для Spring Cloud микросервисов. Model Registry и Inference Services будут построены на Spring Boot.
