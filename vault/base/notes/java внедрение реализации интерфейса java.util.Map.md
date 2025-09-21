---
tags:
  - note/specific/code
  - category/java
aliases:
  - внедрение реализации интерфейса java.utl.Map
deck: obsidian::java
created: 2025-06-15T09:27:29+03:00
updated: 2025-09-21T12:06:51+03:00
sr-due: 2026-09-15
sr-interval: 359
sr-ease: 290
---

**внедрение реализации интерфейса java.utl.Map**
—
аналогично [[java пример внедрения коллекции List|примеру с листом]] можно внедрять реализации интерфейса `java.util.Map`:
```java
package ru.urvanov.virtualpets.server.example;

import java.math.BigDecimal;
import java.util.Map;

public class InjectExample {

    private Map<String, BigDecimal> numberSumMap;

    public Map<String, BigDecimal> getNumberSumMap() {
        return numberSumMap;
    }

    public void setNumberSumMap(Map<String, BigDecimal> numberSumMap) {
        this.numberSumMap = numberSumMap;
    }

}
```

```xml root-example.xml
<bean class = "ru.urvanov.virtualpets.server.example.InjectExample">
        <property name = "numberSumMap">
            <map>
                <entry key = "D-001" value = "100.00" />
                <entry key = "D-002" value = "55.01" />
                <entry key = "D-003" value = "34.23" />
                <entry>
                    <key>
                        <ref bean = "version"/>
                    </key>
                    <value>1000.00</value>
                </entry>
                <entry key = "D-005">
                    <bean class = "java.math.BigDecimal">
                        <constructor-arg value = "100000.00" />
                    </bean>
                </entry>
            </map>
        </property>
    </bean>
```
полю `numberSumMap` внедряются значения.
