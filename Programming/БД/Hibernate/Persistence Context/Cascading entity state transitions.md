Jakarta Persistence позволяет распространять переход состояния от родительской сущности к дочерней. Для этой цели Jakarta Persistence jakarta.persistence.CascadeType определяет различные типы каскада:
`ALL`

cascades all entity state transitions.

`PERSIST`

cascades the entity persist operation.

`MERGE`

cascades the entity merge operation.

`REMOVE`

cascades the entity remove operation.

`REFRESH`

cascades the entity refresh operation.

`DETACH`

cascades the entity detach operation.

[[Persistence Context]]