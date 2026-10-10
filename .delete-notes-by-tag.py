#!/usr/bin/env python3
"""
Script to find and delete notes with a specified tag in a given directory.

Usage:
    python3 delete-notes-by-tag.py [tag] [relative_path]

Examples:
    python3 delete-notes-by-tag.py category/clojure
    python3 delete-notes-by-tag.py category/python base/notes
    python3 delete-notes-by-tag.py note/specific/code .
"""
import sys
import re
from pathlib import Path


def has_tag(file_path, tag):
    """Check if a markdown file contains the specified tag as an actual tag"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Check for inline tags (e.g., #category/clojure)
        inline_tag_pattern = rf"(?:^|\s)#{re.escape(tag)}(?:\s|$)"
        if re.search(inline_tag_pattern, content, re.MULTILINE):
            return True

        # Check for YAML frontmatter tags
        # Extract frontmatter
        frontmatter_match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
        if frontmatter_match:
            frontmatter = frontmatter_match.group(1)

            # Look for tags section in frontmatter
            # Pattern 1: tags as a list (with - prefix)
            #   tags:
            #     - category/clojure
            tags_list_pattern = r"^\s*tags:\s*\n((?:\s*-\s+.+\n)*)"
            tags_match = re.search(tags_list_pattern, frontmatter, re.MULTILINE)
            if tags_match:
                tags_section = tags_match.group(1)
                # Check each tag line
                tag_line_pattern = rf"^\s*-\s+{re.escape(tag)}\s*$"
                if re.search(tag_line_pattern, tags_section, re.MULTILINE):
                    return True

            # Pattern 2: tags as inline array
            #   tags: [category/clojure, other/tag]
            tags_inline_pattern = r"^\s*tags:\s*\[([^\]]+)\]"
            tags_inline_match = re.search(
                tags_inline_pattern, frontmatter, re.MULTILINE
            )
            if tags_inline_match:
                tags_content = tags_inline_match.group(1)
                # Split by comma and check each tag
                tags_list = [t.strip() for t in tags_content.split(",")]
                if tag in tags_list:
                    return True

        return False
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False


def find_notes_with_tag(search_path, tag):
    """Find all markdown files with the specified tag in the given path"""
    notes_with_tag = []

    # Search through all markdown files in the search path
    for md_file in search_path.rglob("*.md"):
        if has_tag(md_file, tag):
            notes_with_tag.append(md_file)

    return notes_with_tag


def main():
    # Get script directory
    script_dir = Path(__file__).parent.absolute()

    # Parse command line arguments
    if len(sys.argv) < 2:
        print("Usage: python3 delete-notes-by-tag.py [tag] [relative_path]")
        print("\nExamples:")
        print("  python3 delete-notes-by-tag.py category/clojure")
        print("  python3 delete-notes-by-tag.py category/python base/notes")
        print("  python3 delete-notes-by-tag.py note/specific/code .")
        sys.exit(1)

    tag = sys.argv[1]
    relative_path = sys.argv[2] if len(sys.argv) > 2 else "."

    # Resolve the search path
    search_path = (script_dir / relative_path).resolve()

    if not search_path.exists():
        print(
            f"Error: Path '{relative_path}' does not exist (resolved to {search_path})"
        )
        sys.exit(1)

    if not search_path.is_dir():
        print(f"Error: Path '{relative_path}' is not a directory")
        sys.exit(1)

    print(f"Searching for notes with tag '{tag}' in '{relative_path}'...")
    notes_with_tag = find_notes_with_tag(search_path, tag)

    if not notes_with_tag:
        print(f"No notes found with tag '{tag}'.")
        return

    print(f"\nFound {len(notes_with_tag)} notes with tag '{tag}':")
    for note in notes_with_tag:
        try:
            relative_to_search = note.relative_to(search_path)
            print(f"  - {relative_to_search}")
        except ValueError:
            print(f"  - {note}")

    # Confirm deletion
    response = input(
        f"\nDo you want to delete these {len(notes_with_tag)} notes? (yes/no): "
    )

    if response.lower() in ["yes", "y"]:
        deleted_count = 0
        for note in notes_with_tag:
            try:
                note.unlink()
                try:
                    relative_to_search = note.relative_to(search_path)
                    print(f"Deleted: {relative_to_search}")
                except ValueError:
                    print(f"Deleted: {note}")
                deleted_count += 1
            except Exception as e:
                try:
                    relative_to_search = note.relative_to(search_path)
                    print(f"Error deleting {relative_to_search}: {e}")
                except ValueError:
                    print(f"Error deleting {note}: {e}")

        print(f"\nSuccessfully deleted {deleted_count} notes.")
    else:
        print("Deletion cancelled.")


if __name__ == "__main__":
    main()
