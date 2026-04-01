---
tags:
  - status/wip
  - source/book
  - category/java
aliases: []
status: 🟦
category:
  - "[[java]]"
meta:
problem:
creator:
production:
start: 2025-05-31T20:58:17+03:00
end:
total_hours: 0
created: 2025-05-31T20:58:17+03:00
updated: 2026-03-21T21:15:03+03:00
---

- [[введение в книгу Федора Урванова по спрингу]]

# 🖍 Теория
- [[теория по Spring]]

# 🟥 Микросервисы
- [[java микросервисы]][^1]

# 🟥 Примеры приложения
- [[java запуск virtualpets]][^2]

# 🟩 Первые шаги
- [[java контейнер бинов]]

## Простой сервис на [[Spring Framework]]
- [[java simple web.xml|web.xml]]
- [[java simple context.xml|context.xml]]
- [[java пример rest-контроллера]]

## Простой сервис на [[Spring Boot]]
[[java Spring Intitializr]]
[[java сборка jar]]
[[java плюсы Spring Boot]]

# 🟩 Spring Core
## XML-config для [[Spring Framework]][^3]
[[java virtual-pets-server web.xml]]
[[java разделение бинов по функциональности]]
[[java разделение бинов по контекстам]]
[[java xml-схемы и пространства имен]]
[[java объявление бинов]]
[[java загрузка пропертей и профили]]
[[java сканирование бинов]]
[[java import]]
[[java collection injection]]

## Java-конфигурация для [[Spring Boot]]
[[java @SpringBootApplication]]
[[java @Configuration и @Bean]]
[[java @Profile]]
[[java настройки SpringBoot]]

## Бины Spring
[[java способы описания бинов]]
[[java жизненный цикл бинов]]

# 🟦 Аспектно-ориентированное программирование
## Прокси JDK и CGLIB
[[java прокси JDK и CGLIB]]
[[java подключение aop зависимостей]]
[[java способы описания аспектов]]
java xml-конфигурация AOP
С помощью XML-конфигурации аспекты описываются с использованием пространства имен `    http://www.springframework.org/schema/aop`, которое обычно связывается с префиксом `aop`:
```xml root-context.xml
    <?xml version = "1.0" encoding = "UTF-8"?>
<beans xmlns = "http://www.springframework.org/schema/beans"
    xmlns:aop = "http://www.springframework.org/schema/aop"
    xsi:schemaLocation = "
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/task/spring-task.xsd">
```

сами аспекты определяются внутри тега `aop:config`
```xml
<bean id = "schemaBasedAdvice"
        class = "ru.urvanov.virtualpets.server.example.SchemaBasedAdvice" />

<aop:config>
	<aop:aspect id = "beforeAspectExample" ref = "schemaBasedAdvice">
	...Советы и срезы
	</aop:aspect>
</aop:config>
```
bean `schemaBasedAdvice` содержит методы с логикой советов
внутри тега `aop:aspect` описываются советы и срезы.

пример описания [[java aop pointcut|среза]] `beforeDaoPointcut` для методов в классах [[java слой постоянства|слоя постоянства]]:
```xml
<aop:config>
        <aop:aspect id = "beforeAspectExample" ref = "schemaBasedAdvice">
            <aop:pointcut id = "beforeDaoPointcut"
                expression = "execution(* ru.urvanov.virtualpets.server.dao.*.*(..))" />
            ...
        </aop:aspect>
</aop:config>
```
Объявленный для него совет:
```xml
 <aop:before pointcut-ref = "beforeDaoPointcut"
                method = "beforeDaoAdvice" />
```
атрибут `pointcut-ref` указывает на [[java aop pointcut|срез]]
атрибут `method` - имя метода в классе с [[java aop advice|советами]]

указанный выше `beforeDaoAdvice`:
```java
package ru.urvanov.virtualpets.server.example;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ru.urvanov.virtualpets.server.controller.api.domain.HiddenObjectsGame;

public class SchemaBasedAdvice {
...
    public void beforeDaoAdvice(JoinPoint joinPoint) {
        logger.info("Accessing DAO layer {}.{}, arguments count {}.",
                joinPoint.getTarget().getClass().getName(),
                joinPoint.getSignature().getName(),
                joinPoint.getArgs().length);
	}
	...
}
```
Метод `beforeDaoAdvice` будет выполняться перед выполнением методов бинов из [[java слой постоянства|слоя постоянства]]. В качестве параметра он принимает `joinPoint`, содержащий информацию об аргументах, сигнатуре вызываемого метода, классе и т.д. и выводит эту информацию в лог.

В примере срез выносился в отдельный блок. Но срезы не обязательно описывать отдельно – можно сразу описать выражения среза внутри атрибута `pointcut` в теге `aspect`:
```xml

```

[^1]: ознакомиться с [[java микросервисы#Kubernetes|Kubernetes]] после прочтения всей книги
[^2]: здесь описывается запуск 2 версий бэка и 1 клиента
[^3]: описывается на примере приложения из 3 главы [[#Примеры приложения]]
