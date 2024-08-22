```sql
select user_id, first_name from user order by first_name limit 10;
```
![[Pasted image 20240821151706.png]]

Пропустит первые 10 результатов, вернет 5
```sql
select user_id, first_name from user order by first_name desc limit 10, 5;
```