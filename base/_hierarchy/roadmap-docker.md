---
tags:
  - system/high/hierarchy
  - category/computer_science
aliases:
  - roadmap docker
  - containerization
category:
  - "[[computer science]]"
meta:
  - "[[microservices]]"
relevant: false
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Roadmap: Docker

> **Когда:** Семестр 3 (2027)
> **Цель:** Контейнеризация приложений
> **Время:** ~5 часов в неделю
> **Prerequisite:** [[roadmap-java-core]]

## Зачем это нужно

Docker — стандарт де-факто для packaging приложений. Без него невозможен Kubernetes и микросервисная архитектура.

## Что изучать

### Основы (Неделя 1-2)
- [ ] Что такое контейнеры vs VMs
- [ ] Docker architecture
- [ ] Images, Containers, Registries
- [ ] docker run, docker ps, docker logs

### Dockerfile (Неделя 3-4)
- [ ] FROM, COPY, RUN, CMD
- [ ] Multi-stage builds
- [ ] Layer caching
- [ ] Best practices

### Docker Compose (Неделя 5-6)
- [ ] docker-compose.yml syntax
- [ ] Services, Networks, Volumes
- [ ] Environment variables
- [ ] Local development setup

### Networking (Неделя 7-8)
- [ ] Bridge, Host, Overlay networks
- [ ] Port mapping
- [ ] DNS resolution between containers

### Registry (Неделя 9)
- [ ] Docker Hub
- [ ] Private registries
- [ ] Image tagging, versioning

## Проекты

1. **Dockerize Spring Boot app** — создать Dockerfile
2. **Multi-container setup** — app + DB + Redis
3. **[[java dockerfile]]** — изучить существующие практики

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Книга | Docker Deep Dive (Nigel Poulton) | 🇦 |
| Документация | docs.docker.com | 🇦 |
| Практика | Docker Playground | 🇦 |

## Критерии завершения

- [ ] Создал Dockerfile для Java приложения
- [ ] Использовал Docker Compose для local dev
- [ ] Понимаешь multi-stage builds
- [ ] Пушнул image в registry

## Связь с дипломом

Каждый микросервис будет containerized. Model serving frameworks (TensorFlow Serving) тоже работают в Docker.
