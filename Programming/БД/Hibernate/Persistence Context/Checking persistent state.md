Приложение может проверять состояние сущностей и коллекций относительно контекста персистентности.
Verifying managed state with Hibernate API:
```
boolean contained = session.contains(person);
```
[[Persistence Context]]