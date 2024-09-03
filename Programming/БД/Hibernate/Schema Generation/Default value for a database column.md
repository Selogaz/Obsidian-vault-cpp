С помощью Hibernate вы можете указать значение по умолчанию для столбца базы данных, используя аннотацию @ColumnDefault.
```
@ColumnDefault("'N/A'")
    private String name;
```

[[Schema Generation]]