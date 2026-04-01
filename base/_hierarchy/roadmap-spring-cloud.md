---
tags:
  - system/high/hierarchy
  - category/computer_science
aliases:
  - roadmap spring cloud
  - microservices patterns
category:
  - "[[computer science]]"
meta:
  - "[[microservices]]"
relevant: false
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Roadmap: Spring Cloud

> **Когда:** Семестр 4-5 (2028)
> **Цель:** Микросервисная архитектура на Java
> **Время:** ~10 часов в неделю
> **Prerequisite:** [[roadmap-spring-boot]], [[roadmap-kubernetes]]

## Зачем это нужно

Spring Cloud — стек для построения микросервисов в Java экосистеме. Включает все необходимые паттерны: service discovery, gateway, circuit breaker.

## Что изучать

### Service Discovery (Неделя 1-3)
- [ ] Eureka Server/Client
- [ ] Consul
- [ ] Client-side load balancing (LoadBalancer)
- [ ] [[java service registry]]
- [ ] [[java service discovery]]

### API Gateway (Неделя 4-5)
- [ ] Spring Cloud Gateway
- [ ] Routing, Filtering
- [ ] Rate limiting
- [ ] [[java API gateway]]

### Configuration (Неделя 6-7)
- [ ] Spring Cloud Config
- [ ] Git-backed configuration
- [ ] Refresh scope
- [ ] Encryption

### Resilience (Неделя 8-9)
- [ ] Resilience4j
- [ ] Circuit Breaker pattern
- [ ] Retry
- [ ] Rate Limiter
- [ ] [[java service mesh]]

### Communication (Неделя 10-11)
- [ ] OpenFeign
- [ ] gRPC basics
- [ ] Async messaging (Kafka)
- [ ] [[java взаимодействие микросервисов]]

### Security (Неделя 12)
- [ ] OAuth2 / JWT
- [ ] Spring Security in microservices
- [ ] Token propagation

## Паттерны

- [ ] Circuit Breaker
- [ ] API Gateway
- [ ] Service Discovery
- [ ] CQRS
- [ ] Event Sourcing

## Проекты

1. **Multi-service system** — 3-4 сервиса с Eureka
2. **API Gateway** — routing + auth
3. **Resilient calls** — circuit breaker + retry

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Книга | [[Spring и Spring Boot. Разработка облачных приложений на Java]] | 🇦 |
| Книга | Microservices Patterns (Chris Richardson) | 🇦 |
| Источник | [[Популярные шаблоны микросервисной архитектуры за 20 минут]] | 🇧 |

## Критерии завершения

- [ ] Построил систему из 3+ микросервисов
- [ ] Использовал Service Discovery
- [ ] Реализовал API Gateway
- [ ] Применил Circuit Breaker

## Связь с дипломом

Это core диплома. Model Registry Service, Inference Service, API Gateway — всё на Spring Cloud.
