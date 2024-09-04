```
Person person = entityManager.find(Person.class, id);
Session session = entityManager.unwrap(Session.class);
LockOptions lockOptions = new LockOptions(LockMode.PESSIMISTIC_READ, LockOptions.NO_WAIT);
session.lock(person, lockOptions);
```

```
SELECT p1_0.id,
       p1_0."name"
FROM   Person p1_0
WHERE  p1_0.id = 1

SELECT id
FROM   Person
WHERE  id = 1
FOR    UPDATE
```

[[Locking]]