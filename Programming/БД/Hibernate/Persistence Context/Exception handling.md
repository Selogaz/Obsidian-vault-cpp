Если EntityManager Jakarta Persistence или сеанс, специфичный для Hibernate, выдает исключение, включая любое исключение JDBC SQLException, вам необходимо немедленно откатить транзакцию базы данных и закрыть текущий EntityManager или сеанс.

[[Persistence Context]] [[Exception]]