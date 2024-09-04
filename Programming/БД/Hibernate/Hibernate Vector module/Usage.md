Аннотируйте постоянный атрибут с помощью @JdbcTypeCode(SqlTypes.VECTOR) и укажите длину вектора с помощью @Array(length = …​).

```
@Column( name = "the_vector" )
@JdbcTypeCode(SqlTypes.VECTOR)
@Array(length = 3)
private float[] theVector;
```
Чтобы привести строковое представление вектора к типу данных вектор, просто используйте приведение HQL, т.е. cast('[1,2,3]' как вектор).
[[Hibernate Vector module]]