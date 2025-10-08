---
tags:
  - note/specific/code
  - category/java
aliases:
  - kafka at least once
deck: obsidian::java
created: 2025-09-26T14:48:44+03:00
updated: 2025-10-08T18:30:43+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**kafka at least once**
—
Подтверждение смещения вручную после успешной обработки.
```java
kafka.consumer.enable.auto.commit=false 
kafka.listener.ack.mode=manual 

@KafkaListener(topics = "topic", groupId = "consumer-group") 
public void listen(String message, Acknowledgment acknowledgment) { 
   processMessage(message);   
   acknowledgment.acknowledge(); 
}
```
Гарантии на продюсере и консьюмере могут не совпадать. Иногда это ок, иногда может привести к:
- дублированию, если продюсер at least once, а консьюмер [[java kafka at-most-once|at-most-once]]
- потерям, если продюсер [[java kafka at-most-once]], а консьюмер at-least-once
