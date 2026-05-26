# Klystora Roadmap

## Estado Actual
- 14 juegos activos
- 27 idiomas
- Astro 5 + React 19 + Tailwind 4

---

## Fase 1 — Word Games de Alto Tráfico (Q2 2026)

### 1.1 Typing Race / Speed Typing
- **Tráfico**: "typing test", "wpm test", "typing speed" — millones de búsquedas mensuales
- **Mecánica**: Texto aleatorio, timer 60s, WPM + accuracy, leaderboard local
- **i18n**: Frases por idioma, no solo EN
- **SEO**: `/typing-test`, `/typing-speed`, `/wpm-test`

### 1.2 Word Scramble / Word Builder
- **Tráfico**: "make words from letters", "word unscramble", "anagram solver"
- **Mecánica**: 6-8 letras dadas, formar todas las palabras posibles, puntuación por longitud
- **Variante**: Daily puzzle con letras fijas del día
- **SEO**: `/word-scramble`, `/word-builder`

### 1.3 Cryptogram
- **Tráfico**: "cryptogram puzzles", "cryptoquote", "cipher games"
- **Mecánica**: Frase cifrada con sustitución monoalfabética, pistas opcionales
- **i18n**: Frases famosas por idioma/cultura
- **SEO**: `/cryptogram`, `/cryptoquote`

### 1.4 Letter Boxed (NYT-style)
- **Tráfico**: "letter boxed", "word box puzzle", "side word game"
- **Mecánica**: 12 letras en los lados de una caja, formar palabras conectando lados alternos
- **Daily puzzle**: Configuración única por día
- **SEO**: `/letter-boxed`, `/word-box`

### 1.5 Multi-Wordle (Dordle/Quordle style)
- **Tráfico**: "dordle", "quordle", "octordle", "multi wordle"
- **Mecánica**: 2, 4 u 8 tableros simultáneos, misma palabra por intento en todos
- **Daily**: Boards diarios sincronizados
- **SEO**: `/dordle`, `/multi-wordle`

---

## Fase 2 — Engagement & Retention (Q3 2026)

### 2.1 Acrostic
- **Tráfico**: "acrostic puzzles", "quote puzzles"
- **Mecánica**: Pistas + letras que revelan una frase/cita
- **i18n**: Citas famosas por cultura

### 2.2 Word Chain / Shiritori
- **Tráfico**: "word chain game", "shiritori", "last letter game"
- **Mecánica**: Jugador vs AI, palabra que empiece con última letra de la anterior
- **Modos**: Timed, survival, multiplayer local

### 2.3 Crossword Daily (full-size)
- **Tráfico**: "daily crossword", "crossword puzzle"
- **Mecánica**: Crucigrama 15x15, generado diariamente
- **Diferenciador**: Múltiples idiomas nativos, no traducidos

### 2.4 Keyword / Cipher Puzzle
- **Tráfico**: "keyword puzzle", "cipher games"
- **Mecánica**: Similar a cryptogram pero con palabra clave revelada

---

## Fase 3 — Viral & Social (Q3-Q4 2026)

### 3.1 Word Battle / 1v1
- **Tráfico**: "word game multiplayer", "scrabble online"
- **Mecánica**: Turn-based, misma letras, mayor puntuación gana
- **Share**: Resultados tipo Wordle para retar amigos

### 3.2 Speed Word
- **Tráfico**: "fast word game", "word race"
- **Mecánica**: 2 minutos, categorías aleatorias, escribir palabras que encajen

### 3.3 Word Search Daily (themed)
- **Tráfico**: "themed word search", "daily word search"
- **Mecánica**: Lista de palabras temática, grid generado diariamente
- **Mejora**: Temas culturales por idioma

---

## Fase 4 — Polish & Monetización (Q4 2026)

### 4.1 Sistema de Streaks
- Streak diario por juego
- Recompensas visuales (badges, themes)

### 4.2 Leaderboards
- Global por juego
- Por país/idioma
- Weekly + all-time

### 4.3 Achievements
- "First win", "7-day streak", "Speed demon", etc.

### 4.4 Premium (opcional)
- Sin ads (cuando haya)
- Juegos extra
- Temas exclusivos

---

## Notas Técnicas

### Patrón de implementación por juego
```
src/components/games/{nombre}/
  ├── {Nombre}Game.tsx      # Lógica del juego
  ├── {Nombre}Wrapper.tsx   # LanguageProvider + Analytics
  └── types.ts              # (opcional)

src/pages/
  ├── {slug-en}.astro       # Página EN
  └── [locale]/
      └── {slug-es}.astro   # Página ES (y otros)

public/
  └── game-{nombre}-preview.png
```

### Archivos a modificar por juego
1. `src/components/games/LazyGameWrapper.tsx` — agregar al mapa
2. `src/lib/i18n.ts` — slugs + mensajes en 27 idiomas
3. `src/pages/[locale]/index.astro` — agregar al grid
4. `src/pages/sitemap.xml.ts` — agregar URLs

### SEO por juego
- OG image específica
- Meta description traducida
- Structured data Game schema
