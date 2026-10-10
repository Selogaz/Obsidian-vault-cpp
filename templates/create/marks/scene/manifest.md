---
name: scene
description: "A project note for one scene in a long work."
target:
  query: '#mark/scene'
fields:
  tags:
    type: multiselect
    description: "The scene type and other marks applied here."
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    default: mark/scene
    strict: false
  aliases:
    type: list
    description: "Other names for this note."
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  status:
    type: select
    description: "The current stage of this work."
    label: 💯 Status
    required: true
    default: 🟥
    options:
      - value: ⬛
        description: "Use this for work that was abandoned or duplicated."
        label: 0 Special | ⬛ Abandoned
      - value: ⚙️
        description: "Use this when another workflow tracks the scene."
        label: 0 Special | ⚙️ Special
      - value: 🟥
        description: "Use this for work that is ready to start."
        label: 1 Preparation | 🟥 ToDo
      - value: 💡
        description: "Use this while the scene is only an idea."
        label: 1 Preparation | 💡 Idea
      - value: 🧠
        description: "Use this while exploring possible directions for the scene."
        label: 2 Preprocessing | 🧠 Brainstorm
      - value: 🔎
        description: "Use this while researching the scene."
        label: 2 Preprocessing | 🔎 Research
      - value: 🟦
        description: "Use this for work that is currently active."
        label: 3 Processing | 🟦 WIP
      - value: 📋
        description: "Use this while revising the scene structure."
        label: 3 Processing | 📋 Revising
      - value: 🖍
        description: "Use this while editing the scene text."
        label: 4 Processing | 🖍 Edit
      - value: 🟩
        description: "Use this for work that is complete."
        label: 5 Distributing | 🟩 Done
      - value: 📦
        description: "Use this while preparing the scene for release."
        label: 5 Distributing | 📦 Compilation
      - value: 📢
        description: "Use this for work shared with its audience."
        label: 5 Distributing | 📢 Published
  up:
    type: multilink
    description: "The longform project this scene belongs to."
    label: ⬆️ Up
    required: true
    source:
      query: "#project/longform"
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    default: ✍️
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    default: "#d0b580"
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
formatting:
  property_order:
    - tags
    - aliases
    - status
    - up
    - icon
    - color
    - created
    - updated
---
