---
tags:
  - status/done
  - source/article/resource
  - category/webdev
aliases: []
published:
addition:
zotero: "[🇿](zotero://select/items/@how_to_connect_figma_to_opencode)"
status: 🟩
rating:
scientificity:
category:
  - "[[webdev]]"
meta:
problem:
creator:
production:
start: 2026-05-21T19:04:04+03:00
end:
url:
  - https://mehmetbaykar.com/posts/how-to-integrate-figma-mcp-in-claude-and-opencode/
cover:
icon: 🌐
color: "#7575c0"
created: 2026-05-21T19:04:04+03:00
updated: 2026-05-21T19:06:52+03:00
---

Источник, в котором упоминается этот источник - https://forum.figma.com/suggest-a-feature-11/figma-s-approach-breaks-the-core-promise-of-mcp-52507

`~/.config/opencode/opencode.json`
```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "models": {
        "qwen3.5:9b-32k": {
          "_launch": true,
          "name": "qwen3.5:9b-32k"
        }
      },
      "name": "Ollama",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://127.0.0.1:11434/v1"
      }
    }
  },
  "skills": {
    "enabled": true,
    "paths": [
      "/home/exuberance/.claude/skills",
      "./.claude/skills"
    ]
  },
  "mcp": {
    "obsidian-hybrid-search": {
      "type": "local",
      "command": ["npx", "-y", "-p", "obsidian-hybrid-search@latest", "obsidian-hybrid-search-mcp"],
      "environment": {
        "OBSIDIAN_VAULT_PATH": "/home/exuberance/Документы/Obsidian/Obsidian-vault-cpp",
        "OBSIDIAN_IGNORE_PATTERNS": ".obsidian/**,templates/**",
        "OPENAI_API_KEY": "ollama",
        "OPENAI_BASE_URL": "http://localhost:11434/v1",
        "OPENAI_EMBEDDING_MODEL": "bge-m3"
      },
      "timeout": 30000
    },
     "figma": {
       "type": "local",
       "command": ["npx", "-y", "figma-developer-mcp", "--stdio"],
       "environment": {
         "FIGMA_API_KEY": "your_key"
       },
       "enabled": true,
       "timeout": 60000
     }
   },
  "tools": {
    "bash": true,
    "filesystem": true
  }
}

```
