---
tags:
  - note/discourse/synthesis
  - category/study
aliases:
  - "Microservices for ML Deployment"
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Рекомендуемая тема дипломного проекта

## Тема
**«Микросервисная архитектура системы развёртывания нейросетей в production-среде»**

(или на английском: *Microservices Architecture for Neural Network Deployment in Production*)

## Аннотация
Разработка распределённой системы на базе микросервисной архитектуры для развёртывания, масштабирования и мониторинга ML-моделей (нейросетей) в production-среде с использованием:
- Java/Spring Cloud
- Kubernetes
- TensorFlow Serving / Triton Inference Server
- Prometheus + Grafana для мониторинга

## Ключевые компоненты
1. **Model Registry Service** — хранение и версионирование моделей
2. **Inference Service** — serving моделей (gRPC/REST)
3. **API Gateway** — маршрутизация запросов
4. **Autoscaling** — K8s HPA на основе нагрузки
5. **ML Observability** — мониторинг drift, latency, accuracy

## Почему это хорошая тема
- ✅ Соответствует направлению «Программная инженерия»
- ✅ Использует твои навыки (Java, микросервисы, Linux)
- ✅ Актуальна для индустрии (MLOps demand)
- ✅ Реалистичный scope для диплома
- ✅ Можно показать практический результат

## Дополнительные идеи для углубления
- A/B testing нескольких моделей
- Canary deployment моделей
- Model caching и batching
- Горизонтальное масштабирование inference
