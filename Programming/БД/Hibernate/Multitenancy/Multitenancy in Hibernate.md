Использование Hibernate с мультитенантными данными сводится как к API, так и к компонентам интеграции. Как обычно, Hibernate стремится сделать API простым и изолированным от любых основных сложностей интеграции. На самом деле API просто определяется путем передачи идентификатора арендатора при открытии любого сеанса

Example 647. Specifying tenant identifier from `SessionFactory`

```
private void doInSession(String tenant, Consumer<Session> function) {
    Session session = null;
    Transaction txn = null;
    try {
        session = sessionFactory
            .withOptions()
            .tenantIdentifier(tenant)
            .openSession();
        txn = session.getTransaction();
        txn.begin();
        function.accept(session);
        txn.commit();
    } catch (Throwable e) {
        if (txn != null) txn.rollback();
        throw e;
    } finally {
        if (session != null) {
            session.close();
        }
    }
}
```
[[Multitenancy]]