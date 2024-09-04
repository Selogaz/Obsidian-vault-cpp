Example 682. Getting the `Customer` entity at a given revision

```
Customer customer = (Customer) AuditReaderFactory
.get(entityManager)
.createQuery()
.forEntitiesAtRevision(Customer.class, revisions.get(0))
.getSingleResult();

assertEquals("Doe", customer.getLastName());
```

[[Envers]]