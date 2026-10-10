---
name: 🎮 Game
description: "A source note for play and notes on one video game."
target:
  query: '#source/game AND -#mark/log'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🎮
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#3a9560"
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
