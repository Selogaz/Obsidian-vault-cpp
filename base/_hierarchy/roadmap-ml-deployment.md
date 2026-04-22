---
tags:
  - category/computer_science
  - system/high/hierarchy
aliases:
  - model serving
  - roadmap ml deployment
relevant: false
category:
  - "[[computer science]]"
meta:
  - "[[ci-cd]]"
  - "[[machine learning]]"
problem:
icon: 🧬
color: "#b089c4"
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Roadmap: ML Deployment

> **Когда:** Семестр 6-7 (2028-2029)
> **Цель:** Deployment ML моделей в production
> **Время:** ~10 часов в неделю
> **Prerequisite:** [[roadmap-ml-basics]], [[roadmap-spring-cloud]]

## Зачем это нужно

Core диплома — как развернуть и масштабировать ML модели в production через микросервисную архитектуру.

## Что изучать

### Model Serving Frameworks (Неделя 1-4)
- [ ] TensorFlow Serving
  - SavedModel format
  - gRPC/REST API
  - Versioning models
- [ ] Triton Inference Server
  - Dynamic batching
  - Ensemble models
  - GPU support
- [ ] TorchServe
- [ ] BentoML

### REST/gRPC Integration (Неделя 5-6)
- [ ] Calling TensorFlow Serving from Java
- [ ] gRPC client in Java
- [ ] Protocol Buffers
- [ ] Performance considerations

### Autoscaling for ML (Неделя 7-8)
- [ ] K8s HPA with custom metrics
- [ ] Prometheus GPU metrics
- [ ] Horizontal Pod Autoscaler for inference
- [ ] Batching strategies

### Model Management (Неделя 9-10)
- [ ] Model Registry
- [ ] MLflow Model Registry
- [ ] Version control моделей
- [ ] Rollback strategies

### CI/CD for ML (Неделя 11-12)
- [ ] Automated model testing
- [ ] Canary deployment моделей
- [ ] A/B testing
- [ ] [[ci-cd]] pipelines для ML

## Architecture Patterns

- [ ] Model-as-a-Service
- [ ] Preprocessing/Postprocessing services
- [ ] Ensemble serving
- [ ] Caching predictions

## Проекты

1. **TensorFlow Serving + Java client** — простой inference
2. **Model Registry Service** — Spring Boot + MinIO/S3
3. **Full ML microservice system** — интеграция всех компонентов

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Документация | TensorFlow Serving docs | 🇦 |
| Документация | NVIDIA Triton docs | 🇦 |
| Книга | MLOps Engineering ( Bowman et al.) | 🇧 |

## Критерии завершения

- [ ] Развернул TensorFlow Serving
- [ ] Интегрировал с Java сервисом
- [ ] Настроил autoscaling для inference
- [ ] Реализовал Model Registry

## Связь с дипломом

Это основная практическая часть. Всё что здесь изучено — станет частью дипломного проекта.
