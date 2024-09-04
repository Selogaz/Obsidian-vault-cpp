When using Oracle, the [`FOR UPDATE` exclusive locking clause](https://docs.oracle.com/database/121/SQLRF/statements_10002.htm#SQLRF55371) cannot be used with:

- `DISTINCT`
    
- `GROUP BY`
    
- `UNION`
    
- inlined views (derived tables), therefore, affecting the legacy Oracle pagination mechanism as well.

[[Locking]]