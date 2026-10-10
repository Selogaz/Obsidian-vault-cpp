---
name: 📓 Conspectus
description: "A working summary that turns sources into knowledge notes."
enforce_folder: base/additions/conspectuses
target:
  query: '#mark/log/conspectus'
fields:
  tags:
    type: multiselect
    description: "The source type and other marks applied here."
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    strict: false
  aliases:
    type: list
    description: "Other names for this note."
    sort: alphabetical
    label: 🔖 Aliases
    required: true
  description:
    type: text
    description: What this conspectus covers.
    label: 🪪 Description
    required: true
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
      - value: 🟥
        description: "Use this for work that is ready to start."
        label: 🟥 ToDo
      - value: 🟦
        description: "Use this for work that is currently active."
        label: 🟦 WIP
      - value: ⚛
        description: "Use this while turning a source into knowledge notes."
        label: ⚛ Atom
      - value: 🟩
        description: "Use this for work that is complete."
        label: 🟩 Done
  order:
    type: number
    description: "The position of this conspectus in the reading sequence. Used for sorting."
    label: "#️⃣ Order"
    min: 0
  source:
    type: multilink
    description: "The sources summarized in this conspectus."
    sort: alphabetical
    label: 📚 Source
    source:
      js: "return dv.pages(\"#source AND -#mark/log AND -#mark/ignore\").sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"⭕\") + \" \" + p.file.name }))"
  start:
    type: date
    description: "When work on this item started."
    label: 🚩 Start
  end:
    type: date
    description: "When work on this item ended."
    label: 🏁 End
  summary:
    type: text
    description: "The main points drawn from these sources."
    label: 🧾 Summary
  next:
    type: multilink
    description: "The next conspectus in the reading sequence. Usually one."
    label: ⏭️ Next
  url:
    type: list
    description: "Links to related pages or resources."
    label: 🔗 URL
    sort: alphabetical
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 📓
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#6f97c8"
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
rules:
  - name: category tags from source
    description: "Gives a conspectus without category tags the categories of its source. Tags set by hand are kept."
    when:
      and:
        - "-#category AND -#mark/no_sync"
        - source: {}
    then:
      add: { tags: 'category/{{source>category|name|replace:" ","_"}}' }
  - name: start on wip
    description: "Sets start to today when work moves to WIP and start is empty."
    when: "status=🟦 AND start="
    then:
      set: { start: "{{today}}" }
  - name: end on close
    description: "Sets end to today when the conspectus is done or dropped and end is empty."
    when: "(status=🟩 OR status=⬛) AND end="
    then:
      set: { end: "{{today}}" }
formatting:
  property_order:
    - tags
    - aliases
    - description
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
