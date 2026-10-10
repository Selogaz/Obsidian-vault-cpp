---
name: ⭕ project
description: "A finite body of work with one result that defines completion."
target:
  query: "#project"
fields:
  tags:
    type: multiselect
    description: "The project type and other marks applied here."
    label: 🏷️ Tags
    required: true
    default: project/single
    sort: alphabetical-desc
    options:
      source:
        js: "return app.vault.getMarkdownFiles().filter(f => f.path.startsWith(\"templates/create/projects\") && f.basename === \"manifest\").map(f => { const cache = app.metadataCache.getFileCache(f); const tag = String((cache.frontmatter.target || {}).query || \"\").match(/#[\\w/-]+/); if (!tag || !tag[0].includes(\"/\")) return null; const icon = (cache.frontmatter.fields && cache.frontmatter.fields.icon && cache.frontmatter.fields.icon.fixed) || \"\"; const slug = tag[0].slice(1); const last = slug.split(\"/\").pop(); const description = cache.frontmatter.description; return { value: slug, description: description ? `Use this for ${description.charAt(0).toLowerCase()}${description.slice(1).replace(/[.]$/,String())}.` : undefined, label: icon + \" \" + last }; }).filter(Boolean);"
    strict: false
  aliases:
    type: list
    description: "Other names for this note."
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  description:
    type: text
    description: The result this project should produce.
    label: 🪪 Description
    required: true
  published:
    type: date
    description: "When this work was published."
    label: 📢 Published
  addition:
    type: list
    description: "Links to supporting material attached to this note."
    label: ➕ Addition
    sort: alphabetical
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
  category:
    type: multilink
    description: "The broad areas linked to this note."
    label: 🗺️ Category
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#system/category AND -#mark/ignore\").map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🗺️\") + \" \" + p.file.name }))"
  meta:
    type: multilink
    description: "The topic hubs linked to this note."
    label: 🔎 Meta
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#system/high/meta AND -#mark/ignore\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🔎\") + \" \" + p.file.name }))"
  problem:
    type: multilink
    description: "The research questions linked to this note."
    label: ⚡ Problem
    sort: alphabetical
    required: true
    source:
      js: "return dv.pages(\"#system/high/problem AND -#mark/ignore\").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"⚡\") + \" \" + p.file.name }))"
  creator:
    type: multilink
    description: "The people who created or contributed to this work."
    label: 👨 Creator
    sort: alphabetical
    required: true
    validate_exists: false
    source:
      js: "return dv.pages(\"#creator OR #contact\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"👨\") + \" \" + p.file.name }));"
  production:
    type: multilink
    description: "The organizations linked to this note."
    label: 🏬 Production
    sort: alphabetical
    required: true
    validate_exists: false
    source:
      js: "return dv.pages(\"#production\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🏬\") + \" \" + p.file.name }));"
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
  url:
    type: list
    description: "Links to related pages or resources."
    label: 🔗 URL
    sort: alphabetical
  cover:
    type: url
    description: "The image used as the cover for this note."
    label: 🖼️ Cover
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
  - name: end on close
    description: "Sets end to today when the project is published, done or dropped and end is empty."
    when: "(status=📢 OR status=🟩 OR status=⬛) AND end="
    then:
      set: { end: "{{today}}" }
  - name: published date
    description: "Sets published to today when the project is published and published is empty."
    when: "status=📢 AND published="
    then:
      set: { published: "{{today}}" }
  - name: meta from problem
    description: "Fills an empty meta with the meta notes of the linked problems."
    when:
      and:
        - "meta="
        - problem: {}
    then:
      set: { meta: "{{problem>meta}}" }
  - name: category from meta
    description: "Fills an empty category with the categories of the linked meta notes."
    when:
      and:
        - "category="
        - meta: {}
    then:
      set: { category: "{{meta>category}}" }
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
  - name: status tags belong to status
    description: "Removes status/* tags; the status rules below add the right one."
    when: "-#mark/log AND -#mark/no_sync"
    then:
      remove: { tags: "status/*" }
  - name: status todo
    description: "Adds the status/todo tag."
    when: "status=🟥 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/todo } }
  - name: status wip
    description: "Adds the status/wip tag."
    when: "status=🟦 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/wip } }
  - name: status done
    description: "Adds the status/done tag."
    when: "status=🟩 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/done } }
  - name: status atom
    description: "Adds the status/atom tag."
    when: "status=⚛ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/atom } }
  - name: status published
    description: "Adds the status/published tag."
    when: "status=📢 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/published } }
  - name: status hold
    description: "Adds the status/hold tag."
    when: "status=❄ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/hold } }
  - name: status drop
    description: "Adds the status/drop tag."
    when: "status=⬛ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/drop } }
  - name: priority tags belong to priority
    description: "Removes priority/* tags; the priority rules below add the right one."
    when: "-#mark/log AND -#mark/no_sync"
    then:
      remove: { tags: "priority/*" }
  - name: priority highest
    description: "Adds the priority/highest tag."
    when: "priority=🔺 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: priority/highest } }
  - name: priority high
    description: "Adds the priority/high tag."
    when: "priority=⏫ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: priority/high } }
  - name: priority medium
    description: "Adds the priority/medium tag."
    when: "priority=🔼 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: priority/medium } }
  - name: priority normal
    description: "Adds the priority/normal tag."
    when: "priority=◽ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: priority/normal } }
  - name: priority low
    description: "Adds the priority/low tag."
    when: "priority=🔽 AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: priority/low } }
  - name: priority lowest
    description: "Adds the priority/lowest tag."
    when: "priority=⏬ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: priority/lowest } }
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
    - published
    - addition
    - status
    - priority
    - category
    - meta
    - problem
    - creator
    - production
    - start
    - end
    - url
    - cover
    - created
    - updated
---
