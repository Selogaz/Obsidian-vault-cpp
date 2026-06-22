---
tags:
  - project/максвелла/process
  - note/specific/code
aliases:
  - аудит проекта
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-10T21:00:37+03:00
updated: 2026-06-21T23:17:11+03:00
---

**аудит проекта**
—
# План рефакторинга front-maxwell

Дата: 2026-05-24. Источник правды — состояние репо на момент написания,
не старый аудит. Что уже сделано — отмечено в разделе «Контекст».

# Статус

План ждет нового дизайна мобильного экрана. Схлопывать пока нет смысла.

## Контекст: что изменилось со времён старого аудита

- **TEST_MODE и локальные auth-роуты удалены** — `src/app/api/auth/*` и
	`src/app/api/me` больше нет, авторизация только через `proxy.ts` →
	backend. В AGENTS.md явно зафиксировано «не восстанавливать TEST_MODE».
	Раздел «security» из старого плана закрыт.
- **`buildCreateCharacterPayload`** уже вынесен в
	[src/lib/characterDraft.ts](../src/lib/characterDraft.ts), `page.tsx` им
	пользуется.
- **`useToast` подключён** в [page.tsx](../src/app/(game)/game/character/page.tsx)
	и `(game)/game/create/page.tsx`; ошибки `createCharacter` уже
	показываются пользователю. Глобального `apiClient` всё ещё нет.
- **`no-scrollbar` утилитарный класс** в `globals.css` уже введён и
	используется в большинстве шагов — старый пункт #7 в основном закрыт
	(остались точечные «inline-styles + magic px», но это уже мелочь).
- **`disabled={!canCreateCharacter}`** уже навешан на desktop-кнопку
	«Создать персонажа». На mobile (`CharacterContinueButton` внутри
	`*StepMobile`) — нет.
- **Дублёры desktop ↔ mobile НЕ схлопнуты** — все 9 пар на месте, общий
	объём `character/sections/` ≈ 7.3k строк (см. wc -l).
- **`useCharacter.ts` вырос**: 853 строки, 9 `useEffect`, ≈30 экспортов
	в return-объекте.
- **`page.tsx` слегка похудел** (700 → 565), но содержит два больших
	switch-блока (desktop и mobile), каждый со своей таблицей пропсов.

## Топ-проблем, которые реально стоит решать (в порядке ROI)

### 1. 🔴 Дубликат desktop ↔ mobile для каждого шага

`Character{Race,SubRace,Class,SubClass,Origin,Alignment,Stats,Spells,
Name,Gender}Step` + `*StepMobile` — 18 файлов, ~5.5k строк, диффы между
парами уже расходятся (см. свежий фикс `CharacterFeaturePlate` mobile —
делалось в двух местах). Любая фича оплачивается дважды.

