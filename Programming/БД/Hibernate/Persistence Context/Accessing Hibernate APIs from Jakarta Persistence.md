Jakarta Persistence определяет невероятно полезный метод, позволяющий приложениям получать доступ к API базового(underlying) провайдера.
```
Session session = entityManager.unwrap(Session.class);
SessionImplementor sessionImplementor = entityManager.unwrap(SessionImplementor.class);

SessionFactory sessionFactory = entityManager.getEntityManagerFactory().unwrap(SessionFactory.class);
```

[[Persistence Context]]
