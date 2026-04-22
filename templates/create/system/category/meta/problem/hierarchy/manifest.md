---
name: 🧬 Hierarchy
enforce_folder: base/_hierarchy
target:
  query: "#system/high/hierarchy"
fields:
  problem:
    type: multilink
    label: ⚡ Problem
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#system/high/problem AND -#mark/ignore").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "⚡") + " " + p.file.name }))'
  icon:
    type: text
    required: true
    hidden: true
    default: 🧬
  color:
    type: text
    required: true
    hidden: true
    fixed: "#b089c4"
formatting:
  property_order:
    - tags
    - aliases
    - addition
    - relevant
    - category
    - meta
    - problem
    - icon
    - color
    - created
    - updated
---
