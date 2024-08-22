```sql
select message_id, read_time from user_private_message order by read_time;
```
![[Pasted image 20240821150026.png]]
![[Pasted image 20240821150050.png]]
NULL меньше, чем любое значение
```sql
select message_id, read_time from user_private_message order by read_time asc;
```
По возрастанию
```sql
select message_id, read_time from user_private_message order by read_time desc; 
```
По убыванию

Сортировка по нескольким правилам сразу
```sql
select user_id, first_name, is_active from user order by is_active, first_name desc;
```
![[Pasted image 20240821150544.png]]

Колонки можно указывать цифрами
```sql
select user_id, first_name, is_active from user order by 3, 2 desc;
```