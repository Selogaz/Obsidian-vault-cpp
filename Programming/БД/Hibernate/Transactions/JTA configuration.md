Взаимодействие с системой JTA объединено в один контракт с именем org.hibernate.engine.transaction.jta.platform.spi.JtaPlatform, который предоставляет доступ к javax.transaction.TransactionManager и javax.transaction.UserTransaction для этой системы, а также предоставляет возможность регистрировать экземпляры javax.transaction.Synchronization, проверять статус транзакции и т. д.  
  
  
Как правило, JtaPlatform потребуется доступ к JNDI для разрешения JTA TransactionManager, UserTransaction и т. д. Подробную информацию о настройке доступа к JNDI см. в главе JNDI

[[Transactions]]