Чтобы использовать эту интеграцию HikariCP, приложение должно включить jar модуля hibernate-hikari (а также его зависимости) в путь к классам.
Установите все настройки Hikari в Hibernate с префиксом hibernate.hikari. и этот ConnectionProvider подберет их и передаст Хикари.
[[Database Access]]