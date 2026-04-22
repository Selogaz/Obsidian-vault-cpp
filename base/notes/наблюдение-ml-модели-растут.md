---
tags:
  - note/discourse/observation
  - category/computer_science
aliases: []
icon: 👀
color: "#c0c0c0"
created: 2026-03-21T00:00:00+07:00
updated: 2026-03-21T00:00:00+07:00
---

# Наблюдение: Размер ML моделей растёт экспоненциально

**Timeline model sizes:**

| Год | Модель | Параметры |
|-----|--------|-----------|
| 2018 | BERT | 340M |
| 2020 | GPT-3 | 175B |
| 2022 | GPT-4 | ~1.8T (estimated) |
| 2024 | Claude 3, Gemini | 100B+ |
| 2025 | Sora, Llama 3 | 400B+ |

**Implications:**
- Single server → cluster → distributed inference
- CPU → GPU → TPU → specialized accelerators
- Batch processing → real-time → streaming

**Вывод:** Scalable infrastructure is no longer optional.
