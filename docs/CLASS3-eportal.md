# Zaliczenie cząstkowe — zajęcia 3 (tekst do e-portalu)

Skopiuj poniższe sekcje do formularza na e-portalu **do godz. 22:00 w dniu poprzedzającym zajęcia**.

## Temat projektu

**EventHub** — interaktywny portal lokalnych koncertów, festiwali i wydarzeń kulturalnych.

## Zespół (2 osoby)

| Rola | Zakres |
|------|--------|
| **Jan Naklicki** — Full-stack i testy | Frontend/backend, wersja bazowa bez optymalizacji, audyty Chrome DevTools, Lighthouse i WebPageTest, raporty pomiarowe |
| **Kajetan Koński** — Backend i optymalizacja | Konfiguracja serwera, dane wydarzeń, wdrożenie kompresji, cache i optymalizacji obrazów, tabele porównawcze |

Pełny raport (HTML): [reports/zajecia-03/2026-10-20-raport-zajecia-3.html](../reports/zajecia-03/2026-10-20-raport-zajecia-3.html) · [spis raportów](../reports/index.html)

## Technologie

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend:** Node.js + Express
- **Dane:** pliki JSON (`data/events.json`)
- **Narzędzia pomiarowe:** Chrome DevTools, WebPageTest
- **Optymalizacja obrazów (późniejsze etapy):** Squoosh / skrypt `npm run generate-gallery`

## Opis projektu (3 zdania)

EventHub to aplikacja webowa umożliwiająca użytkownikom odkrywanie lokalnych koncertów i wydarzeń kulturalnych wraz z harmonogramem, galeriami zdjęć oraz rezerwacją biletów. Wersja początkowa celowo serwuje ciężkie, nieskompresowane zasoby statyczne, duże obrazy w wysokiej rozdzielczości oraz skrypty blokujące renderowanie, aby odzwierciedlić realistycznie wolny portal. W kolejnych etapach projektu włączane są stopniowo optymalizacje (WebP i lazy loading, kompresja Gzip/Brotli, cache HTTP i defer skryptów), a uzyskane korzyści mierzone są metrykami TTFB, wagą strony, LCP, TBT i liczbą żądań.

## Uwaga formalna

W materiałach wykładowych podana jest wielkość grupy **3–4 osoby**. Pracujecie w **2 osoby** — warto to potwierdzić z prowadzącym przed wysłaniem zgłoszenia.
