---
name: 🔎 Meta-note
description: "A research hub for one topic inside a category."
enforce_folder: base/_meta-notes
target:
  query: "#system/high/meta"
fields:
  addition:
    type: list
    description: "Links to supporting material attached to this note."
    label: ➕ Addition
    sort: alphabetical
  category:
    type: multilink
    description: "The broad areas linked to this note."
    label: 🗺️ Category
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#system/category AND -#mark/ignore\").map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🗺️\") + \" \" + p.file.name }))"
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🔎
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#6fa8d6"
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
rules:
  - name: category from meta
    description: "Fills an empty category with the categories of the linked meta notes."
    when:
      and:
        - "category="
        - meta: {}
    then:
      set: { category: "{{meta>category}}" }
  - name: category tags
    description: "Keeps category/* tags in sync with the category links."
    when: "-#mark/log AND -#mark/no_sync"
    then:
      remove: { tags: "category/*" }
      add: { tags: 'category/{{category|name|replace:" ","_"}}' }
formatting:
  property_order:
    - tags
    - aliases
    - description
    - addition
    - relevant
    - category
    - icon
    - color
    - created
    - updated
---
