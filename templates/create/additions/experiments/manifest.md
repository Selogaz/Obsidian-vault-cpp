---
name: 🧪 Experiment
description: "A record of one test with its conditions and results."
enforce_folder: base/additions/experiments
target:
  query: '#mark/addition/experiment'
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
  project:
    type: multilink
    description: "The projects this addition supports."
    label: 🗂️ Project
    sort: alphabetical
    source:
      js: "return dv.pages(\"#project AND -#mark/ignore\").sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🗂️\") + \" \" + p.file.name }))"
  attribute:
    type: select
    description: "The kind of work this item involves."
    label: 🧩 Attribute
    options:
      - value: bug
        description: "Use this for fixing incorrect behavior."
        label: ⚙️ dev | bug
      - value: feature
        description: "Use this for adding a new capability."
        label: ⚙️ dev | feature
      - value: improvement
        description: "Use this for improving existing behavior."
        label: ⚙️ dev | improvement
      - value: performance
        description: "Use this for improving speed or resource use."
        label: ⚙️ dev | performance
      - value: quality
        description: "Use this for improving quality or reliability."
        label: ⚙️ dev | quality
      - value: dataset
        description: "Use this for creating or maintaining a dataset."
        label: 📊 ds | dataset
      - value: pipeline
        description: "Use this for building a data processing workflow."
        label: 📊 ds | pipeline
      - value: model
        description: "Use this for developing or evaluating a model."
        label: 📊 ds | model
      - value: analytics
        description: "Use this for finding useful measures in data."
        label: 📊 ds | analytics
      - value: preprocessing
        description: "Use this for preparing data for later work."
        label: 📊 ds | preprocessing
      - value: experiment
        description: "Use this for testing an idea under set conditions."
        label: 🔬 res | experiment
      - value: research
        description: "Use this for investigating a question."
        label: 🔬 res | research
      - value: analysis
        description: "Use this for examining material to draw conclusions."
        label: 🔬 res | analysis
      - value: literature
        description: "Use this for reviewing related publications."
        label: 🔬 res | literature
      - value: insight
        description: "Use this for recording a useful finding."
        label: 🔬 res | insight
      - value: deploy
        description: "Use this for releasing a system or service."
        label: 🐳 ops | deploy
      - value: container
        description: "Use this for building or maintaining a container."
        label: 🐳 ops | container
      - value: server
        description: "Use this for setting up or maintaining a server."
        label: 🐳 ops | server
      - value: cicd
        description: "Use this for automating build and release steps."
        label: 🐳 ops | cicd
      - value: monitoring
        description: "Use this for tracking system health and behavior."
        label: 🐳 ops | monitoring
      - value: security
        description: "Use this for protecting systems or information."
        label: 🛡️ sec | security
      - value: api
        description: "Use this for building or maintaining a service interface."
        label: 🛡️ sec | api
      - value: architecture
        description: "Use this for designing system structure."
        label: 🛡️ sec | architecture
      - value: task
        description: "Use this for completing a general action."
        label: 🚀 prod | task
      - value: schedule
        description: "Use this for planning time or appointments."
        label: 🚀 prod | schedule
      - value: notes
        description: "Use this for creating or maintaining notes."
        label: 🚀 prod | notes
      - value: reading
        description: "Use this for reading or studying material."
        label: 🚀 prod | reading
      - value: finance
        description: "Use this for managing money or financial records."
        label: 🚀 prod | finance
      - value: shopping
        description: "Use this for buying needed items."
        label: 🚀 prod | shopping
      - value: travel
        description: "Use this for planning or taking a trip."
        label: 🚀 prod | travel
      - value: home
        description: "Use this for maintaining the home."
        label: 🚀 prod | home
      - value: workout
        description: "Use this for strength or general exercise."
        label: ❤️ health | workout
      - value: cardio
        description: "Use this for aerobic exercise."
        label: ❤️ health | cardio
      - value: sauna
        description: "Use this for a sauna session."
        label: ❤️ health | sauna
      - value: health
        description: "Use this for general health work."
        label: ❤️ health | health
      - value: sleep
        description: "Use this for sleep and recovery."
        label: ❤️ health | sleep
      - value: nutrition
        description: "Use this for planning or tracking food and nutrition."
        label: ❤️ health | nutrition
  input:
    type: text
    description: "The material, setup, or conditions used in this experiment."
    label: ⬇️ Input
  output:
    type: text
    description: "The result observed or produced by this experiment."
    label: ⬆️ Output
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
    fixed: 🧪
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#5ea0db"
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
