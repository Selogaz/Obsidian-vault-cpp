---
aliases:
  - inbox
obsidianUIMode: preview
cssclasses:
  - category
  - fleetings
icon: ✈️
---

`BUTTON[add-fleeting, add-inbox-task, add-idea, add-log]` `$=await dv.view("templates/views/inbox")`

````tabs
tab: 🧭 triage
~~~~tabs
tab: 1 · 👻 Orphans
~~~columns
column:
weight: 5
![[fleetings.base#👻 Orphans (cards)]]
`BUTTON[send-to-category, delete-unlinked-notes]`
column:
weight: 2
`$=await dv.view("templates/views/filing")`
~~~

tab: 2 · 🗺️ Without category
~~~columns
column:
weight: 5
![[triage.base#🗺️ Without Category: Last 12 Months]]
`BUTTON[send-to-category]`
column:
weight: 2
`$=await dv.view("templates/views/filing")`
~~~

tab: 3 · 🏝️ Islands
`$=await dv.view("templates/views/islands")`
~~~~

tab: ✅ tasks
~~~~tabs
tab: \- [ ] Inline Tasks
~~~columns
column: 📥 Inbox
weight: 2
```tasks
(not done) OR (done today)
tags include #task/inbox
sort by path reverse
hide tags
hide task count
short mode
```
column: 💡 Ideas
weight: 3
```tasks
(not done) OR (done today)
tags include #task/idea
sort by path reverse
hide tags
hide task count
short mode
```
~~~

tab: ✔️ Task Notes
![[tasks.base#📋 Workflow: Kanban (v)]]
~~~~

tab: 🗣️ interim
![[interim.base#📋 Workflow: Kanban (v)]]

tab: 📅 periodic
~~~~tabs
tab: 👁 To Review
![[periodic.base#👁 Days: To Review]]
~~~columns
column:
![[periodic.base#👁 Weeks: To Review]]
column:
![[periodic.base#👁 Months: To Review]]
column:
![[periodic.base#👁 Quarters: To Review]]
column:
![[periodic.base#👁 Years: To Review]]
~~~

tab: 🇩 Days
![[periodic.base#🇩ays]]

tab: 📈 Statistics
![[periodic.base#📈 Statistics]]

tab: 🗓️ Review
![[periodic.base#👁 Review]]
~~~~

tab: 🆕 recent
~~~~tabs
tab: 📅 Today
![[recent.base#📅 Today activity]]

tab: 🕓 Latest
~~~columns
column:
![[recent.base#🔄 Last Updated]]
column:
![[recent.base#🆕 Last Created]]
~~~
~~~~
````
