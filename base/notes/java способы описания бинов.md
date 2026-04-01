---
tags:
  - note/specific/code
  - category/java
aliases:
  - способы описания бинов
deck: obsidian::java
created: 2025-06-15T10:39:32+03:00
updated: 2026-02-12T11:53:38+03:00
sr-due: 2026-09-29
sr-interval: 373
sr-ease: 294
---

**способы описания бинов**
—
- с помощью xml-конфигурации
```xml
<bean id = "authenticationProvider"
        class = "org.springframework.security.authentication.dao.DaoAuthenticationProvider">
        <property name = "userDetailsService" ref = "userDetailsService" />
        <property name = "passwordEncoder" ref = "passwordEncoder" />
    </bean>
```
- с помощью Java-конфигурации
```java SecurityConfig.java
@Bean
    public DaoAuthenticationProvider authenticationProvider(
            UserDetailsService userService,
            PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider daoAuthenticationProvider
                = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(userService);
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        return daoAuthenticationProvider;
    }
```
- с помощью аннотаций и механизма [[java сканирование бинов|сканирования бинов]]
```java
@Service
public class RoomServiceImpl implements RoomApiService {

    private static final Logger logger = LoggerFactory
            .getLogger(RoomServiceImpl.class);

    @Autowired
    private RoomDao roomDao;

    @Autowired
    private PetDao petDao;
}
```

*В современном [[base/notes/Spring Boot]] используются аннотации и сканирование бинов*
