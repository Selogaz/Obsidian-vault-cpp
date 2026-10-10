---
name: 🍿 Series
description: "A source note for viewing and notes across one series."
target:
  query: '#source/cinematic/series AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🍿
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#d08a50"
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
