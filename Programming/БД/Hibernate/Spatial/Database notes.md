Postgresql

The Postgresql dialect has support for the [Postgis spatial extension](https://postgis.net/), but not the Geometric types mentioned in the [Postgresql documentation](https://www.postgresql.org/docs/current/datatype-geometric.html).

MySQL
в версии 5.6.1, когда MySQL представил пространственные операторы ST_*. Диалект MySQLSpatial56Dialect использует эти новые, более точные операторы.

Oracle 19c/21c/23ai

There is currently only support for the `SDO_GEOMETRY` type.

SQL Server

The `GEOGRAPHY` type is not currently supported.
[[Spatial]]