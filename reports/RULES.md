# Zasady raportów HTML (EventHub)

**Kanoniczny format:** HTML + wspólny arkusz `reports/theme/report.css`.  
Markdown (`.md`) może zostać jako archiwum, ale do prezentacji i PDF używamy HTML.

---

## 1. Struktura katalogów

```
reports/
  RULES.md                 ← ten dokument
  index.html               ← spis raportów
  theme/
    report.css             ← jedyny dozwolony motyw (nie kopiować CSS do raportów)
  templates/
    raport-szablon.html    ← kopia na nowe zajęcia
  zajecia-03/
  zajecia-05/
  …
```

---

## 2. Nazewnictwo plików

| Element | Wzorzec | Przykład |
|---------|---------|----------|
| Raport | `RRRR-MM-DD-raport-zajecia-XX.html` | `2026-10-20-raport-zajecia-3.html` |
| Folder | `zajecia-XX` (XX = numer zajęć z planu kursu) | `zajecia-03` |
| Jeden raport na termin e-portalu | 1 plik HTML na wysyłkę | — |

Data w nazwie = **data przygotowania** raportu (nie data zajęć), chyba że prowadzący wymaga inaczej.

---

## 3. Ścieżka do motywu

Pliki w `reports/zajecia-XX/`:

```html
<link rel="stylesheet" href="../theme/report.css" />
```

Szablon w `reports/templates/`:

```html
<link rel="stylesheet" href="../theme/report.css" />
```

---

## 4. Wymagana struktura HTML

Każdy raport **musi** zawierać:

1. `<html lang="pl">`
2. `<body class="report">` → wewnątrz `<div class="report-shell">`
3. **Nagłówek** — `header.report-header` z:
   - `.report-header__brand` — stały tekst: `EventHub · Raport zaliczeniowy`
   - `.report-header__title` — tytuł zajęć, np. `Zajęcia 3`
   - `.report-header__subtitle` — krótki opis zakresu tej wysyłki
4. **Meta** — `dl.report-meta` z minimum:
   - Data przygotowania
   - Numer zajęć
   - Zespół (imiona)
5. **Sekcje** — `section.report-section` z numerowanymi `h2` (np. `1. Temat projektu`)
6. **Stopka** — `footer.report-footer` z projektem i linkiem do `../index.html`

Opcjonalnie na górze: `.report-toolbar` z linkiem „Drukuj / PDF” (`window.print()`) i „Spis raportów”.

**Nie używamy** inline `style=""` ani własnych plików CSS per raport (wyjątek: tabela z bardzo szeroką siatką — klasa w `report.css`, nie inline).

---

## 5. Klasy komponentów (spójność)

| Cel | Klasa |
|-----|--------|
| Tabela ogólna | `table.report-table` |
| Tabela metryk / wyników | `table.report-table report-table--metrics` |
| Brak wyniku | `td.tbd` lub `span.tbd` — tekst `TBD` |
| Tak / nie w macierzy | `td.cell-yes` / `td.cell-no` |
| Opis 3 zdań | `div.desc-block` |
| Skrót e-portal | `aside.callout.callout-portal` |
| Uwaga (grupa 2 os., localhost WPT) | `aside.callout.callout-note` |
| Lista postępu | `ul.checklist` + `li.is-done` / `li.is-todo` |

---

## 6. Wymagane sekcje wg numeru zajęć

| Zajęcia | Sekcje obowiązkowe |
|---------|-------------------|
| **3** | Temat, Zespół, Technologie, Opis (3 zdania), Plan / roadmap, Metryki (definicje), Mapowanie narzędzi (WPT / Lighthouse / DevTools), Postęp, Skrót e-portal |
| **5** | Postęp od zaj. 3, **Krok optymalizacji 1** (co, jak skonfigurować, narzędzia, parametry), Postęp |
| **7** | Krok 2 — jw. |
| **9** | Krok 3 — jw. |
| **11** | Działający system, **wyniki przed optymalizacją** (scenariusz 1), tabela metryk |
| **13** | Scenariusze 2–5, tabele wyników, wstępna analiza |

Sekcje **Metryki** i **Mapowanie narzędzi** powtarzamy skrótem (lub linkiem do raportu z zaj. 3) w raportach 11 i 13, żeby PDF był samodzielny.

---

## 7. Metryki (stały zestaw)

Zawsze te same **5 metryk** w tabelach wyników:

1. TTFB  
2. Page weight  
3. LCP  
4. TBT  
5. Request number  

Dwa wiersze na scenariusz: **WebPageTest** oraz **DevTools + Lighthouse**.  
LCP i TBT — z Lighthouse; waga i żądania — spójna kolumna (Bytes In / Transferred) — patrz raport zaj. 3, sekcja 7.

---

## 8. Proces tworzenia nowego raportu

1. Skopiuj `reports/templates/raport-szablon.html` → `reports/zajecia-XX/RRRR-MM-DD-raport-zajecia-XX.html`
2. Uzupełnij meta i sekcje wg tabeli z §6
3. Dodaj link w `reports/index.html` (lista `<ul>`)
4. Otwórz plik w przeglądarce (lub `npm start` + serwowanie `reports/` — opcjonalnie)
5. E-portal: skopiuj treść z `.callout-portal` i ewentualnie wyeksportuj PDF (Drukuj → Zapisz jako PDF)

---

## 9. Dla agentów AI / Cursor

Przy generowaniu kolejnych raportów:

- Czytaj ten plik: `reports/RULES.md`
- Używaj wyłącznie `reports/theme/report.css`
- Zachowaj numerację sekcji i klasy z §4–5
- Język raportów: **polski**
- Nie usuwaj starszych HTML — każdy plik to historyczna wysyłka

Reguła Cursor: `.cursor/rules/reports-html.mdc`
