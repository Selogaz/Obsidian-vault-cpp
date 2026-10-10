---
name: _📖 Book
description: "A source note that collects reading and atomic notes for one book."
target:
  query: '#source/book AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 📖
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#b5b570"
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
