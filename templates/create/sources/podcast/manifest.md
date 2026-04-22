---
name: _📻 Podcast
target:
  query: '#source/podcast AND -#mark/log'
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 📻
  color:
    type: text
    required: true
    hidden: true
    fixed: "#2a7590"
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
    - icon
    - color
    - created
    - updated
---
