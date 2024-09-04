org.hibernate.context.spi.CurrentTenantIdentifierResolver — это контракт Hibernate, позволяющий определять то, что приложение считает текущим идентификатором арендатора. Используемую реализацию можно либо передать непосредственно в конфигурацию через метод setCurrentTenantIdentifierResolver, либо указать с помощью параметра hibernate.tenant_identifier_resolver.

[[Multitenancy]]