---
tags:
  - note/specific/code
  - category/java
aliases:
  - сканирование бинов
deck: obsidian::java
created: 2025-06-13T12:32:51+03:00
updated: 2025-10-02T16:58:02+03:00
sr-due: 2026-11-14
sr-interval: 408
sr-ease: 290
---

**сканирование бинов**
—
```xml root-context.xml
<context:component-scan
	base-package = "ru.uravnov.virtualpets.server.dao,
					ru.urvanov.virtualpets.server.service
	" />
```

XML-элемент `context:component-scan` ищет бины в пакетах, указанных в `base-package`. Поиск осуществляется по аннотации [[java значение @Component и её производных|@Component]](а также по её специализациям `@Repository,@Service,@Controller,@RestController`). В приведенном примере спринг будет искать бины, т.е. *классы, помеченные соответствующими аннотациями*, находящиеся в указанных пакетах(dao и service)

[[java @Autowired]]

[[java внедрение значений из property-файлов]]
