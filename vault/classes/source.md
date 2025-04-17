---
limit: 100
mapWithTag: false
icon: clipboard-list
tagNames: 
excludes: 
extends: 
version: "2.489"
fields:
  - id: uH83LG
    name: cover
    options:
      template: "{{url}}"
    type: Input
    path: ""
  - id: 0qx2Xw
    name: start
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
    type: Date
    path: ""
  - id: PhFwKW
    name: end
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
    type: Date
    path: ""
  - id: o8Mk9d
    name: total_hours
    options:
      step: "1"
      min: "0"
    type: Number
    path: ""
  - id: bvq1bp
    name: creator
    options:
      dvQueryString: dv.pages("#creator").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    type: MultiFile
    path: ""
  - id: u93aRN
    name: url
    options:
      template: "'\"[{{site}}]({{url}})\"'"
    type: Input
    path: ""
  - name: aliases
    type: YAML
    options: {}
    path: ""
    id: 0wFTI1
  - name: tags
    type: Multi
    options:
      valuesList:
        "1": mark/active
        "2": source/article
        "3": source/book
        "4": source/course
        "5": source/movie
        "6": source/podcast
        "7": source/video
        "8": category/statistics
        "9": category/computer_science
        "10": category/data_analysis
        "11": category/data_science
        "12": category/database
        "13": category/economics
        "14": category/health
        "15": category/household
        "16": category/learning
        "17": category/artificial_intelligence
        "18": category/knowledge_base
        "19": category/plan
        "20": category/productivity
        "21": category/public
        "22": category/wishlist
        "23": code/r-lang
        "24": code/python
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of tags (sources).md
      valuesFromDVQuery: ""
    path: ""
    id: Z0F9UI
    command:
      id: insert__Z0F9UI
      icon: list-plus
      label: Insert tags field
  - name: published
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 9U8Qnx
  - name: related
    type: MultiFile
    options:
      dvQueryString: dv.pages("#source").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: SjPdUq
  - name: addition
    type: MultiFile
    options:
      dvQueryString: dv.pages("#mark/addition")
    path: ""
    id: JgY9qe
  - name: meta
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/meta AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: 9vDqGw
  - name: production
    type: MultiFile
    options:
      dvQueryString: dv.pages("#production").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: WJDS3k
  - name: category
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/category AND -#mark/ignore")
    path: ""
    id: IfuKIX
  - name: problem
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/problem AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.meta) && current.file.frontmatter.meta.some(v => p.file.frontmatter.meta.includes(v)))
    path: ""
    id: 8eePtm
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🟥
        "2": 🟦
        "3": ⚛
        "4": 🟩
        "5": ⬛
    path: ""
    id: cVMupz
  - name: zotero
    type: Input
    options:
      template: "'\"[🇿](zotero://select/items/@{{zotero_citekey}})\"'"
    path: ""
    id: DWrUqN
  - name: genre
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/genre")
    path: ""
    id: 7cmDTY
  - name: rating
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": ⭐
        "2": ⭐⭐
        "3": ⭐⭐⭐
        "4": ⭐⭐⭐⭐
        "5": ⭐⭐⭐⭐⭐
    path: ""
    id: WbQQ43
filesPaths:
  - sources
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - Z0F9UI
  - 0wFTI1
  - cVMupz
  - WbQQ43
  - uH83LG
  - 9U8Qnx
  - 0qx2Xw
  - PhFwKW
  - o8Mk9d
  - 7cmDTY
  - IfuKIX
  - 9vDqGw
  - 8eePtm
  - SjPdUq
  - bvq1bp
  - WJDS3k
  - JgY9qe
  - u93aRN
  - DWrUqN
---
