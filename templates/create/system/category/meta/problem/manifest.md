---
name: ⚡ Problem
enforce_folder: base/_problems
target:
  query: "#system/high/problem"
fields:
  meta:
    type: multilink
    label: 🔎 Meta
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#system/high/meta AND -#mark/ignore").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "🔎") + " " + p.file.name }))'
  icon:
    type: text
    required: true
    hidden: true
    default: ⚡
  color:
    type: text
    required: true
    hidden: true
    fixed: "#d0b040"
formatting:
  property_order:
    - addition
    - category
    - meta
    - icon
    - color
    - created
    - updated
---
