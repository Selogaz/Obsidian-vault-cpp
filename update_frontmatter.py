import os
import frontmatter

# Директория с файлами (укажите ваш путь)
directory = "/home/exuberance/Документы/Obsidian/Obsidian-vault-cpp"

for root, _, files in os.walk(directory):
    for filename in files:
        if not filename.endswith(".md"):
            continue

        filepath = os.path.join(root, filename)
        try:
            post = frontmatter.load(filepath)
        except Exception as e:
            print(f"Ошибка при загрузке {filename}: {e}")
            continue

        # Проверяем наличие и валидность тегов
        if "tags" not in post.metadata:
            continue
            
        tags = post.metadata["tags"]
        
        # Пропускаем если tags=None или не является списком
        if tags is None or not isinstance(tags, list):
            print(f"Пропуск {filename}: tags=None или не список")
            continue

        # Проверяем наличие нужных тегов
        has_exact = "note/specific/exact" in tags
        has_work = "category/work" in tags

        if has_exact and has_work:
            # Создаем новый список тегов
            new_tags = [
                "note/specific/code" if tag == "note/specific/exact" else
                "category/java" if tag == "category/work" else
                tag
                for tag in tags
            ]
            
            # Обновляем только если есть изменения
            if new_tags != tags:
                post.metadata["tags"] = new_tags
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(frontmatter.dumps(post))
                print(f"Обновлено: {filename}")
