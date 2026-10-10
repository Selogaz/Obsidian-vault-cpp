---
name: 🪧 Context
description: "A discourse node that supplies background for another node."
target:
  query: '#note/discourse/context'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🪧
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#909090"
---
