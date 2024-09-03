Hibernate предлагает аннотацию @Check, чтобы вы могли указать произвольное ограничение SQL CHECK, которое можно определить следующим образом

```
@Check(name = "ValidIsbn", constraints = "CASE WHEN isbn IS NOT NULL THEN LENGTH(isbn) = 13 ELSE true END")
```
Tеперь, если вы попытаетесь добавить сущность Book с атрибутом isbn, длина которого не превышает 13 символов, будет выдано исключение

[[Schema Generation]]