---
name: 📓 Conspectus
enforce_folder: base/additions/conspectuses
target:
  query: '#mark/log/conspectus'
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    strict: false
  aliases:
    type: list
    sort: alphabetical
    label: 🔖 Aliases
    required: true
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
      - value: 🟥
        label: 🟥 ToDo
      - value: 🟦
        label: 🟦 WIP
      - value: ⚛
        label: ⚛ Atom
      - value: 🟩
        label: 🟩 Done
  source:
    type: multilink
    sort: alphabetical
    label: 📚 Source
    source:
      js: 'return dv.pages("#source AND -#mark/log AND -#mark/ignore").sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "⭕") + " " + p.file.name }))'
  start:
    type: date
    label: 🚩 Start
  end:
    type: date
    label: 🏁 End
  summary:
    type: text
    label: 🧾 Summary
  next:
    type: link
    label: ⏭️ Next
  url:
    type: text
    label: 🔗 URL
  icon:
    type: text
    required: true
    hidden: true
    fixed: 📓
  color:
    type: text
    required: true
    hidden: true
    fixed: "#6f97c8"
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
    - order
    - source
    - start
    - end
    - summary
    - next
    - url
    - icon
    - color
    - created
    - updated
---
