---
tags:
  - status/wip
  - project/single
  - priority/high
aliases: []
description:
addition:
status: 🟦
priority: ⏫
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
updated: 2026-10-26T15:45:16+04:00
---

# Tasks
- [ ] #task/one-off Залить новые правки в соответствии с новым тз ⏫ ➕ 2026-10-31

- [x] #task/one-off #task/waiting_for #context/work/dev Получить доступы к Meta ➕ 2026-10-22 ✅ 2026-10-26
- [x] #task/one-off Создать аккаунт на developers.meta ➕ 2026-10-22 ✅ 2026-10-22
- [x] #task/one-off Проверить работоспособность проекта ➕ 2026-09-29 ✅ 2026-10-05
	- [x] #task/one-off Получить доступы к серверу ➕ 2026-09-30 ✅ 2026-09-30
	- [x] #task/one-off #task/next_action Скопировать активную сессию из firefox в chrome, чтобы клод мог все проверить. ➕ 2026-09-30 ✅ 2026-10-02
	- 2026-09-29T13:19:55+04:00 → 2026-09-30T12:30:55+04:00
- [-] #task/next_action Уточнить у заказчика: "запустить бота" = включить ответы в Instagram (снять `instagram_disabled.flag`)? Telegram-демо уже работает с сентября 🔺 ➕ 2026-10-21 ❌ 2026-10-22
- [x] #task/one-off Проверить, оплачен ли VPS (срок был 2026-10-10, проформа 193,60 CZK) или перенесён на аккаунт клиента. Бэкапов нет 🔺 ➕ 2026-10-21 ✅ 2026-10-22
- [ ] #task/one-off #context/work/dev Архив боевого каталога и `Foto` вне сервера (подъюнит 11.0) ➕ 2026-10-21
- [ ] #task/one-off #context/work/dev Получить правильный App Secret приложения 924189600750509 защищённым каналом и включить проверку подписи вебхука ➕ 2026-10-21
- [ ] #task/one-off #context/work/dev Закрыть наружу `/test/lead`, `/poll/gmail`, `/reminders/run`, `/docs` через nginx до включения Instagram (подъюнит 11.1) ➕ 2026-10-21
- [ ] #task/one-off #context/work/dev Завести приватный git из `sladkobrno-prod` без секретов. `git clone` с сервера не использовать: там откат на `863fa74` без SendPulse и выключателя ➕ 2026-10-21
- [ ] #task/waiting_for Продлить домен sladkobrno.cz ➕ 2026-10-21 📅 2026-11-05
- [ ] #task/one-off Не останавливать `sladkobrno-bot`, пока выключатель Instagram не вынесен из него (подъюнит 11.4) ➕ 2026-10-21
- [ ] #task/one-off Переоформить аккаунты на клиента: VPS, SendPulse, OpenAI, Telegram-бот, Meta ➕ 2026-10-21
- [x] #task/one-off #context/work/dev Подтвердить решения владельца: доставка, счёт, самовывоз, демо-бот. Согласовать доработки 11.x ➕ 2026-10-21 ✅ 2026-10-26

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

Код и доки: `~/Projects/work/Astashko/sladko` (наводка – `artefacts/docs/NEXT-SESSION.md`), боевая копия – `sladkobrno-prod`.

На сервере два сервиса:
- `sladkobrno-bot` – Telegram-демо `@sladko_brno1234_bot`, в нём же выключатель "инста вкл/выкл";
- `sladkobrno-web` – Instagram-бот (FastAPI).

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
