---
tags:
  - system/high/hierarchy
  - category/LLM
aliases: []
category:
  - "[[LLM]]"
meta:
problem:
relevant: false
created: 2026-03-01T00:11:15+03:00
updated: 2026-03-01T00:11:53+03:00
---

💤
# Description

https://chat.qwen.ai/s/t_ad6bc95a-6d52-48c9-90b0-27d932d26fee?fev=0.2.7
https://habr.com/ru/articles/945086/
https://habr.com/ru/articles/922340/
![[Мои LLM 2026-02-22.png]]

## LMStudio + Qwen2.5-14B-Instruct-GGUF для текста

## Установка и запуск
`chmod +x 'LM-Studio-0.4.3-2-x64.AppImage'`
`./LM-Studio-0.4.3-2-x64.AppImage`

## Fooocus + Civital + Pony Diffusion V6 XL ->

### Установка

https://github.com/lllyasviel/Fooocus?tab=readme-ov-file#linux-using-python-venv

### Запуск
`cd ~/LLM/Fooocus/`
`source fooocus_env/bin/activate`
`python entry_with_update.py`

[[image llm]]

# Opencode

Конфигурация:
```zsh
export OPENAI_API_KEY=""
export OPENAI_BASE_URL="http://localhost:1234/v1"
export OPENAI_MODEL="qwen2.5-7b-instruct"
```

Запуск:
```zsh
opencode run \ 
  --file .claude/skills/today/SKILL.md \
  --file periodic/daily/2026-02-28.md \
  -- "Создай ежедневный брифинг согласно инструкции в skills/today/SKILL.md"
```
или

```zsh
opencode run \ 
  -- "Создай конспект по книге How Linux Works, но один файлом. Пометь какие фрагменты будут оформлены в отдельные заметки, но помни, создай только один файл, не мусори в хранилище. Я хочу понять насколько мои заметки будут отличаться от твоих и почему"

```
