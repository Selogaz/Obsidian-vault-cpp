---
tags:
  - system/high/hierarchy
  - category/computer_science
aliases:
  - roadmap mlops
  - ml operations
category:
  - "[[computer science]]"
meta:
  - "[[machine learning]]"
  - "[[ci-cd]]"
relevant: false
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Roadmap: MLOps

> **Когда:** Семестр 7 (2029)
> **Цель:** Operations и Observability для ML
> **Время:** ~8 часов в неделю
> **Prerequisite:** [[roadmap-ml-deployment]]

## Зачем это нужно

MLOps объединяет DevOps практики с ML спецификой. Без observability и monitoring невозможно управлять ML системой в production.

## Что изучать

### ML Monitoring (Неделя 1-3)
- [ ] Data drift detection
- [ ] Model drift
- [ ] Feature drift
- [ ] Evidently AI

### Metrics & Logging (Неделя 4-5)
- [ ] Prometheus metrics for ML
  - Latency
  - Throughput
  - Prediction distribution
- [ ] Structured logging
- [ ] Distributed tracing (Jaeger)

### Alerting (Неделя 6-7)
- [ ] Prometheus Alertmanager
- [ ] Anomaly detection
- [ ] SLA/SLO definitions
- [ ] Incident response

### ML Pipelines (Неделя 8-10)
- [ ] Kubeflow Pipelines
- [ ] Airflow for ML
- [ ] ZenML
- [ ] Pipeline orchestration

### Experiment Tracking (Неделя 11-12)
- [ ] MLflow
- [ ] Weights & Biases
- [ ] Neptune
- [ ] Integrating with Model Registry

## Tools

| Category | Tools |
|----------|-------|
| Monitoring | Prometheus, Grafana, Evidently |
| Logging | ELK Stack, Loki |
| Tracing | Jaeger, Zipkin |
| Pipelines | Kubeflow, Airflow, ZenML |
| Experiment | MLflow, W&B |

## Проекты

1. **Grafana dashboards** — ML-specific metrics
2. **Drift detection system** — мониторинг качества
3. **Full MLOps pipeline** — от данных до deployment

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Книга | Introducing MLOps (Mark Treveil et al.) | 🇦 |
| Книга | Practical MLOps (Noel Cressy) | 🇦 |
| Курс | Coursera MLOps Specialization | 🇧 |

## Критерии завершения

- [ ] Настроил monitoring для inference
- [ ] Реализовал drift detection
- [ ] Понимаешь MLOps maturity models
- [ ] Интегрировал experiment tracking

## Связь с дипломом

Monitoring и observability — критическая часть для защиты диплома. Показывает production-readiness системы.
