---
tags:
  - note/specific/code
  - category/java
aliases:
  - жизненный цикл бинов
deck: obsidian::java
created: 2025-06-15T11:28:28+03:00
updated: 2025-10-02T15:58:53+03:00
sr-due: 2026-09-20
sr-interval: 364
sr-ease: 290
---

**жизненный цикл бинов**
—
# Fill the gaps

Spring [[java bean|bean]] - объект, жизненным циклом которого управляет Spring [[IoC]] контейнер(бинов?). По умолчанию бины создаются во время инициализации контекста (на старте приложения). Некоторые бины могут быть созданы лениво - при первом обращении к ним в процессе работы.

Жизненный цикл бина:
- Чтение конфигурации из `@Configuration`, XML или аннотаций на классах
- Создание BeanDefinition - метаданных, описывающих как создать, конфигурировать и управлять бином
- Создание бина: вызывается конструктор или [[фабричный метод]]
- Вызов сеттеров для полей с `@Autowired`
- Постобработка через набор BeanPostProcessor
- Если у бина скоуп singleton - сохраняем в [[IoC]] контейнере. При следующем запросе возьмем уже готовый
- Возвращаем бин
- Удаление при закрытии контекста: для всех бинов в контексте вызывается метод с аннотацией `@PreDestroy` или метод интерфейса DisposableBean

# BeanPostProcessor (BPP)

В каждом BPP 2 метода - postProcessBeforeInitialization и postProcessAfterInitialization. Каждый бин проходит через примерно такую логику:
```java
for (BeanPostProcessor bpp : processors) {
   // bpp.*Before*
}
// вызов init-методов
for (BeanPostProcessor bpp : processors) {
   // bpp.*After*
}

```

Сначала вызываются "Before" методы у всех постпроцессоров, потом все "After"

Важные моменты:
- Обработка Autowired и Value для полей происходит в постпроцессорах. Поэтому для этих полей нельзя ставить final. Значения проставляются уже созданному объекту.
- В методе "After" обычно создаются прокси классы
- BPP для [[java PostConstruct и @PreDestroy|PostConstruct]] - самый последний в списке BPP. PostConstruct обрабатывается ДО того, как начнут создаваться прокси-классы.
- [[java Transactional|Transactional]], Async, Lazy - все это работает через прокси-классы.

## Как спринг создает прокси классы

[[java прокси JDK и CGLIB]] - заметка из [[Spring и Spring Boot. Разработка облачных приложений на Java Федор Урванов|книги]] Урванова
- JDK Dynamic Proxy - для классов, у которых есть интерфейс. Считается чуть более быстрым.
- CGLIB - создает подкласс для классов без интерфейса

# Как вмешаться в [[java жизненный цикл бинов|жизненный цикл бинов]]

- Аннотации [[java PostConstruct и @PreDestroy|PostConstruct и @PreDestroy]]
- Методы в аннотации `@Bean`
```java
@Configuration
public class AppConfig {
   @Bean(initMethod = "init", destroyMethod = "cleanup")
   public MyBean myBean() {
     return new MyBean();
   }
}

```
- Релизовать [[java интерфейсы InitializingBean и DisposableBean|интерфейс InitializingBean и DisposableBean]]
- Реализовать интерфейс SmartLifecycle

# Как выполнить действие после старта контекста

- Поймать события ContextRefreshedEvent и ContextClosedEvent через EventListener
- Выполнить код в методе main
```java
public static void main(String[] args) {
   ApplicationContext ctx = SpringApplication.run(SpringBootTestTrainingApplication.class, args);
   UserService userService = ctx.getBean(UserService.class);
   userService.preLoad();
}

```

# Scope бина
определяет, когда и как создается экземпляр бина, как долго он хранится и сколько таких экземпляров существует.

Стандартные Scope:
- Singleton (скоуп по умолчанию): для каждого бина создается только один экземпляр на весь контекст приложения и переиспользуется везде, где он требуется. Жизненный цикл бина начинается при загрузке контекста и заканчивается при его завершении.
- Prototype: каждый раз, когда запрашивается бин, создается новый экземпляр. Не хранятся в контексте, для них не работают аннотации PreDestroy

Scope для веб-приложений:
- Request: бин живет в рамках HTTP запроса
- Session: бин живет в рамках [[java HTTP-сессия|HTTP-сессии]]
- Application: бин существует в рамках ServletContext
- Websocket: бин для одной WebSocket сессии

# Prototype бины внутри Singleton
```java
@Component
@Scope(value = "prototype")
public class PrototypeBean { ... }

@Component
@RequiredArgsConstructor
public class SingletonBean {

   private final PrototypeBean prototypeBean;

   public String geValue() {
       return prototypeBean.doSmth();
   }
}

```
PrototypeBean будет создан 1 при инициализации SingletonBean. Дальнейшие обращения к prototypeBean будут к одному и тому же объекту

Если нужно, чтобы при обращении к Prototype всегда был разный объект, используется аннотация Lookup над методом-геттером:
```java
@Component
public class SingletonBean {
   @Lookup
   public PrototypeBean getPrototypeBean() {
      return null; 
   }

   public void usePrototype() {
     PrototypeBean prototype = getPrototypeBean();
   }
}

```
Spring подменит null на обращение к контексту, и метод getPrototypeBean будет всегда возвращать новый объект

# Дополнительные материалы
[Описание работы контекста с бинами](“Spring-потрошитель: жизненный цикл Spring Framework” ([lord_detson, 2023](zotero://select/library/items/XTGLPB7C)) ([snapshot](zotero://open-pdf/library/items/YUGL5CXS?sel=h1%20%3E%20span&annotation=8U27AAJ7)))
[Spring-потрошитель](https://www.youtube.com/watch?v=BmBr5diz8WA)
[Варианты внедрения prototype бинов](“Spring prototype при помощи Lookup” ([bae_prosto, 2023](zotero://select/library/items/T2VZDT9X)) ([snapshot](zotero://open-pdf/library/items/T8VJBG7L?sel=h1%20%3E%20span&annotation=HVPGT9WV)))
# Урванов

создаются и уничтожаются контейнером

три способа обращения к жизненному циклу:
1. через `@PostConstruct` и `@PreDestroy` из `jakarta.annotation`
2. через интерфейсы `InitializingBean` и `DisposableBean`
3. через атрибуты `init-method` и `destroy-method` из XML-конфигурации бина
порядок вызова при создании бина указан выше

[[java PostConstruct и @PreDestroy]]
[[java атрибуты init-method и destroy-method]]
[[java интерфейсы InitializingBean и DisposableBean]]
