Hibernate ORM предоставляет расширения API критериев JPA, позволяющие использовать функции HQL через API критериев.  
  
Интерфейс Session предоставляет доступ к org.hibernate.query.criteria.HibernateCriteriaBuilder, подтипу jakarta.persistence.criteria.CriteriaBuilder, через метод Session#getCriteriaBuilder(), который является точкой входа в расширения.  
  
Интерфейс HibernateCriteriaBuilder предлагает дополнительные методы, а также предоставляет ковариантные переопределенные методы, которые возвращают подтипы типов, возвращаемых соответствующими методами jakarta.persistence.criteria.CriteriaBuilder. Подтипы последовательно именуются с использованием префикса Jpa, т. е. выражение становится JpaExpression.  
  
Эти подтипы предоставляют дополнительные методы и переопределения ковариантов, упрощающие работу с расширениями.

[[Criteria]]