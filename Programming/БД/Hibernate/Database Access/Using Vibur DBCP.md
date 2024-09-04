Чтобы использовать интеграцию Vibur DBCP, приложение должно включить jar модуля hibernate-vibur (а также его зависимости) в путь к классам.
Установите все настройки Vibur в Hibernate с префиксом hibernate.vibur. и этот ConnectionProvider подберет их и передаст Vibur DBCP.
[[Database Access]]