---
tags:
  - note/specific/code
  - category/java
aliases:
  - загрузка пропертей и профили
deck: obsidian::java
created: 2025-06-13T11:56:44+03:00
updated: 2025-06-16T22:20:36+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**загрузка пропертей и профили**
—
```xml
<?xml version = "1.0" encoding = "UTF-8"?>
<beans xmlns = "http://www.springframework.org/schema/beans"
    xmlns:context = "http://www.springframework.org/schema/context"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd">

    <beans profile = "test">
        <context:property-placeholder
            location = "classpath:application_test.properties"
            file-encoding = "utf-8"
            ignore-unresolvable = "true" />
        <context:property-placeholder
            location = "classpath:mail_test.properties"
            file-encoding = "utf-8"
            ignore-unresolvable = "true" />
    </beans>
    
    <beans profile = "development">
        <context:property-placeholder
            location = "classpath:application_dev.properties"
            file-encoding = "utf-8"
            ignore-unresolvable = "true" />
        <context:property-placeholder
            location = "classpath:mail_dev.properties"
            file-encoding = "utf-8"
            ignore-unresolvable = "true" />
    </beans>

    <beans profile = "production">
        <context:property-placeholder
            location = "classpath:application_prod.properties"
            file-encoding = "utf-8"
            ignore-unresolvable = "true" />
        <context:property-placeholder
            location = "classpath:mail_prod.properties"
            file-encoding = "utf-8"
            ignore-unresolvable = "true" />
    </beans>

</beans>
```

`beans profile =` разделяет конфигурацию на профили, например:
- вся конфигурация внутри тега `<beans profile = "development">` будет применена только при *активном профиле* `development`
	- данные загружаются из файлов `application.dev.properties` и `mail_dev.properties`
- остальное аналогично

активный профиль задается в контекстном параметре `spring.profiles.active` файла web.xml:
```xml web.xml
<context-param>
	<param-name>spring.profiles.active</param-name>
	<param-value>development</param-value>
</context-param>
```
этот файл можно переопределить в файле context.xml экземпляра Apache Tomcat. Это будет в 8 главе

файл mail_dev.properties
```properties
virtualpets-server-springframework.mail.server=localhost
virtualpets-server-springframework.mail.port=8888
virtualpets-server-springframework.mail.username=dddd
virtualpets-server-springframework.mail.password=ddddd
```

через [[java внедрение зависимостей через поля класса|внедрение зависимостей через поля класса]] описываются также [[java внедрение зависимости от другого бина|ссылки на другие бины]]:
```xml security.xml
<bean id = "authenticationProvider"
        class = "org.springframework.security.authentication.dao.DaoAuthenticationProvider">
        <property name = "userDetailsService" ref = "userDetailsService" />
        <property name = "passwordEncoder" ref = "passwordEncoder" />
    </bean>
```
здесь в поле `userDetailsService` бина `authenticationProvider` внедряется ссылка на бин `userDetailsService`
