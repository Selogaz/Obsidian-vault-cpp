```sql
with recursive fibonacci (n, fib_n, next_fib_n) as
(
	select 1, 0, 1
	union all
	select n + 1, next_fib_n, fib_n + next_fib_n
		from fibonacci where n < 10
)
select next_fib_n from fibonacci;
```
![[Pasted image 20240821192613.png]]


[[with]]