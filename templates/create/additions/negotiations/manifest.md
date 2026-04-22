---
name: 🤝 Negotiation
enforce_folder: base/additions/negotiations
target:
  query: '#mark/addition/negotiation'
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
  production:
    type: multilink
    label: 🏬 Production
    sort: alphabetical
    source:
      js: 'return dv.pages("#production AND -#mark/ignore").sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "🏬") + " " + p.file.name }))'
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
    fixed: 🤝
  color:
    type: text
    required: true
    hidden: true
    fixed: "#8cce9e"
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
    - production
    - description
    - summary
    - icon
    - color
    - created
    - updated
---
