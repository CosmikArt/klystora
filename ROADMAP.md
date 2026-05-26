# Klystora Roadmap

## Estado Actual

| Métrica | Valor |
|---------|-------|
| Juegos activos | 14 |
| Idiomas | 27 |
| Páginas generadas | ~375 |
| Stack | Astro 5 + React 19 + Tailwind 4 + TypeScript strict |
| Deploy | Cloudflare Pages (custom domain) |
| Analytics | Plausible |

---

## Filosofía de Expansión

**Regla de oro**: Todo juego nuevo debe ser un *word game* — juego de palabras, lenguaje, ortografía o vocabulario. No cartas, no bloques, no arcade puro. Klystora es una revista de juegos de palabras, no un arcade genérico.

**KPIs por juego**:
- Tiempo promedio de sesión > 3 minutos
- Share rate > 5% (resultados tipo Wordle)
- Retorno diario > 20% (daily puzzle)
- SEO: al menos 3 keywords con >10K búsquedas mensuales

---

## Fase 1 — Fundación de Tráfico (Q2 2026)

Objetivo: 5 juegos que capturen búsquedas de alto volumen en el nicho de word games.

### 1.1 Typing Race
**Keywords**: "typing test" (1.2M/mes), "wpm test" (450K/mes), "typing speed test" (300K/mes), "type test" (200K/mes)

**Mecánica**:
- Texto aleatorio de 100-200 palabras por idioma
- Timer: 30s, 60s, 120s
- Métricas: WPM (words per minute), CPM (chars per minute), accuracy %, errores
- Gráfica de velocidad por segundo (sparkline)
- Leaderboard local (top 10 por idioma)
- Daily challenge: mismo texto para todos los jugadores del idioma

**i18n**:
- Frases nativas por idioma (no traducidas)
- EN: excerpts de libros de dominio público
- ES: fragmentos de Cervantes, Borges
- FR: Proust, Camus
- etc.

**SEO**:
- Slugs: `/typing-test`, `/typing-speed`, `/wpm-test`
- Meta: "Free typing speed test in 27 languages — no signup"
- OG: preview con WPM promedio del día

**Estimación**: 2-3 días

---

### 1.2 Word Scramble
**Keywords**: "word scramble" (350K/mes), "make words from letters" (180K/mes), "word unscramble" (150K/mes), "anagram game" (120K/mes)

**Mecánica**:
- 7 letras dadas (1 vocal obligatoria, 1 letra central obligatoria)
- Formar todas las palabras válidas de 3+ letras
- Puntuación: 3 letras = 100pts, 4 = 200pts, 5 = 400pts, 6 = 800pts, 7 = 1500pts
- Palabra con todas las letras = "Pangram" = bonus 2x
- Daily puzzle: mismas 7 letras para todos
- Timer opcional: 3 minutos

**i18n**:
- Diccionario por idioma (palabras válidas)
- Pangram diario en cada idioma

**SEO**:
- Slugs: `/word-scramble`, `/word-builder`, `/spelling-bee` (variante)
- Meta: "Make words from 7 letters — daily puzzle in 27 languages"

**Estimación**: 3-4 días

---

### 1.3 Cryptogram
**Keywords**: "cryptogram" (200K/mes), "cryptoquote" (80K/mes), "cipher puzzle" (60K/mes), "code breaking game" (40K/mes)

**Mecánica**:
- Frase cifrada con sustitución monoalfabética (A→M, B→K, etc.)
- Alfabeto interactivo: click letra cifrada → selecciona letra real
- Autocompletar: si A→M, todas las A se rellenan con M
- Pistas: revelar 1 letra (máx 3 por puzzle)
- Verificación: resalta errores en rojo
- Timer opcional
- Daily puzzle: misma frase para todos

**i18n**:
- Citas famosas por cultura/idioma
- EN: "The only way to do great work..." — Steve Jobs
- ES: "En un lugar de la Mancha..." — Cervantes
- FR: "Je pense, donc je suis." — Descartes
- etc.

