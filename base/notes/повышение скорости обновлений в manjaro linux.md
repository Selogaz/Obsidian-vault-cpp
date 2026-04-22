---
tags:
  - note/basic/primary
  - category/linux
aliases:
  - manjaro mirrorlist
  - pacman mirror
icon: 📝
color: "#70a0b5"
created: 2026-03-29T12:00:00+07:00
updated: 2026-03-29T10:43:07+03:00
---

# Повышение скорости обновлений в Manjaro Linux

Медленная загрузка обновлений через `sudo pacman -Syu` обычно связана с плохими зеркалами (mirrors), а не с качеством интернет-соединения.

## Причины проблемы

- Зеркала могут быть географически далеко от пользователя
- Некоторые зеркала имеют ограниченную пропускную способность
- Устаревший или неоптимизированный список зеркал

## Решения

```zsh
sudo pacman-mirrors --fasttrack 10
sudo pacman -Syy
sudo pacman -Syu
```
