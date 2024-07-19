Выводит все строки, содержащие CRON
grep CRON /var/log/auth.log | less
таких строк -
grep CRON /var/log/auth.log | wc -l
Выводит строки, в которых нет CRON
grep -v CRON /var/log/auth.log | less
[[linux]] [[команды]] 