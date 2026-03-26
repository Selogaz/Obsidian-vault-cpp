---
tags:
  - status/todo
  - project/longform
  - priority/c
  - category/computer_science
aliases:
  - thesis ml deployment
  - diploma ml
  - диплом микросервисы ml
status: 🟥
priority: 🇨
category:
  - "[[computer science]]"
meta:
  - "[[microservices]]"
  - "[[machine learning]]"
problem: []
longform:
  format: scenes
  title: Диплом ML Deployment
  workflow: Default Workflow
  sceneFolder: /
  scenes:
    - 01-тема-и-актуальность
    - 02-обзор-микросервисной-архитектуры
    - 03-mlops-и-deployment
    - 04-проектирование-системы
    - 05-implementation
    - 06-testing
    - 07-results
  sceneTemplate: templates/create/projects/longform scene template.md
  ignoredFiles: []
start: 2026-09-01T00:00:00+07:00
end: 2030-06-30T00:00:00+07:00
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-24T22:29:04+03:00
---

> [!toc]- Table of contents
> ```table-of-contents
> ```

> [!todo]- Tasks
> ```tasks
> path includes {{query.file.path}}
> group by heading
> hide task count
> ```

> [!todo]- Scene tasks
> ```tasks
> path includes {{query.file.folder}}
> path does not include {{query.file.path}}
> group by backlink
> hide task count
> ```

# Описание

**Тема:** Микросервисная архитектура системы развёртывания нейросетей в production-среде

**Аннотация:** Разработка распределённой системы на базе микросервисной архитектуры для развёртывания, масштабирования и мониторинга ML-моделей (нейросетей) в production-среде.

## Ключевые технологии

- Java/Spring Cloud
- Kubernetes
- TensorFlow Serving / Triton Inference Server
- Prometheus + Grafana

## Структура работы

1. [[01-тема-и-актуальность]] — Введение, актуальность, цели
2. [[02-обзор-микросервисной-архитектуры]] — Теоретическая база
3. [[03-mlops-и-deployment]] — ML deployment patterns
4. [[04-проектирование-системы]] — Архитектура решения
5. [[05-implementation]] — Реализация
6. [[06-testing]] — Тестирование
7. [[07-results]] — Результаты и выводы

## Roadmap

![[диплом-roadmap-обучения]]

## Прогресс

### 🟥 Фаза 1: Фундамент (2026-2027)
- [ ] Java Core + Spring Boot
- [ ] Docker basics
- [ ] Kubernetes intro

### 🟥 Фаза 2: Микросервисы (2027-2028)
- [ ] Spring Cloud
- [ ] API Gateway, Service Discovery
- [ ] Message queues

### 🟥 Фаза 3: ML Integration (2028-2029)
- [ ] ML basics
- [ ] Model serving frameworks
- [ ] MLflow/Kubeflow

### 🟥 Фаза 4: Production (2029-2030)
- [ ] CI/CD pipelines
- [ ] Monitoring & Observability
- [ ] Security

### 🟥 Фаза 5: Thesis (2030)
- [ ] Writing
- [ ] Defense preparation