**SEO**:
- Slugs: `/cryptogram`, `/cryptoquote`, `/cipher-puzzle`
- Meta: "Daily cryptogram puzzles in 27 languages — crack the code"

**Estimación**: 2-3 días

---

### 1.4 Letter Boxed
**Keywords**: "letter boxed" (90K/mes), "word box puzzle" (30K/mes), "side word game" (20K/mes)

**Mecánica** (NYT-style):
- Cuadrado con 3 letras por lado (12 letras total)
- Regla: palabra debe usar letras de lados alternos consecutivos
- Ejemplo: si empiezas con letra del lado TOP, siguiente letra debe ser de LEFT/RIGHT/BOTTOM (no TOP)
- Objetivo: usar todas las 12 letras en el menor número de palabras
- Daily puzzle: misma configuración para todos
- Puntuación: menos palabras = más puntos

**i18n**:
- Configuraciones diarias por idioma
- Validación de palabras por diccionario

**SEO**:
- Slugs: `/letter-boxed`, `/word-box`
- Meta: "Letter Boxed — connect sides, form words, use all letters"

**Estimación**: 3-4 días

---

### 1.5 Multi-Wordle (Dordle)
**Keywords**: "dordle" (250K/mes), "quordle" (180K/mes), "octordle" (100K/mes), "multi wordle" (80K/mes)

**Mecánica**:
- 2 tableros simultáneos (Dordle), opcional 4 (Quordle), 8 (Octordle)
- Misma palabra por intento en todos los tableros
- 7 intentos para resolver los 2 tableros
- Share: grid con emoji por tablero
- Daily: mismas palabras para todos

**i18n**:
- Palabras diarias por idioma
- Diccionario de 5 letras por idioma

**SEO**:
- Slugs: `/dordle`, `/multi-wordle`, `/double-word`
- Meta: "Dordle — solve two Wordles at once"

**Estimación**: 2-3 días

---

## Fase 2 — Retention & Engagement (Q3 2026)

Objetivo: Juegos que mantengan a los usuarios volviendo diariamente.

### 2.1 Acrostic
**Keywords**: "acrostic puzzle" (70K/mes), "quote puzzle" (50K/mes), "acrostic online" (30K/mes)

**Mecánica**:
- Grid de letras con números
- Pistas horizontales (palabras) que revelan letras de una frase/cita vertical
- Al completar palabras horizontales, se revela la cita
- Daily: nueva cita por idioma

**i18n**:
- Citas famosas por cultura
- Pistas adaptadas al idioma

**Estimación**: 3-4 días

---

### 2.2 Word Chain (Shiritori)
**Keywords**: "word chain game" (120K/mes), "shiritori" (200K/mes), "last letter game" (80K/mes)

**Mecánica**:
- Jugador vs AI
- Palabra debe empezar con última letra de la palabra anterior
- No repetir palabras
- Timer: 10 segundos por turno
- Modos:
  - **Survival**: hasta que uno pierda
  - **Timed**: 2 minutos, más palabras = más puntos
  - **Category**: solo palabras de una categoría (animales, países, etc.)

**i18n**:
- Diccionario por idioma
- Categorías localizadas

**Estimación**: 2-3 días

---

### 2.3 Crossword Daily (15x15)
**Keywords**: "daily crossword" (500K/mes), "crossword puzzle" (1M/mes), "online crossword" (200K/mes)

**Mecánica**:
- Grid 15x15 generado diariamente
- Pistas across y down
- Verificación en tiempo real (opcional)
- Reveal letter / reveal word / check puzzle
- Timer
- Daily: mismo puzzle para todos

**Diferenciador**: Generado en múltiples idiomas nativos, no traducido.

**Estimación**: 5-7 días (generador de crucigramas es complejo)

---

