---
name: ⭕ note
description: "A knowledge note that captures an idea in your own words."
enforce_folder: base/notes
target:
  query: "#note"
fields:
  tags:
    type: multiselect
    description: "The note type and other marks applied here."
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    options:
      source:
        js: "return [{group:\"Marks\",type:\"multiselect\",options:\"approved,bookmark,aggregator,quote,my,ai,example,kanban\".split(\",\").map(v=>({value:`mark/${v}`,description:({\"approved\": \"Use this for a note you reviewed and approved.\", \"bookmark\": \"Use this for a note you want to find quickly.\", \"aggregator\": \"Use this for a note that collects related notes.\", \"quote\": \"Use this for a note built around quoted material.\", \"my\": \"Use this for a note based on your own ideas.\", \"ai\": \"Use this for a note containing material made with AI.\", \"example\": \"Use this for a note that gives a concrete example.\", \"kanban\": \"Use this for a note used as a Kanban board.\"})[v],label:`mark/${v}`}))},...Object.values(app.vault.getMarkdownFiles().reduce((a,f)=>{let m,c=app.metadataCache.getFileCache(f)?.frontmatter||{},g;return f.path.startsWith(\"templates/create/notes\")&&f.basename==\"manifest\"&&(m=(c.target?.query||\"\").match(/#([\\w/-]+)/))&&m[1].includes(\"/\")?(g=f.parent.parent?.name||\"Other\",(a[g]=a[g]||{group:g,type:\"select\",options:[]}).options.push({value:m[1],description:c.description?`Use this for ${c.description.charAt(0).toLowerCase()}${c.description.slice(1).replace(/[.]$/,String())}.`:undefined,label:[c.fields?.icon?.fixed,m[1].split(\"/\").pop()].filter(Boolean).join(\" \")}),a):a},{})).sort((a,b)=>a.group.localeCompare(b.group))];"
    strict: false
  aliases:
    type: list
    description: "Other names for this note."
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  deck:
    type: select
    description: "The Anki deck that receives cards from this note."
    label: 🃏 Deck
    options:
      source:
        js: "return Array.from(new Set(app.vault.getMarkdownFiles().flatMap(f => [].concat(app.metadataCache.getFileCache(f)?.frontmatter?.deck || []).filter(Boolean)))).sort().map(v => ({value: String(v), description: `Use this for cards stored in ${String(v)}.`, label: String(v)}));"
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    default: 📝
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    default: "#70a0b5"
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
  cssclasses:
    type: multiselect
    description: "The display styles applied to this note."
    label: ⚙️ cssclasses
    options:
      - value: full-width
        description: "Use this to make the note use the full width."
      - value: hide-backlinks
        description: "Use this to hide backlinks."
      - value: hide-properties
        description: "Use this to hide properties."
      - value: no-inline-title
        description: "Use this to hide the note title."
      - value: remove-dataview-title
        description: "Use this to hide Dataview titles."
      - value: hide-embed-heading
        description: "Use this to hide headings in embedded notes."
      - value: task-contrast
        description: "Use this to increase contrast for tasks."
      - value: hide-bases-header
        description: "Use this to hide Bases headers."
      - value: hover-bases-header
        description: "Use this to show Bases headers only on hover."
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
