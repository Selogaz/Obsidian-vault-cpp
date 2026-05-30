#!/usr/bin/env python3
"""
Add zotero: deep links to Obsidian source notes by matching titles
against Zotero items from .library.json (Better BibTeX export).

Usage: python3 .link_zotero.py
Run AFTER importing orphan.bib into Zotero and re-exporting .library.json.
"""

import json
import os
import re
import unicodedata
from pathlib import Path

# Paths resolve relative to this script (files/zotero-sync/), so it runs from any CWD.
SCRIPT_DIR = Path(__file__).resolve().parent
VAULT_ROOT = SCRIPT_DIR.parents[1]
LIBRARY_FILE = str(SCRIPT_DIR / ".library.json")
SOURCES_DIR = str(VAULT_ROOT / "sources")


def sanitize_key(name: str) -> str:
    """Mirror of .generate_bibtex.py sanitize_key — note stem → citation key.

    The orphans were imported with exactly these keys, so this gives a
    deterministic, mismatch-proof note→Zotero link without fuzzy guessing.
    """
    name = name.replace(" ", "_").replace("-", "_")
    name = re.sub(r"[^a-zA-Z0-9_Ѐ-ӿ]", "", name)
    name = re.sub(r"_+", "_", name).strip("_").lower()
    if not name:
        name = "untitled"
    return name[:80]


def normalize(text: str) -> str:
    text = unicodedata.normalize("NFKD", text)
    text = text.lower().strip()
    text = re.sub(r"[^a-z0-9а-яё\s]", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def title_similarity(a: str, b: str) -> float:
    a = normalize(a)
    b = normalize(b)
    if not a or not b:
        return 0.0
    if a == b:
        return 1.0
    if a in b or b in a:
        return 0.9
    words_a = set(a.split())
    words_b = set(b.split())
    if not words_a or not words_b:
        return 0.0
    intersection = words_a & words_b
    union = words_a | words_b
    return len(intersection) / len(union)


def load_library(filepath: str):
    if not os.path.exists(filepath):
        print(f"❌ {filepath} not found. Export from Better BibTeX first.")
        return None
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    items = {}
    for item in data.get("items", []):
        key = item.get("citationKey")
        if key:
            title = item.get("title", "")
            items[key] = {"title": title, "citationKey": key}
    print(f"📚 Loaded {len(items)} items from {filepath}")
    return items


def find_matches(orphan_notes, zotero_items, threshold=0.6):
    matches = []
    no_match = []

    for note_name in orphan_notes:
        best_key = None
        best_score = 0
        best_title = ""

        for zkey, zdata in zotero_items.items():
            score = title_similarity(note_name, zdata["title"])
            if score > best_score:
                best_score = score
                best_key = zkey
                best_title = zdata["title"]

        if best_score >= threshold:
            matches.append((note_name, best_key, best_title, best_score))
        else:
            no_match.append((note_name, best_score, best_title))

    return matches, no_match


def add_zotero_link(filepath: str, citekey: str) -> bool:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    if "zotero:" in content:
        return False

    zotero_link = f'zotero: "[🇿](zotero://select/items/@{citekey})"'

    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            new_content = f"---\n{parts[1]}{zotero_link}\n---{parts[2]}"
            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                return True
    return False


def main():
    zotero_items = load_library(LIBRARY_FILE)
    if not zotero_items:
        return

    sources_path = Path(SOURCES_DIR)
    orphans = []
    for f in sources_path.glob("*.md"):
        if f.name == ".gitkeep":
            continue
        content = f.read_text(encoding="utf-8")
        if "zotero:" not in content:
            orphans.append((f.stem, f))

    print(f"🔍 Matching {len(orphans)} orphan notes against Zotero items...\n")

    # 1. Deterministic match: note stem → sanitize_key → citationKey.
    lib_keys = set(zotero_items.keys())
    matches = []
    unresolved = []
    for name, _ in orphans:
        key = sanitize_key(name)
        if key in lib_keys:
            matches.append((name, key, zotero_items[key]["title"], 1.0))
        else:
            unresolved.append(name)

    # 2. Fuzzy title fallback only for whatever didn't match deterministically.
    fuzzy_matches, no_match = find_matches(unresolved, zotero_items)
    matches.extend(fuzzy_matches)
    print(f"   {len(matches)} matched "
          f"({len(matches) - len(fuzzy_matches)} by key, {len(fuzzy_matches)} by title)\n")

    linked = 0
    if matches:
        print("=== Matched notes ===")
        for name, zkey, ztitle, score in sorted(matches, key=lambda x: -x[3]):
            path = os.path.join(SOURCES_DIR, f"{name}.md")
            note_path = Path(path)
            if note_path.exists():
                if add_zotero_link(str(note_path), zkey):
                    linked += 1
                    print(f"  ✅ {name}")
                    print(f"     → {zkey}: {ztitle} (score: {score:.2f})")
                else:
                    print(f"  ⏭️  {name} — already has zotero link (skipped)")
        print()

    if no_match:
        print("=== Unmatched notes (manual check needed) ===")
        for name, best_score, best_title in sorted(no_match, key=lambda x: -x[1]):
            print(f"  ❌ {name}")
            if best_score > 0:
                print(f"     Best guess: {best_title} (score: {best_score:.2f} — too low)")
        print()

    print(f"\n🎉 Done! Added zotero links to {linked} notes.")
    if no_match:
        print(f"⚠️  {len(no_match)} notes could not be matched automatically.")
        print("   Check unmatched list and add zotero: links manually.")


if __name__ == "__main__":
    main()
