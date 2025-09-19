---
tags:
  - note/specific/code
  - category/java
aliases:
  - объявление бинов
deck: obsidian::java
created: 2025-06-13T11:29:02+03:00
updated: 2025-06-16T22:19:08+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 274
---

**объявление бинов**
—
```xml root-context.xml
<bean id = "version" class = "java.lang.String">
	<constructor-arg value = "0.21" />
</bean>
```

`construction-arg` – описывает [[внедрение зависимостей через конструктор]]

[[java внедрение зависимости от другого бина]]

```xml root-context.xml
<bean id = "templateMessage"
            class = "org.springframework.mail.SimpleMailMessage">
        <property name = "from"
        value = "${virtualpets-server-springframework.mail.from}" />
        <property name = "subject" value = "Recover password" />
    </bean>
```
`property` описывает [[java внедрение зависимостей через поля класса|внедрение зависимостей через поля класса]]
в поле `subject` будет внедрено значение `Recovery password`
в поле `from` - значение, считанное из файла "пропертей" properties.xml
