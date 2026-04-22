---
tags:
  - category/computer_science
  - system/high/hierarchy
aliases:
  - kubernetes learning
  - roadmap k8s
relevant: false
category:
  - "[[computer science]]"
meta:
  - "[[kubernetes]]"
problem:
icon: 🧬
color: "#b089c4"
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Roadmap: Kubernetes

> **Когда:** Семестр 4 (2027-2028)
> **Цель:** Оркестрация контейнеров в production
> **Время:** ~8 часов в неделю
> **Prerequisite:** [[roadmap-docker]]

## Зачем это нужно

Kubernetes — платформа для orchestration микросервисов. В production без K8s невозможно обеспечить autoscaling, self-healing и declarative deployments.

## Что изучать

### Core Concepts (Неделя 1-3)
- [ ] Pods, ReplicaSets, Deployments
- [ ] Namespaces
- [ ] Labels и Selectors
- [ ] kubectl basics

### Networking (Неделя 4-5)
- [ ] Services (ClusterIP, NodePort, LoadBalancer)
- [ ] Ingress controllers
- [ ] DNS in cluster
- [ ] Network policies

### Configuration (Неделя 6-7)
- [ ] ConfigMaps
- [ ] Secrets
- [ ] Environment variables
- [ ] Volumes (EmptyDir, PersistentVolume)

### Scaling (Неделя 8-9)
- [ ] Horizontal Pod Autoscaler (HPA)
- [ ] Vertical Pod Autoscaler
- [ ] Resource limits и requests
- [ ] Pod Disruption Budget

### Helm & Packaging (Неделя 10-11)
- [ ] Helm basics
- [ ] Charts structure
- [ ] Template variables
- [ ] Release management

### Advanced (Неделя 12)
- [ ] Operators
- [ ] Custom Resource Definitions
- [ ] Service Mesh intro (Istio)

## ML on K8s (Бонус)
- [ ] Kubeflow basics
- [ ] Seldon Core
- [ ] Triton on K8s

## Проекты

1. **Deploy Spring Boot app** — production-ready deployment
2. **HPA setup** — autoscaling under load
3. **Helm chart** — reusable packaging

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Книга | Kubernetes in Action (Marko Lukša) | 🇦 |
| Курс | CKAD certification path | 🇦 |
| Практика | minikube / kind для локального K8s | 🇦 |

## Критерии завершения

- [ ] Развернул приложение в K8s
- [ ] Настроил HPA
- [ ] Использовал Helm для deployment
- [ ] Понимаешь difference между deployment strategies

## Связь с дипломом

Model serving (TensorFlow Serving, Triton) будет развёрнуто в K8s. Autoscaling критичен для ML inference под нагрузкой.
