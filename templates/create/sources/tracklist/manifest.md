---
name: 🎧 Tracklist
description: "A source note that groups tracks in one ordered collection."
target:
  query: "#source/music/tracklist AND -#mark/log"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🎧
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
tags:
  - linker-exclude
---
