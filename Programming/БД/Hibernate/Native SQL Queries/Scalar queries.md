Самый простой SQL-запрос — получить список значений скаляров (столбцов
```
List<Object[]> persons = session.createNativeQuery(
	"SELECT * FROM Person", Object[].class)
.list();
```
Они вернут список массивов объектов ( Object[] ) со скалярными значениями для каждого столбца в таблице PERSON. Hibernate будет использовать java.sql.ResultSetMetadata для определения фактического порядка и типов возвращаемых скалярных значений.
[[Native SQL Queries]]