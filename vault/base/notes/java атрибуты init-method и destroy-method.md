---
tags:
  - note/specific/code
  - category/java
aliases:
  - атрибуты init-method и destroy-method
deck: obsidian::java
created: 2025-06-15T11:21:47+03:00
updated: 2025-06-16T22:15:01+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**атрибуты init-method и destroy-method**
—
```xml root-context.xml

<bean class = "ru.urvanov.virtualpets.server.example.InitDestroyExample"
            init-method = "initMethodFromXmlConfiguration"
            destroy-method = "destroyMethodFromXmlConfiguration" />
```
init-method - при инициализации бина
destroy-method - при уничтожении
```java
public class InitDestroyExample {
 public void initMethodFromXmlConfiguration() {
        logger.info("(3) init-method from XML-configuration");
    }
    
    public void destroyMethodFromXmlConfiguration() {
        logger.info("(6) destroy-method from XML-configuration");
    }
}
```
