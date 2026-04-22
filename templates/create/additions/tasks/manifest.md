---
name: ✅ Task
enforce_folder: base/tasks
target:
  query: "#task/default"
fields:
  tags:
    type: select
    label: 🏷️ Tags
    sort: alphabetical
    options:
      - value: task/default
        label: ✔️ task
      - value: task/milestone
        label: 📍 milestone
  aliases:
    type: list
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  id:
    type: text
    label: 🆔 ID
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
  description:
    type: text
    label: 🪪 Description
    required: true
  project:
    type: multilink
    label: 🗂️ Project
    sort: alphabetical
    source:
      js: 'return dv.pages("#project AND -#mark/ignore").sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "🗂️") + " " + p.file.name }))'
  milestone:
    type: multilink
    label: 🎯 Milestone
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#task/milestone AND -#mark/ignore").where(p => [].concat(p.project || []).some(c => [].concat(currentPage && currentPage.project || []).map(String).includes(String(c)))).sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "🎯") + " " + p.file.name }))'
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
  priority:
    type: select
    label: 🔺 Priority
    required: true
    default: 🇨
    options:
      - value: 🇦
        label: 🇦 Important and urgent
      - value: 🇧
        label: 🇧 Important and non-urgent
      - value: 🇨
        label: 🇨 Сommon project
      - value: 🇩
        label: 🇩 Delegate
      - value: 🇪
        label: 🇪 Eliminate
  related:
    type: multilink
    label: 🔗 Related
    sort: alphabetical
    source:
      js: 'return dv.pages("#task/default AND -#mark/ignore").where(p => [].concat(p.project || []).some(c => [].concat(currentPage && currentPage.project || []).map(String).includes(String(c)))).sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "✔️") + " " + p.file.name }))'
  blockedBy:
    type: multilink
    label: ⛔ Blocked by
    sort: alphabetical
    source:
      js: 'return dv.pages("#task/default AND -#mark/ignore").where(p => [].concat(p.project || []).some(c => [].concat(currentPage && currentPage.project || []).map(String).includes(String(c)))).sort(p => p.file.name).map(p => ({ value: p.file.name, label: (p.icon || "⛔") + " " + p.file.name }))'
  category:
    type: multilink
    label: 🗺️ Category
    sort: alphabetical
    source:
      js: 'return dv.pages("#system/category AND -#mark/ignore").map(p => ({ value: p.file.name, label: (p.icon || "🗺️") + " " + p.file.name }))'
  meta:
    type: multilink
    label: 🔎 Meta
    sort: alphabetical
    source:
      js: 'return dv.pages("#system/high/meta AND -#mark/ignore").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "🔎") + " " + p.file.name }))'
  problem:
    type: multilink
    label: ⚡ Problem
    sort: alphabetical
    source:
      js: 'return dv.pages("#system/high/problem AND -#mark/ignore").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "⚡") + " " + p.file.name }))'
  creator:
    type: multilink
    label: 👨 Creator
    required: true
    validate_exists: false
    sort: alphabetical
    source:
      js: 'return dv.pages("#creator OR #contact").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "👨") + " " + p.file.name }));'
  production:
    type: multilink
    label: 🏬 Production
    required: true
    validate_exists: false
    sort: alphabetical
    source:
      js: 'return dv.pages("#production").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, label: (p.icon || "🏬") + " " + p.file.name }));'
  url:
    type: text
    label: 🔗 URL
  start:
    type: date
    label: 🚩 Start
    required: true
  end:
    type: date
    label: 🏁 End
    required: true
  icon:
    type: text
    required: true
    hidden: true
    fixed: ✓
  color:
    type: text
    required: true
    hidden: true
    fixed: "#d8d8d8"
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
    - id
    - attribute
    - description
    - project
    - milestone
    - status
    - priority
    - related
    - blockedBy
    - category
    - meta
    - problem
    - creator
    - production
    - url
    - start
    - end
    - icon
    - color
    - created
    - updated
---
