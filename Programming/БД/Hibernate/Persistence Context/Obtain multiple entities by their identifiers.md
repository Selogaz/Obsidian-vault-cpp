Хотя стандарт Jakarta Persistence не поддерживает одновременное получение нескольких объектов, кроме выполнения запроса JPQL или Criteria API, Hibernate предлагает эту функциональность через метод byMultipleIds сеанса Hibernate.  
  
Метод byMultipleIds возвращает MultiIdentifierLoadAccess, который можно использовать для настройки запроса на множественную загрузку.  
  
Интерфейс MultiIdentifierLoadAccess предоставляет несколько методов, которые можно использовать для изменения поведения вызова мультизагрузки:

[[Persistence Context]]