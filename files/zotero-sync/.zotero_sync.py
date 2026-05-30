#!/usr/bin/env python3
import json
import re
from pathlib import Path

# Configuration — paths resolve relative to this script (files/zotero-sync/),
# so it runs correctly from any CWD (incl. the inotify watcher).
SCRIPT_DIR = Path(__file__).resolve().parent
VAULT_ROOT = SCRIPT_DIR.parents[1]
LIBRARY_FILE = str(SCRIPT_DIR / ".library.json")
SOURCES_DIR = str(VAULT_ROOT / "sources")

STATUS_MAP = {"📥": "🟥", "🟥": "🟥", "🟦": "🟦", "🟩": "🟩", "❄": "❄", "✖": "⬛"}
RATING_MAP = {"🌕": "🌕", "🌔": "🌔", "🌓": "🌓", "🌒": "🌒", "🌑": "🌑"}
SCIENTIFICITY_MAP = {"🅰️": "🅰️", "🅱️": "🅱️", "👓": "👓", "📢": "📢", "💬": "💬"}
COLLECTION_MAP = {
    "🗺️": "category",
    "⇶": "meta",
    "🔬": "meta",
    "🔎": "meta",
    "⚡": "problem",
}

MANAGED_KEYS = {"status", "rating", "scientificity", "category", "meta", "problem"}


def load_zotero_library(filepath):
    print(f"📚 Reading Zotero library: {filepath}...")
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"❌ File {filepath} not found.")
        return None, None, None

    items_by_key = {}
    for item in data.get("items", []):
        if "citationKey" in item:
            items_by_key[item["citationKey"]] = item

    # 1. Карта коллекций по ключу (для поиска родителей)
    # Key -> Collection Data
    collections_by_key = data.get("collections", {})

    # 2. Reverse Lookup: ItemID -> Direct Collection Keys (не имен, а ключей!)
    item_id_to_coll_keys = {}
    for coll_key, coll in collections_by_key.items():
        coll_items = coll.get("items", [])
        for raw_id in coll_items:
            item_id = str(raw_id)
            if item_id not in item_id_to_coll_keys:
                item_id_to_coll_keys[item_id] = []
            item_id_to_coll_keys[item_id].append(coll_key)

    print(f"✅ Loaded {len(items_by_key)} items.")
    return items_by_key, item_id_to_coll_keys, collections_by_key


def get_all_collection_names_recursive(direct_coll_keys, collections_by_key):
    """
    Возвращает имена всех коллекций: прямых И их родителей вверх по дереву.
    """
    all_names = set()

    # Очередь для обхода (начинаем с прямых родителей)
    queue = list(direct_coll_keys)
    visited = set(direct_coll_keys)  # Чтобы не зациклиться

    while queue:
        current_key = queue.pop(0)
        coll_data = collections_by_key.get(current_key)

        if coll_data:
            # Добавляем имя текущей коллекции
            if "name" in coll_data:
                all_names.add(coll_data["name"])

            # Проверяем родителя
            parent_key = coll_data.get("parent")
            # В Better BibTeX parent может быть false или пустой строкой, если нет родителя
            if parent_key and parent_key not in visited:
                visited.add(parent_key)
                queue.append(parent_key)

    return all_names


def extract_metadata(
    item, item_id_to_coll_keys, collections_by_key, collections_map_config
):
    meta = {
        "status": None,
        "rating": None,
        "scientificity": None,
        "category": [],
        "meta": [],
        "problem": [],
    }

    for tag_obj in item.get("tags", []):
        tag = tag_obj["tag"]
        if tag in STATUS_MAP:
            meta["status"] = STATUS_MAP[tag]
        elif tag in RATING_MAP:
            meta["rating"] = RATING_MAP[tag]
        elif tag in SCIENTIFICITY_MAP:
            meta["scientificity"] = SCIENTIFICITY_MAP[tag]

    item_id = str(item.get("itemID"))

    # Получаем ключи прямых коллекций
    direct_keys = item_id_to_coll_keys.get(item_id, [])

    # Получаем имена ВСЕХ коллекций (включая родителей)
    all_collection_names = get_all_collection_names_recursive(
        direct_keys, collections_by_key
    )

    for coll_name in all_collection_names:
        for icon, field in collections_map_config.items():
            if coll_name.startswith(icon):
                clean_name = coll_name.replace(icon, "", 1).strip()
                link = f"[[{clean_name}]]"
                if link not in meta[field]:
                    meta[field].append(link)
    return meta


