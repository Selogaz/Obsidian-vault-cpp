---
tags:
  - note/specific/code
  - category/java
aliases:
  - Profile
deck: obsidian::java
created: 2025-06-15T10:13:37+03:00
updated: 2025-06-18T14:55:18+03:00
sr-due: 2025-06-22
sr-interval: 4
sr-ease: 270
---

**@Profile**
—
Если класс помечен @Component(в т.ч. и @Configuration), то можно указать для каких профилей необходимо создать бин.
```java
package ru.urvanov.virtualpets.server.controller.config;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.TemporalAccessor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

@Profile({"test-dao", "test-mock-mvc"})
public class ClockConfig {
    /**
     * Настраивает экземпляр Clock, возвращающий всегда 
     * одну и ту же дату и одно и то же время для предсказуемости
     * тестов.
     * @return Экземпляр Clock с фиксированной датой и временем.
     */
    @Bean
    public Clock clock() {
        ZoneId zoneId = ZoneId.of("Europe/Moscow");
        TemporalAccessor offsetDateTime = ZonedDateTime.of(
                2024, 3, 15, 18, 52, 0, 0, zoneId);
        Instant instant = Instant.from(offsetDateTime );
        return Clock.fixed(instant, zoneId);
    }
}
```

аналогично @Profile может быть на методе @Bean
```java
@Profile({"test-dao", "test-mock-mvc"})
@Bean
public Clock clock() {
	ZoneId zoneId = ZoneId.of("Europe/Moscow");
	TemporalAccessor offsetDateTime = ZonedDateTime.of(
			2024, 3, 15, 18, 52, 0, 0, zoneId); 
	Instant instant = Instant.from(offsetDateTime );
	return Clock.fixed(instant, zoneId);
}
```

внутри @Profile можно использовать *логические операции*:
- @Profile("!production")
- @Profile("development & feature1")
- @Profile("development | test");

дополнительно считываются настройки из `application-<активный_профиль>.yaml` и `application-<активный профиль>.properties`. В которых, например, можно указать параметры
 локального запуска. *Настройки конкретного профиля переопределяют основные настройки*

для запуска с нужным профилем необходимо его указать в аргументе командной строки: ```--spring.profiles.active```
