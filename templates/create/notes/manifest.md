---
name: ⭕ note
enforce_folder: base/notes
target:
  query: "#note"
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    options:
      source:
        js: 'return [{group:"Marks",type:"multiselect",options:"approved,bookmark,aggregator,quote,my,ai,example,kanban".split(",").map(v=>({value:`mark/${v}`,label:`mark/${v}`}))},...Object.values(app.vault.getMarkdownFiles().reduce((a,f)=>{let m,c=app.metadataCache.getFileCache(f)?.frontmatter||{},g;return f.path.startsWith("templates/create/notes")&&f.basename=="manifest"&&(m=(c.target?.query||"").match(/#([\w/-]+)/))&&m[1].includes("/")?(g=f.parent.parent?.name||"Other",(a[g]=a[g]||{group:g,type:"select",options:[]}).options.push({value:m[1],label:[c.fields?.icon?.fixed,m[1].split("/").pop()].filter(Boolean).join(" ")}),a):a},{})).sort((a,b)=>a.group.localeCompare(b.group))];'
    strict: false
  aliases:
    type: list
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  deck:
    type: select
    label: 🃏 Deck
    options:
      source:
        js: "return Array.from(new Set(app.vault.getMarkdownFiles().flatMap(f => [].concat(app.metadataCache.getFileCache(f)?.frontmatter?.deck || []).filter(Boolean)))).sort().map(v => ({value: String(v), label: String(v)}));"
  icon:
    type: text
    required: true
    hidden: true
    default: 📝
  color:
    type: text
    required: true
    hidden: true
    default: "#70a0b5"
  created:
    type: date
    hidden: true
  updated:
    type: date
    hidden: true
  cssclasses:
    type: multiselect
    label: ⚙️ cssclasses
    options:
      - value: full-width
      - value: hide-backlinks
      - value: hide-properties
      - value: no-inline-title
      - value: remove-dataview-title
      - value: hide-embed-heading
      - value: task-contrast
      - value: hide-bases-header
      - value: hover-bases-header
formatting:
  property_order:
    - tags
    - aliases
    - deck
    - cssclasses
    - icon
    - color
    - created
    - updated
    - sr-due
    - sr-interval
    - sr-ease
---
