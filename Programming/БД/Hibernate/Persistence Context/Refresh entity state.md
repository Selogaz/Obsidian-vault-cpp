Вы можете перезагрузить экземпляр сущности и его коллекции в любое время
```
Person person = session.byId(Person.class).load(personId);

session.doWork(connection -> {
	try(Statement statement = connection.createStatement()) {
		statement.executeUpdate("UPDATE Person SET name = UPPER(name)");
	}
});

session.refresh(person);
assertEquals("JOHN DOE", person.getName())
```
Один из случаев, когда это полезно, — это когда известно, что состояние базы данных изменилось с момента чтения данных. Обновление позволяет перенести текущее состояние базы данных в экземпляр объекта и контекст персистентности.  
  
Другой случай, когда это может быть полезно, — это использование триггеров базы данных для инициализации некоторых свойств объекта.
[[Persistence Context]]