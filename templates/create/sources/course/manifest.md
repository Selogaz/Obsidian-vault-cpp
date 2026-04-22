---
name: _🎓 Course
target:
  query: '#source/course AND -#mark/log'
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 🎓
  color:
    type: text
    required: true
    hidden: true
    fixed: "#6b7a35"
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
