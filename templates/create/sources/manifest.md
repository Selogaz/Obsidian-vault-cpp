---
name: ⭕ source
description: A source note that turns an external work into usable knowledge.
enforce_folder: sources
target:
  query: "#source AND -#mark/log"
fields:
  tags:
    type: multiselect
    label: 🏷️ Tags
    description: The source type and other marks applied here.
    required: true
    default: source/book
    sort: alphabetical-desc
    options:
      source:
        js: 'return app.vault.getMarkdownFiles().filter(f => f.path.startsWith("templates/create/sources") && f.basename === "manifest").map(f => { const cache = app.metadataCache.getFileCache(f); const tag = String((cache.frontmatter.target || {}).query || "").match(/#[\w/-]+/); if (!tag || !tag[0].includes("/")) return null; const icon = (cache.frontmatter.fields && cache.frontmatter.fields.icon && cache.frontmatter.fields.icon.fixed) || ""; const slug = tag[0].slice(1); const last = slug.split("/").pop(); const description = cache.frontmatter.description; return { value: slug, description: description ? `Use this for ${description.charAt(0).toLowerCase()}${description.slice(1).replace(/[.]$/,String())}.` : undefined, label: icon + " " + last }; }).filter(Boolean);'
    strict: false
  aliases:
    type: list
    label: 🔖 Aliases
    description: Other names for this note.
    required: true
    sort: alphabetical
  description:
    type: text
    description: A short summary of what this source covers.
    label: 🪪 Description
    required: true
  published:
    type: date
    label: 📢 Published
    description: When this work was published.
  addition:
    type: list
    label: ➕ Addition
    description: Links to supporting material attached to this note.
    required: true
    sort: alphabetical
  zotero:
    type: url
    label: 🇿 Zotero
    description: The Zotero record for this source.
  status:
    type: select
    label: 💯 Status
    description: The current stage of this work.
    required: true
    default: 📥
    options:
      - value: ⬛
        description: Use this for work that was abandoned or duplicated.
        label: ⬛ Drop
      - value: 📥
        description: Use this for work that still needs review and sorting.
        label: 📥 Inbox
      - value: 🟥
        description: Use this for work that is ready to start.
        label: 🟥 ToDo
      - value: 🟦
        description: Use this for work that is currently active.
        label: 🟦 WIP
      - value: ⚛
        description: Use this while turning a source into knowledge notes.
        label: ⚛ Atom
      - value: 🟩
        description: Use this for work that is complete.
        label: 🟩 Done
  rating:
    type: select
    label: 🌕 Rating
    description: A final rating of the source's quality and usefulness.
    required: true
    options:
      - value: 🌕
        description: Use this for a source that is excellent in every way.
        label: 🌕 Masterpiece
      - value: 🌔
        description: Use this for a source that is excellent with a few small flaws.
        label: 🌔 Great
      - value: 🌓
        description: Use this for a source that has more strengths than flaws.
        label: 🌓 Good
      - value: 🌒
        description: Use this for a source that has more flaws than strengths.
        label: 🌒 Mediocre
      - value: 🌑
        description: Use this for a source that has almost no strengths.
        label: 🌑 Poor
  scientificity:
    type: select
    label: 🅰️ Scientificity
    description: How the source can be used in academic work.
    required: true
    options:
      - value: 🅰️
        description: Use this for new research that has passed peer review.
        label: 🅰️ Primary research
      - value: 🅱️
        description: Use this for academic work that reviews or tests existing research.
        label: 🅱️ Secondary research
      - value: 👓
        description: Use this for expert or industry work without peer review.
        label: 👓 Expert / Industry
      - value: 📢
        description: Use this for information made for a general audience.
        label: 📢 Popular science / Journalism
      - value: 💬
        description: Use this for opinions or claims without fact checking.
        label: 💬 Opinion / Unverified
  category:
    type: multilink
    label: 🗺️ Category
    description: The broad areas linked to this note.
    required: true
    sort: alphabetical
    source:
      js: "return dv.pages(\"#system/category AND -#mark/ignore\").map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🗺️\") + \" \" + p.file.name }))"
  meta:
    type: multilink
    label: 🔎 Meta
    description: The topic hubs linked to this note.
    required: true
    sort: alphabetical
    source:
      js: "return dv.pages(\"#system/high/meta AND -#mark/ignore\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🔎\") + \" \" + p.file.name }))"
  problem:
    type: multilink
    label: ⚡ Problem
    description: The research questions linked to this note.
    required: true
    sort: alphabetical
    source:
      js: "return dv.pages(\"#system/high/problem AND -#mark/ignore\").where(p => [].concat(p.meta || []).some(c => [].concat(currentPage && currentPage.meta || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"⚡\") + \" \" + p.file.name }))"
  creator:
    type: multilink
    label: 👨 Creator
    description: The people who created or contributed to this work.
    required: true
    sort: alphabetical
    validate_exists: false
    source:
      js: "return dv.pages(\"#creator\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"👨\") + \" \" + p.file.name }));"
  production:
    type: multilink
    label: 🏬 Production
    description: The organizations linked to this note.
    required: true
    sort: alphabetical
    validate_exists: false
    source:
      js: "return dv.pages(\"#production\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🏬\") + \" \" + p.file.name }));"
  start:
    type: date
    label: 🚩 Start
    description: When work on this item started.
  end:
    type: date
    label: 🏁 End
    description: When work on this item ended.
  url:
    type: list
    label: 🔗 URL
    description: Links to related pages or resources.
    sort: alphabetical
  cover:
    type: url
    label: 🖼️ Cover
    description: The image used as the cover for this note.
  created:
    type: date
    description: When this note was created.
    hidden: true
  updated:
    type: date
    description: When this note was last updated.
    hidden: true
rules:
  - name: start on wip
    description: "Sets start to today when work moves to WIP and start is empty."
    when: "status=🟦 AND start="
    then:
      set: { start: "{{today}}" }
  - name: end on close
    description: "Sets end to today when the source is done or dropped and end is empty."
    when: "(status=🟩 OR status=⬛) AND end="
    then:
      set: { end: "{{today}}" }
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
  - name: status drop
    description: "Adds the status/drop tag."
    when: "status=⬛ AND -#mark/log AND -#mark/no_sync"
    then: { add: { tags: status/drop } }
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
    - zotero
    - status
    - rating
    - scientificity
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
