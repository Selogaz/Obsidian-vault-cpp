---
tags:
  - note/specific/code
  - note/basic/fern
  - mark/approved
  - category/webdev
aliases:
  - отладка верстки ios mac
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-06-11T12:15:56+03:00
updated: 2026-06-11T18:31:58+03:00
---

**отладка верстки ios mac**
—
## Старт playwright

### Терминал 1
```bash
npm run dev
```

### Терминал 2
```bash
node scripts/webkit-preview.mjs
```

#### Другие варианты
```bash
# конкретная страница на iPad
node scripts/webkit-preview.mjs ipad /game/character
node scripts/webkit-preview.mjs ipad /lk

# iPad в альбомной ориентации
node scripts/webkit-preview.mjs ipad-landscape /game/character

# iPad mini
node scripts/webkit-preview.mjs ipad-mini /game/character
node scripts/webkit-preview.mjs ipad-mini-landscape /game/character

# iPhone варианты
node scripts/webkit-preview.mjs iphone /game/character
node scripts/webkit-preview.mjs iphone-se /game/character
node scripts/webkit-preview.mjs iphone-max /game/character

# внешний URL вместо локального
node scripts/webkit-preview.mjs ipad https://test.dndmaxwell.online/lk
```

## Скрипт самого playwright

```js
#!/usr/bin/env node
// Запуск реального WebKit (движок Safari) с эмуляцией iPad/iPhone.
// По умолчанию открывается iPad Pro 11.
//
// Использование:
//   node scripts/webkit-preview.mjs                              # iPad Pro 11, http://localhost:3000
//   node scripts/webkit-preview.mjs iphone                       # iPhone 14 Pro
//   node scripts/webkit-preview.mjs ipad /game/character         # конкретная страница
//   node scripts/webkit-preview.mjs iphone https://test.dndmaxwell.online/lk
//
// Перед запуском поднять dev-сервер:   npm run dev

import { execSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { homedir } from 'node:os';

// Manjaro/Arch новее, чем сборка WebKit от Playwright (она линкована против
// Ubuntu 24.04 + icu74/75 + libxml2 2.12 + flite 2). Недостающие старые .so
// разложены в ~/.local/lib/playwright-webkit-deps/lib локально (без правки
// системных путей). LD_LIBRARY_PATH должен быть выставлен ДО старта WebKit.
const DEPS_LIB = `${homedir()}/.local/lib/playwright-webkit-deps/lib`;
process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH
  ? `${DEPS_LIB}:${process.env.LD_LIBRARY_PATH}`
  : DEPS_LIB;
process.env.PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = '1';

// Playwright стоит глобально (см. README), а не в devDependencies, чтобы не
// пушиться на сервер. Резолвим путь через `npm root -g`.
const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
const { webkit, devices } = await import(
  pathToFileURL(`${globalRoot}/@playwright/test/index.mjs`).href
);

const DEVICE_MAP = {
  ipad: 'iPad Pro 11',
  'ipad-mini': 'iPad Mini',
  'ipad-mini-landscape': 'iPad Mini landscape',
  'ipad-landscape': 'iPad Pro 11 landscape',
  iphone: 'iPhone 14 Pro',
  'iphone-se': 'iPhone SE',
  'iphone-max': 'iPhone 14 Pro Max',
};

const args = process.argv.slice(2);
const deviceKey = args[0] && DEVICE_MAP[args[0]] ? args[0] : 'ipad';
const rest = args[0] && DEVICE_MAP[args[0]] ? args[1] : args[0];
const pathOrUrl = rest ?? '/';
const url = /^[a-z]+:/i.test(pathOrUrl)
  ? pathOrUrl
  : `http://localhost:3000${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;

const deviceName = DEVICE_MAP[deviceKey];
const device = devices[deviceName];

console.log(`Launching WebKit as "${deviceName}" → ${url}`);

const browser = await webkit.launch({ headless: false });
const context = await browser.newContext({ ...device });
const page = await context.newPage();
await page.goto(url).catch((err) => console.error('Navigation error:', err.message));

console.log('Browser opened. Close the window to exit.');
await page.waitForEvent('close', { timeout: 0 }).catch(() => {});
await browser.close();

```
