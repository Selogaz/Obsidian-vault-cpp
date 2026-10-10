---
tags:
  - category/linux
  - system/category
aliases:
description:
cssclasses:
  - category
relevant: false
icon: 🗺️
color: "#2a9080"
---

`BUTTON[add-source, add-project, add-person, add-fleeting, add-meta, add-problem, add-hierarchy]` `$=await dv.view("templates/views/category")`

````tabs
tab: 🗃️ sources
~~~~tabs
left
tab: 📖 In work
![[sources.base#📋 Workflow: Kanban (v)]]

tab: 🌕 Rate
~~~columns
column: 🟩 Finished, not rated yet
weight: 5
![[sources.base#🌕 Workflow: Rate]]
column: 🌕 Rating
weight: 2
`$=await dv.view("templates/views/filing", {target: "values", property: "rating", values: [["🌕", "masterpiece"], ["🌔", "great"], ["🌓", "good"], ["🌒", "mediocre"], ["🌑", "poor"]]})`
~~~

tab: 🅰️ Classify
~~~columns
column: 🗃️ Sources without scientificity
weight: 5
![[sources.base#🅰️ Workflow: Classify]]
column: 🅰️ Scientificity
weight: 2
`$=await dv.view("templates/views/filing", {target: "values", property: "scientificity", values: [["🅰️", "primary research"], ["🅱️", "secondary research"], ["👓", "expert/industry"], ["📢", "popular science/journalism"], ["💬", "opinion/unverified"]]})`
~~~

tab: 🖼️ Library
![[sources.base#🖼️ Gallery: Covers]]

tab: ⬛ Drop
![[sources.base#⬛ Status: Drop]]

tab: ✅ Validation
![[sources.base#✅ Structure Validation]]
~~~~

tab: 🏢 projects
~~~~tabs
left
tab: 🛠️ In work
![[projects.base#📋 Workflow: Kanban (v)]]

tab: 🔺 Prioritize
~~~columns
column: 🛠️ Active projects by priority
weight: 5
![[projects.base#🔺 Workflow: Prioritize]]
column: 🔺 Priority
weight: 2
`$=await dv.view("templates/views/filing", {target: "values", property: "priority", values: [["🔺", "important and urgent"], ["⏫", "important"], ["🔼", "medium"], ["◽", "normal"], ["🔽", "delegate"], ["⏬", "eliminate"]]})`
~~~

tab: 📢 Published
![[projects.base#📢 Status: Published]]

tab: ❄ Hold · ⬛ Drop
~~~columns
column: ❄ Hold
![[projects.base#❄ Status: Hold]]
column: ⬛ Drop
![[projects.base#⬛ Status: Drop]]
~~~

tab: ✅ Validation
![[projects.base#✅ Structure Validation]]
~~~~

tab: 👥 people
~~~~tabs
left
tab: 🖼️ Cards
![[people.base#🖼️ Cards]]

tab: 📇 Table
![[people.base#👥 All People]]

tab: 🗄️ By type
![[people.base#🗄️ Group: By Type]]

tab: ✅ Validation
![[people.base#✅ Structure Validation]]
~~~~

tab: 📝 notes
~~~~tabs
left
tab: 📝 All
![[notes.base#🏷️ All: Tagged]]
`BUTTON[move-all-up]`
![[fleetings.base#🧬 Via Hierarchies]]

tab: 🧩 Unfiled
~~~columns
column: 🧩 Not collected yet
weight: 3
![[notes.base#🧩 Workflow: Unfiled]]
column: 🧬 Hierarchies · ⇶ Aggregators
weight: 2
`$=await dv.view("templates/views/filing", {target: "hierarchies"})`

`$=await dv.view("templates/views/filing", {target: "aggregators"})`
~~~

tab: 🌱 Grow
~~~columns
column: 📝 Basic notes by stage
weight: 5
![[notes.base#🌱 Workflow: Grow]]
column: 🌱 Stages
weight: 2
`$=await dv.view("templates/views/filing", {target: "stages"})`
~~~

tab: 🗂 Topics
![[notes.base#🗂 Group: By Subcategory]]

tab: 🕓 Recent
~~~columns
column: 🕓 Recently updated
weight: 3
![[notes.base#🕓 Recent]]
column: 🌉 Shared with other categories
weight: 2
![[notes.base#🌉 Cross-Category]]
~~~

tab: 🃏 Cards
`BUTTON[change-deck]`
![[notes.base#🃏 Group: By Deck]]
~~~~

tab: 🔬 system
~~~~tabs
left
tab: 🗄️ By type
![[high-notes.base#🗄️ Group: By Type]]

tab: 🧭 Levels
~~~columns
column: 🔎 Meta-notes
![[high-notes.base#🔎 Type: Meta-notes]]
column: ⚡ Problems
![[high-notes.base#⚡ Type: Problems]]
column: 🧬 Hierarchies
![[high-notes.base#🧬 Type: Hierarchies]]
~~~

tab: 🧭 Refine
~~~columns
column: 🧭 Sources, projects and people by meta-note
weight: 5
![[triage.base#🔎 Group: By Meta]]
column: 🔎 Meta-notes · ⚡ Problems
weight: 2
`$=await dv.view("templates/views/filing", {target: "meta-notes"})`

`$=await dv.view("templates/views/filing", {target: "problems"})`
~~~

tab: ✅ Validation
![[high-notes.base#✅ Structure Validation]]
~~~~

tab: 🌳 structure
![[high-notes.base#🌳 Structure: Tree]]

tab: ✅ tasks
~~~~tabs
left
tab: \- [ ] Inline Tasks
`$=await dv.view("templates/views/tasks/category")`

tab: ✔️ Task Notes
`BUTTON[task-update-relation]`
![[tasks.base#📋 Workflow: Kanban (v)]]

tab: ❄ Hold · ⬛ Drop
~~~columns
column: ❄ Hold
![[tasks.base#❄ Status: Hold]]
column: ⬛ Drop
![[tasks.base#⬛ Status: Drop]]
~~~

tab: ✅ Validation
![[tasks.base#✅ Structure Validation]]
~~~~

tab: ➕
💤
````
