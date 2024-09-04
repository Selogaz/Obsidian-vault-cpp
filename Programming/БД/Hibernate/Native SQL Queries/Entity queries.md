Вышеупомянутые запросы касались возврата скалярных значений, то есть, в основном, возврата необработанных значений из ResultSet.
Предполагая, что Person отображается как класс со столбцами id, name, nickName, адресом, CreateOn и версией, следующий запрос также вернет список, в котором каждый элемент является сущностью Person.
```
List<Person> persons = session.createNativeQuery(
	"SELECT id, name, nick_name, address, created_on, version " +
	"FROM Person", Person.class)
.list();
```
[[Native SQL Queries]]