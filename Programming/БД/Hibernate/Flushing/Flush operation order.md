С точки зрения базы данных состояние строки можно изменить с помощью оператора INSERT, UPDATE или DELETE. Поскольку изменения состояния объекта автоматически преобразуются в инструкции SQL, важно знать, какие действия объекта связаны с данным оператором SQL.

INSERT  
  
Инструкция INSERT создается либо EntityInsertAction, либо EntityIdentityInsertAction. Эти действия планируются операцией persist либо явно, либо посредством каскадирования PersistEvent от родительского объекта к дочернему.  

DELETE  
  
Инструкция DELETE создается с помощью EntityDeleteAction или OrphanRemovalAction.  

UPDATE 
  
Инструкция UPDATE генерируется EntityUpdateAction во время очистки, если управляемый объект помечен как измененный. Механизм «грязной» проверки отвечает за определение того, был ли изменен управляемый объект с момента его первой загрузки.

Даже если мы удалили первый объект, а затем сохранили новый, Hibernate выполнит оператор DELETE после INSERT.
Порядок выполнения операторов SQL задается ActionQueue, а не порядком, в котором ранее были определены операции состояния объекта.
The `ActionQueue` executes all operations in the following order:

1. `OrphanRemovalAction`
    
2. `EntityInsertAction` or `EntityIdentityInsertAction`
    
3. `EntityUpdateAction`
    
4. `QueuedOperationCollectionAction`
    
5. `CollectionRemoveAction`
    
6. `CollectionUpdateAction`
    
7. `CollectionRecreateAction`
    
8. `EntityDeleteAction`
[[Flushing]]