---
tags:
  - note/specific/exact
  - category/webdev
aliases:
  - git remote add
icon: 📝
color: "#d0a570"
created: 2026-05-31T23:39:00+03:00
updated: 2026-05-31T20:22:18+03:00
---

**Связать локальный репозиторий с удалённым**
—

## 1. Создать репозиторий на GitHub

Создать пустой repo на github.com (без README, .gitignore, лицензии).

## 2. Привязать remote

```zsh
git remote add origin <url>
# git remote add origin git@github.com:user/repo.git
```

Проверить:
```zsh
git remote -v
```

## 3. Отправить локальные коммиты

```zsh
git push -u origin main
# -u (--set-upstream) связывает локальную ветку с удалённой
# При последующих push достаточно `git push`
```

Если ветка называется `master`:
```zsh
git push -u origin master
```

## 4. Если в удалённом репозитории уже есть файлы

```zsh
git pull origin main --allow-unrelated-histories
git push
```

## Если remote уже был, но нужно сменить URL

```zsh
git remote set-url origin <новый-url>
```

## Полезные ссылки

[[java основы git]]
