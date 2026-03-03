---
tags:
  - status/done
  - project/short
  - priority/c
aliases: []
status: 🟩
priority: 🇨
category:
meta:
problem:
creator:
production:
url:
cover:
start: 2026-01-22T11:57:29+03:00
end:
created: 2026-01-22T11:57:29+03:00
updated: 2026-02-28T23:27:24+03:00
---

# Description
https://github.com/Selogaz/SoundBurner

- `.header-main` - удаляем width, добавляем `display: flex`
- удаляем float: left для img, для `#search`,
- удаляем margin-left и margin-top для `#search`
- короче, везде удаляем float: left и margin
```css
header .all-header .header-main {

display: flex;

margin-top: 20px;

justify-content: space-between;

}
```

дальше мучали [[css медиа-запросы|медиа-запросы]]
