---
name: 🧬 Hierarchy
description: "A note that groups and orders atomic notes for synthesis."
enforce_folder: base/_hierarchy
target:
  query: "#system/high/hierarchy"
fields:
  problem:
    type: multilink
    description: "The research questions linked to this note."
    label: ⚡ Problem
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#system/high/problem AND -#mark/ignore\").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"⚡\") + \" \" + p.file.name }))"
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🧬
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#b089c4"
rules:
  - name: hub links live in the right property
    description: "Moves category, meta and problem links to the property matching the linked note's current type."
    then:
      add:
        category: { meta: { when: "#system/category" }, problem: { when: "#system/category" } }
        meta: { category: { when: "#system/high/meta" }, problem: { when: "#system/high/meta" } }
        problem: { category: { when: "#system/high/problem" }, meta: { when: "#system/high/problem" } }
      remove:
        category: { when: "#system/high/meta OR #system/high/problem" }
        meta: { when: "#system/category OR #system/high/problem" }
        problem: { when: "#system/category OR #system/high/meta" }
formatting:
  property_order:
    - tags
    - aliases
    - description
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
