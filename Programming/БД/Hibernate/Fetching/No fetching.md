```
Employee employee = entityManager.createQuery(
	"select e " +
	"from Employee e " +
	"where " +
	"	e.username = :username and " +
	"	e.password = :password",
	Employee.class)
.setParameter("username", username)
.setParameter("password", password)
.getSingleResult();
```
В этом примере приложение получает данные о сотрудниках. Однако, поскольку все ассоциации сотрудника объявлены как LAZY (Jakarta Persistence определяет значение по умолчанию для коллекций как LAZY), никакие другие данные не извлекаются.
[[Fetching]]