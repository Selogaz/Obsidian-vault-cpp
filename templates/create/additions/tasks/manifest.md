---
name: ✅ Task
description: "A project action tracked with status, priority, and dependencies."
enforce_folder: base/tasks
target:
  query: "#task/default"
fields:
  tags:
    type: multiselect
    description: "The type of this task note, plus category tags kept in sync with the category links."
    label: 🏷️ Tags
    sort: alphabetical
    strict: false
    options:
      - value: task/default
        description: "Use this for one action that belongs to a project."
        label: ✔️ task
      - value: task/milestone
        description: "Use this for a checkpoint that groups project tasks."
        label: 📍 milestone
  aliases:
    type: list
    description: "Other names for this note."
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  description:
    type: text
    description: "The result this task should produce."
    label: 🪪 Description
    required: true
  id:
    type: text
    description: "The unique identifier for this task."
    label: 🆔 ID
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
  project:
    type: multilink
    description: "The projects this task belongs to."
    label: 🗂️ Project
    sort: alphabetical
    source:
      js: "return dv.pages(\"#project AND -#mark/ignore\").sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🗂️\") + \" \" + p.file.name }))"
  milestone:
    type: multilink
    description: "The checkpoints this task contributes to."
    label: 🎯 Milestone
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#task/milestone AND -#mark/ignore\").where(p => [].concat(p.project || []).some(c => [].concat(currentPage && currentPage.project || []).map(String).includes(String(c)))).sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🎯\") + \" \" + p.file.name }))"
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
  priority:
    type: select
    description: "How urgently this work needs attention."
    label: 🔺 Priority
    required: true
    default: ◽
    options:
      - value: 🔺
        description: "Use this for critical work that needs immediate attention."
        label: 🔺 Highest (important and urgent)
      - value: ⏫
        description: "Use this for important work that is not urgent."
        label: ⏫ High (important, not urgent)
      - value: 🔼
        description: "Use this for work with medium priority."
        label: 🔼 Medium
      - value: ◽
        description: "Use this for routine work with normal priority."
        label: ◽ Normal
      - value: 🔽
        description: "Use this for low priority work that can be delegated."
        label: 🔽 Low (delegate)
      - value: ⏬
        description: "Use this for work that should be reviewed or removed."
        label: ⏬ Lowest (eliminate)
  related:
    type: multilink
    description: "Other tasks connected to this task."
    label: 🔗 Related
    sort: alphabetical
    source:
      js: "return dv.pages(\"#task/default AND -#mark/ignore\").where(p => [].concat(p.project || []).some(c => [].concat(currentPage && currentPage.project || []).map(String).includes(String(c)))).sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"✔️\") + \" \" + p.file.name }))"
  blockedBy:
    type: multilink
    description: "Tasks that must finish before this task can continue."
    label: ⛔ Blocked by
    sort: alphabetical
    source:
      js: "return dv.pages(\"#task/default AND -#mark/ignore\").where(p => [].concat(p.project || []).some(c => [].concat(currentPage && currentPage.project || []).map(String).includes(String(c)))).sort(p => p.file.name).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"⛔\") + \" \" + p.file.name }))"
  category:
    type: multilink
    description: "The broad areas linked to this note."
    label: 🗺️ Category
    sort: alphabetical
    source:
      js: "return dv.pages(\"#system/category AND -#mark/ignore\").map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🗺️\") + \" \" + p.file.name }))"
  meta:
    type: multilink
    description: "The topic hubs linked to this note."
    label: 🔎 Meta
    sort: alphabetical
    source:
      js: "return dv.pages(\"#system/high/meta AND -#mark/ignore\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🔎\") + \" \" + p.file.name }))"
  problem:
    type: multilink
    description: "The research questions linked to this note."
    label: ⚡ Problem
    sort: alphabetical
    source:
      js: "return dv.pages(\"#system/high/problem AND -#mark/ignore\").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"⚡\") + \" \" + p.file.name }))"
  creator:
    type: multilink
    description: "The people who created or contributed to this work."
    label: 👨 Creator
    required: true
    validate_exists: false
    sort: alphabetical
    source:
      js: "return dv.pages(\"#creator OR #contact\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"👨\") + \" \" + p.file.name }));"
  production:
    type: multilink
    description: "The organizations linked to this note."
    label: 🏬 Production
    required: true
    validate_exists: false
    sort: alphabetical
    source:
      js: "return dv.pages(\"#production\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🏬\") + \" \" + p.file.name }));"
  url:
    type: list
    description: "Links to related pages or resources."
    label: 🔗 URL
    sort: alphabetical
  start:
    type: date
    description: "When work on this item started."
    label: 🚩 Start
    required: true
  end:
    type: date
    description: "When work on this item ended."
    label: 🏁 End
    required: true
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: ✓
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#d8d8d8"
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
rules:
  - name: start on wip
    description: "Sets start to today when work moves to WIP and start is empty."
    when: "status=🟦 AND start="
    then:
      set: { start: "{{today}}" }
  - name: hold while blocked
    description: "Puts a waiting task on hold while a task in blockedBy is still open."
    when:
      and:
        - "status=📥 OR status=🟥"
        - blockedBy: { when: "status=📥 OR status=🟥 OR status=🟦 OR status=❄" }
    then:
      set: { status: ❄ }
  - name: release when unblocked
    description: "Returns a held task to ToDo when every task in blockedBy is closed."
    when:
      and:
        - "status=❄"
        - blockedBy: {}
        - not:
            - blockedBy: { when: "status=📥 OR status=🟥 OR status=🟦 OR status=❄" }
    then:
      set: { status: 🟥 }
  - name: end on close
    description: "Sets end to today when the task is published, done or dropped and end is empty."
    when: "(status=📢 OR status=🟩 OR status=⬛) AND end="
    then:
      set: { end: "{{today}}" }
  - name: category follows project
    description: "Copies category from the project. A task keeps its own when it has no project or the project has no category."
    when: { project: { when: "-category=" } }
    then:
      set: { category: "{{project>category}}" }
  - name: meta follows project
    description: "Copies meta from the project. A task keeps its own when it has no project or the project has no meta."
    when: { project: { when: "-meta=" } }
    then:
      set: { meta: "{{project>meta}}" }
  - name: problem follows project
    description: "Copies problem from the project. A task keeps its own when it has no project or the project has no problem."
    when: { project: { when: "-problem=" } }
    then:
      set: { problem: "{{project>problem}}" }
  - name: category from creator
    description: "Fills an empty category with the categories of the linked creators. A category that is already set is never changed."
    when:
      and:
        - "category="
        - creator: { when: "-category=" }
    then:
      set: { category: "{{creator>category}}" }
  - name: category from production
    description: "Fills an empty category with the categories of the linked organizations. A category that is already set is never changed."
    when:
      and:
        - "category="
        - production: { when: "-category=" }
    then:
      set: { category: "{{production>category}}" }
  - name: category tags
    description: "Keeps category/* tags in sync with the category links."
    when: "-#mark/log AND -#mark/no_sync"
    then:
      remove: { tags: "category/*" }
      add: { tags: 'category/{{category|name|replace:" ","_"}}' }
  - name: hub links live in the right property
    description: "Moves category, meta and problem links to the property matching the linked note's current type."
    then:
      add:
        category: { meta: { when: "#system/category" }, problem: { when: "#system/category" } }
        meta: { category: { when: "#system/high/meta" }, problem: { when: "#system/high/meta" } }
        problem: { category: { when: "#system/high/problem" }, meta: { when: "#system/high/problem" } }
      remove:
        category: { when: "#system/high/meta OR #system/high/problem" }
        meta: { when: "#system/category OR #system/high/problem" }
        problem: { when: "#system/category OR #system/high/meta" }
formatting:
  property_order:
    - tags
    - aliases
    - description
    - id
    - attribute
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
