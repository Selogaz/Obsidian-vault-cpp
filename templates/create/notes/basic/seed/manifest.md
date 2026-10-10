---
name: 🌱 Seed
description: "A new note with only a title or rough idea."
target:
  query: '#note/basic/seed AND -#note/discourse'
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🌱
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#85a560"
---

A seed may be only a title or a few words. The idea is worth keeping, but it still needs to be developed in your own words.

A seed usually has

- a promising title or rough idea
- little useful context
- few or no useful links

Move it to Fern when the idea is clear enough to develop.
