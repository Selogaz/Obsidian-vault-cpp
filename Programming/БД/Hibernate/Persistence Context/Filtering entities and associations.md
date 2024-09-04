Hibernate предлагает два варианта, если вы хотите фильтровать сущности или ассоциации сущностей:
```java
static (e.g. `@SQLRestriction` and `@SQLJoinTableRestriction`)```
которые определяются во время сопоставления и не могут изменяться во время выполнения.
```java
dynamic (e.g. `@Filter` and `@FilterJoinTable`)
```
которые применяются и настраиваются во время выполнения

[[Persistence Context]]