По умолчанию результаты запроса возвращаются в произвольном порядке.
Наведение порядка в множестве называется сортировкой.
Предложение order by определяет список прогнозируемых элементов, используемых для сортировки результатов. Каждый отсортированный элемент может быть:
- an attribute of an entity or embeddable class,
    
- a more complex [expression](https://docs.jboss.org/hibernate/stable/orm/userguide/html_single/Hibernate_User_Guide.html#hql-expressions),
    
- the alias of a projected item declared in the select list, or
    
- a literal integer indicating the ordinal position of a projected item in the select list.
[[Hibernate Query Language]]