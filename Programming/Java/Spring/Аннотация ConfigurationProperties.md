Аннотация ConfigurationProperties позволяет связать значения из файлов application.properties c полями классов в приложении.
```java
@Component
@ConfigurationProperties(prefix = "app")
public class AppConfig {

}
```

![[Pasted image 20250202091040.png]]

[[Файл конфигурации]]