# Krok optymalizacji 1 — obrazy responsywne

## Zakres

Wdrożono wyłącznie optymalizację obrazów. Opóźnienia serwera, kompresja HTTP, cache oraz blokujące skrypty pozostają bez zmian, aby nie mieszać kolejnych scenariuszy projektu.

## Implementacja

- Konwersja 12 źródłowych plików JPEG 3840×2160 do WebP.
- Trzy warianty każdego obrazu: 480×270, 960×540 i 1600×900 px.
- Jakość WebP: 78.
- Generator: `wasm-image-optimization` (WebAssembly, bez Sharp).
- Polecenie: `npm run optimize-images`.
- Twardy limit wszystkich wygenerowanych wariantów: 20 MiB. Skrypt kończy się błędem po przekroczeniu limitu.
- `srcset` i `sizes` pozwalają przeglądarce dobrać wariant do viewportu i gęstości pikseli.
- Pierwszy widoczny obraz ma `fetchpriority="high"`; obrazy poza pierwszym ekranem mają `loading="lazy"`.
- `width`, `height` i CSS `aspect-ratio` rezerwują przestrzeń 16:9 przed pobraniem obrazu.

## Pliki objęte zmianą

- `public/index.html`
- `public/events.html`
- `public/gallery.html`
- `public/event-detail.html`
- `public/css/components.css`
- `public/css/gallery.css`
- `scripts/generate-gallery-images.js`

Oryginalne pliki JPEG pozostają w `public/images/`. Warianty zoptymalizowane trafiają do `public/images/optimized/`, dzięki czemu materiał bazowy nie jest nadpisywany.

## Walidacja techniczna

Generator utworzył 36 plików WebP o łącznym rozmiarze 3,62 MiB, więc zestaw mieści się w limicie 20 MiB. Jest to kontrola poprawności implementacji i budżetu zasobów, a nie pomiar wyniku wydajnościowego. Pomiary Lighthouse, WebPageTest i porównanie metryk pozostają na późniejszy etap projektu.
