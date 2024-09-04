При использовании нескольких каталогов и схем баз данных Hibernate предлагает возможность настроить глобальный каталог или схему, чтобы вам не приходилось явно объявлять их для каждого объекта.
Example 624. Setting global catalog and schema

```
<property name="hibernate.default_catalog" value="crm"/>
<property name="hibernate.default_schema" value="analytics"/>
```
[[Native SQL Queries]]