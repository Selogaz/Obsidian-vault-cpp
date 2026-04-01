---
tags:
  - note/specific/code
  - category/java
aliases:
  - внедрение зависимости от другого бина
deck: obsidian::java
created: 2025-06-13T11:28:25+03:00
updated: 2025-10-02T18:03:32+03:00
sr-due: null
sr-interval: null
sr-ease: null
---

**внедрение зависимости от другого бина**
—
```xml sucurity.xml
<bean id = "securityContextRepository"
            class = "org.springframework.security.web.context.DelegatingSecurityContextRepository">
        <constructor-arg ref = "securityContextRepositoryList" />
    </bean>
```
бину `securityContextRepository` передается бин `securityContextRepositoryList`
