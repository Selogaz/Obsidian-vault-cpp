Существует три основных подхода к изоляции информации в этих многопользовательских системах, которые идут рука об руку с различными определениями схемы базы данных и настройками JDBC.
#### 1. Separate database
![[Pasted image 20240904231148.png]]
Данные каждого арендатора хранятся в физически отдельном экземпляре базы данных.
#### .2. Separate schema
![[Pasted image 20240904231249.png]]
Данные каждого арендатора хранятся в отдельной схеме базы данных в одном экземпляре базы данных.
#### 3. Partitioned (discriminator) data
![[Pasted image 20240904231305.png]]
Все данные хранятся в единой схеме базы данных.
[[Multitenancy]]