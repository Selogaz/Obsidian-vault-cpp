Чтобы использовать интеграцию Agroal, приложение должно включить jar модуля hibernate-agroal (а также его зависимости) в путь к классам.
Установите все настройки Agroal в Hibernate с префиксом hibernate.agroal. и этот ConnectionProvider подберет их и передаст в пул соединений Agroal.
[[Database Access]]