---
name: _🎓 Course
description: "A source note that tracks lessons and notes from one course."
target:
  query: '#source/course AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🎓
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#6b7a35"
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
