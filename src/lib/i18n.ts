export type Locale = 'en' | 'es';

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = ['en', 'es'];

export function getLocaleFromPath(path: string): Locale {
  const match = path.match(/^\/(en|es)(\/|$)/);
  return (match?.[1] as Locale) || defaultLocale;
}

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}

const messages = {
  en: {
    siteName: 'Klystora',
    tagline: 'Word games. New every day.',
    subtitle: 'Eight daily word games in your language. No signup, no pop-up ads, no waiting.',
    playNow: 'Play Now — Free',
    exploreGames: 'Explore All Games',
    nav: {
      games: 'Games',
      blog: 'Blog',
      about: 'About',
      pricing: 'Pricing'
    },
    games: {
      dailyWord: { name: 'Daily Word', desc: 'Guess the 5-letter word in 6 tries' },
      crossword: { name: 'Crossword Mini', desc: 'Solve the 5×5 grid' },
      wordSearch: { name: 'Word Search', desc: 'Find hidden words' },
      anagrams: { name: 'Anagrams', desc: 'Unscramble letters' },
      connections: { name: 'Connections', desc: 'Group words by theme' },
      spellingBee: { name: 'Spelling Bee', desc: 'Words from 7 letters' },
      wordLadder: { name: 'Word Ladder', desc: 'Chain words by one letter' },
      rosco: { name: 'Rosco', desc: 'One word per letter' }
    },
    footer: {
      games: 'Games',
      company: 'Company',
      legal: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies'
    }
  },
  es: {
    siteName: 'Klystora',
    tagline: 'Juegos de palabras. Distintos cada día.',
    subtitle: 'Ocho juegos de palabras diarios en tu idioma. Sin registro, sin anuncios intrusivos, sin esperas.',
    playNow: 'Jugar Ahora — Gratis',
    exploreGames: 'Ver Todos los Juegos',
    nav: {
      games: 'Juegos',
      blog: 'Blog',
      about: 'Nosotros',
      pricing: 'Precios'
    },
    games: {
      dailyWord: { name: 'Palabra Diaria', desc: 'Adivina la palabra de 5 letras en 6 intentos' },
      crossword: { name: 'Crucigrama Mini', desc: 'Resuelve la cuadrícula 5×5' },
      wordSearch: { name: 'Sopa de Letras', desc: 'Encuentra palabras ocultas' },
      anagrams: { name: 'Anagramas', desc: 'Ordena las letras' },
      connections: { name: 'Conexiones', desc: 'Agrupa palabras por tema' },
      spellingBee: { name: 'Colmena', desc: 'Palabras con 7 letras' },
      wordLadder: { name: 'Escalera de Palabras', desc: 'Encadena palabras cambiando una letra' },
      rosco: { name: 'Rosco', desc: 'Una palabra por letra' }
    },
    footer: {
      games: 'Juegos',
      company: 'Empresa',
      legal: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      cookies: 'Cookies'
    }
  }
};