### 2.4 Keyword / Cipher
**Keywords**: "keyword puzzle" (40K/mes), "cipher game" (50K/mes)

**Mecánica**:
- Similar a cryptogram pero con una palabra clave revelada
- La palabra clave determina el mapeo del cifrado
- Más accesible que cryptogram puro
- Daily puzzle

**Estimación**: 2 días

---

## Fase 3 — Viral & Social (Q3-Q4 2026)

Objetivo: Juegos diseñados para compartir y retar amigos.

### 3.1 Word Battle (1v1)
**Keywords**: "word game multiplayer" (150K/mes), "scrabble online" (400K/mes)

**Mecánica**:
- Turn-based async
- Mismo set de 7 letras para ambos jugadores
- 60 segundos para formar la mejor palabra
- Mayor puntuación (Scrabble-style) gana la ronda
- Al mejor de 5 rondas
- Share: "Te reté a un Word Battle — 3-2 gané"

**Estimación**: 4-5 días

---

### 3.2 Speed Word
**Keywords**: "fast word game" (60K/mes), "word race" (40K/mes)

**Mecánica**:
- 2 minutos
- Categorías aleatorias: "Animals", "Countries", "Food", "Movies"
- Escribir palabras que encajen en la categoría
- Más palabras = más puntos
- Palabras largas = bonus
- Daily: mismas categorías para todos

**Estimación**: 2-3 días

---

### 3.3 Word Search Themed Daily
**Keywords**: "themed word search" (180K/mes), "daily word search" (120K/mes)

**Mecánica**:
- Grid 15x15
- Lista de 15-20 palabras temáticas
- Temas culturales por idioma:
  - EN: "Shakespeare", "Space", "NBA Teams"
  - ES: "Países hispanohablantes", "Comida mexicana"
  - etc.
- Timer
- Daily: mismo tema y palabras para todos

**Estimación**: 2-3 días

---

## Fase 4 — Sistema de Progresión (Q4 2026)

### 4.1 Streaks
- Streak diario por juego
- Streak global (cualquier juego cuenta)
- Recompensas visuales:
  - 3 días: badge bronce
  - 7 días: badge plata
  - 30 días: badge oro
  - 100 días: badge diamante
- Notificación visual al mantener streak

### 4.2 Leaderboards
- Global por juego (top 100)
- Por idioma (top 50)
- Weekly reset + all-time
- Categorías: mejor tiempo, mejor puntuación, streak actual

### 4.3 Achievements
| Achievement | Cómo obtener |
|-------------|--------------|
| First Blood | Completar primer juego |
| Speed Demon | WPM > 100 en Typing Race |
| Polyglot | Jugar en 5+ idiomas |
| Streak Master | 7-day streak en cualquier juego |
| Pangram Hunter | Encontrar pangram en Word Scramble |
| Cryptographer | Resolver cryptogram sin pistas |
| Word Warrior | 1000 palabras encontradas total |
| Night Owl | Jugar entre 12am-5am |
| Early Bird | Jugar antes de 7am |
| Social Butterfly | Compartir resultados 10 veces |

### 4.4 Stats Dashboard
- Juegos jugados por tipo
- Tiempo total jugado
- Palabras encontradas
- Racha actual / máxima
- Gráfica de actividad (GitHub-style heatmap)

---

## Fase 5 — Monetización (Q4 2026 - Q1 2027)

### 5.1 Premium (opcional)
- Sin anuncios (cuando haya)
- Juegos exclusivos: Crossword 21x21, Acrostic archive
- Temas visuales personalizados
- Stats avanzadas
- Precio: $4.99/mes o $29.99/año

### 5.2 Ads (si es necesario)
- Solo entre juegos, nunca durante
- Banner inferior no intrusivo
- Opción "Remove Ads" one-time $9.99

---

## Calendario de Implementación

