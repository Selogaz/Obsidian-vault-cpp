---
name: 🎧 Tracklist
target:
  query: "#source/music/tracklist AND -#mark/log"
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 🎧
  color:
    type: text
    required: true
    hidden: true
    fixed: "#70b5c5"
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
tags:
  - linker-exclude
---
