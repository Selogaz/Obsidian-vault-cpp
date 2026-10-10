---
name: 📝 Primary
description: "A complete atomic note outside the growth stages."
target:
  query: '#note/basic/primary AND -#note/discourse'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 📝
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#70a0b5"
---
