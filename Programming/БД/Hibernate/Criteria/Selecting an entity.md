Вероятно, это самая распространенная форма запроса. Приложение хочет выбрать экземпляры сущностей.
```
CriteriaBuilder builder = entityManager.getCriteriaBuilder();

CriteriaQuery<Person> criteria = builder.createQuery(Person.class);
Root<Person> root = criteria.from(Person.class);
criteria.select(root);
criteria.where(builder.equal(root.get(Person_.name), "John Doe"));

List<Person> persons = entityManager.createQuery(criteria).getResultList();
```
В примере используется метод createQuery(), передающий ссылку на класс Person, поскольку результатами запроса будут объекты Person.
[[Criteria]]