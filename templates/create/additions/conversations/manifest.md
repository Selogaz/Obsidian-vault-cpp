---
name: 👅 Conversation
enforce_folder: base/additions/conversations
target:
  query: '#mark/addition/conversation'
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    strict: false
  status:
    type: select
    label: 💯 Status
    required: true
    default: 📥
    options:
      - value: ⬛
        label: ⬛ Drop
      - value: 📥
        label: 📥 Inbox
      - value: ❄
        label: ❄ Hold
      - value: 🟥
        label: 🟥 ToDo
      - value: 🟦
        label: 🟦 WIP
      - value: 🟩
        label: 🟩 Done
      - value: 📢
        label: 📢 Published
  contact:
    type: multilink
    label: 👤 Contact
    sort: alphabetical
    source:
      js: 'return dv.pages("#contact AND -#mark/ignore").sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "👤") + " " + p.file.name }))'
  description:
    type: text
    label: 🪪 Description
  summary:
    type: text
    label: 🧾 Summary
  icon:
    type: text
    required: true
    hidden: true
    fixed: 👅
  color:
    type: text
    required: true
    hidden: true
    fixed: "#ce8c8c"
  created:
    type: date
    hidden: true
  updated:
    type: date
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
