---
name: 🌐 Resource
description: "A source note that keeps useful material from one web resource."
target:
  query: '#source/article/resource AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🌐
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#7575c0"
formatting:
  property_order:
    - tags
    - aliases
    - description
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
    - icon
    - color
    - created
    - updated
---
