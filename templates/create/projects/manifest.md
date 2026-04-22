---
name: ⭕ project
target:
  query: "#project"
fields:
  tags:
    type: multiselect
    label: 🏷️ Tags
    required: true
    default: project/single
    sort: alphabetical-desc
    options:
      source:
        js: 'return app.vault.getMarkdownFiles().filter(f => f.path.startsWith("templates/create/projects") && f.basename === "manifest").map(f => { const cache = app.metadataCache.getFileCache(f); const tag = String((cache.frontmatter.target || {}).query || "").match(/#[\w/-]+/); if (!tag || !tag[0].includes("/")) return null; const icon = (cache.frontmatter.fields && cache.frontmatter.fields.icon && cache.frontmatter.fields.icon.fixed) || ""; const slug = tag[0].slice(1); const last = slug.split("/").pop(); return { value: slug, label: icon + " " + last }; }).filter(Boolean);'
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
      - value: ❄
        label: ❄ Hold
      - value: 🟥
        label: 🟥 ToDo
      - value: 🟦
        label: 🟦 WIP
      - value: 🟩
        label: 🟩 Done
      - value: 📢
        label: 📢 Published
  priority:
    type: select
    label: 🔺 Priority
    required: true
    default: 🇨
    options:
      - value: 🇦
        label: 🇦 Important and urgent
      - value: 🇧
        label: 🇧 Important and non-urgent
      - value: 🇨
        label: 🇨 Сommon project
      - value: 🇩
        label: 🇩 Delegate
      - value: 🇪
        label: 🇪 Eliminate
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
      js: 'return dv.pages("#creator OR #contact").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "👨") + " " + p.file.name }));'
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
    required: true
  end:
    type: date
    label: 🏁 End
    required: true
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
    - status
    - priority
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
