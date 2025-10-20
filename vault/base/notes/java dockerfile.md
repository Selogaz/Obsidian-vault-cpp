---
tags:
  - note/specific/code
  - category/java
aliases:
  - dockerfile
deck: obsidian::java
created: 2025-09-17T19:24:48+03:00
updated: 2025-10-08T19:26:45+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**dockerfile**
—
инструмент для создания [[java docker image|docker image]]
пример создания dockerfile:
![[java dockerfile 2025-09-17.png]]
`FROM` - базовый image
`WORKDIR` - название рабочей директории
`COPY` - откуда копируем файл запускаемой программы, пробел, куда
`ENTRYPOINT` - команда для запуска. Каждый элемент массива будет разделен пробелом

запуск dockerfile:
```bash
docker build -t phrases .
```
`-t` - значит, что дальше будет название нового image
`phrases` - название image
`.` - директория, где хранится dockerfile. В данном случае текущая директория

переименование image:
```bash
docker tag phrases mihusle/phrases
```
сначала текущее имя, пробел, новое имя. Обычно на dockerhub загружают контейнеры с именем : "имя пользователя/имя image"

загрузка image на dockerhub:
```bash
docker push mihusle/phrases
```
