---
name: local-today
description: "Lightweight daily briefing for local LLMs. Creates today's daily note with a seed idea and relevant links — optimized for small models (qwen2.5-1m:14b, qwen3.5:9b-32k). Triggers: 'today local', 'local briefing', 'lightweight today', 'быстрый брифинг'. Use instead of 'today' skill when using local/small models."
---

# Local Today

Lightweight daily briefing optimized for small local LLMs. Simplifies the full "today" skill for models with limited context or token budget.

## Key Differences from "today"

| Aspect | today skill | local_today |
|--------|-------------|-------------|
| Context gather | 5+ sources, complex | 2-3 sources, simple |
| Inbox migration | Full GTD processing | Skip entirely |
| Sections | 5 sections max | 2-3 sections max |
| Seed types | 6 types | 1-2 types only |
| Output size | ~500 words | ~200 words max |

## Daily Note

**Path:** `periodic/daily/YYYY-MM-DD.md`

**Frontmatter:**
```yaml
---
tags:
  - periodic/day
up:
  - "[[periodic/weekly/YYYY-WWW|YYYY-WWW]]"
created: YYYY-MM-DDTHH:mm:ss+HH:MM
cssclasses:
  - hide-backlinks
---
```

## Execution (5 steps max)

1. **Get date** → YYYY-MM-DD
2. **Check note exists?** → Create if not
3. **Gather context** (minimal):
   - Read last 2 daily notes
   - Find 1 active project (status 🟥 or 🟦)
   - Find 3 recent vault notes (base/, sources/)
4. **Generate seed** (one idea only, from context)
5. **Write briefing** → Append to note

## Briefing Format

```markdown
> [!briefing]- Briefing
> **Seed:** [One idea from vault content — 2 sentences max]
> 
> **Materials:**
> - [[note 1]] — [1 line why relevant]
> - [[note 2]] — [1 line why relevant]
> 
> **Projects:**
> - [[Project]] 🟦: [1 line connection]
```

## Seed Generation (Simplified)

Pick ONE:

1. **Synthesis**: Connect 2 notes user hasn't connected
2. **Resource**: Surface 1 forgotten source with useful insight

Rules:
- Max 2 sentences
- Must cite actual vault content
- No questions — state something

## Output

Write directly to note. Chat confirmation:
```
✅ Briefing written to periodic/daily/YYYY-MM-DD.md
Seed: [idea]
2 materials, 1 project link
```

## Language

Detect from recent daily notes. Russian if Cyrillic > 30%, else English.

## Anti-patterns

- No inbox migration (skip for local models)
- No weekly note scanning
- No threads section
- No more than 3 materials
- Don't ask — generate and write
