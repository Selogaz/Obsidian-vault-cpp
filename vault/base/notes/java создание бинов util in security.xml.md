---
tags:
  - note/specific/code
  - category/java
aliases:
  - создание бинов util in security.xml
deck: obsidian::java
created: 2025-06-15T09:27:10+03:00
updated: 2025-06-16T22:16:00+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**создание бинов util in security.xml**
—
```xml
<beans
	xmlns = "http://www.springframework.org/schema/beans"
	xmlns:util = "http://www.springframework.org/schema/util"
	xsi:schemaLocation = "    
    http://www.springframework.org/schema/util
    http://www.springframework.org/schema/util/spring-util.xsd 
    ">

<util:list id = "securityContextRepositoryList">
        <bean class = "org.springframework.security.web.context.RequestAttributeSecurityContextRepository" />
        <bean class = "org.springframework.security.web.context.HttpSessionSecurityContextRepository" />
    </util:list>
```

аналогично можно создавать бины, реализующие `java.util.Set` и `java.util.Map`
