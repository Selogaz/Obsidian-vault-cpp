---
name: ⭕ contact
description: "A person note for someone you know or work with directly."
enforce_folder: base/contacts
target:
  query: '"base/contacts" OR #contact'
fields:
  tags:
    type: multiselect
    description: "The contact type and other marks applied here."
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    default: contact/working
    options:
      source:
        js: "return app.vault.getMarkdownFiles().filter(f => f.path.startsWith(\"templates/create/contacts\") && f.basename === \"manifest\").map(f => { const cache = app.metadataCache.getFileCache(f); const tag = String((cache.frontmatter.target || {}).query || \"\").match(/#[\\w/-]+/); if (!tag || !tag[0].includes(\"/\")) return null; const icon = (cache.frontmatter.fields && cache.frontmatter.fields.icon && cache.frontmatter.fields.icon.fixed) || \"\"; const slug = tag[0].slice(1); const last = slug.split(\"/\").pop(); const description = cache.frontmatter.description; return { value: slug, description: description ? `Use this for ${description.charAt(0).toLowerCase()}${description.slice(1).replace(/[.]$/,String())}.` : undefined, label: icon + \" \" + last }; }).filter(Boolean);"
    strict: false
  aliases:
    type: list
    description: "Other names for this note."
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  description:
    type: text
    description: "Who this person is and how you know them."
    label: 🪪 Description
    required: true
  addition:
    type: list
    description: "Links to supporting material attached to this note."
    label: ➕ Addition
    sort: alphabetical
    required: false
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
  production:
    type: multilink
    description: "The organizations linked to this note."
    label: 🏬 Production
    sort: alphabetical
    required: true
    validate_exists: false
    source:
      js: "return dv.pages(\"#production\").where(p => [].concat(p.category || []).some(c => [].concat(currentPage && currentPage.category || []).map(String).includes(String(c)))).map(p => ({ value: p.file.name, description: (typeof p.description === \"string\" ? p.description : undefined), label: (p.icon || \"🏬\") + \" \" + p.file.name }));"
  relevant:
    type: boolean
    description: "Whether this note is still relevant."
    required: true
    default: false
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
    - addition
    - category
    - meta
    - problem
    - production
    - relevant
    - cover
    - created
    - updated
---
