---
name: 👅 Conversation
description: "A record of one conversation and the people involved."
enforce_folder: base/additions/conversations
target:
  query: '#mark/addition/conversation'
fields:
  tags:
    type: multiselect
    description: "The addition type and other marks applied here."
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    strict: false
  status:
    type: select
    description: "The current stage of this work."
    label: 💯 Status
    required: true
    default: 📥
    options:
      - value: ⬛
        description: "Use this for work that was abandoned or duplicated."
        label: ⬛ Drop
      - value: 📥
        description: "Use this for work that still needs review and sorting."
        label: 📥 Inbox
      - value: ❄
        description: "Use this for work that is paused or blocked."
        label: ❄ Hold
      - value: 🟥
        description: "Use this for work that is ready to start."
        label: 🟥 ToDo
      - value: 🟦
        description: "Use this for work that is currently active."
        label: 🟦 WIP
      - value: 🟩
        description: "Use this for work that is complete."
        label: 🟩 Done
      - value: 📢
        description: "Use this for work shared with its audience."
        label: 📢 Published
  contact:
    type: multilink
    description: "The people who took part in this conversation."
    label: 👤 Contact
    sort: alphabetical
    source:
      js: "return dv.pages(\"#contact AND -#mark/ignore\").sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"👤\") + \" \" + p.file.name }))"
  description:
    type: text
    description: "The purpose of this addition."
    label: 🪪 Description
  summary:
    type: text
    description: "The main points or results from this addition."
    label: 🧾 Summary
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 👅
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#ce8c8c"
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
    - status
    - contact
    - description
    - summary
    - icon
    - color
    - created
    - updated
---