**Что даёт.** Минус ~2–3k строк, исчезает класс багов «починили только
одну версию». Снимает нагрузку с page.tsx (см. #2).

### 2. 🔴 `page.tsx` — Два параллельных switch'а на 9 шагов

В файле два почти одинаковых дерева [[web jsx|jsx]]: 9 mobile-веток и 9 desktop-веток.
Каждая ветка явно прокидывает 10–17 пропсов. Любой новый общий проп —
18 правок.

**Что даёт.** При нормальном `StepRouter` (одна таблица шагов) page.tsx
ужмётся примерно вдвое и перестанет требовать ручного синка
пропсов desktop/mobile.

### 3. 🔴 `useCharacter.ts` — God-hook (853 строки, 9 useEffect)

Грузит races/subraces/classes/subclasses/backgrounds/alignments/spells,
держит selection, считает totalStats/raceBonuses, рандомизирует всё,
авто-выбирает дефолтные подрасы, ставит template. История проекта
показывает классические race-condition'ы (мерцающий гном, tiefling-zariel)
именно отсюда.

**Что даёт.** Изоляция cascade-зависимостей `race → subraces`,
`class → subclasses`, `class+subclass → spells` в отдельные хуки убирает
целый класс багов с гонками эффектов.

### 4. 🟠 Mobile-кнопка «Создать персонажа» не блокируется

Desktop-`CharacterContinueButton` уже использует `!canCreateCharacter`.
На mobile тот же шаг — кнопка всегда активна, `handleNext` молча уходит
в `return`, пользователь не понимает, что не заполнено. Маленькая правка
с большим UX-эффектом.

### 5. 🟠 Нет единого `apiClient` / типизированной `ApiError`

Каждый сервис в `src/services/*` сам парсит ответ, сам решает, кидать
ли исключение, по-разному форматирует сообщение. Поверх этого ToastContext
уже есть — не хватает только общего узкого места, через которое все
ошибки идут с одинаковыми полями (`status`, `code`, `message`).

### 6. 🟡 Точечная чистка

- 15 `console.*` — половина диагностические, можно либо убрать, либо
	спрятать за `lib/logger.ts` (no-op в prod). Не блокер.
- `services/character.ts` всё ещё держит мок-расы/классы как фоллбэк;
	по AGENTS.md «не хардкодить данные в services/». Удалить мок-секции,
	оставить только `STEPS` и `statsInfo`.
- `proficiencies.skills`/`inventory.items` остаются `[]` в payload —
	по правилам D&D персонаж неполный. Это уже продуктовая задача (нужны
	UI-шаги), не чистый рефакторинг — оставить за рамками этого плана.

---

## План работ

Делается строго в этом порядке: #4 — самая дешёвая и сразу видна
пользователю, дальше идёт #3 (хуки готовят почву для #1), потом #1+#2
вместе (одно без другого не имеет смысла), в конце — #5 и #6.

### Этап 0 — Мелкие быстрые победы (≤ полдня)

Не блокируют ничего и сразу улучшают UX/код.

- **0.1** Прокинуть `disabled={!canCreateCharacter}` в mobile
	`CharacterContinueButton` на шаге `spells` (см. #4). Тот же паттерн,
	что уже стоит на desktop-кнопке в
	[page.tsx](../src/app/(game)/game/character/page.tsx).
- **0.2** Подчистить очевидно устаревшие `console.log`:
	- [src/hooks/useCharacter.ts](../src/hooks/useCharacter.ts) `Refetch
		requested`,
	- [src/app/(lk)/lk/page.tsx](../src/app/(lk)/lk/page.tsx) `Save
		changes:`,
	- [src/app/_dev/templates-modal/page.tsx](../src/app/_dev/templates-modal/page.tsx)
		— оставить, это dev-страница.
	`console.warn` в сервисах оставить (диагностика плохой формы ответа
	бэка).
- **0.3** Удалить мок-расы/классы из
	[src/services/character.ts](../src/services/character.ts), оставить
	только `STEPS` и `statsInfo`. Проверить, что нигде это уже не
	используется как источник данных (поиск `getCharacterData`).

**DoD.** TS зелёный, mobile-кнопка «Создать персонажа» блокируется при
незаполненных полях, в проде в консоли тихо.

### Этап 1 — Распилить `useCharacter` (1–2 дня)

Готовит почву для этапов 2–3: тонкие шаги-вьюхи будут опираться на
маленькие хуки, а не на god-hook с 30 экспортами.

#### 1.1 Зафиксировать публичный API

Перед любым изменением — выгрузить все поля, которые page.tsx читает
из `useCharacter()` (это ~30 имён в return-объекте). Это «контракт» —
после рефакторинга `useCharacter()` должен возвращать тот же объект,
чтобы page.tsx менялся минимально (или вообще не менялся).

#### 1.2 Извлечь катологи в `useCharacterCatalog`

В `src/hooks/character/useCharacterCatalog.ts`. Грузит:

- races, classes, backgrounds, alignments — то, что от выбора не зависит.

Возвращает `{ raceOptions, classOptions, backgroundOptions,
alignmentOptions, loading, error }`. Внутри — один `useEffect` с
`Promise.all([...])` и `withRetry`. Никаких deps от selection.

#### 1.3 Извлечь cascade-загрузки

Три отдельных хука, каждый отвечает за одну зависимость:

- `useSubracesForRace(raceId)` — GET `/api/character-builder/subraces`,
	фильтр по `raceId`. Возвращает `{ subRaceOptions, loading }`.
- `useSubclassesForClass(classId)` — GET `/api/character-builder/
	subclasses` (только если `subclassSelectionLevel === 1`). Возвращает
	`{ subclassOptions, loading }`.
- `useSpellsForSelection(classId, subclassId)` — POST `/spells`.
	Возвращает `{ cantripChoices, spellChoices, loading }`.

Каждый — один `useEffect` с одной зависимостью. Этим убираются гонки
типа «выбрал расу → пока летят subraces, выбрал другую → подмешалось
старое».

#### 1.4 Извлечь selection-state в `useCharacterSelection`

Чистая мутация state без сетевых вызовов: `selectRace`, `selectSubRace`,
…, `setName`, `setGender`, `updateStats`, `selectSpells`,
`selectCantrips`, `applyRecommendedStats`, `resetStats`. Возвращает
`{ selection, ...actions }`.

`selection.race` теперь хранит **только id + минимум полей для UI**, а
полный `RaceOption` тянется из каталога по id в момент рендера —
один источник правды. Это закрывает «id: 'human' (мок) vs UUID (бэк)».

#### 1.5 Извлечь чистые derivations в `lib/characterStats.ts`

Без хуков — функции `computeUsedPoints(stats)`, `computeRaceBonuses(race,
subRace)`, `computeTotalStats(stats, race, subRace)`. Сейчас они внутри
`useCharacter` как `useMemo`, но логически — чистые трансформации.

#### 1.6 Извлечь рандомизацию в `useCharacterRandomizer`

`randomize{Race,SubRace,Class,SubClass,Origin,Alignment,Stats,Spells,
Name}` и `randomizeCharacter`. Зависит от каталога + selection-actions,
сам стейт не хранит.

#### 1.7 Извлечь авто-выбор дефолтов в `useCharacterAutoselect`

Эффекты вида «когда пришли subraces для выбранной расы — авто-выбрать
дефолтную». Изолируется в один хук, чтобы было видно, какие
`useEffect`'ы side-effect-ят, а какие просто читают.

#### 1.8 Композиция

`useCharacter()` переписывается как тонкий композитор поверх 1.2–1.7.
Возвращает тот же объект, что и раньше (контракт из 1.1). Файл должен
ужаться до ~150–200 строк.

**DoD этапа 1.**
- TS зелёный.
- `useCharacter` ≤ 200 строк.
- Ручной прогон визарда: каждый шаг, плюс edge-cases —
	- быстрая смена расы (race condition по subraces),
	- класс с подклассом 1-го уровня (Sorcerer/Warlock/Cleric),
	- «Случайная генерация» заполняет всё корректно.

### Этап 2 — Решить, как схлопывать desktop/mobile (полдня)

**Это gate. Без явного решения и пилота — не делаем этап 3.**

#### 2.1 Выбор стратегии

Два варианта:

- **α — single-component, responsive Tailwind.** Один компонент,
	desktop-блок в `hidden md:flex`, mobile-блок в `md:hidden`. Шаг
	имеет одну реализацию выбора (handlers, state), но две вёрстки.
	Минусы: больше [[web jsx|jsx]] в одном файле; плюсы: проще, чем headless-хук.
- **β — headless hook + два тонких View.** `useStepX()` отдаёт
	`{ items, selectedId, onSelect, ... }`, а `CharacterXStep` /
	`CharacterXStepMobile` — тонкие вьюхи без логики. Плюсы: чистое
	разделение; минусы: всё ещё два файла вёрстки, можно опять
	«разъехаться».

**Рекомендация.** Начать с α: ~80% диффа между парами — это вёрстка
(SVG-рамки разной высоты, разные viewport-классы), а не логика. Headless-
хук решает не тот вопрос, который болит сильнее. Если на пилоте выяснится,
что один компонент стал > 500 строк и нечитаемым — откатиться к β.

#### 2.2 Пилот: схлопнуть `CharacterNameStep` + `CharacterNameStepMobile`

Самый маленький, без сетевых зависимостей. 141 + 214 строк → один файл,
цель ~250–280 строк. После пилота — прогнать на 360px / 768px / 1280px,
прежде чем тиражировать.

**DoD этапа 2.** Зафиксировано решение в `AGENTS.md` (одна-две строки),
пилотный шаг работает на двух breakpoint'ах, диффов между десктопом и
мобильным больше не существует физически.

### Этап 3 — Схлопнуть остальные дублёры (1.5–2 дня)

По одной паре за коммит. После каждой — визуальный прогон. Зависимости
от этапа 1: схлопывание шагов с cascade-данными (`SubRace`, `SubClass`,
`Spells`) использует новые мини-хуки.

Порядок от простого к сложному:

1. **3.1 Gender** (82 + 222 строки) — простой выбор М/Ж.
2. **3.2 Alignment** (312 + 341).
3. **3.3 Origin** (327 + 365).
4. **3.4 Race** (337 + 337). Тут уже разъехались (см. свежие фиксы
	 мобильного блока name/description/features).
5. **3.5 SubRace** (285 + 335) — зависит от `useSubracesForRace`.
6. **3.6 Class** (279 + 328).
7. **3.7 SubClass** (310 + 348) — зависит от `useSubclassesForClass`.
8. **3.8 Stats** (518 + 534) — сложный: 6 +/- кнопок, «Рекомендованные»,
	 «Сброс», лимит 8–15, бонусы расы. Тестировать distribute-points.
9. **3.9 Spells** (557 + 488) — зависит от `useSpellsForSelection`.
	 Здесь же — `disabled={!canCreateCharacter}` для mobile-кнопки (если
	 ещё не закрыто на этапе 0).

**DoD этапа 3.**
- В `character/sections/` нет файлов `*StepMobile.tsx`.
- `AGENTS.md` обновлён: убраны упоминания `*StepMobile.tsx` из дерева.
- Прогон визарда на узком и широком экранах: golden path + три edge-
	cases (класс с подклассом, раса без подрасы, «Случайная генерация»).

### Этап 4 — Сжать `page.tsx` через `<CharacterStepRouter>` (полдня)

После этапа 3 в page.tsx останется одна switch-таблица (а не две). Её
выносим в `components/sections/game/character/CharacterStepRouter.tsx`:

```ts
const STEP_REGISTRY: Record<StepId, React.FC<StepProps>> = {
  name: CharacterNameStep,
  gender: CharacterGenderStep,
  race: CharacterRaceStep,
  …
};
```

И из page.tsx — `<CharacterStepRouter currentStep={currentStep}
{...stepProps} />`. Все общие пропсы (`selection`, `totalStats`,
`primaryStat`, navigation callbacks) собираются один раз.

**DoD.** `page.tsx` ≤ 300 строк, в нём нет ни одного `currentStep ===
'race' && <CharacterRaceStep …/>`.

### Этап 5 — Единый `apiClient` (опционально, 0.5–1 день)

Если уже не болит — отложить. Если болит (новый сервис снова парсит
`response.text()` руками) — сделать минимальный `services/_client.ts`
с `apiFetch<T>(path, init)`:

- одно место для `credentials: 'include'`, `Content-Type`;
- бросает `ApiError { status, code?, message }` на не-2xx;
- ловится в page.tsx и идёт в `showToast(...)`.

Сервисы переводим постепенно, по одному.

---

## Что НЕ делаем в этом плане

- **Inventory / proficiencies / выбор навыков.** Это продуктовая работа
	(новые UI-шаги визарда), не рефакторинг. Отдельная задача.
- **i18n.** Все строки RU, гардкоженные — пока ОК.
- **CSS-фреймворк/дизайн-токены.** Tailwind и текущие цвета фиксированы
	в AGENTS.md — не трогаем.

## Оценка и порядок зависимостей

| Этап | Время | Зависит от |
|------|-------|------------|
| 0    | ≤ 0.5 дня | — |
| 1    | 1–2 дня | — |
| 2    | 0.5 дня | — (но осмысленно после 1) |
| 3    | 1.5–2 дня | 1, 2 |
| 4    | 0.5 дня | 3 |
| 5    | 0.5–1 день | — (можно в любой момент) |

**Итого: ~5 рабочих дней** при последовательной работе. Можно
останавливаться после любого этапа — каждый самодостаточен и оставляет
проект в рабочем состоянии.

## Принципы по ходу работы

- **Один этап = одна ветка / серия коммитов.** Не смешивать «распилил
	хук» и «схлопнул шаг» в один диф — регрессии нелокализуемы.
- **После каждого этапа — ручной прогон визарда.** Авто-тестов на UI
	нет, единственная гарантия — глазами.
- **`useCharacter()` контракт не ломать до конца этапа 1.** page.tsx
	и шаги читают одни и те же поля — пока этап 3 не схлопнул шаги, любое
	изменение return-объекта = правки в 9 местах.
- **Не делать «попутный рефакторинг».** Если на этапе 3 нашлось, что
	`CharacterMenu` тоже разъехался с CharacterRightPanel — фиксируем в
	отдельный TODO, не делаем сейчас.
