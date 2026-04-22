---
tags:
  - note/discourse/context
  - category/computer_science
aliases: []
icon: 🪧
color: "#909090"
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Контекст: Проблема ML Deployment

**ML deployment — historically pain point:**

1. **Model complexity**
   - Modern models: GPT-4 (1.8T params), Stable Diffusion (890M-5B params)
   - GPU memory limitations
   - Inference latency requirements

2. **Infrastructure challenges**
   - Scalability: bursts vs steady-state
   - Versioning: models evolve rapidly
   - Monitoring: data drift, model drift

3. **Team silos**
   - Data Scientists: Python-centric
   - ML Engineers: infrastructure
   - DevOps: deployment pipelines

**GAP:** Traditional deployment approaches don't work for ML.

**Вывод:** Need new architectural patterns that bridge ML и software engineering.
