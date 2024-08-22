Выборка только уникальных значений
```sql
select distinct user_from_id from user_private_message;
```
![[Pasted image 20240821142559.png]]

Подсчет уникальных значений
```sql
select count(distinct user_from_id) from user_private_message;
```
![[Pasted image 20240821142730.png]]

Тернарный оператор в sql:
```sql
select count(distinct if(user_from_id = 4213, 4210, user_from_id));
```
![[Pasted image 20240821143142.png]]

Уникальные пары значений:
```sql
select distinct user_from_id, user_to_id from user_private_message;
```
![[Pasted image 20240821143407.png]]

Подсчет уникальных пар:
```sql
select count(distinct user_from_id, user_to_id) from user_private_message;
```
![[Pasted image 20240821143800.png]]