| Semana | Juego(s) | Fase |
|--------|----------|------|
| W1 | Typing Race | 1 |
| W2 | Word Scramble | 1 |
| W3 | Cryptogram | 1 |
| W4 | Letter Boxed | 1 |
| W5 | Multi-Wordle | 1 |
| W6 | Buffer / polish Fase 1 | — |
| W7 | Word Chain | 2 |
| W8 | Acrostic | 2 |
| W9 | Keyword Cipher | 2 |
| W10 | Crossword Daily | 2 |
| W11 | Buffer / polish Fase 2 | — |
| W12 | Word Battle | 3 |
| W13 | Speed Word | 3 |
| W14 | Word Search Themed | 3 |
| W15 | Buffer / polish Fase 3 | — |
| W16-20 | Streaks + Leaderboards + Achievements | 4 |
| W21+ | Premium / Monetización | 5 |

---

## Especificaciones Técnicas

### Patrón de Implementación por Juego

```
src/components/games/{kebab-case}/
  ├── {PascalCase}Game.tsx       # Componente principal (lógica + UI)
  ├── {PascalCase}Wrapper.tsx    # LanguageProvider + AnalyticsWrapper
  ├── use{PascalCase}Game.ts     # Hook de lógica (si es complejo)
  ├── types.ts                    # Tipos específicos del juego
  └── constants.ts                # Constantes (puzzles diarios, etc.)

src/pages/
  ├── {slug-en}.astro             # Página EN (root)
  └── [locale]/
      └── {slug-es}.astro         # Página ES (y otros 26)

public/
  ├── game-{kebab-case}-preview.png    # Preview card (4:3)
  └── og/
      └── {slug-en}.png                # OG image (1200x630)
```

### Checklist por Juego

- [ ] Componente React con TypeScript strict
- [ ] Wrapper con LanguageProvider + AnalyticsWrapper
- [ ] Lazy import en `LazyGameWrapper.tsx`
- [ ] Slugs en `gameSlugs` (27 idiomas)
- [ ] Mensajes en `messages` (27 idiomas): name, desc, instructions
- [ ] Página Astro EN en `src/pages/`
- [ ] Página Astro ES en `src/pages/es/`
- [ ] Páginas Astro para otros 25 idiomas
- [ ] Preview image en `public/`
- [ ] OG image en `public/og/`
- [ ] Entry en `src/pages/[locale]/index.astro`
- [ ] Entry en `src/pages/sitemap.xml.ts`
- [ ] `trackGameStart` en mount
- [ ] `trackGameComplete` en victoria
- [ ] Share modal con resultado formateado
- [ ] Responsive (mobile-first)
- [ ] Dark mode compatible
- [ ] Keyboard navigation
- [ ] Tests básicos (vitest)

### SEO por Juego

```
Title: {Game Name} — Klystora
Description: {Game description in locale} — free, no signup, 27 languages
OG Image: /og/{slug}.png (1200x630)
Structured Data: Game schema
Canonical: /{slug} (EN) o /{locale}/{slug}
```

### Performance Targets

| Métrica | Target |
|---------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Performance | > 90 |
| Bundle por juego (lazy) | < 100KB gzipped |
| Total bundle inicial | < 200KB |

---

## Métricas de Éxito

### Tráfico
- 100K visitas/mes al final de Fase 1
- 500K visitas/mes al final de Fase 3
- 1M+ visitas/mes al final de Fase 4

### Engagement
- Avg session duration > 5 minutos
- Pages per session > 3
- Return rate (7 días) > 30%

### SEO
- Top 10 Google por "typing test" en 3+ idiomas
- Top 10 Google por "word scramble" en EN
- Featured snippet en "daily word games"

---

## Notas

- Cada fase debe tener un "buffer week" para polish y bug fixes
- Priorizar mobile: 70%+ del tráfico será mobile
- Daily puzzles generados a las 00:00 UTC
- Diccionarios por idioma: usar word lists open source (SCOWL, RAE, etc.)
- No usar APIs externas para lógica de juego — todo local
