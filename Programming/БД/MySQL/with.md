```sql
with google_active_users as (select * from user where is_active = 1 and registration_type='google') select * from google_active_users;
```
![[Pasted image 20240821184706.png]]

```sql
with active_user as (select * from user where is_active=1), google_active_users as (select * from active_user where registration_type='google') select login from google_active_users;
```
![[Pasted image 20240821191602.png]]


```sql
with
approved_users as (select * from user where is_active=1),
google_approved_users as
(select * from approved users where registration_type='google'),
vk_aproved_users as
(select * from aproved_users where registration_type='vk')
select * from google_aproved_users
union
select * from vk_aproved_users;
```
![[Pasted image 20240821191657.png]]

```sql
with post_stats as (select min(creation_time) as min_time, max(creation_time) as max_time from user_group_post where group_id=570764) select * from user_private_message where send_time between (select min_time from post_stats) and (select max_time from post_stats);
```
