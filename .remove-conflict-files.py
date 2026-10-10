import os

def remove_sync_conflict_files(base_dir):
    for root, dirs, files in os.walk(base_dir, topdown=True):
        # os.walk по умолчанию заходит и в скрытые папки, если они есть
        for file in files:
            if "sync-conflict" in file:
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"Удалён файл: {file_path}")
                except Exception as e:
                    print(f"Ошибка при удалении {file_path}: {e}")

if __name__ == "__main__":
    # Получаем директорию, где лежит скрипт
    script_dir = os.path.dirname(os.path.abspath(__file__))
    remove_sync_conflict_files(script_dir)