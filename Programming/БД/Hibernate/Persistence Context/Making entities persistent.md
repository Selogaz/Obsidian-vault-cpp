После того как вы создали новый экземпляр сущности (using the standard `new` operator), он находится в `new`состоянии. Вы можете сделать его постоянным, связав его либо с org.hibernate.Session, либо с jakarta.persistence.EntityManager.
```
person.setName("John Doe");

session.persist(person);
```

Постоянство нужно, чтобы данные могли выдерживать сбой сервера, аварийное отключение или сбой сети.
[[Persistence Context]]