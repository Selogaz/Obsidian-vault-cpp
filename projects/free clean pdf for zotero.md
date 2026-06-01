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
start: 2026-05-31T11:47:41+03:00
end:
url:
cover:
icon: 🗞️
color: "#a39070"
created: 2026-05-31T11:47:41+03:00
updated: 2026-06-01T13:18:35+03:00
tasks:
  - "- [x] In item Menu ✅ 2026-05-31"
  - "- [x] Enabled ✅ 2026-05-31"
---

# Description

Массовое превращение страниц в pdf в Zotero. Альтернатива браузерному расширению pfrintfriendly

Сам проект лежит в ~/clean-pdf/

# Подготовка

Чтобы заработал `npm install` нужно:
## package.json
```json
{
    "name": "clean-pdf",
    "version": "1.0.0",
    "private": true,
    "type": "module",
    "scripts": { "start": "node server.js" },
    "dependencies": {
      "defuddle": "^0.6.0",
      "express": "^4.19.2",
      "jsdom": "^24.1.0",
      "playwright": "^1.47.0"
    }
  }
```
## server.js
```js
import express from 'express';
import { chromium } from 'playwright';
import { JSDOM } from 'jsdom';
import { Defuddle } from 'defuddle/node';

const app = express();
const PORT = process.env.PORT || 3737;
const PAGE_SIZES = { A4: 'A4', Letter: 'Letter' };

function slugify(s) {
  return (s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '').slice(0, 60) || 'sec';
}

// проставляем id заголовкам и собираем оглавление
function withTOC(contentHtml) {
  const { document } = new JSDOM(`<body>${contentHtml}</body>`).window;

  // убираем стили и цвета самой страницы (иначе протекает её тёмный фон/текст)
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove());
  document.querySelectorAll('[style], [bgcolor], [color]').forEach((el) => {
    el.removeAttribute('style');
    el.removeAttribute('bgcolor');
    el.removeAttribute('color');
  });

  const heads = [...document.querySelectorAll('h2, h3')];
  const used = new Set();
  const items = heads.map((h) => {
    let id = slugify(h.textContent), base = id, i = 2;
    while (used.has(id)) id = `${base}-${i++}`;
    used.add(id); h.id = id;
    return { id, text: h.textContent.trim(), level: h.tagName === 'H3' ? 3 : 2 };
  });
  const toc = items.length >= 3
    ? `<nav class="pf-toc"><div class="pf-toc-title">Содержание</div><ul>${
        items.map((it) => `<li class="lvl${it.level}"><a href="#${it.id}">${it.text}</a></li>`).join('')
      }</ul></nav>`
    : '';
  return { content: document.body.innerHTML, toc };
}

function buildHtml(article, contentHtml, toc, theme, baseURL) {
  const dark = theme === 'dark';
  const bg = dark ? '#1e1e1e' : '#ffffff', fg = dark ? '#e8e8e8' : '#1a1a1a';
  const link = dark ? '#6cb6ff' : '#0b5fff', soft = dark ? '#aaa' : '#666';
  const codeBg = dark ? '#2b2b2b' : '#f4f4f4';
  return `<!doctype html><html><head><meta charset="utf-8"><base href="${baseURL}">
  <style>
    @page { margin: 18mm 16mm; }
    html { color-scheme:${dark ? 'dark' : 'light'}; }
    html, body { background:${bg} !important; color:${fg}; }
    body { font:16px/1.6 -apple-system,Segoe UI,Roboto,"Noto Sans",sans-serif;
           max-width:760px; margin:0 auto; padding:0 8px; }
    h1,h2,h3 { line-height:1.25; }
    a { color:${link}; text-decoration:none; }
    img, figure, table, video { max-width:100%; height:auto; }
    pre, code { background:${codeBg}; border-radius:6px; }
    pre { padding:12px; overflow:auto; white-space:pre-wrap; }
    blockquote { border-left:3px solid ${link}; margin:0; padding-left:14px; color:${soft}; }
    .pf-title { font-size:26px; font-weight:700; margin:0 0 4px; }
    .pf-byline { color:${soft}; font-size:13px; margin-bottom:18px; }
    .pf-toc { border:1px solid ${dark ? '#3a3a3a' : '#e3e3e3'}; border-radius:10px;
              padding:14px 18px; margin:0 0 26px; page-break-after:always; }
    .pf-toc-title { font-weight:700; margin-bottom:8px; }
    .pf-toc ul { list-style:none; margin:0; padding:0; }
    .pf-toc li { margin:3px 0; } .pf-toc li.lvl3 { padding-left:18px; font-size:14px; }
  </style></head>
  <body>
    <div class="pf-title">${article.title || ''}</div>
    ${article.author ? `<div class="pf-byline">${article.author}</div>` : ''}
    ${toc}
    ${contentHtml}
  </body></html>`;
}

let browserPromise;
const getBrowser = () => (browserPromise ??= chromium.launch({
  // на Manjaro можно указать системный chromium через CHROMIUM_PATH=/usr/bin/chromium
  executablePath: process.env.CHROMIUM_PATH || undefined,
}));

app.get('/pdf', async (req, res) => {
  const url = req.query.url;
  const format = PAGE_SIZES[req.query.format] || 'A4';
  const theme = req.query.theme === 'dark' ? 'dark' : 'light';
  if (!url) return res.status(400).json({ error: 'Missing url' });

  let page;
  try {
    const browser = await getBrowser();
    page = await browser.newPage();
    // не наследуем системную тёмную тему ОС
    await page.emulateMedia({ colorScheme: theme === 'dark' ? 'dark' : 'light' });
    // режем лишнее (стили/шрифты/медиа страницы мы всё равно не используем) —
    // это ускоряет загрузку и убирает зависание на рекламе/трекерах
    await page.route('**/*', (route) => {
      const t = route.request().resourceType();
      if (t === 'stylesheet' || t === 'font' || t === 'media') return route.abort();
      return route.continue();
    });
    // domcontentloaded вместо networkidle: контент готов сразу, не ждём «тишины» сети
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });

    const rawHtml = await page.content();
    const dom = new JSDOM(rawHtml, { url });
    const article = await Defuddle(dom, url); // defuddle/node ожидает JSDOM-инстанс, не document

    if (article?.content) {
      const { content, toc } = withTOC(article.content);
      await page.setContent(buildHtml(article, content, toc, theme, url),
                            { waitUntil: 'domcontentloaded', timeout: 30000 });
      // даём картинкам прогрузиться, но не зависаем на медленных/битых
      await page.waitForLoadState('load', { timeout: 20000 }).catch(() => {});
    } else if (theme === 'dark') {
      await page.addStyleTag({ content:
        'html{filter:invert(1) hue-rotate(180deg)}img,video{filter:invert(1) hue-rotate(180deg)}' });
    }

    const pdf = await page.pdf({
      format, printBackground: true,
      margin: { top: '18mm', bottom: '18mm', left: '16mm', right: '16mm' },
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdf);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    if (page) await page.close().catch(() => {});
  }
});

app.listen(PORT, '127.0.0.1',
  () => console.log(`Clean PDF service on http://127.0.0.1:${PORT}`));
