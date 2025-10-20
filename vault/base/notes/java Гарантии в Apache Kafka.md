---
tags:
  - note/specific/code
  - category/java
aliases:
  - Гарантии в Apache Kafka
deck: obsidian::java
created: 2025-09-27T18:30:44+03:00
updated: 2025-10-08T19:24:19+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**Гарантии в Apache Kafka**
—
С Kafka работают 2 стороны, продюсер и консьюмер, которые настраиваются независимо друг от друга. Поэтому выделяют 2 отдельные гарантии:
- гарантия доставки от продюсера в Kafka
- гарантия обработки

Также возможна гарантия exactly-once, когда сообщение доставлено на консьюмер ровно один раз. Она требует согласованной настройки и продюсера, и консьюмера.

# Доставка сообщения от продюсера в Kafka

Сообщение может быть потеряно, если при отправке:
- продюсер не может подключиться к брокеру Kafka
- один из брокеров кластера упал

Репликация помогает Kafka масштабироваться и надёжно хранить данные. Каждая партиция имеет несколько реплик (копий на разных брокерах). Одна реплика называется лидер, остальные - фолловеры.

Как работает:
- Продюсер отправляет сообщение лидеру партиции
- Лидер сохраняет сообщение у себя и отправляет его фолловерам
- После успешной записи на несколько реплик сообщение считается зафикисированным (commited)

Сообщение всегда пишется и читается из лидера. Фолловеры нужны только для надёжности.

acks - параметр, показывающий число брокеров, которые должны прислать "ок", чтобы сообщение считалось записанным:
- 0: Продюсер не ждет подтверждений (самая быстрая отправка, высокий риск потери сообщений)
- 1: Продюсер ждет подтверждения от лидера партиции
- all: Продюсер ждет подтверждений от всех реплик (наибольшая надежность, но увеличенные задержки)

acks и гарантии доставки:
- acks=0 или 1 - гарантия at-most-once, возможна потеря сообщений
- acks=all - at-least-once

Хотя считается, что при режиме at-least-once возможны дубликаты, в Kafka по умолчанию включен идемпотетный режим продюсера:
- Продюсер присылает сообщение с уникальным идентификатором
- Kafka проверяет, было ли это сообщение уже получено. Если было - игнорирует сообщение

# Получение сообщений на стороне консьюмера

Потребитель периодически опрашивает брокер и получает пачку сообщений. После обработки консьюмер подтверждает (коммитит) [[java kafka offset|оффсет]] - позицию последнего обработанного сообщения, чтобы при перезапуске продолжить с этого места.
## At most once
![[java kafka at-most-once]]
## At least once
![[java kafka at least once]]

## Exactly once (EOS)

гарантия, при которой сообщение будет доставлено и обработано ровно один раз - без [[java kafka at-most-once|потерь]] и без [[java kafka at least once|дублирования]]. Достигается с помощью транзакций и настроек на продюсере/консьюмере

При отправке сообщению присваивается transactionalID, затем координатор транзакций (Transaction Coordinator) следит за её выполнением. Транзакции также используются для атомарной работы с несколькими топиками (прочитать сообщение из одного, обработать, положить в другой). Сообщения в рамках транзакций доставляются примерно на 5-20% медленнее

Поддержка EOS на стороне продюсера:
```java
kafka.producer.enable.idempotence=true
kafka.producer.transactional.id=tr-id // уникальный id для каждого продюсера. Помогает избежать проблем при "мерцании" продюсера или его рестарте

kafkaTemplate.executeInTransaction(kt -> { 
   kt.send("topic1", "message1"); 
   kt.send("topic2", "message2"); 
});
```

Поддержка EOS на стороне консьюмера:
```java
kafka.consumer.isolation.level=read_committed // может ли консьюмер прочитать сообщения из транзакций, которые ещё не закоммичены. read_committed или read_uncommitted
```

## Гарантии по умолчанию

В продюсере: at-least-once
- enable.idempotence=true
- acks=all

На консьюмере: at-most-once
- enable.auto.commit=true
- consumer.isolation.level=read_uncommited

# Дополнительные материалы

[Документация Kafka](“Documentation” ([“Документация Kafka”](zotero://select/library/items/8GCF69IC)) ([snapshot](zotero://open-pdf/library/items/RTI6FZJC?sel=h1&annotation=KJWCFQW7)))
[Различные варианты настройки Retry](“Повторная передача сообщений в Spring Kafka” ([Harmattan49, 2023](zotero://select/library/items/CT8382FC)) ([snapshot](zotero://open-pdf/library/items/7YJLL2NY?sel=h1%20%3E%20span&annotation=CTPNWG3H)))
[Полный пример Exactly once, демо read_uncommited/read_commited](“Kafka Transactions with Spring Boot” ([“Полный пример Exactly once, демо read_uncommited/read_commited”](zotero://select/library/items/R82NZQD8)) ([snapshot](zotero://open-pdf/library/items/JMNHNW7E?sel=header%20%3E%20h2&annotation=3TIJZ2GU)))
[Как работают транзакции](“Transactions in Apache Kafka” ([“Как работают транзакции”](zotero://select/library/items/GYYY8UNP)) ([snapshot](zotero://open-pdf/library/items/JYUQLFD5?sel=h1&annotation=2XGF8B92)))
[](“Kafka Transactions Explained (Twice!)” ([“Как реализована атомарная транзакция в топиках”](zotero://select/library/items/MHBPBUBL)) ([snapshot](zotero://open-pdf/library/items/7PAWQLTV?sel=h1&annotation=92F9V6CN)))
[Документация по настройке транзакций в Spring Kafka](“Transactions” ([“Документация по настройке транзакций в Spring Kafka”](zotero://select/library/items/NDLRA83P)) ([snapshot](zotero://open-pdf/library/items/CIFPNTNB?sel=%23page-title&annotation=U9DGLZTP)))
