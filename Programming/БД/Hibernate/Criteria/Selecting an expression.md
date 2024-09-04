Самая простая форма выбора выражения — это выбор определенного атрибута сущности. Но это выражение может также представлять собой агрегацию, математическую операцию и т. д
```
CriteriaBuilder builder = entityManager.getCriteriaBuilder();

CriteriaQuery<String> criteria = builder.createQuery(String.class);
Root<Person> root = criteria.from(Person.class);
criteria.select(root.get(Person_.nickName));
criteria.where(builder.equal(root.get(Person_.name), "John Doe"));

List<String> nickNames = entityManager.createQuery(criteria).getResultList();
```
[[Criteria]]