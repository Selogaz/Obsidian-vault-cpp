select * from user where exists(select 1 from discussion_group where admin_user_id=user_id);
Администраторы, которые администрируют хотя бы одну группу

![[Pasted image 20240822220050.png]]

```sql
select * from user where not exists(select 1 from discussion_group where admin_user_id=user_id);
```
Администраторы, не администрируют ни одной группы:
![[Pasted image 20240822220241.png]]

[[Подзапросы]]