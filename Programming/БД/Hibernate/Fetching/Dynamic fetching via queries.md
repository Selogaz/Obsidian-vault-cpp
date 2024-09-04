Example 474. Dynamic JPQL fetching example

```
Employee employee = entityManager.createQuery(
	"select e " +
	"from Employee e " +
	"left join fetch e.projects " +
	"where " +
	"	e.username = :username and " +
	"	e.password = :password",
	Employee.class)
.setParameter("username", username)
.setParameter("password", password)
.getSingleResult();
```

Example 475. Dynamic query fetching example

```
CriteriaBuilder builder = entityManager.getCriteriaBuilder();
CriteriaQuery<Employee> query = builder.createQuery(Employee.class);
Root<Employee> root = query.from(Employee.class);
root.fetch("projects", JoinType.LEFT);
query.select(root).where(
	builder.and(
		builder.equal(root.get("username"), username),
		builder.equal(root.get("password"), password)
	)
);
Employee employee = entityManager.createQuery(query).getSingleResult();
```
В этом примере у нас есть сотрудники и их проекты, загруженные в один запрос, показанный как запрос HQL, так и запрос критериев устойчивости Jakarta. В обоих случаях для получения всей этой информации требуется ровно один запрос к базе данных.
[[Fetching]]