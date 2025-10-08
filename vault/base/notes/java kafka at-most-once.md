---
tags:
  - note/specific/code
  - category/java
aliases:
  - kafka at most once
deck: obsidian::java
created: 2025-09-26T14:46:57+03:00
updated: 2025-10-06T19:21:39+03:00
sr-due: 2025-10-10
sr-interval: 4
sr-ease: 270
---

**kafka at most once**
—
Сообщение помечается обработанным сразу после получения
```java
kafka.consumer.enable-auto-commit = true
auto.commit.interval.ms — определяет интервал времени между автоматическими коммитами offset

@KafkaListener(topics = "topic", groupId = "consumer-group")
public void listen(String message) { 
   processMessage(message); 
}
```
В параметре kafka.listener.ack.mode можно задать, когда отправлять уведомления о коммитах: для каждой записи, для [[java batch батч|батчей]], по истечении какого-то времени и тд
