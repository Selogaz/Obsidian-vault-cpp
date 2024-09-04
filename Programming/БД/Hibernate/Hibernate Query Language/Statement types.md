HQL features four different kinds of statement:

- `select` queries,
    
- `update` statements,
    
- `delete` statements, and
    
- `insert …​ values` and `insert …​ select` statements.
Эффект оператора обновления или удаления не отражается ни в контексте персистентности, ни в состоянии объектов сущностей, хранящихся в памяти во время выполнения оператора.  
  
Приложение несет ответственность за поддержание синхронизации состояния, хранящегося в памяти, с базой данных после выполнения оператора обновления или удаления.
[[Hibernate Query Language]]