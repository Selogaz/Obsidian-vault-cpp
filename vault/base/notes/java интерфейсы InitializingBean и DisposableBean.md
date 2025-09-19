---
tags:
  - note/specific/code
  - category/java
aliases:
  - интерфейсы InitializingBean и DisposableBean
deck: obsidian::java
created: 2025-06-15T11:28:16+03:00
updated: 2025-06-16T22:14:19+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**интерфейсы InitializingBean и DisposableBean**
—
```java
public class InitDestroyExample
        implements InitializingBean,
                   DisposableBean {
	@Override
    public void destroy() throws Exception {
        logger.info("(5) destroy from DisposableBean interface");
    }

	@Override
    public void afterPropertiesSet() throws Exception {
        logger.error(
                """
                (2) afterPropertiesSet from \
                InitializingBean interface""");
    }
```
