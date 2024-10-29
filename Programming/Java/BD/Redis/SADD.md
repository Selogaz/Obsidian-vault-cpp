Добавить сет
`127.0.0.1:6379> SADD "Courses for student Petrenko" "Java" "Python" "C#"`

Если добавить уже существующее значение к ключу, то ничего не произойдет:
`127.0.0.1:6379> SADD "Courses for student Petrenko" "Java"
(integer) 0`

[[Programming/Java/BD/Redis/Redis|Redis]] 
