---
tags:
  - source/article/paper
  - mark/log/conspectus
  - category/js
  - category/html
  - category/css
aliases: []
status: 🟦
source:
  - "[[full stack itproger]]"
next:
url:
start: 2026-01-25T00:00:00+03:00
end:
created: 2026-01-25T00:00:00+03:00
updated: 2026-01-25T17:36:56+03:00
---

> [!toc]+
> ```table-of-contents
> ```
# Атрибут type со значением module
Необходим для возможности экспорта
```html
<script src="js/index.js" type="module"></script>
```

# Экспорт
info.js
```js
export const users = ["Alex", "Bob", "John"];

export function info() {
	console.log("Some info");
}
```
# Импорт
index.js
```js
import { info } from './info.js';

info();
```

Если открывается с ошибкой`CORS`, надо использовать `phpstorm`

# Импорт всего:
index.js
```js
import * as info from './info.js';

info.info(info.users);
```

# Импорт класса
info.js
```js
class Info {
	users = ["Alex", "Bob", "John"];
	
	function info() {
		console.log("Some info");
	}
}

export default Info;//автоматический экспорт при подключении файла
```

index.js
```js
import Info from './info.js';//можно указывать любое имя, будет работать корректно, даже если имя класса другое

let info = new Info();
info.info(info.users);

```
