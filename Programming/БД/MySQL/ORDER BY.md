```sql
select type, max(price) FROM Courses GROUP BY type ORDER BY max(price)
```