# Raport — zajęcia 3

**Data przygotowania:** 2026-10-20  
**Projekt:** EventHub  

---

## 1. Temat projektu

**EventHub** — interaktywny portal lokalnych koncertów, festiwali i wydarzeń kulturalnych.

Użytkownicy przeglądają harmonogram wydarzeń, szczegóły imprez, galerie zdjęć z poprzednich edycji, materiały wideo oraz formularz rezerwacji biletów (demo).

---

## 2. Zespół

| Osoba | Rola w projekcie |
|-------|------------------|
| **Jan Naklicki** | Full-stack i testy: frontend/backend, wersja bazowa bez optymalizacji, pomiary (WebPageTest, Lighthouse, DevTools), raporty |
| **Kajetan Koński** | Backend i optymalizacje: serwer Node.js, dane wydarzeń, późniejsze wdrożenie kompresji, cache, WebP, tabele wyników |

*Grupa 2-osobowa — do potwierdzenia z prowadzącym (w sylabusie: 3–4 osoby).*

---

## 3. Technologie

| Warstwa | Wybór |
|---------|--------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla JS) |
| Backend | Node.js + Express |
| Dane | JSON (`data/events.json`) |
| Repozytorium / uruchomienie | `npm start` → `http://localhost:3000` |
| Obrazy baseline | 12 plików JPEG 3840×2160 (~5,8 MB każdy), `npm run generate-gallery` |
| Opóźnienia serwera | Middleware: HTML ~800 ms, API ~1200 ms, obrazy ~450 ms (`BASELINE_*_LATENCY_MS`) |
| Narzędzia pomiarowe | **WebPageTest**, **Lighthouse** (w Chrome i w wynikach WPT), **Chrome DevTools** (Network + Lighthouse) |
| Narzędzia optymalizacji (kolejne zajęcia) | Squoosh / CLI, moduł `compression`, nagłówki `Cache-Control`, atrybuty `loading="lazy"`, `defer` |

---

## 4. Opis projektu (3 zdania)

EventHub to aplikacja webowa umożliwiająca użytkownikom odkrywanie lokalnych koncertów i wydarzeń kulturalnych wraz z harmonogramem, galeriami zdjęć oraz rezerwacją biletów. Wersja początkowa celowo serwuje ciężkie, nieskompresowane zasoby statyczne, duże obrazy w wysokiej rozdzielczości oraz skrypty blokujące renderowanie, aby odzwierciedlić realistycznie wolny portal. W kolejnych etapach projektu włączane są stopniowo optymalizacje (WebP i lazy loading, kompresja Gzip/Brotli, cache HTTP i defer skryptów), a uzyskane korzyści mierzone są metrykami TTFB, wagą strony, LCP, TBT i liczbą żądań.

---

## 5. Co planujemy zrobić (roadmap)

### Stan na zajęcia 3

- Działający szkielet aplikacji: strona główna, lista wydarzeń, szczegóły wydarzenia, galeria (`/gallery.html`).
- **Baseline agresywnie wolny:** brak kompresji/cache, opóźnienia Express, `/gallery.html` — 12 obrazów 4K × 2 sekcje (~140 MB), synchroniczne XHR (~768 KB), `heavy-main-thread.js` (~1,5 s), wiele render-blocking CSS/JS; strona główna — wszystkie 12 JPEG 4K.

### Trzy kroki optymalizacji (zgodnie z wymaganiami kursu)

| Krok | Optymalizacja | Opis |
|------|---------------|------|
| 1 | Obrazy WebP + lazy loading | Konwersja galerii, resize do wymiarów wyświetlania, `loading="lazy"` |
| 2 | Kompresja Gzip / Brotli | Kompresja HTML, CSS, JS po stronie serwera |
| 3 | Cache + defer | `Cache-Control` dla assetów statycznych, `defer`/`async` dla JS |

### Macierz scenariuszy testowych (docelowo)

| Scenariusz | Krok 1 (WebP + lazy) | Krok 2 (Gzip/Brotli) | Krok 3 (cache + defer) |
|------------|----------------------|----------------------|-------------------------|
| 1 — baseline | nie | nie | nie |
| 2 | tak | nie | nie |
| 3 | nie | tak | nie |
| 4 | nie | nie | tak |
| 5 — pełna optymalizacja | tak | tak | tak |

**Strona referencyjna do pomiarów:** `http://<host>/gallery.html` (największy transfer danych).

### Po zajęciach 3 (najbliższe kroki)

1. Wystawić aplikację pod publicznym URL (ngrok / hosting), jeśli wymagane przez WebPageTest.
2. Wykonać **scenariusz 1 (baseline)** — wyniki w raporcie na zajęcia 11 / 13.
3. Rozpocząć opis **kroku 1 optymalizacji** na zajęcia 5.

---

