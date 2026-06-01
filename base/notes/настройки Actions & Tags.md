---
tags:
  - note/specific/exact
  - category/obsidian
aliases: []
deck: obsidian::obsidian
icon: 📝
color: "#d0a570"
created: 2026-06-01T14:49:26+03:00
updated: 2026-06-01T14:49:26+03:00
---

**Настройки Actions & Tags**
—
```js
type: ActionsTagsBackup
author: flowing-abyss
platformVersion: 7.0.24
pluginVersion: 2.2.3
timestamp: '2025-08-23T05:23:01.282Z'
actions:
  1742568170685-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ“¥", "ðŸŸ¥", "todo", "ðŸŸ¦" ,"wip", "ðŸŸ©", "done", "âœ–"];
      const tagToToggle = "ðŸŸ¦";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: status {ðŸŸ¦} WIP
    name: wip
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1742567875638-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ“¥", "ðŸŸ¥", "todo", "ðŸŸ¦" ,"wip", "ðŸŸ©", "done", "âœ–"];
      const tagToToggle = "ðŸŸ¥";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: status {ðŸŸ¥} ToDo
    name: todo
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1746856371893-tSX5kwri:
    event: 1
    operation: 1
    data: ðŸ“¥
    shortcut: ''
    enabled: true
    menu: ðŸ“¥
    name: new
    showInMenu:
      item: false
      collection: false
      tools: false
      reader: false
      readerAnnotation: false
  1742567774865-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ“¥", "ðŸŸ¥", "todo", "ðŸŸ¦" ,"wip", "ðŸŸ©", "done", "âœ–"];
      const tagToToggle = "ðŸ“¥";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: status {ðŸ“¥} Inbox
    name: inbox
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1744268580135-tSX5kwri:
    event: 0
    operation: 3
    data: â­
    shortcut: ''
    enabled: true
    menu: _â­ Favorite
    name: favorite
    showInMenu:
      item: true
      collection: true
      tools: true
      reader: false
      readerAnnotation: false
  1742568268591-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ“¥", "ðŸŸ¥", "todo", "ðŸŸ¦" ,"wip", "ðŸŸ©", "done", "âœ–"];
      const tagToToggle = "âœ–";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: status {âœ–} Drop
    name: drop
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1742568214801-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ“¥", "ðŸŸ¥", "todo", "ðŸŸ¦" ,"wip", "ðŸŸ©", "done", "âœ–"];
      const tagToToggle = "ðŸŸ©";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: status {ðŸŸ©} Done
    name: done
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753250549012-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸŒ•", "ðŸŒ”", "ðŸŒ“", "ðŸŒ’", "ðŸŒ‘"];
      const tagToToggle = "ðŸŒ•";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: rating (5/5) ðŸŒ• Masterpiece
    name: ðŸŒ• Masterpiece
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753250589233-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸŒ•", "ðŸŒ”", "ðŸŒ“", "ðŸŒ’", "ðŸŒ‘"];
      const tagToToggle = "ðŸŒ”";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: rating (4/5) ðŸŒ” Great
    name: ðŸŒ” Great
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753250656754-tSX5kwri:
    event: 0
    operation: 4
    data: |
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸŒ•", "ðŸŒ”", "ðŸŒ“", "ðŸŒ’", "ðŸŒ‘"];
      const tagToToggle = "ðŸŒ“";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: rating (3/5) ðŸŒ“ Good
    name: ðŸŒ“ Good
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753250731264-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸŒ•", "ðŸŒ”", "ðŸŒ“", "ðŸŒ’", "ðŸŒ‘"];
      const tagToToggle = "ðŸŒ’";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: rating (2/5) ðŸŒ’ Mediocre
    name: ðŸŒ’ Mediocre
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753250765159-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸŒ•", "ðŸŒ”", "ðŸŒ“", "ðŸŒ’", "ðŸŒ‘"];
      const tagToToggle = "ðŸŒ‘";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: rating (1/5) ðŸŒ‘ Poor
    name: ðŸŒ‘ Poor
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753249689104-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ…°ï¸", "ðŸ…±ï¸", "ðŸ‘“", "ðŸ“¢", "ðŸ’¬"];
      const tagToToggle = "ðŸ’¬";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: "priority (ðŸ‡ª) ðŸ’¬\_Unverified / Opinion"
    name: "ðŸ‡ª\_Unverified / Opinion"
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753249656048-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ…°ï¸", "ðŸ…±ï¸", "ðŸ‘“", "ðŸ“¢", "ðŸ’¬"];
      const tagToToggle = "ðŸ“¢";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: "priority (ðŸ‡©) ðŸ“¢\_Popular Science / Journalism"
    name: "ðŸ‡©\_Popular Science"
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753249618736-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ…°ï¸", "ðŸ…±ï¸", "ðŸ‘“", "ðŸ“¢", "ðŸ’¬"];
      const tagToToggle = "ðŸ‘“";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: "priority (ðŸ‡¨) ðŸ‘“\_Expert / Industry"
    name: "ðŸ‡¨\_Expert / Industry"
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753249577689-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ…°ï¸", "ðŸ…±ï¸", "ðŸ‘“", "ðŸ“¢", "ðŸ’¬"];
      const tagToToggle = "ðŸ…±ï¸";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: "priority (ðŸ‡§) ðŸ…±ï¸\_Secondary Research"
    name: "ðŸ‡§\_Secondary Research"
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
  1753249469766-tSX5kwri:
    event: 0
    operation: 4
    data: |-
      if (!item) {
          return "Item is empty";
      }

      const ratingTags = ["ðŸ…°ï¸", "ðŸ…±ï¸", "ðŸ‘“", "ðŸ“¢", "ðŸ’¬"];
      const tagToToggle = "ðŸ…°ï¸";

      const hasTag = item.getTags().some(tag => tag.tag === tagToToggle);

      item.getTags().forEach(tagObj => {
          if (ratingTags.includes(tagObj.tag)) {
              item.removeTag(tagObj.tag);
          }
      });

      if (!hasTag) {
          item.addTag(tagToToggle);
          return `[Marked as ${tagToToggle}] for: ${item.getField("title")}`;
      } else {
          return `[Removed tag ${tagToToggle}] from: ${item.getField("title")}`;
      }
    shortcut: ''
    enabled: true
    menu: "priority (ðŸ‡¦) ðŸ…°ï¸\_Primary Research"
    name: "ðŸ‡¦\_Primary Research"
    showInMenu:
      item: true
      collection: true
      tools: false
      reader: false
      readerAnnotation: false
```