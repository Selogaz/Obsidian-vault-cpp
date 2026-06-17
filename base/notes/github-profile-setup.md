---
tags:
  - note/basic/primary
  - category/webdev
aliases: []
icon: 📝
color: "#70a0b5"
created: 2026-05-31T15:56:44+03:00
updated: 2026-06-17T13:01:14+03:00
---

# Настройка профильного README на GitHub ([Selogaz](https://github.com/Selogaz/Selogaz))

Инструкция по сборке [профиля](https://github.com/ocapraro) с карточками статистики (github-readme-stats) и блоком WakaTime «время по языкам».

---

## 0. Что это вообще такое

«Профильный README» — это специальный репозиторий, имя которого **совпадает с ником** (`Selogaz/Selogaz`). GitHub показывает его `README.md` прямо на странице профиля `github.com/Selogaz`.

- Карточки Stats / Top Languages / Streak / Trophies — это **картинки по ссылкам** на внешние сервисы. Ничего хостить не нужно, работают сразу.
- Блок WakaTime («this week i spent my time on…») заполняет **GitHub Action** раз в сутки, беря данные из твоего аккаунта WakaTime.

---

## 1. Создать репозиторий профиля

1. New repository → имя **ровно `Selogaz`** (совпадает с ником) → **Public** → отметить «Add a README».
2. Должна появиться плашка «✨ You found a secret!» — значит имя угадано верно.

---

## 2. Залить README

1. Замени содержимое `README.md` на готовый текст (файл `profile-README.md`).
2. Открой `github.com/Selogaz` — карточки **Stats / Top Languages / Streak / Trophies** отрисуются сразу.
3. Блок WakaTime пока пустой — это нормально, его заполнит Action (шаги ниже).

Тема всех карточек — **Tokyo Night** (`theme=tokyonight` в ссылках).

---

## 3. WakaTime — отслеживание времени

1. Зарегистрируйся на [wakatime.com](https://wakatime.com).
2. Settings → Account → скопируй **Secret API Key** (вид: `waka_xxxxxxxx-...`).
3. Поставь плагин WakaTime в редактор — [VS Code WakaTime](https://marketplace.visualstudio.com/items?itemName=WakaTime.vscode-wakatime), введи в нём API Key.
	 - Без этого в блоке будет «No activity tracked» — данные просто ещё не собираются.

---

## 4. GitHub-токен (GH_TOKEN)

Нужен, чтобы Action мог **записать обновлённый README** обратно в репозиторий.

### Вариант A — Classic (проще)
GitHub → Settings (профиля) → Developer settings → Personal access tokens → **Tokens (classic)** → Generate new token (classic):
- Отметить **только `repo`**.
- **`workflow` НЕ отмечать** — он нужен лишь для правки файлов в `.github/workflows/`, а Action правит только README.
- Скопировать токен (показывается один раз).

### Вариант B — Fine-grained (безопаснее, по минимуму прав)
Developer settings → **Fine-grained tokens** → Generate new token:
- Repository access → **Only select repositories** → выбрать `Selogaz/Selogaz`.
- Repository permissions:
	- **Contents: Read and write** (чтобы коммитить README)
	- **Metadata: Read-only** (ставится автоматически)
- Больше ничего.

> Для базовой статистики «время по языкам» доступ к коду репозиториев не нужен — данные идут из WakaTime. Доступ к репам нужен только если позже захочешь учитывать приватные коммиты.

---

## 5. Добавить секреты в репозиторий

⚠️ **Реальные ключи вставляются ТОЛЬКО сюда — в защищённое хранилище, не в файлы.**

Репозиторий `Selogaz/Selogaz` → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**. Добавить два:

| Name (точно так) | Значение |
|---|---|
| `WAKATIME_API_KEY` | ключ из шага 3 |
| `GH_TOKEN` | токен из шага 4 |

Секреты зашифрованы, не видны после сохранения, не попадают в код и маскируются в логах (`***`).

---

## 6. Добавить workflow-файл

Положить файл `.github/workflows/waka.yml` в репозиторий `Selogaz/Selogaz`.

**Важно:** в этом файле ключей НЕТ — только плейсхолдеры `${{ secrets.WAKATIME_API_KEY }}` и `${{ secrets.GH_TOKEN }}`. GitHub подставляет реальные значения из секретов на лету. Поэтому файл безопасно держать в публичном репозитории.

### Способ A — через сайт
Репозиторий → **Add file → Create new file** → имя целиком: `.github/workflows/waka.yml` (слэши создадут папки) → вставить содержимое → Commit.

### Способ B — через git по ssh
```bash
git clone git@github.com:Selogaz/Selogaz.git
mkdir -p Selogaz/.github/workflows
cp /home/exuberance/waka.yml Selogaz/.github/workflows/waka.yml
cd Selogaz && git add .github/workflows/waka.yml && git commit -m "Add WakaTime workflow" && git push
```

Содержимое `waka.yml`:
```yaml
name: Waka Readme

on:
  schedule:
    # Запуск каждый день в 00:30 UTC
    - cron: "30 0 * * *"
  workflow_dispatch:

jobs:
  update-readme:
    name: Update README with WakaTime stats
    runs-on: ubuntu-latest
    steps:
      - uses: anmol098/waka-readme-stats@master
        with:
          WAKATIME_API_KEY: ${{ secrets.WAKATIME_API_KEY }}
          GH_TOKEN: ${{ secrets.GH_TOKEN }}
          SHOW_OS: "True"
          SHOW_PROJECTS: "True"
```

---

## 7. Запустить

Вкладка **Actions** → workflow «Waka Readme» → **Run workflow** (первый запуск вручную).
Он заполнит блок между маркерами `<!--START_SECTION:waka-->` … `<!--END_SECTION:waka-->`.
Дальше обновляется сам раз в сутки (по cron).

---

## Чек-лист

- [ ] Репозиторий `Selogaz/Selogaz` создан (Public)
- [ ] README заменён на `profile-README.md`
- [ ] Карточки Stats/Languages/Streak/Trophies видны на профиле
- [ ] Зарегистрирован WakaTime, API Key вставлен в плагин VS Code
- [ ] Создан токен (`repo` classic ИЛИ fine-grained с Contents: write)
- [ ] Секреты `WAKATIME_API_KEY` и `GH_TOKEN` добавлены в Settings репозитория
- [ ] Файл `.github/workflows/waka.yml` добавлен
- [ ] Workflow запущен вручную, блок WakaTime заполнился

---

## Возможные проблемы

- **Блок WakaTime пустой / «No activity tracked»** — данные ещё не накопились или API Key не вставлен в плагин редактора. Поработай в коде, подожди.
- **Action падает с 403 / permission** — проверь `GH_TOKEN` (нужен scope `repo` у classic, либо Contents: write у fine-grained) и что секрет назван точно `GH_TOKEN`.
- **Карточки не грузятся / rate limit** — публичные инстансы github-readme-stats иногда упираются в лимиты GitHub API; обычно проходит само, либо можно поднять свой инстанс на Vercel.
- **README не виден на профиле** — имя репозитория должно ТОЧНО совпадать с ником и быть Public, файл — `README.md` в корне.
