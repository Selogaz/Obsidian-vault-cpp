---
tags:
  - note/discourse/context
  - category/computer_science
aliases: []
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T20:30:35+03:00
---

# Проблемы ML Deployment: Глубокий анализ

## Проблема 1: ML — это не software, это data + software + math

**Специфика ML систем (Google, "Hidden Technical Debt in ML Systems", 2015):**

| Component | % от кода | Сложность |
|-----------|-----------|-----------|
| ML code | 5% | Модель |
| Data collection | 20% | Pipelines |
| Feature extraction | 25% | ETL |
| Infrastructure | 50%+ | Deployment, serving |

**Проблема:** Traditional software engineering practices don't map 1:1 to ML.

### Why ML ≠ Traditional Software

| Аспект | Traditional Software | ML System |
|--------|---------------------|-----------|
| Behavior | Deterministic code | Probabilistic, data-dependent |
| Testing | Unit tests | Validation metrics |
| Debugging | Stack trace | "Why accuracy dropped?" |
| Reproducibility | git commit | data + code + hyperparameters |
| Updates | Deploy code | Retrain + redeploy |
| Failure | Crash/error | Silent degradation |

---

## Проблема 2: 60% ML проектов не доходят до production

**Причины провала ( VentureBeat AI Summit):**

| Причина | % | Описание |
|---------|---|---------|
| No clear business case | 22% | ML без ROI |
| Poor data quality | 18% | Garbage in, garbage out |
| Integration challenges | 16% | Can't connect to production |
| Scaling difficulties | 14% | Works on laptop, fails at scale |
| Budget overruns | 12% | Underestimated complexity |
| Skills shortage | 10% | No MLOps expertise |
| Governance/compliance | 8% | GDPR, explainability |

### Конкретные integration challenges:

```
┌────────────────────────────────────────────────────────────┐
│  DATA SCIENCE TEAM                    INFRA TEAM            │
│  ┌─────────────┐                    ┌─────────────┐       │
│  │ Jupyter     │ ─── "works on my   │ Production  │       │
│  │ Notebook    │      machine" ───→ │ Kubernetes  │       │
│  └─────────────┘                    └─────────────┘       │
│        ↓                                    ↓              │
│  Python, pandas,                    Java, microservices    │
│  scikit-learn                       CI/CD, monitoring     │
│        ↓                                    ↓              │
│  [DEPLOYMENT GAP] ← Что делать? ←                           │
└────────────────────────────────────────────────────────────┘
```

---

## Проблема 3: Scalability — от notebook до production

**Scaling challenges:**

### 3.1 Computational scaling

```
Laptop (CPU)          →  Production (GPU Cluster)
─────────────────────────────────────────────────
Batch size: 32        →  Batch size: 1000+
Model: 100MB          →  Model: 10GB+
Requests: 10/min      →  Requests: 10,000/sec
Latency: 100ms OK    →  Latency: <50ms required
```

### 3.2 Infrastructure scaling patterns

| Scenario | Challenge | Traditional Solution |
|----------|-----------|---------------------|
| Burst traffic | 100x spike at 9 AM | Horizontal scaling |
| GPU shortage | Expensive, limited | Batching, model optimization |
| Cold starts | Latency spikes | Warm pools, caching |
| Geographic distribution | Latency to users | Multi-region deployment |

### 3.3 Autoscaling — not straightforward

```yaml
# Traditional HPA doesn't work for ML:
# - CPU-based HPA → wrong metric
# - Need custom metrics:
#   - Queue length
#   - GPU utilization  
#   - Inference latency
#   - Prediction throughput
```

---

## Проблема 4: Model versioning и lifecycle

**Model graveyard syndrome:**

```
Model v1 → deployed  →  "This model is broken!"
Model v2 → deployed  →  "Wait, v1 was better for Segment C!"
Model v1.1 → deployed →  "We forgot to track what changed"
Model v2 → rollback  →  "Where is v1 binary?"
```

### Versioning challenges:

| What to version | Traditional | ML-specific |
|-----------------|-------------|-------------|
| Code | git | git + model binary |
| Data | — | DVC, Delta Lake |
| Model params | — | Model registry |
| Metrics | — | Experiment tracking |
| Config | config files | hyperparameters |
| Environment | Docker | GPU drivers + CUDA + libs |

### Model lifecycle:

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ TRAIN   │ → │ VALIDATE│ → │ DEPLOY  │ → │ MONITOR │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
     ↓              ↓              ↓              ↓
  Datasets      Metrics       Canary/A/B    Drift detection
  Hyperparams   Test set      Rollback      Retraining trigger
