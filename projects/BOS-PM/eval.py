import json
from pathlib import Path

rows = json.loads(Path("result.json").read_text())
source = Path("input.md").read_text()
assert [r["id"] for r in rows] and sorted(r["id"] for r in rows) == [6, 7, 8], "Проверь выбор тем по разбору ошибок"
for row in rows:
    section = source.split(f'- А{row["id"]}\n', 1)[1].split('\n- А', 1)[0]
    quote = row["evidence"].strip()
    assert quote and quote in section, f'Проверь цитату для А{row["id"]}'
    assert row["action"].strip(), "Пропущен следующий шаг"
print("PASS · три ожидаемые темы · цитаты из нужных разделов · действия заполнены")