```

# Установка

## Пакеты
```zsh
npm install
npx playwright install chromium
npm start
```

## Настройка Actions & Tags в Zotero
Скачать для zotero плагин `Actions & Tags`
Нажать на плюсик
Operation - script
Data -
```js
// ── Configure these variables ──────────────
const SERVICE_URL = 'http://127.0.0.1:3737';
const FORMAT      = 'A4';     // 'A4' or 'Letter'
const THEME       = 'light';  // 'light' or 'dark'
// ────────────────────────────────────────────

if (typeof item === "undefined" || !item) return;

(async function () {
  let tempFilePath = null;
  try {
    function joinPath(dir, filename) {
      if (typeof OS !== "undefined" && OS.Path && OS.Path.join) {
        return OS.Path.join(dir, filename);
      }
      const sep = dir.includes("\\") ? "\\" : "/";
      return dir.replace(/[\\/]+$/, "") + sep + filename;
    }

    let targetItem = item;
    if (!targetItem.isRegularItem()) {
      if (targetItem.isAttachment() || targetItem.isNote()) {
        targetItem = Zotero.Items.get(targetItem.parentID);
      }
    }
    if (!targetItem || !targetItem.isRegularItem()) {
      Zotero.alert(null, "Clean PDF", "Select a regular Zotero item.");
      return;
    }

    const url = targetItem.getField("url");
    if (!url) {
      Zotero.alert(null, "Clean PDF", "No URL on this item.");
      return;
    }

    const pw = new Zotero.ProgressWindow();
    pw.changeHeadline("Clean PDF");
    const title = targetItem.getField("title");
    const progress = new pw.ItemProgress(targetItem.getImageSrc(), title);
    pw.show();
    pw.addDescription("Generating PDF...");

    const endpoint = SERVICE_URL + "/pdf?url=" +
      encodeURIComponent(url) +
      "&format=" + FORMAT +
      "&theme=" + THEME;
    const response = await Zotero.getMainWindow().fetch(endpoint);

    if (!response.ok) {
      let body = {};
      try { body = await response.json(); } catch (err) {}
      progress.setError();
      pw.addDescription("Error: " + (body.error || ("HTTP " + response.status)));
      pw.startCloseTimer(8000);
      return;
    }

    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    if (uint8Array.length < 1000) {
      progress.setError();
      pw.addDescription("Empty PDF received.");
      pw.startCloseTimer(8000);
      return;
    }

    let safeTitle = title || "Document";
    safeTitle = safeTitle.replace(/[\\/:"*?<>|]+/g, "_").slice(0, 140);
    tempFilePath = joinPath(Zotero.getTempDirectory().path, safeTitle + ".pdf");
    await Zotero.getMainWindow().IOUtils.write(tempFilePath, uint8Array);
    await Zotero.Attachments.importFromFile({
      file: tempFilePath,
      parentItemID: targetItem.id,
      contentType: "application/pdf"
    });

    for (const attId of targetItem.getAttachments()) {
      const att = Zotero.Items.get(attId);
      const ct = (att && att.attachmentContentType) || "";
      if (ct === "text/html" || ct === "application/zip") {
        await att.eraseTx();
      }
    }

    progress.setProgress(100);
    pw.addDescription("PDF added.");
    pw.startCloseTimer(4000);
  } catch (e) {
    Zotero.alert(null, "Error", e.toString());
  } finally {
    if (tempFilePath) {
      try {
        const win = Zotero.getMainWindow();
        await win.IOUtils.remove(tempFilePath, { ignoreAbsent: true });
      } catch (err) {}
    }
  }
})();
```

- menu label - _add PDF
- [x] In item Menu ✅ 2026-05-31
- [x] Enabled ✅ 2026-05-31

# Использование

```zsh
cd ~/clead-pdf/
npm start
```

- В Zotero Пкм по источнику у которого УКАЗАН ВАЛИДНЫЙ `URL`.
- Ждем секунд 10.
- Готово.
