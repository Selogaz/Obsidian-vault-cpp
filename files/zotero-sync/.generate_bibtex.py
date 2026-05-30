#!/usr/bin/env python3
"""Generate BibTeX file from orphan Obsidian source notes for Zotero import."""

import os
import re
import unicodedata
from pathlib import Path

# Paths resolve relative to this script (files/zotero-sync/), so it runs from any CWD.
SCRIPT_DIR = Path(__file__).resolve().parent
VAULT_ROOT = SCRIPT_DIR.parents[1]
SOURCES_DIR = str(VAULT_ROOT / "sources")
OUTPUT_FILE = str(SCRIPT_DIR / "orphan.bib")

TYPE_MAP = {
    "source/article/paper": ("article", "article"),
    "source/book": ("book", "book"),
    "source/video/recording": ("misc", "video"),
    "source/article/resource": ("misc", "webpage"),
    "source/course": ("misc", "course"),
    "source/cinematic/movie": ("misc", "movie"),
    "source/cinematic/anime": ("misc", "anime"),
    "source/game": ("misc", "game"),
}

DEFAULT_TYPE = ("misc", "other")


def sanitize_key(name: str) -> str:
    name = name.replace(" ", "_").replace("-", "_")
    name = re.sub(r"[^a-zA-Z0-9_\u0400-\u04FF]", "", name)
    name = re.sub(r"_+", "_", name).strip("_").lower()
    if not name:
        name = "untitled"
    return name[:80]


def extract_frontmatter(content: str) -> dict:
    fm = {}
    if not content.startswith("---"):
        return fm
    parts = content.split("---", 2)
    if len(parts) < 3:
        return fm
    block = parts[1]

    m = re.search(r"^aliases:\s*\n\s*-\s*\"(.+?)\"", block, re.MULTILINE)
    if m:
        fm["title"] = m.group(1).strip()

    url_match = re.search(r"url:\s*\n\s*-\s*(?:\"\[.+\]\((.+?)\)\"|(.+))", block)
    if url_match:
        fm["url"] = url_match.group(1) or url_match.group(2)
    url_match_inline = re.search(r"url:\s*\"(.+?)\"", block)
    if not fm.get("url") and url_match_inline:
        fm["url"] = url_match_inline.group(1)

    types = re.findall(r"source/([\w/]+)", block)
    fm["type"] = types[0] if types else None

    cats = re.findall(r"category:\s*\n\s*-\s*\"\[\[(.+?)\]\]\"", block)
    fm["categories"] = cats

    metas = re.findall(r"meta:\s*\n\s*-\s*\"\[\[(.+?)\]\]\"", block)
    fm["metas"] = metas

    problems = re.findall(r"problem:\s*\n\s*-\s*\"\[\[(.+?)\]\]\"", block)
    fm["problems"] = problems

    creators = re.findall(r"creator:\s*\n\s*-\s*\"\[\[(.+?)\]\]\"", block)
    if not creators:
        m = re.search(r"^creator:[ \t]+\"?([^\"\n\[]+?)\"?[ \t]*$", block, re.MULTILINE)
        if m and m.group(1).strip():
            creators = [m.group(1).strip()]
    fm["creators"] = creators

    statuses = re.findall(r"status:\s*(📥|🟥|🟦|🟩|❄|⬛|⚛)", block)
    fm["status"] = statuses[0] if statuses else None

    ratings = re.findall(r"rating:\s*(🌕|🌔|🌓|🌒|🌑)", block)
    fm["rating"] = ratings[0] if ratings else None

    scientificity = re.findall(r"scientificity:\s*(🅰️|🅱️|👓|📢|💬)", block)
    fm["scientificity"] = scientificity[0] if scientificity else None

    return fm


def main():
    sources_path = Path(SOURCES_DIR)
    entries = []

    for f in sorted(sources_path.glob("*.md")):
        if f.name == ".gitkeep":
            continue
        content = f.read_text(encoding="utf-8")
        if "zotero:" in content:
            continue

        fm = extract_frontmatter(content)
        title = fm.get("title") or f.stem
        key = sanitize_key(f.stem)

        if fm["type"] and fm["type"] in TYPE_MAP:
            bibtype, zt = TYPE_MAP[fm["type"]]
        else:
            bibtype, zt = DEFAULT_TYPE

        lines = []
        lines.append(f"% Original: sources/{f.name}")
        lines.append(f"% Type: source/{fm['type'] or 'unknown'}")
        if fm.get("categories"):
            lines.append(f"% Categories: {', '.join(fm['categories'])}")
        if fm.get("metas"):
            lines.append(f"% Meta-notes: {', '.join(fm['metas'])}")
        if fm.get("problems"):
            lines.append(f"% Problems: {', '.join(fm['problems'])}")
        if fm.get("status"):
            lines.append(f"% Status in Obsidian: {fm['status']}")
        if fm.get("rating"):
            lines.append(f"% Rating in Obsidian: {fm['rating']}")
        if fm.get("scientificity"):
            lines.append(f"% Scientificity in Obsidian: {fm['scientificity']}")

        keywords = []
        if fm.get("status"):
            keywords.append(fm["status"])
        if fm.get("rating"):
            keywords.append(fm["rating"])
        if fm.get("scientificity"):
            keywords.append(fm["scientificity"])

        groups = []
        cats = fm.get("categories") or []
        metas_list = fm.get("metas") or [None]
        probs_list = fm.get("problems") or [None]
        for cat in cats:
            base = f"🗺️ {cat}"
            for meta in metas_list:
                mid = base + (f"/⇶ {meta}" if meta else "")
                for prob in probs_list:
                    full = mid + (f"/⚡ {prob}" if prob else "")
                    if full not in groups:
                        groups.append(full)
        if not cats:
            for meta in fm.get("metas") or []:
                groups.append(f"⇶ {meta}")
            for prob in fm.get("problems") or []:
                groups.append(f"⚡ {prob}")

        creators = fm.get("creators") or []
        author_value = " and ".join(creators) if creators else "Unknown"

        lines.append(f"@{bibtype}{{{key},")
        lines.append(f"  title = {{{title}}},")
        lines.append(f"  author = {{{author_value}}},")

        if keywords:
            lines.append(f"  keywords = {{{', '.join(keywords)}}},")
        if groups:
            lines.append(f"  groups = {{{', '.join(groups)}}},")

        if fm.get("url") and fm["url"].startswith("http"):
            lines.append(f'  url = {{{fm["url"]}}},')
            lines.append(f'  howpublished = {{\\url{{{fm["url"]}}}}},')

        lines.append(f'  note = {{Obsidian source: {f.stem}}}')
        lines.append("}")
        lines.append("")

        entries.append("\n".join(lines))

    output = "% Generated by .generate_bibtex.py\n"
    output += "% Import this file into Zotero (File > Import)\n"
    output += "% After import, enrich: authors, dates, collections (emoji-prefixed), tags\n\n"
    output += "\n".join(entries)

    Path(OUTPUT_FILE).write_text(output, encoding="utf-8")
    total = len(entries)
    print(f"✅ Generated {OUTPUT_FILE} with {total} BibTeX entries")
    print(f"   Import into Zotero: File → Import → {OUTPUT_FILE}")
    print(f"   Then enrich metadata in Zotero and re-export .library.json")


if __name__ == "__main__":
    main()
