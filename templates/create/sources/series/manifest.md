---
name: 🍿 Series
target:
  query: '#source/cinematic/series AND -#mark/log'
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 🍿
  color:
    type: text
    required: true
    hidden: true
    fixed: "#d08a50"
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
