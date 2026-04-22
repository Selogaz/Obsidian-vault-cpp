---
name: scene
target:
  query: '#mark/scene'
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    default: mark/scene
    strict: false
  aliases:
    type: list
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  status:
    type: select
    label: 💯 Status
    required: true
    default: 🟥
    options:
      - value: ⬛
        label: 0 Special ------- | ⬛ Abandoned
      - value: ⚙️
        label: 0 Special ------- | ⚙️ Special
      - value: 🟥
        label: 1 Preparation --- | 🟥 ToDo
      - value: 💡
        label: 1 Preparation --- | 💡 Idea
      - value: 🧠
        label: 2 Preprocessing | 🧠 Brainstorm
      - value: 🔎
        label: 2 Preprocessing | 🔎 Research
      - value: 🟦
        label: 3 Processing --- | 🟦 WIP
      - value: 📋
        label: 3 Processing --- | 📋 Revising
      - value: 🖍
        label: 4 Processing --- | 🖍 Edit
      - value: 🟩
        label: 5 Distributing ---  | 🟩 Done
      - value: 📦
        label: 5 Distributing --- | 📦 Compilation
      - value: 📢
        label: 5 Distributing --- | 📢 Published
  icon:
    type: text
    required: true
    hidden: true
    default: ✍️
  color:
    type: text
    required: true
    hidden: true
    default: "#d0b580"
  created:
    type: date
    hidden: true
  updated:
    type: date
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
