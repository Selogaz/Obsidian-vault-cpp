---
name: 💽 Album
description: "A source note for listening and notes on one album."
target:
  query: '#source/music/album AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 💽
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#70b5c5"
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