```

---

## Проблема 5: Monitoring — "It works" is not enough

**ML monitoring ≠ traditional APM:**

| Traditional Monitoring | ML Monitoring |
|------------------------|---------------|
| CPU, Memory, Network | + GPU utilization |
| Error rates | + Prediction accuracy |
| Latency p99 | + Inference latency |
| Uptime | + Data drift |
| — | + Model drift |
| — | + Feature drift |
| — | + Adversarial attacks |

### The silent failure problem:

```
Traditional software:     ML system:
┌─────────────────┐      ┌─────────────────┐
│ Request → Error  │     │ Request → "42%" │
│         ↓        │     │         ↓       │
│ Alert triggered  │     │ Looks OK...     │
│ Human reacts     │     │ ...but model    │
└─────────────────┘     │ silently broke   │
                        └─────────────────┘
```

**Example:** Model trained on 2020 data predicting 2024 trends — predictions look valid, are wrong.

### Data/Model Drift types:

```
Data Drift:     P(X) changes     → Input distribution shift
         Example: User behavior changed, features look different

Model Drift:    P(Y|X) changes   → Conditional probability shift
         Example: Spam patterns evolved, model outdated

Concept Drift:  Y definition changes → What we're predicting shifts
         Example: "Fraud" definition changed with new regulations
```

---

## Проблема 6: Team structure и collaboration

**ML project通常涉及多个团队:**

```
┌────────────────────────────────────────────────────────────┐
│                      ML PROJECT                            │
│                                                            │
│  Data Engineers          ML Engineers       ML Ops/DevOps  │
│  ┌────────────┐         ┌────────────┐    ┌───────────┐  │
│  │ Data       │         │ Model      │    │ Deploy    │  │
│  │ Pipelines  │ ──────→ │ Training   │───→│ & Monitor │  │
│  │ (Python)   │         │ (Python)   │    │ (Python/  │  │
│  └────────────┘         └────────────┘    │  Go/Java) │  │
│                                           └───────────┘  │
│                          ↓                               │
│                    Software Engineers                     │
│                    ┌────────────────┐                    │
│                    │ Business Logic │                    │
│                    │ (Java/Kotlin) │                    │
│                    └────────────────┘                    │
└────────────────────────────────────────────────────────────┘
```

**The handoff problem:**

| Stage | Common Issue |
|-------|--------------|
| Training → Deployment | "Works in notebook" |
| Deployment → Monitoring | "No visibility into model behavior" |
| Monitoring → Retraining | "When do we retrain? Who decides?" |
| ML team → Business | "What does accuracy mean for revenue?" |

---

## Проблема 7: Security и governance

**ML-specific security concerns:**

| Threat | Description | Impact |
|--------|-------------|--------|
| Model inversion | Reconstruct training data from predictions | Privacy breach |
| Adversarial attacks | Manipulate inputs to fool model | Business logic bypass |
| Model theft | Copy deployed model via API queries | IP theft |
| Data poisoning | Corrupt training data | Compromised model |
| Inference attacks | Extract training data from model | GDPR violation |

**Compliance challenges:**

- GDPR: "Right to explanation" — can you explain why?
- Financial services: Model auditability required
- Healthcare: FDA approval for clinical ML models
- EU AI Act: Risk classification, transparency requirements

---

## Сводка проблем

| # | Категория | Core Issue |
|---|-----------|------------|
| 1 | Code vs ML | ML ≠ traditional software |
| 2 | Production gap | 60% projects never deploy |
| 3 | Scaling | Notebook → Production mismatch |
| 4 | Versioning | No ML-specific version control |
| 5 | Monitoring | Silent failures, drift |
| 6 | Collaboration | Team silos, handoffs |
| 7 | Security | New attack vectors |

---

## Связь с дипломом

**Как диплом адресует эти проблемы:**

| Проблема | Решение в дипломе | Глава |
|----------|-------------------|-------|
| 1 | Microservice separation (ML vs business) | 2, 4 |
| 2 | Full deployment pipeline | 5 |
| 3 | K8s HPA, autoscaling | 4, 5 |
| 4 | Model Registry Service | 5 |
| 5 | ML Observability (Prometheus + Grafana) | 5 |
| 6 | Service interfaces (gRPC/REST) | 4, 5 |
| 7 | Security best practices, canary deploy | 4, 6 |
