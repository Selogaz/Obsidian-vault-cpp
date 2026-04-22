---
tags:
  - category/computer_science
  - system/high/hierarchy
aliases:
  - machine learning intro
  - roadmap ml basics
relevant: false
category:
  - "[[computer science]]"
meta:
  - "[[machine learning]]"
problem:
icon: 🧬
color: "#b089c4"
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Roadmap: ML Basics

> **Когда:** Семестр 5-6 (2028)
> **Цель:** Понимание ML для deployment
> **Время:** ~8 часов в неделю
> **Note:** Интеграция ML, не обучение с нуля

## Зачем это нужно

Для успешного deployment ML нужно понимать:
- Как работают модели
- Какие метрики важны
- Как измерять качество inference

## Что изучать

### ML Fundamentals (Неделя 1-3)
- [ ] Types of ML: Supervised, Unsupervised, Reinforcement
- [ ] Neural Networks basics
  - Perceptron
  - Layers, Activation functions
  - Backpropagation
- [ ] Common architectures: CNN, RNN, Transformers

### Training vs Inference (Неделя 4-5)
- [ ] Training pipeline
- [ ] Inference pipeline
- [ ] Model serialization (ONNX, SavedModel, TorchScript)
- [ ] Batch vs Real-time inference

### ML Metrics (Неделя 6-7)
- [ ] Accuracy, Precision, Recall, F1
- [ ] Confusion matrix
- [ ] ROC AUC
- [ ] Model-specific metrics

### Deep Learning Frameworks (Неделя 8-9)
- [ ] TensorFlow basics
- [ ] PyTorch basics
- [ ] ONNX for model interchange

### ML in Production (Неделя 10-12)
- [ ] Model lifecycle
- [ ] Feature stores
- [ ] Model validation
- [ ] A/B testing models

## Глубина изучения

**Важно:** Это не про глубокое изучение ML. Фокус на deployment аспектах.

## Ресурсы

| Тип | Название | Приоритет |
|-----|----------|-----------|
| Курс | fast.ai Practical Deep Learning | 🇦 |
| Книга | Hands-On Machine Learning (Aurelien Geron) | 🇦 |
| Курс | Andrew Ng ML Course | 🇧 |

## Критерии завершения

- [ ] Понимаешь разницу между training и inference
- [ ] Можешь объяснить основные метрики
- [ ] Знаешь как сериализовать модель
- [ ] Понимаешь challenges ML в production

## Связь с дипломом

Без понимания ML невозможно эффективно проектировать inference pipeline и выбирать оптимальные решения для serving.