def generate_field_lines(key, value):
    if not value:
        return [f"{key}:"]
    if isinstance(value, (set, list)):
        sorted_vals = sorted(list(value))
        lines = [f"{key}:"]
        for item in sorted_vals:
            lines.append(f'  - "{item}"')
        return lines
    else:
        return [f"{key}: {value}"]


def update_file_content(content, zotero_meta):
    lines = content.splitlines()
    if not lines or lines[0].strip() != "---":
        return content, False
    try:
        fm_end_idx = lines.index("---", 1)
    except ValueError:
        return content, False

    old_fm_lines = lines[1:fm_end_idx]
    body = lines[fm_end_idx:]

    new_fm_lines = []
    processed_keys = set()

    i = 0
    while i < len(old_fm_lines):
        line = old_fm_lines[i]
        match = re.match(r"^([\w\-]+):\s*(.*)", line)

        if match:
            key = match.group(1)
            if key in MANAGED_KEYS:
                processed_keys.add(key)
                z_val = zotero_meta.get(key)
                new_lines = generate_field_lines(key, z_val)
                new_fm_lines.extend(new_lines)
                i += 1
                while i < len(old_fm_lines):
                    if re.match(r"^\s*-", old_fm_lines[i]):
                        i += 1
                    else:
                        break
                continue

        new_fm_lines.append(line)
        i += 1

    for key in MANAGED_KEYS:
        if key not in processed_keys:
            z_val = zotero_meta.get(key)
            if z_val:
                new_lines = generate_field_lines(key, z_val)
                new_fm_lines.extend(new_lines)

    new_content = "---\n" + "\n".join(new_fm_lines) + "\n" + "\n".join(body)
    is_changed = new_content != content
    return new_content, is_changed


def process_file(
    file_path,
    zotero_items,
    item_id_coll_keys,
    collections_by_key,
    collections_map_config,
):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # [\w\-] matches Cyrillic citation keys too (sanitize_key keeps Ѐ-ӿ)
        citekey_match = re.search(r"zotero://select(?:/library)?/items/@([\w\-]+)", content)
        if not citekey_match:
            return False

        citekey = citekey_match.group(1)
        if citekey not in zotero_items:
            return False

        zotero_item = zotero_items[citekey]
        # Передаем всё дерево коллекций
        new_meta = extract_metadata(
            zotero_item, item_id_coll_keys, collections_by_key, collections_map_config
        )

        new_content, is_modified = update_file_content(content, new_meta)

        if is_modified:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"📝 Updated: {file_path.name}")
            return True

    except Exception as e:
        print(f"⚠️ Error {file_path.name}: {e}")

    return False


def main():
    # Load items AND collection tree
    res = load_zotero_library(LIBRARY_FILE)
    if not res or not res[0]:
        return
    z_items, z_item_coll_keys, z_colls_tree = res

    sources_path = Path(SOURCES_DIR)
    if not sources_path.exists():
        print(f"❌ Directory {SOURCES_DIR} not found.")
        return

    count = 0
    for file_path in sources_path.rglob("*.md"):
        if process_file(
            file_path, z_items, z_item_coll_keys, z_colls_tree, COLLECTION_MAP
        ):
            count += 1

    print(f"\n🎉 Done! Updated files: {count}")


if __name__ == "__main__":
    main()
