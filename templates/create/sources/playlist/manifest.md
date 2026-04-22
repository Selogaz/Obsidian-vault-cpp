---
name: 📼 Playlist
target:
  query: '#source/video/playlist AND -#mark/log'
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 📼
  color:
    type: text
    required: true
    hidden: true
    fixed: "#2a9070"
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
