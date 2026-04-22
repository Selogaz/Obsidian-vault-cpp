---
name: ⭕ source
enforce_folder: sources
target:
  query: '#source AND -#mark/log'
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    default: source/book
    options:
      source:
        js: 'return app.vault.getMarkdownFiles().filter(f => f.path.startsWith("templates/create/sources") && f.basename === "manifest").map(f => { const cache = app.metadataCache.getFileCache(f); const tag = String((cache.frontmatter.target || {}).query || "").match(/#[\w/-]+/); if (!tag || !tag[0].includes("/")) return null; const icon = (cache.frontmatter.fields && cache.frontmatter.fields.icon && cache.frontmatter.fields.icon.fixed) || ""; const slug = tag[0].slice(1); const last = slug.split("/").pop(); return { value: slug, label: icon + " " + last }; }).filter(Boolean);'
    strict: false
  aliases:
    type: list
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  published:
    type: date
    label: 📢 Published
  addition:
    type: list
    label: ➕ Addition
    sort: alphabetical
    required: true
  zotero:
    type: url
    label: 🇿 Zotero
  status:
    type: select
    label: 💯 Status
    required: true
    default: 📥
    options:
      - value: ⬛
        label: ⬛ Drop
      - value: 📥
        label: 📥 Inbox
      - value: 🟥
        label: 🟥 ToDo
      - value: 🟦
        label: 🟦 WIP
      - value: ⚛
        label: ⚛ Atom
      - value: 🟩
        label: 🟩 Done
  rating:
    type: select
    label: 🌕 Rating
    required: true
    options:
      - value: 🌕
        label: 🌕 Masterpiece
      - value: 🌔
        label: 🌔 Great
      - value: 🌓
        label: 🌓 Good
      - value: 🌒
        label: 🌒 Mediocre
      - value: 🌑
        label: 🌑 Poor
  scientificity:
    type: select
    label: 🅰️ Scientificity
    required: true
    options:
      - value: 🅰️
        label: 🅰️ Primary research
      - value: 🅱️
        label: 🅱️ Secondary research
      - value: 👓
        label: 👓 Expert / Industry
      - value: 📢
        label: 📢 Popular science / Journalism
      - value: 💬
        label: 💬 Opinion / Unverified
  category:
    type: multilink
    label: 🗺️ Category
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#system/category AND -#mark/ignore").map(p => ({ value: p.file.name, label: (p.icon || "🗺️") + " " + p.file.name }))'
  meta:
    type: multilink
    label: 🔎 Meta
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#system/high/meta AND -#mark/ignore").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "🔎") + " " + p.file.name }))'
  problem:
    type: multilink
    label: ⚡ Problem
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#system/high/problem AND -#mark/ignore").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "⚡") + " " + p.file.name }))'
  creator:
    type: multilink
    label: 👨 Creator
    sort: alphabetical
    required: true
    validate_exists: false
    source:
      js: 'return dv.pages("#creator").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "👨") + " " + p.file.name }));'
  production:
    type: multilink
    label: 🏬 Production
    sort: alphabetical
    required: true
    validate_exists: false
    source:
      js: 'return dv.pages("#production").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "🏬") + " " + p.file.name }));'
  start:
    type: date
    label: 🚩 Start
  end:
    type: date
    label: 🏁 End
  url:
    type: list
    label: 🔗 URL
    sort: alphabetical
  cover:
    type: url
    label: 🖼️ Cover
  created:
    type: date
    hidden: true
  updated:
    type: date
    hidden: true
formatting:
  property_order:
    - tags
    - aliases
    - published
    - addition
    - zotero
    - status
    - rating
    - scientificity
    - category
    - meta
    - problem
    - creator
    - production
    - start
    - end
    - url
    - cover
    - created
    - updated
---
