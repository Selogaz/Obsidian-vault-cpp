---
name: _📹 Video
description: "A source note for viewing and notes on one video."
target:
  query: '#source/video/recording AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 📹
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#2a9070"
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
