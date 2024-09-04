По умолчанию типы объектов, измененные в каждой версии, не отслеживаются. Это подразумевает необходимость запроса всех таблиц, хранящих проверенные данные, для получения изменений, внесенных во время указанной ревизии. Envers предоставляет простой механизм, создающий таблицу REVCHANGES, в которой хранятся имена сущностей измененных постоянных объектов. Одна запись инкапсулирует идентификатор редакции (внешний ключ таблицы REVINFO) и строковое значение.

Отслеживание измененных имен объектов можно включить тремя различными способами:  
  
1. Установите для параметра org.hibernate.envers.track_entities_changed_in_revision значение true. В этом случае org.hibernate.envers.DefaultTrackingModifiedEntitiesRevisionEntity будет неявно использоваться в качестве объекта журнала изменений.  
  
2. Создайте собственную сущность редакции, которая расширяет класс org.hibernate.envers.DefaultTrackingModifiedEntitiesRevisionEntity.

```
@Entity(name = "CustomTrackingRevisionEntity")
@Table(name = "TRACKING_REV_INFO")
@RevisionEntity
public static class CustomTrackingRevisionEntity
	extends DefaultTrackingModifiedEntitiesRevisionEntity {

}
```

3. Отметьте соответствующее поле пользовательской сущности ревизии аннотацией @org.hibernate.envers.ModifiedEntityNames. Свойство должно иметь тип Set<String>.

```
@Entity(name = "CustomTrackingRevisionEntity")
@Table(name = "TRACKING_REV_INFO")
@RevisionEntity
public static class CustomTrackingRevisionEntity extends DefaultRevisionEntity {

    @ElementCollection
    @JoinTable(
        name = "REVCHANGES",
        joinColumns = @JoinColumn(name = "REV")
   )
    @Column(name = "ENTITYNAME")
    @ModifiedEntityNames
    private Set<String> modifiedEntityNames = new HashSet<>();

    public Set<String> getModifiedEntityNames() {
        return modifiedEntityNames;
    }
}
```

[[Envers]]