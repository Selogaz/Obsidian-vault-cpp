---
tags:
  - mark/db
cssclasses:
  - hide-backlinks
  - no-inline-title
  - remove-dataview-title
  - native-embed
aliases:
  - inbox
icon: 📥
---

> [!tabbed]+
>
> <label>📥 inbox<input type="radio" name="test" checked/></label>
>
>> `INPUT[inlineSelect(option('source','sources'), option('project', 'projects'), option('note','notes')):inbox_type]` `INPUT[text(placeholder('Search')):inbox_title]`
> > ![[inbox.base]]
>
> <label>✅ tasks<input type="radio" name="test" /></label>
> 
> > ![[inbox]]
> 
> <label>⌛ recent<input type="radio" name="test" /></label>
>
> > `INPUT[text(placeholder('Search')):recent_title]`
> > ![[recent.base]]
> 
> <label>🌲 evergreen<input type="radio" name="test" /></label>
> 
> > `INPUT[inlineListSuggester(option('note/basic/seed','🌱 seed'), option('note/basic/fern', '🌿 fern'), option('note/basic/incubator','♨️ incubator'), option('note/basic/evergreen','🌲 evergreen')):evergreen_type]`  `INPUT[text(placeholder('Search')):evergeen_title]`
> > ![[evergreen.base]]
