---
name: ⭕ contact
enforce_folder: base/contacts
target:
  query: '"base/contacts" OR #contact'
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    default: contact/working
    options:
      source:
        js: 'return app.vault.getMarkdownFiles().filter(f => f.path.startsWith("templates/create/contacts") && f.basename === "manifest").map(f => { const cache = app.metadataCache.getFileCache(f); const tag = String((cache.frontmatter.target || {}).query || "").match(/#[\w/-]+/); if (!tag || !tag[0].includes("/")) return null; const icon = (cache.frontmatter.fields && cache.frontmatter.fields.icon && cache.frontmatter.fields.icon.fixed) || ""; const slug = tag[0].slice(1); const last = slug.split("/").pop(); return { value: slug, label: icon + " " + last }; }).filter(Boolean);'
    strict: false
  aliases:
    type: list
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  description:
    type: text
    label: 🪪 Description
    required: true
  addition:
    type: list
    label: ➕ Addition
    sort: alphabetical
    required: false
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
  production:
    type: multilink
    label: 🏬 Production
    sort: alphabetical
    required: true
    validate_exists: false
    source:
      js: 'return dv.pages("#production").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "🏬") + " " + p.file.name }));'
  relevant:
    type: boolean
    required: true
    default: false
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
    - description
    - addition
    - category
    - meta
    - problem
    - production
    - relevant
    - created
    - updated
---
