---
tags:
  - note/specific/code
  - category/java
aliases:
  - Микросервисы
deck: obsidian::java
created: 2025-06-06T12:16:26+03:00
updated: 2025-09-21T11:59:04+03:00
sr-due: 2025-10-10
sr-interval: 19
sr-ease: 270
---

**Микросервисы**
—
Микросервисы – небольшие, слабо связанные, легко изменяемые сервисы. Разрабатываются в предметной области и выпускаются независимо.

Микросервисы рассматривают в противоположность [[java монолит|монолиту]]

# Взаимодействие, плюсы, минусы

![[java взаимодействие микросервисов]]

![[java плюсы микросервисов]]

![[java недостатки микросервисов]]

# Основные компоненты микросервисной архитектуры

- ![[java service registry|service registry]]
- ![[java service discovery|service discovery]]
- ![[java API gateway|API gateway]]
- ![[java service mesh|service mesh]]

# Spring Cloud

Проекты, которые берут на себя часть однотипной функциональности, необходимой микросервисам. Что облегчает разработку.
Список таких проектов:
- Spring Cloud:
	- Commons
	- Zookeeper
	- Consul
	- Config
	- Bus
	- Contract
	- Gateway
	- Azure
	- for Amazon Web Services
	- Alibaba
	- Kubernetes
	- OpenFeign
- [ ] #task/someday #category/work в свободное время ознакомиться подробнее. Или хотя бы сделать по ним заметки

# Kubernetes

- [ ] #task/reference #category/work Ознакомиться с Kubernetes после изучения книги[^1]

[^1]: с. 37
