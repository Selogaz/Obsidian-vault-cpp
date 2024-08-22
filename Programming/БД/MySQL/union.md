Объединение двух множеств в результате. Только уникальные значения
```sql
select user_from_id from user_private_message union select user_to_id from user_private_message;
```
![[Pasted image 20240821144118.png]]

Вместе с не уникальными
```sql
select user_from_id from user_private_message union all select user_to_id from user_private_message;
```
![[Pasted image 20240821144349.png]]

