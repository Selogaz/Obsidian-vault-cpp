---
name: 🧪 Experiment
enforce_folder: base/additions/experiments
target:
  query: '#mark/addition/experiment'
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
  attribute:
    type: select
    label: 🧩 Attribute
    options:
      - value: bug
        label: ⚙️ dev | bug
      - value: feature
        label: ⚙️ dev | feature
      - value: improvement
        label: ⚙️ dev | improvement
      - value: performance
        label: ⚙️ dev | performance
      - value: quality
        label: ⚙️ dev | quality
      - value: dataset
        label: 📊 ds | dataset
      - value: pipeline
        label: 📊 ds | pipeline
      - value: model
        label: 📊 ds | model
      - value: analytics
        label: 📊 ds | analytics
      - value: preprocessing
        label: 📊 ds | preprocessing
      - value: experiment
        label: 🔬 res | experiment
      - value: research
        label: 🔬 res | research
      - value: analysis
        label: 🔬 res | analysis
      - value: literature
        label: 🔬 res | literature
      - value: insight
        label: 🔬 res | insight
      - value: deploy
        label: 🐳 ops | deploy
      - value: container
        label: 🐳 ops | container
      - value: server
        label: 🐳 ops | server
      - value: cicd
        label: 🐳 ops | cicd
      - value: monitoring
        label: 🐳 ops | monitoring
      - value: security
        label: 🛡️ sec | security
      - value: api
        label: 🛡️ sec | api
      - value: architecture
        label: 🛡️ sec | architecture
      - value: task
        label: 🚀 prod | task
      - value: schedule
        label: 🚀 prod | schedule
      - value: notes
        label: 🚀 prod | notes
      - value: reading
        label: 🚀 prod | reading
      - value: finance
        label: 🚀 prod | finance
      - value: shopping
        label: 🚀 prod | shopping
      - value: travel
        label: 🚀 prod | travel
      - value: home
        label: 🚀 prod | home
      - value: workout
        label: ❤️ health | workout
      - value: cardio
        label: ❤️ health | cardio
      - value: sauna
        label: ❤️ health | sauna
      - value: health
        label: ❤️ health | health
      - value: sleep
        label: ❤️ health | sleep
      - value: nutrition
        label: ❤️ health | nutrition
  input:
    type: text
    label: ⬇️ Input
  output:
    type: text
    label: ⬆️ Output
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
    fixed: 🧪
  color:
    type: text
    required: true
    hidden: true
    fixed: "#5ea0db"
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
    - attribute
    - input
    - output
    - description
    - summary
    - icon
    - color
    - created
    - updated
---
