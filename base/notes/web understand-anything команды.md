---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - understand-anything команды
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-06-11T20:02:55+03:00
updated: 2026-06-11T20:58:20+03:00
---

**understand-anything команды**
—
```zsh
# Ask anything about the codebase
/understand-chat How does the payment flow work?

# Analyze impact of your current changes
/understand-diff

# Deep-dive into a specific file or function
/understand-explain src/auth/login.ts

# Generate an onboarding guide for new team members
/understand-onboard

# Extract business domain knowledge (domains, flows, steps)
/understand-domain

# Analyze a Karpathy-pattern LLM wiki knowledge base
/understand-knowledge ~/path/to/wiki

# Re-run anytime — incremental by default (only re-analyzes changed files)
/understand

# Auto-update on every commit via a post-commit hook
/understand --auto-update

# Scope to a subdirectory (for huge monorepos)
/understand src/frontend
```
