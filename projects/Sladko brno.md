---
tags:
  - status/wip
  - project/single
  - priority/normal
aliases: []
description:
addition:
status: 🟦
priority: ◽
category:
meta:
problem:
creator:
production:
start: 2026-09-29
end:
url:
cover:
icon: ✏️
color: "#b87535"
created: 2026-09-29T13:17:01+04:00
updated: 2026-10-05T10:36:49+04:00
---

# Tasks

- [x] #task/one-off Проверить работоспособность проекта ➕ 2026-09-29 ✅ 2026-10-05
	- [x] #task/one-off Получить доступы к серверу ➕ 2026-09-30 ✅ 2026-09-30
	- [x] #task/one-off #task/next_action Скопировать активную сессию из firefox в chrome, чтобы клод мог все проверить. ➕ 2026-09-30 ✅ 2026-10-02
	- 2026-09-29T13:19:55+04:00 → 2026-09-30T12:30:55+04:00

~~~~tabs
tab: ☰ TOC
```table-of-contents
```

tab: ✔️ Tasks
```tasks
path includes {{query.file.path}}
group by heading
hide task count
```

tab: ➕ Additions
~~~tabs
tab: 🗣️ Interim
`BUTTON[add-addition]`
![[interim.base#📋 Workflow: Kanban (v)]]

tab: ✅ Task notes
`BUTTON[add-task-note]` `BUTTON[add-milestone-note]`
![[tasks.base#📋 Workflow: Kanban (v)]]
~~~
~~~~

# Description

3 Проект от Никиты Асташко

# Смена ssh пароля

Зайти в Servers and VPS
Нажать на ID сервера
recovery console
Нажать "send ctrl alt del"
Нажимать Esc до тех пор, пока не появится GRUB меню
Ubuntu → e
На строке, где linux заменить ro на rw, удалить console=ttyS0, добавить init=/bin/bash
ctrl + x

```
mount -o remount,rw /
```
```
passwd root
```

`sync`
`reboot -f`
