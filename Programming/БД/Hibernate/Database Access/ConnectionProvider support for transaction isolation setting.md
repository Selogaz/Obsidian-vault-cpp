Все предоставленные реализации ConnectionProvider, кроме DataSourceConnectionProvider, поддерживают согласованную настройку изоляции транзакций для всех соединений, полученных из базового пула. Значение hibernate.connection.isolation можно указать в одном из трех форматов:  
  
целочисленное значение, принятое на уровне JDBC.  
  
имя константного поля java.sql.Connection, представляющего изоляцию, которую вы хотели бы использовать. Например, TRANSACTION_REPEATABLE_READ для java.sql.Connection#TRANSACTION_REPEATABLE_READ. Обратите внимание, что это поддерживается только для стандартных уровней изоляции JDBC, а не для уровней изоляции, специфичных для конкретного драйвера JDBC.  
  
версия с коротким именем константного поля java.sql.Connection без префикса TRANSACTION_. Например, REPEATABLE_READ для java.sql.Connection#TRANSACTION_REPEATABLE_READ. Опять же, это поддерживается только для стандартных уровней изоляции JDBC, а не для уровней изоляции, специфичных для конкретного драйвера JDBC.

[[Database Access]]