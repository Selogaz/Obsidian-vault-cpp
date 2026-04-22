---
name: 💪 Practice
enforce_folder: base/additions/practice
target:
  query: '#mark/addition/practice'
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
  project:
    type: multilink
    label: 🗂️ Project
    sort: alphabetical
    source:
      js: 'return dv.pages("#project AND -#mark/ignore").sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "🗂️") + " " + p.file.name }))'
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
    fixed: 💪
  color:
    type: text
    required: true
    hidden: true
    fixed: "#7cbf7a"
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
    - project
    - description
    - summary
    - icon
    - color
    - created
    - updated
---
