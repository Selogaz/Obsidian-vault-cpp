---
tags:
  - note/specific/code
  - category/java
aliases:
  - основные аннотации Spring
deck: obsidian::java
created: 2025-10-02T16:23:28+03:00
updated: 2025-10-08T19:04:11+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 289
---

**основные аннотации Spring**
—
`@Autowired` внедряет бины. Используется над сеттерами, полями, конструктором. Также аннотацию можно поставить на любой метод с параметрами - все аргументы будут подставлены из Spring-контекста.

`@Value` внедряет значения из конфигов и системных переменных в поля, методы или конструкторы класса.

`@Component` - аннотация для создания бина, ставится над классом
`@Service` - синоним `@Component`, используется для обозначения компонента [[java слой бизнес-логики|сервисного]] [[java слои приложения|слоя]]
`@Repository` - `@Component` для работы с БД, оборачивает исключения в Spring [[java DataAccessException|DataAccessException]]

Конфигурация бинов в java-based стиле:
- `@Configuration` - указывает, что класс содержит настройки бинов
- `@Bean` для ручной конфигурации

`@Primary` и `@Qualifier` используются, когда есть несколько бинов определенного типа и нужно явно указать, какой внедрить. В противном случае Spring не понимает, что внедрять и бросает исключение.

- `@Primary`: помечает бин, который будет использован по умолчанию при автосвязывании, если несколько бинов подходят по типу.
- `@Qualifier`("beanName"): явно указать имя бина при внедрении
- `@Fallback`: бин, который используется, если других бинов этого типа не обнаружено

# Профайлы

Помогают создать наборы конфигураций. Обычно бины и параметры переопределяются для использования в разных средах (разработка, тестирование, различные продакшн среды)

- `@Profile`("dev") над бином определяет профайл, в котором этот бин будет создан. Можно ставить над `@Component`, `@Configuration` или `@ConfigurationProperties`
- `@ActiveProfiles`("test") используется в интеграционных тестах, чтобы задать имя профиля, который используется при поднятии тестового контекста

Общие настройки лучше хранить в application.yml (без профиля) и переопределять нужные для данного профиля значения в отдельном файле (application-dev.yml). Профиль включается параметром spring.profiles.active

# Lazy: ленивое создание бинов

Lazy ставится над самим компонентом и при обозначении связи. Связь обозначается либо в конструкторе, либо над Autowired аннотацией при внедрении через поля
```java
@Component
@Lazy
public class LazyBean { ... }

@Component
public class SingletonBean {

    private final LazyBean lazyBean;

    public SingletonBean(@Lazy LazyBean lazyBean) {
        this.lazyBean = lazyBean;
    }
}

```

При использовании RequiredArgsConstructor не добавляется Lazy аннотаций, поэтому ленивая инициализация не сработает.

В Java конфигурации Lazy нужно поставить и над самим бином, и при обозначении связи:
```java
@Bean
@Lazy
public LazyBean lazyBean() {
    return new LazyBean();
}

@Bean
public SingletonBean singletonBean(@Lazy LazyBean lazyBean) {
    return new SingletonBean(lazyBean);
}

```

Ленивое создание бинов считается плохой практикой, потому что:
- Частая причина использования №1 - разрешить [[циклическая зависимость|циклические зависимости]]. Но в этом случае лучше устранить саму циклическую зависимость.
- Частая причина использования №2 - ускорить старт приложения. Но тогда первые запросы будут выполняться дольше. Лучше не направлять запросы на сервис до полного старта.

# Аннотации для Spring WebMVC

- `@Controller` - маркирует класс как [[java MVC|MVC]]-контроллер, обычно возвращает view
- `@ResponeBody` - в теле ответа возвращаются данные, а не [[java временная таблица|view]]
- `@RestController = @Controller + @ResponseBody`

# Полезные аннотации

`@Scheduled` над методом + `@EnableScheduling` запускает методы по расписанию или с задержкой
`@Async` над методом + `@EnableAsync` запускает метод асинхронно в отдельном потоке

# Внедрение списка бинов

Пример: `List<BeanPostProcessor> bpps`

[[java Spring|Spring]] подтянет все подходящие ему бины. Чтобы управлять порядком, для определенных бинов реализуется интерфейс `Ordered` или ставится аннотация `@Order`

# Как добавить бины из другого модуля/библиотеки

- Указать нужные package в `@ComponentScan` или в `@SpringBootApplication`
```java
@SpringBootApplication(scanBasePackages = {     
   "com.project1.config",      "com.project1.config" }
)

```
- Добавить отдельный `@Configuration`-файл через аннотацию `@Import`
```java
@Configuration 
@Import({OtherModuleConfig.class}) 
public class MainConfig { }

```

# Дополнительные материалы
[Документация Spring: конфигурация через аннотации](“Annotation-based Container Configuration” ([“Документация Spring: конфигурация через аннотации”](zotero://select/library/items/FQ4Q54X4)) ([snapshot](zotero://open-pdf/library/items/NCZZG2M4?sel=%23page-title&annotation=UI4J5LCX)))
[Документация Spring по java-based аннотациям](“Java-based Container Configuration” ([“Документация Spring по java-based аннотациям”](zotero://select/library/items/KEWJ79II)) ([snapshot](zotero://open-pdf/library/items/MYYB9AWJ?sel=%23page-title&annotation=A3C9JTIY)))
[[java значение @Component и её производных]]
