---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример внедрения коллекции List
deck: obsidian::java
created: 2025-06-15T09:05:50+03:00
updated: 2025-06-16T21:50:03+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**пример внедрения коллекции List**
—
```java InjectExample.java
package.ru.urvanov.virtualpets.server.example;
...
public class InjectExample {
...
	private List<String> names;
...
	public List<String> getNames() {
		return names;
	}

	public void setNames(List<String> names) {
		this.names = names;
	}
...
}
```
в поле `names` внедряется реализация интерфейса `java.utl.List` , описанная в XML-конфигурации с помощью элемента `list`:

```xml root-context.xml
<bean class = "ru.urvanov.virtualpets.server.example.InjectExample">
        <property name = "names">
            <list>
                <value>Вася</value>
                <value>Шурик</value>
                <value>Оксана</value>
                <value>Семён</value>
                <ref bean = "version" />
                <bean class = "java.lang.String">
                    <constructor-arg value = "Святослав-Бинов" />
                </bean>
            </list>
        </property>
...
</bean>
```

Поле `names` будет содержать элементы "Вася, Шурик, Оксана, Семён "(будет ли там Святослав-Бинов?)
