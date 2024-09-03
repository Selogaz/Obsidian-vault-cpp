Чтобы настроить процесс генерации схемы, необходимо использовать свойство конфигурации hibernate.hbm2ddl.import_files для предоставления других файлов сценариев, которые Hibernate может использовать при запуске SessionFactory


For instance, considering the following `schema-generation.sql` import file:

Example 351. Schema generation import file

```
create sequence book_sequence start with 1 increment by 1
```

If we configure Hibernate to import the script above:

Example 352. Enabling schema generation import file

```
<property
    name="hibernate.hbm2ddl.import_files"
    value="schema-generation.sql" />
```

Hibernate is going to execute the script file after the schema is automatically generated.

[[Schema Generation]]