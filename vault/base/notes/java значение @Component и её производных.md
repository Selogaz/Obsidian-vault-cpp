---
tags:
  - note/specific/code
  - category/java
aliases:
  - значение @Component и её производных
deck: obsidian::java
created: 2025-06-13T12:17:24+03:00
updated: 2025-06-16T22:10:54+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**значение @Component и её производных**
—
- `@Component` – обычный бин Spring
- `@Repository` – ставится на [[java слой постоянства|слое постоянства]]
	- превращает исключения API доступа к данным в [[java DataAccessException|DataAccessException]]
	- эту аннотацию используют утилиты для определения классов из [[java слой постоянства|слоя постоянства]]
- `@Service` - бины из [[java слой бизнес-логики|слоя бизнес-логики]]
- `@Controller` – ставится на контроллерах Spring MVC, которые с помощью аннотации `@RequestMapping` определяют обрабатываемые их методами URL
