
На самом деле существует несколько различных способов выбора нескольких значений с помощью критериев критериев. Здесь мы рассмотрим два варианта, но альтернативный рекомендуемый подход — использовать кортежи, как описано в разделе Запросы с критериями кортежа, или рассмотреть запрос-оболочку

Example 569. Selecting an array

```
CriteriaBuilder builder = entityManager.getCriteriaBuilder();

CriteriaQuery<Object[]> criteria = builder.createQuery(Object[].class);
Root<Person> root = criteria.from(Person.class);

Path<Long> idPath = root.get(Person_.id);
Path<String> nickNamePath = root.get(Person_.nickName);

criteria.select(builder.array(idPath, nickNamePath));
criteria.where(builder.equal(root.get(Person_.name), "John Doe"));

List<Object[]> idAndNickNames = entityManager.createQuery(criteria).getResultList();
```
[[Criteria]]