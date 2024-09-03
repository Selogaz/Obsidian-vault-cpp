Hibernate позволяет создавать базу данных на основе сопоставлений сущностей.

Хотя автоматическое создание схемы очень полезно для целей тестирования и создания прототипов, в производственной среде гораздо более гибко управлять схемой с помощью сценариев инкрементной миграции.

If the `hibernate.hbm2ddl.auto` configuration is set to `create`, Hibernate is going to generate the following database schema