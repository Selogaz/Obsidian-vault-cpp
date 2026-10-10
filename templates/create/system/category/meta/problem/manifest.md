---
name: ⚡ Problem
description: "A focused research question inside one meta note."
enforce_folder: base/_problems
target:
  query: "#system/high/problem"
fields:
  meta:
    type: multilink
    description: "The topic hubs linked to this note."
    label: 🔎 Meta
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#system/high/meta AND -#mark/ignore\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🔎\") + \" \" + p.file.name }))"
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: ⚡
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#d0b040"
rules:
  - name: hub links live in the right property
    description: "Moves category and meta links to the property matching the linked note's current type."
    then:
      add:
        category: { meta: { when: "#system/category" } }
        meta: { category: { when: "#system/high/meta" } }
      remove:
        category: { when: "#system/high/meta" }
        meta: { when: "#system/category" }
formatting:
  property_order:
    - tags
    - aliases
    - description
    - addition
    - relevant
    - category
    - meta
    - icon
    - color
    - created
    - updated
---
