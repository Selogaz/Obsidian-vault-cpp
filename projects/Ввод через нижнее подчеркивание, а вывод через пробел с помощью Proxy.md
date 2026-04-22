---
tags:
  - status/done
  - project/short
  - priority/c
aliases: []
addition:
status: 🟩
priority: 🇨
category:
meta:
problem:
creator:
production:
start: 2026-01-25T20:11:07+03:00
end:
url:
cover:
icon: 🗞️
color: "#a39070"
created: 2026-01-25T20:11:07+03:00
updated: 2026-02-28T23:27:36+03:00
---

С помощью proxy можно создавать *computed values* - те значения, которые создаются по ходу выполнения программы[^1]

Программа ниже позволяет перечислять свойства через `_` и их значения будут корректно выведены, разделенные пробелом

```js
const user = {
	first: 'John',
	last: 'Doe'
}

const person = new Proxy(user, {
	get(target, prop) {
		if(!(prop in target)) {
			return prop.slit("_").map(function (part) {
				return target[part]
			}).join(' ')
		} else 
			return target[prop]
		
	}
})

console.log(person.first_last)
```

Если требуется устанавливать значение,[^2] то следует использовать метод [[#Set]]

[^1]: [[динамическое создание в языках программирования|динамически]]
[^2]: `person.first_last = "sdf"`