## 6. Metryki wydajności — definicje

Wybrane **5 metryk** (+ waga strony i liczba żądań zgodnie z wymaganiami raportu końcowego):

| Metryka | Definicja (skrót do raportu) |
|---------|------------------------------|
| **TTFB** (Time to First Byte) | Czas od wysłania żądania dokumentu HTML do pierwszego bajtu odpowiedzi serwera. |
| **Page weight** | Łączna liczba bajtów pobranych przy ładowaniu strony (wszystkie zasoby). |
| **LCP** (Largest Contentful Paint) | Czas do wyświetlenia największego elementu treści w obszarze widocznym. |
| **TBT** (Total Blocking Time) | Suma okresów, w których wątek główny był zablokowany zadaniami JS dłuższymi niż 50 ms (wpływ na interaktywność). |
| **Request number** | Liczba żądań HTTP wykonanych podczas ładowania strony. |

---

## 7. Skąd bierzemy te same metryki w różnych narzędziach

Żeby **WebPageTest**, **Lighthouse** i **DevTools** były porównywalne, stosujemy wspólną zasadę:

- **LCP** i **TBT** — zawsze z raportu **Lighthouse** (lab), bo definicje są identyczne.
- **TTFB**, **page weight**, **request number** — z warstwy sieciowej; w DevTools i WPT opisujemy dokładnie, skąd skopiowano wartość (patrz tabela poniżej).
- **Te same ustawienia** dla każdego scenariusza: ten sam URL, ten sam profil throttlingu (np. Slow 4G + throttling CPU), wyłączony cache w DevTools, w WPT ten sam location / connection / 3 przebiegi.

### Mapowanie: narzędzie → metryka

| Metryka | WebPageTest | Lighthouse (Chrome) | Chrome DevTools |
|---------|-------------|---------------------|-----------------|
| TTFB | **First View → TTFB** (dokument główny) | Sekcja Diagnostics → *Server response times* (LCP element / document) | **Network** → `gallery.html` → **Timing → Waiting for server response** |
| Page weight | **Bytes In** (First View) | **Total byte weight** (audyt Performance) | **Network** → suma kolumny **Transferred** po zakończeniu ładowania *(spójnie we wszystkich scenariuszach)* |
| LCP | Zakładka **Web Vitals / Lighthouse** w wynikach WPT | Raport **Performance** → **LCP** | **Lighthouse** (Performance) → **LCP** |
| TBT | **Lighthouse** w wyniku WPT → **TBT** | Raport **Performance** → **TBT** | Ten sam raport **Lighthouse** → **TBT** |
| Request number | **Requests** (First View) | Liczba żądań w podsumowaniu Lighthouse / audyt | **Network** → liczba wierszy po pełnym load |

### Jak zapisujemy wyniki w tabeli (szablon)

Dla każdego scenariusza **dwa wiersze** — WebPageTest i DevTools (+ Lighthouse w Chrome):

| Scen. | Narzędzie | TTFB | Page weight | LCP | TBT | Requests |
|-------|-----------|------|-------------|-----|-----|----------|
| 1 | WebPageTest | *TBD* | *TBD* | *TBD* | *TBD* | *TBD* |
| 1 | DevTools + Lighthouse | *TBD* | *TBD* | *TBD* | *TBD* | *TBD* |

*W analizie porównujemy scenariusze 1–5 w obrębie jednego narzędzia; drugie narzędzie służy do potwierdzenia trendu (np. spadek LCP i wagi strony po kroku 1).*

**Uwaga:** Po włączeniu Gzip (krok 2) kolumna **Transferred** w DevTools spadnie — nadal używamy **Transferred** (= bajty faktycznie pobrane), co odpowiada **Bytes In** w WebPageTest.

---

## 8. Postęp prac (zajęcia 3)

- [x] Ustalony temat i podział ról (Jan Naklicki, Kajetan Koński).
- [x] Wybrane technologie i opis 3-zdaniowy.
- [x] Zaimplementowany baseline EventHub w repozytorium.
- [x] Wygenerowana ciężka galeria JPEG (12 × ~5,8 MB).
- [x] Wzmocniony baseline (opóźnienia serwera, podwójna galeria, synchroniczny XHR, ciężki JS).
- [ ] Publiczny URL do testów WebPageTest.
- [ ] Tabela wyników scenariusza 1 (baseline) — planowane przed raportem wstępnym (zajęcia 11).

---

## 9. Skrót do wklejenia na e-portal

**Temat:** EventHub — portal koncertów i wydarzeń kulturalnych.  
**Zespół:** Jan Naklicki, Kajetan Koński.  
**Technologie:** HTML/CSS/JS, Node.js, Express, JSON; pomiary: WebPageTest, Lighthouse, Chrome DevTools.  
**Opis (3 zdania):** *(patrz sekcja 4 powyżej).*
