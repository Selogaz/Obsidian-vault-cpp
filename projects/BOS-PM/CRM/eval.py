import json
import sys
from pathlib import Path

expected = {
    "2026-10-21": {"access": "cancelled", "file": "waiting"},
    "2026-10-26": {"access": "cancelled", "file": "done", "report": "done"},
}
actual = json.loads(Path("result.json").read_text())
assert actual == expected[sys.argv[1]], "Проверь дату среза, состав задач и статусы"
print("PASS", sys.argv[1], actual)
