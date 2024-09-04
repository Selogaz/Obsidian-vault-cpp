Hibernate предлагает аннотацию @BatchSize, которую можно использовать при получении неинициализированных прокси-серверов объектов.
```
@Entity(name = "Department")
public static class Department {

	@Id
	private Long id;

	@OneToMany(mappedBy = "department")
	//@BatchSize(size = 5)
	private List<Employee> employees = new ArrayList<>();

	//Getters and setters omitted for brevity

}

@Entity(name = "Employee")
public static class Employee {

	@Id
	private Long id;

	@NaturalId
	private String name;

	@ManyToOne(fetch = FetchType.LAZY)
	private Department department;

	//Getters and setters omitted for brevity
}
```
Учитывая, что ранее мы получили несколько сущностей «Отдел», а теперь нам нужно инициализировать коллекцию сущностей «Сотрудники» для каждого конкретного отдела, аннотации @BatchSize позволяют нам загружать несколько сущностей «Сотрудники» за один проход в базу данных.

Без @BatchSize вы столкнулись бы с проблемой запроса N + 1, поэтому вместо двух операторов SQL для извлечения дочерних объектов «Сотрудник» потребуется 10 запросов.  
  
Однако, хотя @BatchSize лучше, чем сталкиваться с проблемой запроса N + 1, в большинстве случаев проекция DTO или JOIN FETCH является гораздо лучшей альтернативой, поскольку позволяет получить все необходимые данные с помощью одного запроса.
[[Fetching]]