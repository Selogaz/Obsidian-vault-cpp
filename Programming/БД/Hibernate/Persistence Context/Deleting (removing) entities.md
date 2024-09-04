`session.remove(person)`
Hibernate может обрабатывать удаление объектов в отсоединенном(detached) состоянии. Однако Jakarta Persistence запрещает такое поведение: экземпляр сущности должен находиться в managed состоянии.

[[Persistence Context]]