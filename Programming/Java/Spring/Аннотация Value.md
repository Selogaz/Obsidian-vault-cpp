Аннотация @Value позволяет внедрять значения из application.properties (yml) непосредственно в код. Можно использовать над полями, методами или даже параметрами методов.
```java
@Value("${comment.length.max}")
private Integer lengthMax;
```

[[Файл конфигурации]]