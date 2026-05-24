// Klystora translations — 27 languages
// Manual translation — no scripts used

export type Lang =
  | 'en' | 'es' | 'zh' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja' | 'de' | 'ko'
  | 'fr' | 'tr' | 'it' | 'pl' | 'nl' | 'uk' | 'ro' | 'el' | 'cs' | 'sv'
  | 'hu' | 'id' | 'vi' | 'th' | 'da' | 'fi' | 'no';

export const supportedLanguages: Lang[] = [
  'en', 'es', 'zh', 'hi', 'pt', 'bn', 'ru', 'ja', 'de', 'ko',
  'fr', 'tr', 'it', 'pl', 'nl', 'uk', 'ro', 'el', 'cs', 'sv',
  'hu', 'id', 'vi', 'th', 'da', 'fi', 'no'
];

export const languageNames: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
  zh: '中文',
  hi: 'हिन्दी',
  pt: 'Português',
  bn: 'বাংলা',
  ru: 'Русский',
  ja: '日本語',
  de: 'Deutsch',
  ko: '한국어',
  fr: 'Français',
  tr: 'Türkçe',
  it: 'Italiano',
  pl: 'Polski',
  nl: 'Nederlands',
  uk: 'Українська',
  ro: 'Română',
  el: 'Ελληνικά',
  cs: 'Čeština',
  sv: 'Svenska',
  hu: 'Magyar',
  id: 'Bahasa Indonesia',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  da: 'Dansk',
  fi: 'Suomi',
  no: 'Norsk',
};

export const languageFlags: Record<Lang, string> = {
  en: '🇺🇸', es: '🇪🇸', zh: '🇨🇳', hi: '🇮🇳', pt: '🇵🇹', bn: '🇧🇩', ru: '🇷🇺', ja: '🇯🇵', de: '🇩🇪', ko: '🇰🇷',
  fr: '🇫🇷', tr: '🇹🇷', it: '🇮🇹', pl: '🇵🇱', nl: '🇳🇱', uk: '🇺🇦', ro: '🇷🇴', el: '🇬🇷', cs: '🇨🇿', sv: '🇸🇪',
  hu: '🇭🇺', id: '🇮🇩', vi: '🇻🇳', th: '🇹🇭', da: '🇩🇰', fi: '🇫🇮', no: '🇳🇴',
};

// Game slugs per language
export const gameSlugs: Record<Lang, Record<string, string>> = {
  en: {
    dailyWord: 'daily-word',
    crosswordMini: 'mini-crossword',
    wordSearch: 'word-search',
    anagrams: 'anagrams',
    connections: 'connections',
    spellingBee: 'spelling-bee',
    wordLadder: 'word-ladder',
    rosco: 'word-wheel',
  },
  es: {
    dailyWord: 'palabra-diaria',
    crosswordMini: 'crucigrama-mini',
    wordSearch: 'sopa-de-letras',
    anagrams: 'anagramas',
    connections: 'conexiones',
    spellingBee: 'colmena',
    wordLadder: 'escalera-de-palabras',
    rosco: 'rosco',
  },
  zh: {
    dailyWord: 'mei-ri-yi-ci',
    crosswordMini: 'mi-ni-tian-zi-you-xi',
    wordSearch: 'zhao-dan-ci',
    anagrams: 'zi-mu-zhong-zu',
    connections: 'lian-xiang',
    spellingBee: 'pin-xie-bi-sai',
    wordLadder: 'dan-ci-ti-ti',
    rosco: 'zhuan-lun-pan',
  },
  hi: {
    dailyWord: 'din-bhar-ka-shabd',
    crosswordMini: 'chhota-shabd-jaal',
    wordSearch: 'shabd-khoj',
    anagrams: 'akshar-jeern',
    connections: 'sambandh',
    spellingBee: 'vartani-madhumakkhi',
    wordLadder: 'shabd-seedi',
    rosco: 'shabd-chakra',
  },
  pt: {
    dailyWord: 'palavra-diaria',
    crosswordMini: 'cruzadinha-mini',
    wordSearch: 'caca-palavras',
    anagrams: 'anagramas',
    connections: 'conexoes',
    spellingBee: 'abelha-de-ortografia',
    wordLadder: 'escada-de-palavras',
    rosco: 'roda-de-palavras',
  },
  bn: {
    dailyWord: 'doinik-shobdo',
    crosswordMini: 'chhoto-shobdo-jaal',
    wordSearch: 'shobdo-khoj',
    anagrams: 'bak-jorano',
    connections: 'somporko',
    spellingBee: 'barnona-moumachhi',
    wordLadder: 'shobdo-siri',
    rosco: 'shobdo-chakra',
  },
  ru: {
    dailyWord: 'slovo-dnya',
    crosswordMini: 'mini-krossvord',
    wordSearch: 'poisk-slov',
    anagrams: 'anagrammy',
    connections: 'svyazi',
    spellingBee: 'pchela-orfografii',
    wordLadder: 'lestnitsa-slov',
    rosco: 'koleso-slov',
  },
  ja: {
    dailyWord: 'mainichi-no-kotoba',
    crosswordMini: 'mini-kurosuwaado',
    wordSearch: 'tango-sagashi',
    anagrams: 'anaguramu',
    connections: 'renketsu',
    spellingBee: 'supellingu-bii',
    wordLadder: 'tango-hashi',
    rosco: 'tango-sharin',
  },
  de: {
    dailyWord: 'taegliches-wort',
    crosswordMini: 'mini-kreuzwort',
    wordSearch: 'wort-suche',
    anagrams: 'anagramme',
    connections: 'verbindungen',
    spellingBee: 'rechtschreib-biene',
    wordLadder: 'wortleiter',
    rosco: 'wortrad',
  },
  ko: {
    dailyWord: 'maeil-han-geul',
    crosswordMini: 'mini-silheom-mal-ggeut',
    wordSearch: 'dan-eo-chajgi',
    anagrams: 'munja-baek-gwi',
    connections: 'yeongyeol',
    spellingBee: 'pyeongbeob-bbeol',
    wordLadder: 'daneo-saedeul',
    rosco: 'daneo-hoihwan',
  },
  fr: {
    dailyWord: 'mot-du-jour',
    crosswordMini: 'mini-mots-croises',
    wordSearch: 'mots-melanges',
    anagrams: 'anagrammes',
    connections: 'connexions',
    spellingBee: 'abeille-d-orthographe',
    wordLadder: 'echelle-de-mots',
    rosco: 'roue-de-mots',
  },
  tr: {
    dailyWord: 'gunun-kelimesi',
    crosswordMini: 'mini-bulmaca',
    wordSearch: 'kelime-avi',
    anagrams: 'anagramlar',
    connections: 'baglantilar',
    spellingBee: 'yazim-ari',
    wordLadder: 'kelime-merdiveni',
    rosco: 'kelime-tekerlegi',
  },
  it: {
    dailyWord: 'parola-del-giorno',
    crosswordMini: 'mini-cruciverba',
    wordSearch: 'ricerca-parole',
    anagrams: 'anagrammi',
    connections: 'connessioni',
    spellingBee: 'ape-ortografica',
    wordLadder: 'scala-di-parole',
    rosco: 'ruota-di-parole',
  },
  pl: {
    dailyWord: 'slowo-dnia',
    crosswordMini: 'mini-krzyzowka',
    wordSearch: 'szukanie-slow',
    anagrams: 'anagramy',
    connections: 'polaczenia',
    spellingBee: 'pszczola-ortografii',
    wordLadder: 'drabina-slow',
    rosco: 'kolo-slow',
  },
  nl: {
    dailyWord: 'dagelijks-woord',
    crosswordMini: 'mini-kruiswoord',
    wordSearch: 'woordzoeker',
    anagrams: 'anagrammen',
    connections: 'verbanden',
    spellingBee: 'spelling-bij',
    wordLadder: 'woordladder',
    rosco: 'woordwiel',
  },
  uk: {
    dailyWord: 'slovo-dnya',
    crosswordMini: 'mini-krosvord',
    wordSearch: 'poshuk-sliv',
    anagrams: 'anagramy',
    connections: 'zvyazky',
    spellingBee: 'bdzhola-ortografiyi',
    wordLadder: 'dribynka-sliv',
    rosco: 'koleso-sliv',
  },
  ro: {
    dailyWord: 'cuvantul-zilei',
    crosswordMini: 'mini-cuvinte-incrucisate',
    wordSearch: 'cautare-cuvinte',
    anagrams: 'anagrame',
    connections: 'conexiuni',
    spellingBee: 'albina-ortografiei',
    wordLadder: 'scara-cuvintelor',
    rosco: 'roata-cuvintelor',
  },
  el: {
    dailyWord: 'i-lexi-tis-imeras',
    crosswordMini: 'mini-stavrolexo',
    wordSearch: 'anazitisi-lekseon',
    anagrams: 'anagrammata',
    connections: 'sindeseis',
    spellingBee: 'melissa-orthografias',
    wordLadder: 'skala-lekseon',
    rosco: 'trochos-lekseon',
  },
  cs: {
    dailyWord: 'slovo-dne',
    crosswordMini: 'mini-krizovka',
    wordSearch: 'hledani-slov',
    anagrams: 'anagramy',
    connections: 'spojeni',
    spellingBee: 'vcela-pravopisu',
    wordLadder: 'retez-slov',
    rosco: 'kolo-slov',
  },
  sv: {
    dailyWord: 'dagens-ord',
    crosswordMini: 'mini-korsord',
    wordSearch: 'ordjakt',
    anagrams: 'anagram',
    connections: 'kopplingar',
    spellingBee: 'stavnings-bi',
    wordLadder: 'ordstege',
    rosco: 'ordhjul',
  },
  hu: {
    dailyWord: 'a-napi-szo',
    crosswordMini: 'mini-keresztrejtvény',
    wordSearch: 'szokereso',
    anagrams: 'anagrammak',
    connections: 'kapcsolatok',
    spellingBee: 'helyesirasi-meh',
    wordLadder: 'szoletra',
    rosco: 'szokerék',
  },
  id: {
    dailyWord: 'kata-harian',
    crosswordMini: 'mini-teka-teki-silang',
    wordSearch: 'pencarian-kata',
    anagrams: 'anagram',
    connections: 'koneksi',
    spellingBee: 'lebah-ejaan',
    wordLadder: 'tangga-kata',
    rosco: 'roda-kata',
  },
  vi: {
    dailyWord: 'tu-ngay',
    crosswordMini: 'o-chu-mini',
    wordSearch: 'tim-tu',
    anagrams: 'sap-xep-chu-cai',
    connections: 'ket-noi',
    spellingBee: 'ong-chinh-ta',
    wordLadder: 'thang-tu',
    rosco: 'banh-xe-tu-vung',
  },
  th: {
    dailyWord: 'kham-pra-jam-wan',
    crosswordMini: 'kham-khuei-mini',
    wordSearch: 'kham-nai-talad',
    anagrams: 'kham-salap',
    connections: 'khwam-samphan',
    spellingBee: 'phueng-sak-phaasa',
    wordLadder: 'bansai-kham',
    rosco: 'long-kham',
  },
  da: {
    dailyWord: 'dagens-ord',
    crosswordMini: 'mini-krydsord',
    wordSearch: 'ordjagt',
    anagrams: 'anagrammer',
    connections: 'forbindelser',
    spellingBee: 'stavnings-bi',
    wordLadder: 'ordstige',
    rosco: 'ordhjul',
  },
  fi: {
    dailyWord: 'paivan-sana',
    crosswordMini: 'mini-sanaristikko',
    wordSearch: 'sanahaku',
    anagrams: 'anagrammit',
    connections: 'yhteydet',
    spellingBee: 'oikeinkirjoitus-mehilainen',
    wordLadder: 'sanarappuset',
    rosco: 'sananpyora',
  },
  no: {
    dailyWord: 'dagens-ord',
    crosswordMini: 'mini-kryssord',
    wordSearch: 'ordjakt',
    anagrams: 'anagrammer',
    connections: 'koblinger',
    spellingBee: 'stave-bie',
    wordLadder: 'ordstige',
    rosco: 'ordhjul',
  },
};

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navbar
    play: 'Play',
    signIn: 'Sign In',
    games: 'Games',
    company: 'Company',
    legal: 'Legal',
    about: 'About',
    blog: 'Blog',
    pricing: 'Pricing',
    careers: 'Careers',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
    support: 'Support',

    // Hero
    heroTitle: 'Word Play, Elevated',
    heroSubtitle: 'Eight daily word games. Zero friction. One beautiful place to play.',
    playNowFree: 'Play Now — Free',
    seeAllGames: 'See All Games',
    socialProof: 'Join 350,000+ daily players',
    dailyWord: 'Daily Word',

    // Game cards section
    eightWaysToPlay: '8 Ways to Play',
    dailyGamesEndlessWords: 'Daily Games, Endless Words',
    dailyGamesSubtitle: 'A new challenge every day. Practice anytime. Build your streak.',

    // Game names
    dailyWordGame: 'Daily Word',
    crosswordMini: 'Crossword Mini',
    wordSearch: 'Word Search',
    anagrams: 'Anagrams',
    connections: 'Connections',
    spellingBee: 'Spelling Bee',
    wordLadder: 'Word Ladder',
    rosco: 'Rosco',

    // Game descriptions
    dailyWordDesc: 'Guess the 5-letter word in 6 tries',
    crosswordDesc: 'Compact crossword puzzle with daily clues',
    wordSearchDesc: 'Find hidden words in a letter grid',
    anagramsDesc: 'Unscramble letters to form as many words as possible',
    connectionsDesc: 'Group 16 words into 4 hidden categories',
    spellingBeeDesc: 'Form words from 7 letters, center letter required',
    wordLadderDesc: 'Change one letter at a time to reach the target word',
    roscoDesc: 'ABC word game — one word per letter, against the clock',
    daily: 'Daily',
    sponsored: 'Sponsored',

    // Why Klystora
    whyKlystora: 'Why Klystora',
    specialtyCoffeeTitle: 'The Specialty Coffee of Word Games',
    specialtyCoffeeSubtitle: 'Premium, calm, and built for people who love language. No toxicity. No noise. Just words.',
    instantPlay: 'Instant Play',
    instantPlayDesc: 'No signup. No download. No friction. Open, play, done. Your streak waits.',
    languages: '27 Languages',
    languagesDesc: 'From English to Finnish. Play in your language, learn another. The world speaks in words.',
    builtForStreaks: 'Built for Streaks',
    builtForStreaksDesc: 'Track your stats. Share your wins. Compete with yourself. Every day is a new challenge.',
    calmNonToxic: 'Calm & Non-Toxic',
    calmNonToxicDesc: 'No leaderboards. No pressure. No dark patterns. Just you, the words, and a moment of quiet focus.',
    cleanAdFree: 'Clean & Ad-Free Option',
    cleanAdFreeDesc: 'Free tier has discreet ads. Pro removes them entirely. You choose your experience.',
    deepStats: 'Deep Stats',
    deepStatsDesc: 'Guess distribution, solve time trends, language breakdown. Understand how your brain works with words.',

    // Stats banner
    dailyPlayers: 'Daily Players',
    languagesCount: 'Languages',
    gamesPlayed: 'Games Played',
    countries: 'Countries',
    joinCommunity: "Join the Community — It's Free",

    // Pro teaser
    goPro: 'Go Pro',
    proTitle: 'Your Best Game, Uninterrupted',
    proDesc: 'Remove ads. Unlock unlimited archives. Dive deep into your stats. Support a calm, independent word game studio.',
    proAdFree: '100% ad-free experience',
    proArchive: 'Unlimited game archive access',
    proStats: 'Advanced stats & insights',
    proPriority: 'Priority new game modes',
    proSupport: 'Support independent development',
    proPrice: '$4.99/month',
    proCTA: 'Start free — upgrade anytime',

    // Footer
    tagline: 'The specialty coffee of word games.',
    footerGames: 'Games',
    footerCompany: 'Company',
    footerLegal: 'Legal',
    allRightsReserved: '© 2025 Klystora. All rights reserved.',

    // Mini game
    greatSolve: 'Great solve!',
    comeBackTomorrow: 'Come back tomorrow',
    playFullVersion: 'Play Full Version',
    share: 'Share',

    // Common
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    spanish: 'Español',
  },
  es: {
    // Navbar
    play: 'Jugar',
    signIn: 'Iniciar Sesión',
    games: 'Juegos',
    company: 'Empresa',
    legal: 'Legal',
    about: 'Nosotros',
    blog: 'Blog',
    pricing: 'Precios',
    careers: 'Carreras',
    contact: 'Contacto',
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    cookies: 'Política de Cookies',
    support: 'Soporte',

    // Hero
    heroTitle: 'El Juego de Palabras, Elevado',
    heroSubtitle: 'Ocho juegos de palabras diarios. Cero fricción. Un solo lugar hermoso para jugar.',
    playNowFree: 'Juega Ahora — Gratis',
    seeAllGames: 'Ver Todos los Juegos',
    socialProof: 'Únete a 350,000+ jugadores diarios',
    dailyWord: 'Palabra Diaria',

    // Game cards section
    eightWaysToPlay: '8 Formas de Jugar',
    dailyGamesEndlessWords: 'Juegos Diarios, Palabras Infinitas',
    dailyGamesSubtitle: 'Un nuevo desafío cada día. Practica cuando quieras. Construye tu racha.',

    // Game names
    dailyWordGame: 'Palabra Diaria',
    crosswordMini: 'Crucigrama Mini',
    wordSearch: 'Sopa de Letras',
    anagrams: 'Anagramas',
    connections: 'Conexiones',
    spellingBee: 'Abeja de Ortografía',
    wordLadder: 'Escalera de Palabras',
    rosco: 'Rosco',

    // Game descriptions
    dailyWordDesc: 'Adivina la palabra de 5 letras en 6 intentos',
    crosswordDesc: 'Crucigrama compacto con pistas diarias',
    wordSearchDesc: 'Encuentra palabras ocultas en una cuadrícula',
    anagramsDesc: 'Forma todas las palabras posibles con las letras',
    connectionsDesc: 'Agrupa 16 palabras en 4 categorías ocultas',
    spellingBeeDesc: 'Forma palabras con 7 letras, la central es obligatoria',
    wordLadderDesc: 'Cambia una letra cada vez para llegar a la palabra objetivo',
    roscoDesc: 'Juego ABC — una palabra por letra, contra el reloj',
    daily: 'Diario',
    sponsored: 'Patrocinado',

    // Why Klystora
    whyKlystora: 'Por Qué Klystora',
    specialtyCoffeeTitle: 'El Café de Especialidad de los Juegos de Palabras',
    specialtyCoffeeSubtitle: 'Premium, tranquilo y construido para quienes aman el idioma. Sin toxicidad. Sin ruido. Solo palabras.',
    instantPlay: 'Juego Instantáneo',
    instantPlayDesc: 'Sin registro. Sin descarga. Sin fricción. Abre, juega, listo. Tu racha te espera.',
    languages: '27 Idiomas',
    languagesDesc: 'Del inglés al finlandés. Juega en tu idioma, aprende otro. El mundo habla en palabras.',
    builtForStreaks: 'Construido para Rachas',
    builtForStreaksDesc: 'Rastrea tus estadísticas. Comparte tus victorias. Compite contigo mismo. Cada día es un nuevo desafío.',
    calmNonToxic: 'Tranquilo y No Tóxico',
    calmNonToxicDesc: 'Sin clasificaciones. Sin presión. Sin patrones oscuros. Solo tú, las palabras y un momento de enfoque tranquilo.',
    cleanAdFree: 'Limpio y Sin Anuncios',
    cleanAdFreeDesc: 'El nivel gratuito tiene anuncios discretos. Pro los elimina por completo. Tú eliges tu experiencia.',
    deepStats: 'Estadísticas Profundas',
    deepStatsDesc: 'Distribución de intentos, tendencias de tiempo, desglose por idioma. Entiende cómo tu cerebro trabaja con palabras.',

    // Stats banner
    dailyPlayers: 'Jugadores Diarios',
    languagesCount: 'Idiomas',
    gamesPlayed: 'Partidas Jugadas',
    countries: 'Países',
    joinCommunity: 'Únete a la Comunidad — Es Gratis',

    // Pro teaser
    goPro: 'Hazte Pro',
    proTitle: 'Tu Mejor Juego, Sin Interrupciones',
    proDesc: 'Elimina anuncios. Desbloquea archivos ilimitados. Profundiza en tus estadísticas. Apoya un estudio de juegos de palabras independiente y tranquilo.',
    proAdFree: 'Experiencia 100% sin anuncios',
    proArchive: 'Acceso ilimitado al archivo de juegos',
    proStats: 'Estadísticas e insights avanzados',
    proPriority: 'Prioridad en nuevos modos de juego',
    proSupport: 'Apoya el desarrollo independiente',
    proPrice: '$4.99/mes',
    proCTA: 'Empieza gratis — mejora cuando quieras',

    // Footer
    tagline: 'El café de especialidad de los juegos de palabras.',
    footerGames: 'Juegos',
    footerCompany: 'Empresa',
    footerLegal: 'Legal',
    allRightsReserved: '© 2025 Klystora. Todos los derechos reservados.',

    // Mini game
    greatSolve: '¡Buena resolución!',
    comeBackTomorrow: 'Vuelve mañana',
    playFullVersion: 'Jugar Versión Completa',
    share: 'Compartir',

    // Common
    light: 'Claro',
    dark: 'Oscuro',
    english: 'English',
    spanish: 'Español',
  },
  zh: {
    // Navbar
    play: '开始游戏',
    signIn: '登录',
    games: '游戏',
    company: '公司',
    legal: '法律',
    about: '关于',
    blog: '博客',
    pricing: '价格',
    careers: '招聘',
    contact: '联系我们',
    privacy: '隐私政策',
    terms: '服务条款',
    cookies: 'Cookie政策',
    support: '支持',

    // Hero
    heroTitle: '文字游戏，升华体验',
    heroSubtitle: '八款每日文字游戏。零摩擦。一个精美的游戏天地。',
    playNowFree: '立即开始 — 免费',
    seeAllGames: '查看所有游戏',
    socialProof: '加入35万+每日玩家',
    dailyWord: '每日一词',

    // Game cards section
    eightWaysToPlay: '8种玩法',
    dailyGamesEndlessWords: '每日游戏，无尽文字',
    dailyGamesSubtitle: '每天都有新挑战。随时练习。保持连胜。',

    // Game names
    dailyWordGame: '每日一词',
    crosswordMini: '迷你填字',
    wordSearch: '找单词',
    anagrams: '字母重组',
    connections: '联想',
    spellingBee: '拼写比赛',
    wordLadder: '单词阶梯',
    rosco: '转轮盘',

    // Game descriptions
    dailyWordDesc: '6次机会猜出5字母单词',
    crosswordDesc: '带每日线索的紧凑填字游戏',
    wordSearchDesc: '在字母网格中寻找隐藏单词',
    anagramsDesc: '用字母组成尽可能多的单词',
    connectionsDesc: '将16个单词分成4个隐藏类别',
    spellingBeeDesc: '用7个字母组成单词，中心字母必须包含',
    wordLadderDesc: '每次改变一个字母到达目标单词',
    roscoDesc: 'ABC单词游戏——每个字母一个单词，计时挑战',
    daily: '每日',
    sponsored: '赞助',

    // Why Klystora
    whyKlystora: '为什么选择Klystora',
    specialtyCoffeeTitle: '文字游戏中的精品咖啡',
    specialtyCoffeeSubtitle: '高端、宁静，为热爱语言的人打造。无毒性。无噪音。只有文字。',
    instantPlay: '即时游戏',
    instantPlayDesc: '无需注册。无需下载。无摩擦。打开，游戏，完成。你的连胜在等你。',
    languages: '27种语言',
    languagesDesc: '从英语到芬兰语。用你的语言游戏，学习另一种。世界用文字交流。',
    builtForStreaks: '为连胜而生',
    builtForStreaksDesc: '追踪统计。分享胜利。与自己竞争。每天都是新挑战。',
    calmNonToxic: '宁静无毒',
    calmNonToxicDesc: '无排行榜。无压力。无黑暗模式。只有你、文字和宁静专注的时刻。',
    cleanAdFree: '清爽无广告选项',
    cleanAdFreeDesc: '免费版有 discreet 广告。Pro版完全去除。你选择体验。',
    deepStats: '深度统计',
    deepStatsDesc: '猜测分布、解题时间趋势、语言分析。了解你的大脑如何处理文字。',

    // Stats banner
    dailyPlayers: '每日玩家',
    languagesCount: '语言',
    gamesPlayed: '游戏次数',
    countries: '国家',
    joinCommunity: '加入社区——免费',

    // Pro teaser
    goPro: '升级Pro',
    proTitle: '最佳游戏体验，无中断',
    proDesc: '去除广告。解锁无限存档。深入统计。支持宁静独立的文字游戏工作室。',
    proAdFree: '100%无广告体验',
    proArchive: '无限游戏存档访问',
    proStats: '高级统计与洞察',
    proPriority: '优先体验新游戏模式',
    proSupport: '支持独立开发',
    proPrice: '¥35/月',
    proCTA: '免费开始——随时升级',

    // Footer
    tagline: '文字游戏中的精品咖啡。',
    footerGames: '游戏',
    footerCompany: '公司',
    footerLegal: '法律',
    allRightsReserved: '© 2025 Klystora。保留所有权利。',

    // Mini game
    greatSolve: '解得漂亮！',
    comeBackTomorrow: '明天再来',
    playFullVersion: '玩完整版',
    share: '分享',

    // Common
    light: '浅色',
    dark: '深色',
    english: 'English',
    spanish: 'Español',
  },
  hi: {
    // Navbar
    play: 'खेलें',
    signIn: 'साइन इन',
    games: 'खेल',
    company: 'कंपनी',
    legal: 'कानूनी',
    about: 'हमारे बारे में',
    blog: 'ब्लॉग',
    pricing: 'मूल्य',
    careers: 'करियर',
    contact: 'संपर्क',
    privacy: 'गोपनीयता नीति',
    terms: 'सेवा की शर्तें',
    cookies: 'कुकी नीति',
    support: 'सहायता',

    // Hero
    heroTitle: 'शब्द खेल, उन्नत',
    heroSubtitle: 'आठ दैनिक शब्द खेल। शून्य घर्षण। खेलने के लिए एक सुंदर जगह।',
    playNowFree: 'अभी खेलें — मुफ्त',
    seeAllGames: 'सभी खेल देखें',
    socialProof: '3,50,000+ दैनिक खिलाड़ियों से जुड़ें',
    dailyWord: 'दिन का शब्द',

    // Game cards section
    eightWaysToPlay: '8 तरीके खेलने के',
    dailyGamesEndlessWords: 'दैनिक खेल, अनंत शब्द',
    dailyGamesSubtitle: 'हर दिन एक नई चुनौती। कभी भी अभ्यास करें। अपनी लकीर बनाएं।',

    // Game names
    dailyWordGame: 'दिन का शब्द',
    crosswordMini: 'छोटा क्रॉसवर्ड',
    wordSearch: 'शब्द खोज',
    anagrams: 'अक्षर जोड़',
    connections: 'संबंध',
    spellingBee: 'वर्तनी मधुमक्खी',
    wordLadder: 'शब्द सीढ़ी',
    rosco: 'शब्द चक्र',

    // Game descriptions
    dailyWordDesc: '6 प्रयासों में 5 अक्षर का शब्द अनुमान लगाएं',
    crosswordDesc: 'दैनिक संकेतों के साथ संक्षिप्त क्रॉसवर्ड पहेली',
    wordSearchDesc: 'अक्षर जाल में छिपे शब्द खोजें',
    anagramsDesc: 'अक्षरों को व्यवस्थित करके जितने शब्द बना सकें',
    connectionsDesc: '16 शब्दों को 4 छिपी श्रेणियों में समूहित करें',
    spellingBeeDesc: '7 अक्षरों से शब्द बनाएं, केंद्रीय अक्षर अनिवार्य',
    wordLadderDesc: 'लक्ष्य शब्द तक पहुंचने के लिए एक-एक अक्षर बदलें',
    roscoDesc: 'ABC शब्द खेल — प्रति अक्षर एक शब्द, समय के विरुद्ध',
    daily: 'दैनिक',
    sponsored: 'प्रायोजित',

    // Why Klystora
    whyKlystora: 'क्यों Klystora',
    specialtyCoffeeTitle: 'शब्द खेलों की विशेष कॉफी',
    specialtyCoffeeSubtitle: 'प्रीमियम, शांत, और भाषा से प्यार करने वालों के लिए बना। कोई विषाक्तता नहीं। कोई शोर नहीं। केवल शब्द।',
    instantPlay: 'तुरंत खेलें',
    instantPlayDesc: 'कोई साइनअप नहीं। कोई डाउनलोड नहीं। कोई घर्षण नहीं। खोलें, खेलें, हो गया। आपकी लकीर इंतजार कर रही है।',
    languages: '27 भाषाएं',
    languagesDesc: 'अंग्रेजी से फिनिश तक। अपनी भाषा में खेलें, दूसरी सीखें। दुनिया शब्दों में बोलती है।',
    builtForStreaks: 'लकीरों के लिए बना',
    builtForStreaksDesc: 'अपने आंकड़े ट्रैक करें। अपनी जीत साझा करें। खुद से प्रतिस्पर्धा करें। हर दिन एक नई चुनौती है।',
    calmNonToxic: 'शांत और गैर-विषाक्त',
    calmNonToxicDesc: 'कोई लीडरबोर्ड नहीं। कोई दबाव नहीं। कोई गहरे पैटर्न नहीं। केवल आप, शब्द, और शांति का एक क्षण।',
    cleanAdFree: 'स्वच्छ और विज्ञापन-मुक्त विकल्प',
    cleanAdFreeDesc: 'मुफ्त संस्करण में सूक्ष्म विज्ञापन हैं। Pro पूरी तरह हटा देता है। आप अपना अनुभव चुनें।',
    deepStats: 'गहरे आंकड़े',
    deepStatsDesc: 'अनुमान वितरण, हल करने का समय, भाषा विश्लेषण। समझें कि आपका दिमाग शब्दों के साथ कैसे काम करता है।',

    // Stats banner
    dailyPlayers: 'दैनिक खिलाड़ी',
    languagesCount: 'भाषाएं',
    gamesPlayed: 'खेले गए खेल',
    countries: 'देश',
    joinCommunity: 'समुदाय से जुड़ें — मुफ्त',

    // Pro teaser
    goPro: 'Pro बनें',
    proTitle: 'आपका सर्वश्रेष्ठ खेल, बिना रुकावट',
    proDesc: 'विज्ञापन हटाएं। असीमित संग्रहण अनलॉक करें। अपने आंकड़ों में गहराई से जाएं। एक शांत, स्वतंत्र शब्द खेल स्टूडियो का समर्थन करें।',
    proAdFree: '100% विज्ञापन-मुक्त अनुभव',
    proArchive: 'असीमित खेल संग्रहण पहुंच',
    proStats: 'उन्नत आंकड़े और अंतर्दृष्टि',
    proPriority: 'नए खेल मोड में प्राथमिकता',
    proSupport: 'स्वतंत्र विकास का समर्थन करें',
    proPrice: '₹399/माह',
    proCTA: 'मुफ्त शुरू करें — कभी भी अपग्रेड करें',

    // Footer
    tagline: 'शब्द खेलों की विशेष कॉफी।',
    footerGames: 'खेल',
    footerCompany: 'कंपनी',
    footerLegal: 'कानूनी',
    allRightsReserved: '© 2025 Klystora। सर्वाधिकार सुरक्षित।',

    // Mini game
    greatSolve: 'शानदार हल!',
    comeBackTomorrow: 'कल वापस आएं',
    playFullVersion: 'पूर्ण संस्करण खेलें',
    share: 'साझा करें',

    // Common
    light: 'हल्का',
    dark: 'गहरा',
    english: 'English',
    spanish: 'Español',
  },
  pt: {
    // Navbar
    play: 'Jogar',
    signIn: 'Entrar',
    games: 'Jogos',
    company: 'Empresa',
    legal: 'Legal',
    about: 'Sobre',
    blog: 'Blog',
    pricing: 'Preços',
    careers: 'Carreiras',
    contact: 'Contato',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    cookies: 'Política de Cookies',
    support: 'Suporte',

    // Hero
    heroTitle: 'Jogo de Palavras, Elevado',
    heroSubtitle: 'Oito jogos de palavras diários. Zero fricção. Um lugar lindo para jogar.',
    playNowFree: 'Jogar Agora — Grátis',
    seeAllGames: 'Ver Todos os Jogos',
    socialProof: 'Junte-se a 350.000+ jogadores diários',
    dailyWord: 'Palavra do Dia',

    // Game cards section
    eightWaysToPlay: '8 Formas de Jogar',
    dailyGamesEndlessWords: 'Jogos Diários, Palavras Infinitas',
    dailyGamesSubtitle: 'Um novo desafio todo dia. Pratique a qualquer hora. Construa sua sequência.',

    // Game names
    dailyWordGame: 'Palavra do Dia',
    crosswordMini: 'Cruzadinha Mini',
    wordSearch: 'Caça-Palavras',
    anagrams: 'Anagramas',
    connections: 'Conexões',
    spellingBee: 'Abelha de Ortografia',
    wordLadder: 'Escada de Palavras',
    rosco: 'Roda de Palavras',

    // Game descriptions
    dailyWordDesc: 'Adivinhe a palavra de 5 letras em 6 tentativas',
    crosswordDesc: 'Palavras cruzadas compactas com pistas diárias',
    wordSearchDesc: 'Encontre palavras escondidas em uma grade',
    anagramsDesc: 'Forme o máximo de palavras possível com as letras',
    connectionsDesc: 'Agrupe 16 palavras em 4 categorias ocultas',
    spellingBeeDesc: 'Forme palavras com 7 letras, a central é obrigatória',
    wordLadderDesc: 'Mude uma letra de cada vez para chegar à palavra alvo',
    roscoDesc: 'Jogo ABC — uma palavra por letra, contra o relógio',
    daily: 'Diário',
    sponsored: 'Patrocinado',

    // Why Klystora
    whyKlystora: 'Por Que Klystora',
    specialtyCoffeeTitle: 'O Café Especializado dos Jogos de Palavras',
    specialtyCoffeeSubtitle: 'Premium, calmo e construído para quem ama a linguagem. Sem toxicidade. Sem barulho. Apenas palavras.',
    instantPlay: 'Jogo Instantâneo',
    instantPlayDesc: 'Sem cadastro. Sem download. Sem fricção. Abra, jogue, pronto. Sua sequência espera.',
    languages: '27 Idiomas',
    languagesDesc: 'Do inglês ao finlandês. Jogue no seu idioma, aprenda outro. O mundo fala em palavras.',
    builtForStreaks: 'Construído para Sequências',
    builtForStreaksDesc: 'Acompanhe suas estatísticas. Compartilhe suas vitórias. Compita consigo mesmo. Cada dia é um novo desafio.',
    calmNonToxic: 'Calmo e Não Tóxico',
    calmNonToxicDesc: 'Sem classificações. Sem pressão. Sem padrões escuros. Apenas você, as palavras e um momento de foco tranquilo.',
    cleanAdFree: 'Limpo e Sem Anúncios',
    cleanAdFreeDesc: 'O nível gratuito tem anúncios discretos. Pro os remove completamente. Você escolhe sua experiência.',
    deepStats: 'Estatísticas Profundas',
    deepStatsDesc: 'Distribuição de tentativas, tendências de tempo, análise por idioma. Entenda como seu cérebro trabalha com palavras.',

    // Stats banner
    dailyPlayers: 'Jogadores Diários',
    languagesCount: 'Idiomas',
    gamesPlayed: 'Jogos Jogados',
    countries: 'Países',
    joinCommunity: 'Junte-se à Comunidade — É Grátis',

    // Pro teaser
    goPro: 'Fazer Pro',
    proTitle: 'Seu Melhor Jogo, Sem Interrupções',
    proDesc: 'Remova anúncios. Desbloqueie arquivos ilimitados. Mergulhe nas estatísticas. Apoie um estúdio de jogos de palavras calmo e independente.',
    proAdFree: 'Experiência 100% sem anúncios',
    proArchive: 'Acesso ilimitado ao arquivo de jogos',
    proStats: 'Estatísticas e insights avançados',
    proPriority: 'Prioridade em novos modos de jogo',
    proSupport: 'Apoie o desenvolvimento independente',
    proPrice: 'R$24,99/mês',
    proCTA: 'Comece grátis — melhore quando quiser',

    // Footer
    tagline: 'O café especializado dos jogos de palavras.',
    footerGames: 'Jogos',
    footerCompany: 'Empresa',
    footerLegal: 'Legal',
    allRightsReserved: '© 2025 Klystora. Todos os direitos reservados.',

    // Mini game
    greatSolve: 'Boa solução!',
    comeBackTomorrow: 'Volte amanhã',
    playFullVersion: 'Jogar Versão Completa',
    share: 'Compartilhar',

    // Common
    light: 'Claro',
    dark: 'Escuro',
    english: 'English',
    spanish: 'Español',
  },
  bn: {
    // Navbar
    play: 'খেলুন',
    signIn: 'সাইন ইন',
    games: 'খেলা',
    company: 'কোম্পানি',
    legal: 'আইনি',
    about: 'আমাদের সম্পর্কে',
    blog: 'ব্লগ',
    pricing: 'মূল্য',
    careers: 'ক্যারিয়ার',
    contact: 'যোগাযোগ',
    privacy: 'গোপনীয়তা নীতি',
    terms: 'সেবার শর্তাবলী',
    cookies: 'কুকি নীতি',
    support: 'সহায়তা',

    // Hero
    heroTitle: 'শব্দ খেলা, উন্নত',
    heroSubtitle: 'আটটি দৈনিক শব্দ খেলা। শূন্য ঘর্ষণ। খেলার জন্য একটি সুন্দর জায়গা।',
    playNowFree: 'এখনই খেলুন — বিনামূল্যে',
    seeAllGames: 'সব খেলা দেখুন',
    socialProof: '৩,৫০,০০০+ দৈনিক খেলোয়াড়ের সাথে যোগ দিন',
    dailyWord: 'দৈনিক শব্দ',

    // Game cards section
    eightWaysToPlay: '৮টি খেলার উপায়',
    dailyGamesEndlessWords: 'দৈনিক খেলা, অসীম শব্দ',
    dailyGamesSubtitle: 'প্রতিদিন নতুন চ্যালেঞ্জ। যেকোনো সময় অনুশীলন করুন। আপনার ধারাবাহিকতা গড়ুন।',

    // Game names
    dailyWordGame: 'দৈনিক শব্দ',
    crosswordMini: 'ছোট ক্রসওয়ার্ড',
    wordSearch: 'শব্দ খোজ',
    anagrams: 'বাক্‌যোড়া',
    connections: 'সম্পর্ক',
    spellingBee: 'বর্ণনা মৌমাছি',
    wordLadder: 'শব্দ সিঁড়ি',
    rosco: 'শব্দ চক্র',

    // Game descriptions
    dailyWordDesc: '৬ প্রচেষ্টায় ৫ অক্ষরের শব্দ অনুমান করুন',
    crosswordDesc: 'দৈনিক ইঙ্গিত সহ সংকুচিত ক্রসওয়ার্ড ধাঁধা',
    wordSearchDesc: 'অক্ষরের জালে লুকানো শব্দ খুঁজুন',
    anagramsDesc: 'অক্ষর সাজিয়ে যত শব্দ সম্ভব তৈরি করুন',
    connectionsDesc: '১৬টি শব্দকে ৪টি লুকানো বিভাগে ভাগ করুন',
    spellingBeeDesc: '৭টি অক্ষর দিয়ে শব্দ তৈরি করুন, কেন্দ্রীয় অক্ষর বাধ্যতামূলক',
    wordLadderDesc: 'লক্ষ্য শব্দে পৌঁছতে একবারে একটি অক্ষর পরিবর্তন করুন',
    roscoDesc: 'ABC শব্দ খেলা — প্রতি অক্ষরে একটি শব্দ, সময়ের বিরুদ্ধে',
    daily: 'দৈনিক',
    sponsored: 'পৃষ্ঠপোষকতায়',

    // Why Klystora
    whyKlystora: 'কেন Klystora',
    specialtyCoffeeTitle: 'শব্দ খেলার বিশেষ কফি',
    specialtyCoffeeSubtitle: 'প্রিমিয়াম, শান্ত, এবং ভাষাপ্রেমীদের জন্য তৈরি। বিষাক্ততা নেই। শোরগোল নেই। শুধু শব্দ।',
    instantPlay: 'তাত্ক্ষণিক খেলা',
    instantPlayDesc: 'নিবন্ধন নেই। ডাউনলোড নেই। ঘর্ষণ নেই। খুলুন, খেলুন, সম্পন্ন। আপনার ধারাবাহিকতা অপেক্ষা করছে।',
    languages: '২৭টি ভাষা',
    languagesDesc: 'ইংরেজি থেকে ফিনিশ। আপনার ভাষায় খেলুন, অন্য ভাষা শিখুন। বিশ্ব শব্দে কথা বলে।',
    builtForStreaks: 'ধারাবাহিকতার জন্য তৈরি',
    builtForStreaksDesc: 'আপনার পরিসংখ্যান ট্র্যাক করুন। আপনার জয় শেয়ার করুন। নিজের সাথে প্রতিযোগিতা করুন। প্রতিদিনই নতুন চ্যালেঞ্জ।',
    calmNonToxic: 'শান্ত ও অবিষাক্ত',
    calmNonToxicDesc: 'কোনো লিডারবোর্ড নেই। চাপ নেই। অন্ধকার প্যাটার্ন নেই। শুধু আপনি, শব্দ, এবং শান্ত মনোযোগের একটি মুহূর্ত।',
    cleanAdFree: 'পরিষ্কার ও বিজ্ঞাপন-মুক্ত বিকল্প',
    cleanAdFreeDesc: 'বিনামূল্যে সংস্করণে সূক্ষ্ম বিজ্ঞাপন আছে। Pro সম্পূর্ণরূপে সরিয়ে দেয়। আপনি আপনার অভিজ্ঞতা বেছে নিন।',
    deepStats: 'গভীর পরিসংখ্যান',
    deepStatsDesc: 'অনুমান বিতরণ, সময়ের প্রবণতা, ভাষা বিশ্লেষণ। বুঝুন আপনার মস্তিষ্ক শব্দের সাথে কীভাবে কাজ করে।',

    // Stats banner
    dailyPlayers: 'দৈনিক খেলোয়াড়',
    languagesCount: 'ভাষা',
    gamesPlayed: 'খেলা হয়েছে',
    countries: 'দেশ',
    joinCommunity: 'সম্প্রদায়ে যোগ দিন — বিনামূল্যে',

    // Pro teaser
    goPro: 'Pro করুন',
    proTitle: 'আপনার সেরা খেলা, বাধাহীন',
    proDesc: 'বিজ্ঞাপন সরান। সীমাহীন আর্কাইভ আনলক করুন। আপনার পরিসংখ্যানে গভীরভাবে ডুব দিন। একটি শান্ত, স্বাধীন শব্দ খেলা স্টুডিও সমর্থন করুন।',
    proAdFree: '১০০% বিজ্ঞাপন-মুক্ত অভিজ্ঞতা',
    proArchive: 'সীমাহীন খেলা আর্কাইভ অ্যাক্সেস',
    proStats: 'উন্নত পরিসংখ্যান ও অন্তর্দৃষ্টি',
    proPriority: 'নতুন খেলা মোডে অগ্রাধিকার',
    proSupport: 'স্বাধীন উন্নয়ন সমর্থন করুন',
    proPrice: '৳499/মাস',
    proCTA: 'বিনামূল্যে শুরু করুন — যেকোনো সময় আপগ্রেড করুন',

    // Footer
    tagline: 'শব্দ খেলার বিশেষ কফি।',
    footerGames: 'খেলা',
    footerCompany: 'কোম্পানি',
    footerLegal: 'আইনি',
    allRightsReserved: '© 2025 Klystora। সর্বস্বত্ব সংরক্ষিত।',

    // Mini game
    greatSolve: 'চমৎকার সমাধান!',
    comeBackTomorrow: 'আগামীকাল ফিরে আসুন',
    playFullVersion: 'সম্পূর্ণ সংস্করণ খেলুন',
    share: 'শেয়ার করুন',

    // Common
    light: 'হালকা',
    dark: 'গাঢ়',
    english: 'English',
    spanish: 'Español',
  },
  ru: {
    // Navbar
    play: 'Играть',
    signIn: 'Войти',
    games: 'Игры',
    company: 'Компания',
    legal: 'Правовая информация',
    about: 'О нас',
    blog: 'Блог',
    pricing: 'Цены',
    careers: 'Карьера',
    contact: 'Контакты',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    cookies: 'Политика cookies',
    support: 'Поддержка',

    // Hero
    heroTitle: 'Словесные игры на новом уровне',
    heroSubtitle: 'Восемь ежедневных словесных игр. Ноль трения. Одно прекрасное место для игры.',
    playNowFree: 'Играть сейчас — бесплатно',
    seeAllGames: 'Все игры',
    socialProof: 'Присоединяйтесь к 350 000+ ежедневных игроков',
    dailyWord: 'Слово дня',

    // Game cards section
    eightWaysToPlay: '8 способов играть',
    dailyGamesEndlessWords: 'Ежедневные игры, бесконечные слова',
    dailyGamesSubtitle: 'Новый вызов каждый день. Практикуйтесь в любое время. Создавайте свою серию.',

    // Game names
    dailyWordGame: 'Слово дня',
    crosswordMini: 'Мини-кроссворд',
    wordSearch: 'Поиск слов',
    anagrams: 'Анаграммы',
    connections: 'Связи',
    spellingBee: 'Пчела орфографии',
    wordLadder: 'Лестница слов',
    rosco: 'Колесо слов',

    // Game descriptions
    dailyWordDesc: 'Угадайте слово из 5 букв за 6 попыток',
    crosswordDesc: 'Компактный кроссворд с ежедневными подсказками',
    wordSearchDesc: 'Найдите скрытые слова в сетке букв',
    anagramsDesc: 'Составьте как можно больше слов из букв',
    connectionsDesc: 'Разделите 16 слов на 4 скрытые категории',
    spellingBeeDesc: 'Составляйте слова из 7 букв, центральная обязательна',
    wordLadderDesc: 'Меняйте по одной букве, чтобы достичь целевого слова',
    roscoDesc: 'Игра ABC — по слову на каждую букву, на время',
    daily: 'Ежедневно',
    sponsored: 'Спонсорское',

    // Why Klystora
    whyKlystora: 'Почему Klystora',
    specialtyCoffeeTitle: 'Специалитет-кофе словесных игр',
    specialtyCoffeeSubtitle: 'Премиум, спокойный и созданный для тех, кто любит язык. Без токсичности. Без шума. Только слова.',
    instantPlay: 'Мгновенная игра',
    instantPlayDesc: 'Без регистрации. Без скачивания. Без трения. Открой, играй, готово. Твоя серия ждёт.',
    languages: '27 языков',
    languagesDesc: 'От английского до финского. Играй на своём языке, учи другой. Мир говорит словами.',
    builtForStreaks: 'Создан для серий',
    builtForStreaksDesc: 'Отслеживай статистику. Делись победами. Соревнуйся с собой. Каждый день — новый вызов.',
    calmNonToxic: 'Спокойный и нетоксичный',
    calmNonToxicDesc: 'Нет таблиц лидеров. Нет давления. Нет тёмных паттернов. Только ты, слова и момент тихого сосредоточения.',
    cleanAdFree: 'Чистый и без рекламы',
    cleanAdFreeDesc: 'Бесплатная версия с ненавязчивой рекламой. Pro полностью убирает. Выбирай свой опыт.',
    deepStats: 'Глубокая статистика',
    deepStatsDesc: 'Распределение попыток, тренды времени, разбивка по языкам. Пойми, как твой мозг работает со словами.',

    // Stats banner
    dailyPlayers: 'Ежедневные игроки',
    languagesCount: 'Языки',
    gamesPlayed: 'Сыграно игр',
    countries: 'Страны',
    joinCommunity: 'Присоединяйтесь к сообществу — бесплатно',

    // Pro teaser
    goPro: 'Станьте Pro',
    proTitle: 'Ваша лучшая игра, без прерываний',
    proDesc: 'Уберите рекламу. Разблокируйте безлимитный архив. Углубитесь в статистику. Поддержите спокойную независимую студию словесных игр.',
    proAdFree: '100% без рекламы',
    proArchive: 'Безлимитный доступ к архиву',
    proStats: 'Расширенная статистика и аналитика',
    proPriority: 'Приоритет в новых режимах',
    proSupport: 'Поддержите независимую разработку',
    proPrice: '399 ₽/мес',
    proCTA: 'Начните бесплатно — улучшайте в любое время',

    // Footer
    tagline: 'Специалитет-кофе словесных игр.',
    footerGames: 'Игры',
    footerCompany: 'Компания',
    footerLegal: 'Правовая информация',
    allRightsReserved: '© 2025 Klystora. Все права защищены.',

    // Mini game
    greatSolve: 'Отличное решение!',
    comeBackTomorrow: 'Возвращайтесь завтра',
    playFullVersion: 'Играть полную версию',
    share: 'Поделиться',

    // Common
    light: 'Светлая',
    dark: 'Тёмная',
    english: 'English',
    spanish: 'Español',
  },
  ja: {
    // Navbar
    play: 'プレイ',
    signIn: 'サインイン',
    games: 'ゲーム',
    company: '会社',
    legal: '法的情報',
    about: 'について',
    blog: 'ブログ',
    pricing: '料金',
    careers: '採用',
    contact: 'お問い合わせ',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    cookies: 'Cookieポリシー',
    support: 'サポート',

    // Hero
    heroTitle: '言葉遊び、高みへ',
    heroSubtitle: '8つのデイリーワードゲーム。ゼロ摩擦。美しい遊び場。',
    playNowFree: '今すぐプレイ — 無料',
    seeAllGames: 'すべてのゲームを見る',
    socialProof: '35万人以上のデイリープレイヤーに参加',
    dailyWord: '今日の言葉',

    // Game cards section
    eightWaysToPlay: '8つの遊び方',
    dailyGamesEndlessWords: 'デイリーゲーム、無限の言葉',
    dailyGamesSubtitle: '毎日新しいチャレンジ。いつでも練習。連続記録を作ろう。',

    // Game names
    dailyWordGame: '今日の言葉',
    crosswordMini: 'ミニクロスワード',
    wordSearch: '単語探し',
    anagrams: 'アナグラム',
    connections: '連想',
    spellingBee: 'スペリングビー',
    wordLadder: '単語はしご',
    rosco: '単語車輪',

    // Game descriptions
    dailyWordDesc: '6回以内に5文字の単語を当てよう',
    crosswordDesc: 'デイリーヒント付きコンパクトクロスワード',
    wordSearchDesc: '文字のグリッドから隠れた単語を見つけよう',
    anagramsDesc: '文字を並べ替えてできるだけ多くの単語を作ろう',
    connectionsDesc: '16個の単語を4つの隠れたカテゴリーに分けよう',
    spellingBeeDesc: '7文字から単語を作ろう、中央の文字は必須',
    wordLadderDesc: '1文字ずつ変えて目標の単語にたどり着こう',
    roscoDesc: 'ABC単語ゲーム——各文字1単語、時間との勝負',
    daily: 'デイリー',
    sponsored: 'スポンサー',

    // Why Klystora
    whyKlystora: 'Klystoraを選ぶ理由',
    specialtyCoffeeTitle: 'ワードゲームのスペシャルティコーヒー',
    specialtyCoffeeSubtitle: 'プレミアムで静か、言語を愛する人のために作られた。毒性なし。騒音なし。言葉だけ。',
    instantPlay: 'インスタントプレイ',
    instantPlayDesc: '登録不要。ダウンロード不要。摩擦なし。開いて、遊んで、完了。連続記録が待っている。',
    languages: '27言語',
    languagesDesc: '英語からフィンランド語まで。あなたの言語で遊び、別の言語を学ぼう。世界は言葉で語る。',
    builtForStreaks: '連続記録のために作られた',
    builtForStreaksDesc: '統計を追跡。勝利を共有。自分自身と競争。毎日が新しいチャレンジ。',
    calmNonToxic: '静かで無毒',
    calmNonToxicDesc: 'ランキングなし。プレッシャーなし。ダークパターンなし。あなたと言葉と静かな集中の時間だけ。',
    cleanAdFree: 'クリーンで広告なしの選択肢',
    cleanAdFreeDesc: '無料版は控えめな広告あり。Proは完全に削除。あなたが体験を選ぶ。',
    deepStats: '深い統計',
    deepStatsDesc: '推測分布、解答時間の傾向、言語内訳。あなたの脳が言葉とどう働くか理解しよう。',

    // Stats banner
    dailyPlayers: 'デイリープレイヤー',
    languagesCount: '言語',
    gamesPlayed: 'プレイ回数',
    countries: '国',
    joinCommunity: 'コミュニティに参加——無料',

    // Pro teaser
    goPro: 'Proにする',
    proTitle: '最高のゲーム、中断なし',
    proDesc: '広告を削除。無制限アーカイブを解放。統計に深く潜る。静かな独立したワードゲームスタジオを支援。',
    proAdFree: '100%広告なし体験',
    proArchive: '無制限ゲームアーカイブアクセス',
    proStats: '高度な統計と洞察',
    proPriority: '新ゲームモード優先',
    proSupport: '独立開発を支援',
    proPrice: '¥730/月',
    proCTA: '無料で開始——いつでもアップグレード',

    // Footer
    tagline: 'ワードゲームのスペシャルティコーヒー。',
    footerGames: 'ゲーム',
    footerCompany: '会社',
    footerLegal: '法的情報',
    allRightsReserved: '© 2025 Klystora。全著作権所有。',

    // Mini game
    greatSolve: '素晴らしい解答！',
    comeBackTomorrow: '明日また来てね',
    playFullVersion: 'フルバージョンをプレイ',
    share: 'シェア',

    // Common
    light: 'ライト',
    dark: 'ダーク',
    english: 'English',
    spanish: 'Español',
  },
  de: {
    // Navbar
    play: 'Spielen',
    signIn: 'Anmelden',
    games: 'Spiele',
    company: 'Unternehmen',
    legal: 'Rechtliches',
    about: 'Über uns',
    blog: 'Blog',
    pricing: 'Preise',
    careers: 'Karriere',
    contact: 'Kontakt',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    cookies: 'Cookie-Richtlinie',
    support: 'Support',

    // Hero
    heroTitle: 'Wortspiele, auf höchstem Niveau',
    heroSubtitle: 'Acht tägliche Wortspiele. Null Reibung. Ein wunderschöner Ort zum Spielen.',
    playNowFree: 'Jetzt spielen — Kostenlos',
    seeAllGames: 'Alle Spiele ansehen',
    socialProof: 'Schließe dich 350.000+ täglichen Spielern an',
    dailyWord: 'Wort des Tages',

    // Game cards section
    eightWaysToPlay: '8 Spielweisen',
    dailyGamesEndlessWords: 'Tägliche Spiele, endlose Wörter',
    dailyGamesSubtitle: 'Jeden Tag eine neue Herausforderung. Jederzeit üben. Deine Serie aufbauen.',

    // Game names
    dailyWordGame: 'Wort des Tages',
    crosswordMini: 'Mini-Kreuzwort',
    wordSearch: 'Wort-Suche',
    anagrams: 'Anagramme',
    connections: 'Verbindungen',
    spellingBee: 'Rechtschreib-Biene',
    wordLadder: 'Wortleiter',
    rosco: 'Wortrad',

    // Game descriptions
    dailyWordDesc: 'Errate das 5-Buchstaben-Wort in 6 Versuchen',
    crosswordDesc: 'Kompaktes Kreuzworträtsel mit täglichen Hinweisen',
    wordSearchDesc: 'Finde versteckte Wörter in einem Buchstabengitter',
    anagramsDesc: 'Bilde aus den Buchstaben so viele Wörter wie möglich',
    connectionsDesc: 'Ordne 16 Wörter in 4 versteckte Kategorien',
    spellingBeeDesc: 'Bilde Wörter aus 7 Buchstaben, der mittlere ist Pflicht',
    wordLadderDesc: 'Ändere jeweils einen Buchstaben, um zum Zielwort zu gelangen',
    roscoDesc: 'ABC-Wortspiel — ein Wort pro Buchstabe, gegen die Uhr',
    daily: 'Täglich',
    sponsored: 'Gesponsert',

    // Why Klystora
    whyKlystora: 'Warum Klystora',
    specialtyCoffeeTitle: 'Der Specialty-Kaffee der Wortspiele',
    specialtyCoffeeSubtitle: 'Premium, ruhig und gemacht für Menschen, die Sprache lieben. Keine Toxizität. Kein Lärm. Nur Wörter.',
    instantPlay: 'Sofortspiel',
    instantPlayDesc: 'Keine Anmeldung. Kein Download. Keine Reibung. Öffnen, spielen, fertig. Deine Serie wartet.',
    languages: '27 Sprachen',
    languagesDesc: 'Von Englisch bis Finnisch. Spiele in deiner Sprache, lerne eine andere. Die Welt spricht in Wörtern.',
    builtForStreaks: 'Gemacht für Serien',
    builtForStreaksDesc: 'Verfolge deine Statistiken. Teile deine Siege. Konkurrenziere mit dir selbst. Jeder Tag ist eine neue Herausforderung.',
    calmNonToxic: 'Ruhig & Nicht-Toxisch',
    calmNonToxicDesc: 'Keine Bestenlisten. Kein Druck. Keine Dark Patterns. Nur du, die Wörter und ein Moment stiller Konzentration.',
    cleanAdFree: 'Sauber & Werbefrei-Option',
    cleanAdFreeDesc: 'Die kostenlose Version hat dezente Werbung. Pro entfernt sie vollständig. Du wählst dein Erlebnis.',
    deepStats: 'Tiefe Statistiken',
    deepStatsDesc: 'Verteilung der Versuche, Zeittrends, Sprachenaufstellung. Verstehe, wie dein Gehirn mit Wörtern arbeitet.',

    // Stats banner
    dailyPlayers: 'Tägliche Spieler',
    languagesCount: 'Sprachen',
    gamesPlayed: 'Gespielte Spiele',
    countries: 'Länder',
    joinCommunity: 'Trete der Community bei — Kostenlos',

    // Pro teaser
    goPro: 'Werde Pro',
    proTitle: 'Dein bestes Spiel, unterbrechungsfrei',
    proDesc: 'Entferne Werbung. Schalte unbegrenzte Archive frei. Tauche tief in deine Statistiken ein. Unterstütze ein ruhiges, unabhängiges Wortspiel-Studio.',
    proAdFree: '100% werbefreies Erlebnis',
    proArchive: 'Unbegrenzter Zugriff auf Spielarchive',
    proStats: 'Erweiterte Statistiken & Einblicke',
    proPriority: 'Priorität bei neuen Spielmodi',
    proSupport: 'Unterstütze unabhängige Entwicklung',
    proPrice: '4,99 €/Monat',
    proCTA: 'Kostenlos starten — jederzeit upgraden',

    // Footer
    tagline: 'Der Specialty-Kaffee der Wortspiele.',
    footerGames: 'Spiele',
    footerCompany: 'Unternehmen',
    footerLegal: 'Rechtliches',
    allRightsReserved: '© 2025 Klystora. Alle Rechte vorbehalten.',

    // Mini game
    greatSolve: 'Tolle Lösung!',
    comeBackTomorrow: 'Komm morgen wieder',
    playFullVersion: 'Vollversion spielen',
    share: 'Teilen',

    // Common
    light: 'Hell',
    dark: 'Dunkel',
    english: 'English',
    spanish: 'Español',
  },
  ko: {
    // Navbar
    play: '플레이',
    signIn: '로그인',
    games: '게임',
    company: '회사',
    legal: '법률',
    about: '소개',
    blog: '블로그',
    pricing: '가격',
    careers: '채용',
    contact: '문의',
    privacy: '개인정보처리방침',
    terms: '이용약관',
    cookies: '쿠키 정책',
    support: '지원',

    // Hero
    heroTitle: '단어 게임, 업그레이드',
    heroSubtitle: '8가지 데일리 단어 게임. 제로 마찰. 아름다운 게임 공간.',
    playNowFree: '지금 플레이 — 무료',
    seeAllGames: '모든 게임 보기',
    socialProof: '35만+ 데일리 플레이어와 함께하세요',
    dailyWord: '오늘의 단어',

    // Game cards section
    eightWaysToPlay: '8가지 플레이 방식',
    dailyGamesEndlessWords: '데일리 게임, 무한한 단어',
    dailyGamesSubtitle: '매일 새로운 도전. 언제든 연습. 연승을 쌓아보세요.',

    // Game names
    dailyWordGame: '오늘의 단어',
    crosswordMini: '미니 십자말풀이',
    wordSearch: '단어 찾기',
    anagrams: '애너그램',
    connections: '연결',
    spellingBee: '스펠링 비',
    wordLadder: '단어 사다리',
    rosco: '단어 회전판',

    // Game descriptions
    dailyWordDesc: '6번 안에 5글자 단어를 맞춰보세요',
    crosswordDesc: '데일리 힌트가 있는 컴팩트 십자말풀이',
    wordSearchDesc: '글자 그리드에서 숨겨진 단어를 찾으세요',
    anagramsDesc: '글자를 재배열해 최대한 많은 단어를 만드세요',
    connectionsDesc: '16개 단어를 4개의 숨겨진 카테고리로 나누세요',
    spellingBeeDesc: '7개 글자로 단어를 만드세요, 가운데 글자는 필수',
    wordLadderDesc: '한 글자씩 바꿔 목표 단어에 도달하세요',
    roscoDesc: 'ABC 단어 게임——글자마다 한 단어, 시간과의 싸움',
    daily: '데일리',
    sponsored: '스폰서',

    // Why Klystora
    whyKlystora: '왜 Klystora인가',
    specialtyCoffeeTitle: '단어 게임의 스페셜티 커피',
    specialtyCoffeeSubtitle: '프리미엄하고 조용하며 언어를 사랑하는 사람들을 위해 만들었습니다. 독성 없음. 소음 없음. 단어만.',
    instantPlay: '인스턴트 플레이',
    instantPlayDesc: '가입 없음. 다운로드 없음. 마찰 없음. 열고, 플레이하고, 끝. 연승이 기다리고 있습니다.',
    languages: '27개 언어',
    languagesDesc: '영어에서 핀란드어까지. 당신의 언어로 플레이하고, 다른 언어를 배우세요. 세상은 단어로 말합니다.',
    builtForStreaks: '연승을 위해 설계됨',
    builtForStreaksDesc: '통계를 추적하세요. 승리를 공유하세요. 자신과 경쟁하세요. 매일이 새로운 도전입니다.',
    calmNonToxic: '조용하고 무독성',
    calmNonToxicDesc: '리더보드 없음. 압박 없음. 다크 패턴 없음. 당신과 단어와 조용한 집중의 순간만.',
    cleanAdFree: '깔끔하고 광고 없는 옵션',
    cleanAdFreeDesc: '무료 버전에는 절제된 광고가 있습니다. Pro는 완전히 제거합니다. 당신이 경험을 선택합니다.',
    deepStats: '심층 통계',
    deepStatsDesc: '추측 분포, 풀이 시간 추세, 언어 분석. 당신의 뇌가 단어와 어떻게 작동하는지 이해하세요.',

    // Stats banner
    dailyPlayers: '데일리 플레이어',
    languagesCount: '언어',
    gamesPlayed: '플레이 횟수',
    countries: '국가',
    joinCommunity: '커뮤니티 가입——무료',

    // Pro teaser
    goPro: 'Pro로 전환',
    proTitle: '최고의 게임, 중단 없이',
    proDesc: '광고를 제거하세요. 무제한 아카이브를 잠금 해제하세요. 통계에 깊이 빠져보세요. 조용한 독립 단어 게임 스튜디오를 지원하세요.',
    proAdFree: '100% 광고 없는 경험',
    proArchive: '무제한 게임 아카이브 접근',
    proStats: '고급 통계 및 인사이트',
    proPriority: '새 게임 모드 우선권',
    proSupport: '독립 개발 지원',
    proPrice: '₩6,500/월',
    proCTA: '무료로 시작——언제든 업그레이드',

    // Footer
    tagline: '단어 게임의 스페셜티 커피.',
    footerGames: '게임',
    footerCompany: '회사',
    footerLegal: '법률',
    allRightsReserved: '© 2025 Klystora. 모든 권리 보유.',

    // Mini game
    greatSolve: '훌륭한 풀이!',
    comeBackTomorrow: '내일 다시 오세요',
    playFullVersion: '풀 버전 플레이',
    share: '공유',

    // Common
    light: '라이트',
    dark: '다크',
    english: 'English',
    spanish: 'Español',
  },
  fr: {
    // Navbar
    play: 'Jouer',
    signIn: 'Connexion',
    games: 'Jeux',
    company: 'Entreprise',
    legal: 'Mentions légales',
    about: 'À propos',
    blog: 'Blog',
    pricing: 'Tarifs',
    careers: 'Carrières',
    contact: 'Contact',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions d\'utilisation',
    cookies: 'Politique des cookies',
    support: 'Support',

    // Hero
    heroTitle: 'Le Jeu de Mots, Élevé',
    heroSubtitle: 'Huit jeux de mots quotidiens. Zéro friction. Un bel endroit pour jouer.',
    playNowFree: 'Jouer maintenant — Gratuit',
    seeAllGames: 'Voir tous les jeux',
    socialProof: 'Rejoignez 350 000+ joueurs quotidiens',
    dailyWord: 'Mot du Jour',

    // Game cards section
    eightWaysToPlay: '8 façons de jouer',
    dailyGamesEndlessWords: 'Jeux quotidiens, mots infinis',
    dailyGamesSubtitle: 'Un nouveau défi chaque jour. Pratiquez à tout moment. Construisez votre série.',

    // Game names
    dailyWordGame: 'Mot du Jour',
    crosswordMini: 'Mini Mots Croisés',
    wordSearch: 'Mots Mêlés',
    anagrams: 'Anagrammes',
    connections: 'Connexions',
    spellingBee: 'Abeille d\'Orthographe',
    wordLadder: 'Échelle de Mots',
    rosco: 'Roue de Mots',

    // Game descriptions
    dailyWordDesc: 'Devinez le mot de 5 lettres en 6 essais',
    crosswordDesc: 'Mots croisés compacts avec indices quotidiens',
    wordSearchDesc: 'Trouvez les mots cachés dans une grille',
    anagramsDesc: 'Formez autant de mots que possible avec les lettres',
    connectionsDesc: 'Regroupez 16 mots en 4 catégories cachées',
    spellingBeeDesc: 'Formez des mots avec 7 lettres, la centrale est obligatoire',
    wordLadderDesc: 'Changez une lettre à la fois pour atteindre le mot cible',
    roscoDesc: 'Jeu ABC — un mot par lettre, contre la montre',
    daily: 'Quotidien',
    sponsored: 'Sponsorisé',

    // Why Klystora
    whyKlystora: 'Pourquoi Klystora',
    specialtyCoffeeTitle: 'Le Café de Spécialité des Jeux de Mots',
    specialtyCoffeeSubtitle: 'Premium, calme et conçu pour les amoureux du langage. Pas de toxicité. Pas de bruit. Juste des mots.',
    instantPlay: 'Jeu Instantané',
    instantPlayDesc: 'Pas d\'inscription. Pas de téléchargement. Pas de friction. Ouvrez, jouez, terminé. Votre série vous attend.',
    languages: '27 Langues',
    languagesDesc: 'De l\'anglais au finnois. Jouez dans votre langue, apprenez-en une autre. Le monde parle en mots.',
    builtForStreaks: 'Conçu pour les Séries',
    builtForStreaksDesc: 'Suivez vos statistiques. Partagez vos victoires. Compétitionnez avec vous-même. Chaque jour est un nouveau défi.',
    calmNonToxic: 'Calme & Non Toxique',
    calmNonToxicDesc: 'Pas de classements. Pas de pression. Pas de dark patterns. Juste vous, les mots et un moment de concentration tranquille.',
    cleanAdFree: 'Propre & Sans Publicité',
    cleanAdFreeDesc: 'Le niveau gratuit a des publicités discrètes. Pro les supprime entièrement. Vous choisissez votre expérience.',
    deepStats: 'Statistiques Profondes',
    deepStatsDesc: 'Distribution des essais, tendances de temps, répartition par langue. Comprenez comment votre cerveau travaille avec les mots.',

    // Stats banner
    dailyPlayers: 'Joueurs Quotidiens',
    languagesCount: 'Langues',
    gamesPlayed: 'Parties Jouées',
    countries: 'Pays',
    joinCommunity: 'Rejoignez la Communauté — C\'est Gratuit',

    // Pro teaser
    goPro: 'Passer Pro',
    proTitle: 'Votre Meilleure Partie, Sans Interruption',
    proDesc: 'Supprimez les publicités. Débloquez des archives illimitées. Plongez dans vos statistiques. Soutenez un studio de jeux de mots calme et indépendant.',
    proAdFree: 'Expérience 100% sans publicité',
    proArchive: 'Accès illimité aux archives de jeux',
    proStats: 'Statistiques et analyses avancées',
    proPriority: 'Priorité sur les nouveaux modes de jeu',
    proSupport: 'Soutenez le développement indépendant',
    proPrice: '4,99 €/mois',
    proCTA: 'Commencez gratuitement — améliorez quand vous voulez',

    // Footer
    tagline: 'Le café de spécialité des jeux de mots.',
    footerGames: 'Jeux',
    footerCompany: 'Entreprise',
    footerLegal: 'Mentions légales',
    allRightsReserved: '© 2025 Klystora. Tous droits réservés.',

    // Mini game
    greatSolve: 'Belle résolution !',
    comeBackTomorrow: 'Revenez demain',
    playFullVersion: 'Jouer la version complète',
    share: 'Partager',

    // Common
    light: 'Clair',
    dark: 'Sombre',
    english: 'English',
    spanish: 'Español',
  },
  tr: {
    // Navbar
    play: 'Oyna',
    signIn: 'Giriş Yap',
    games: 'Oyunlar',
    company: 'Şirket',
    legal: 'Yasal',
    about: 'Hakkımızda',
    blog: 'Blog',
    pricing: 'Fiyatlandırma',
    careers: 'Kariyer',
    contact: 'İletişim',
    privacy: 'Gizlilik Politikası',
    terms: 'Kullanım Koşulları',
    cookies: 'Çerez Politikası',
    support: 'Destek',

    // Hero
    heroTitle: 'Kelime Oyunu, Yükseltilmiş',
    heroSubtitle: 'Sekiz günlük kelime oyunu. Sıfır sürtünme. Oynamak için güzel bir yer.',
    playNowFree: 'Şimdi Oyna — Ücretsiz',
    seeAllGames: 'Tüm Oyunları Gör',
    socialProof: '350.000+ günlük oyuncuya katıl',
    dailyWord: 'Günün Kelimesi',

    // Game cards section
    eightWaysToPlay: '8 Oynama Şekli',
    dailyGamesEndlessWords: 'Günlük Oyunlar, Sonsuz Kelimeler',
    dailyGamesSubtitle: 'Her gün yeni bir meydan okuma. İstediğin zaman pratik yap. Serini oluştur.',

    // Game names
    dailyWordGame: 'Günün Kelimesi',
    crosswordMini: 'Mini Bulmaca',
    wordSearch: 'Kelime Avı',
    anagrams: 'Anagramlar',
    connections: 'Bağlantılar',
    spellingBee: 'Yazım Arısı',
    wordLadder: 'Kelime Merdiveni',
    rosco: 'Kelime Tekerleği',

    // Game descriptions
    dailyWordDesc: '6 denemede 5 harfli kelimeyi tahmin et',
    crosswordDesc: 'Günlük ipuçlarıyla kompakt bulmaca',
    wordSearchDesc: 'Harf ızgarasında gizli kelimeleri bul',
    anagramsDesc: 'Harflerden olabildiğince çok kelime oluştur',
    connectionsDesc: '16 kelimeyi 4 gizli kategoriye ayır',
    spellingBeeDesc: '7 harften kelime oluştur, ortadaki zorunlu',
    wordLadderDesc: 'Hedef kelimeye ulaşmak için her seferinde bir harf değiştir',
    roscoDesc: 'ABC kelime oyunu — her harfe bir kelime, zamana karşı',
    daily: 'Günlük',
    sponsored: 'Sponsorlu',

    // Why Klystora
    whyKlystora: 'Neden Klystora',
    specialtyCoffeeTitle: 'Kelime Oyunlarının Özel Kahvesi',
    specialtyCoffeeSubtitle: 'Premium, sakin ve dili sevenler için yapıldı. Toksisite yok. Gürültü yok. Sadece kelimeler.',
    instantPlay: 'Anında Oyna',
    instantPlayDesc: 'Kayıt yok. İndirme yok. Sürtünme yok. Aç, oyna, bitti. Serin bekliyor.',
    languages: '27 Dil',
    languagesDesc: 'İngilizceden Finceye. Kendi dilinde oyna, başka bir dil öğren. Dünya kelimelerle konuşur.',
    builtForStreaks: 'Seriler İçin Yapıldı',
    builtForStreaksDesc: 'İstatistiklerini takip et. Zaferlerini paylaş. Kendinle yarış. Her gün yeni bir meydan okuma.',
    calmNonToxic: 'Sakin ve Toksik Olmayan',
    calmNonToxicDesc: 'Liderlik tablosu yok. Baskı yok. Karanlık desen yok. Sadece sen, kelimeler ve sessiz odaklanma anı.',
    cleanAdFree: 'Temiz ve Reklamsız Seçenek',
    cleanAdFreeDesc: 'Ücretsiz sürümde ölçülü reklamlar var. Pro tamamen kaldırır. Deneyimini sen seçersin.',
    deepStats: 'Derin İstatistikler',
    deepStatsDesc: 'Tahmin dağılımı, çözüm süresi eğilimleri, dil dökümü. Beyninin kelimelerle nasıl çalıştığını anla.',

    // Stats banner
    dailyPlayers: 'Günlük Oyuncu',
    languagesCount: 'Dil',
    gamesPlayed: 'Oynanan Oyun',
    countries: 'Ülke',
    joinCommunity: 'Topluluğa Katıl — Ücretsiz',

    // Pro teaser
    goPro: 'Pro Ol',
    proTitle: 'En İyi Oyunun, Kesintisiz',
    proDesc: 'Reklamları kaldır. Sınırsız arşivi aç. İstatistiklerine derinlemesine dal. Sakin, bağımsız bir kelime oyunu stüdyosunu destekle.',
    proAdFree: '%100 reklamsız deneyim',
    proArchive: 'Sınırsız oyun arşivi erişimi',
    proStats: 'Gelişmiş istatistikler ve içgörüler',
    proPriority: 'Yeni oyun modlarında öncelik',
    proSupport: 'Bağımsız geliştirmeyi destekle',
    proPrice: '₺149/ay',
    proCTA: 'Ücretsiz başla — istediğin zaman yükselt',

    // Footer
    tagline: 'Kelime oyunlarının özel kahvesi.',
    footerGames: 'Oyunlar',
    footerCompany: 'Şirket',
    footerLegal: 'Yasal',
    allRightsReserved: '© 2025 Klystora. Tüm hakları saklıdır.',

    // Mini game
    greatSolve: 'Harika çözüm!',
    comeBackTomorrow: 'Yarın geri dön',
    playFullVersion: 'Tam Sürümü Oyna',
    share: 'Paylaş',

    // Common
    light: 'Açık',
    dark: 'Koyu',
    english: 'English',
    spanish: 'Español',
  },
  it: {
    // Navbar
    play: 'Gioca',
    signIn: 'Accedi',
    games: 'Giochi',
    company: 'Azienda',
    legal: 'Legale',
    about: 'Chi siamo',
    blog: 'Blog',
    pricing: 'Prezzi',
    careers: 'Carriere',
    contact: 'Contatti',
    privacy: 'Informativa sulla Privacy',
    terms: 'Termini di Servizio',
    cookies: 'Politica dei Cookie',
    support: 'Supporto',

    // Hero
    heroTitle: 'Il Gioco di Parole, Elevato',
    heroSubtitle: 'Otto giochi di parole quotidiani. Zero attrito. Un bellissimo posto dove giocare.',
    playNowFree: 'Gioca Ora — Gratis',
    seeAllGames: 'Vedi Tutti i Giochi',
    socialProof: 'Unisciti a 350.000+ giocatori quotidiani',
    dailyWord: 'Parola del Giorno',

    // Game cards section
    eightWaysToPlay: '8 Modi di Giocare',
    dailyGamesEndlessWords: 'Giochi Quotidiani, Parole Infinite',
    dailyGamesSubtitle: 'Una nuova sfida ogni giorno. Esercitati quando vuoi. Costruisci la tua serie.',

    // Game names
    dailyWordGame: 'Parola del Giorno',
    crosswordMini: 'Mini Cruciverba',
    wordSearch: 'Ricerca Parole',
    anagrams: 'Anagrammi',
    connections: 'Connessioni',
    spellingBee: 'Ape Ortografica',
    wordLadder: 'Scala di Parole',
    rosco: 'Ruota di Parole',

    // Game descriptions
    dailyWordDesc: 'Indovina la parola di 5 lettere in 6 tentativi',
    crosswordDesc: 'Cruciverba compatto con indizi quotidiani',
    wordSearchDesc: 'Trova parole nascoste in una griglia',
    anagramsDesc: 'Forma il maggior numero di parole possibile con le lettere',
    connectionsDesc: 'Raggruppa 16 parole in 4 categorie nascoste',
    spellingBeeDesc: 'Forma parole con 7 lettere, quella centrale è obbligatoria',
    wordLadderDesc: 'Cambia una lettera alla volta per raggiungere la parola obiettivo',
    roscoDesc: 'Gioco ABC — una parola per lettera, contro il tempo',
    daily: 'Quotidiano',
    sponsored: 'Sponsorizzato',

    // Why Klystora
    whyKlystora: 'Perché Klystora',
    specialtyCoffeeTitle: 'Il Caffè di Specialità dei Giochi di Parole',
    specialtyCoffeeSubtitle: 'Premium, calmo e costruito per chi ama la lingua. Nessuna tossicità. Nessun rumore. Solo parole.',
    instantPlay: 'Gioco Istantaneo',
    instantPlayDesc: 'Nessuna registrazione. Nessun download. Nessun attrito. Apri, gioca, fatto. La tua serie ti aspetta.',
    languages: '27 Lingue',
    languagesDesc: 'Dall\'inglese al finlandese. Gioca nella tua lingua, imparane un\'altra. Il mondo parla in parole.',
    builtForStreaks: 'Costruito per le Serie',
    builtForStreaksDesc: 'Traccia le tue statistiche. Condividi le tue vittorie. Competi con te stesso. Ogni giorno è una nuova sfida.',
    calmNonToxic: 'Calmo e Non Tossico',
    calmNonToxicDesc: 'Nessuna classifica. Nessuna pressione. Nessun dark pattern. Solo tu, le parole e un momento di tranquilla concentrazione.',
    cleanAdFree: 'Pulito e Senza Pubblicità',
    cleanAdFreeDesc: 'Il livello gratuito ha pubblicità discrete. Pro le rimuove completamente. Tu scegli la tua esperienza.',
    deepStats: 'Statistiche Profonde',
    deepStatsDesc: 'Distribuzione dei tentativi, tendenze temporali, analisi per lingua. Capisci come il tuo cervello lavora con le parole.',

    // Stats banner
    dailyPlayers: 'Giocatori Quotidiani',
    languagesCount: 'Lingue',
    gamesPlayed: 'Partite Giocate',
    countries: 'Paesi',
    joinCommunity: 'Unisciti alla Community — È Gratis',

    // Pro teaser
    goPro: 'Passa a Pro',
    proTitle: 'La Tua Migliore Partita, Senza Interruzioni',
    proDesc: 'Rimuovi pubblicità. Sblocca archivi illimitati. Immergiti nelle statistiche. Supporta uno studio di giochi di parole calmo e indipendente.',
    proAdFree: 'Esperienza 100% senza pubblicità',
    proArchive: 'Accesso illimitato agli archivi di gioco',
    proStats: 'Statistiche e approfondimenti avanzati',
    proPriority: 'Priorità sui nuovi modalità di gioco',
    proSupport: 'Supporta lo sviluppo indipendente',
    proPrice: '4,99 €/mese',
    proCTA: 'Inizia gratis — migliora quando vuoi',

    // Footer
    tagline: 'Il caffè di specialità dei giochi di parole.',
    footerGames: 'Giochi',
    footerCompany: 'Azienda',
    footerLegal: 'Legale',
    allRightsReserved: '© 2025 Klystora. Tutti i diritti riservati.',

    // Mini game
    greatSolve: 'Ottima soluzione!',
    comeBackTomorrow: 'Torna domani',
    playFullVersion: 'Gioca Versione Completa',
    share: 'Condividi',

    // Common
    light: 'Chiaro',
    dark: 'Scuro',
    english: 'English',
    spanish: 'Español',
  },
  pl: {
    // Navbar
    play: 'Graj',
    signIn: 'Zaloguj się',
    games: 'Gry',
    company: 'Firma',
    legal: 'Prawne',
    about: 'O nas',
    blog: 'Blog',
    pricing: 'Cennik',
    careers: 'Kariera',
    contact: 'Kontakt',
    privacy: 'Polityka Prywatności',
    terms: 'Warunki Korzystania',
    cookies: 'Polityka Cookies',
    support: 'Wsparcie',

    // Hero
    heroTitle: 'Gry Słowne na Wyższym Poziomie',
    heroSubtitle: 'Ośmioro dziennych gier słownych. Zero tarcia. Jedno piękne miejsce do gry.',
    playNowFree: 'Graj Teraz — Za Darmo',
    seeAllGames: 'Zobacz Wszystkie Gry',
    socialProof: 'Dołącz do 350 000+ dziennych graczy',
    dailyWord: 'Słowo Dnia',

    // Game cards section
    eightWaysToPlay: '8 Sposobów na Grę',
    dailyGamesEndlessWords: 'Dzienne Gry, Nieskończone Słowa',
    dailyGamesSubtitle: 'Nowe wyzwanie każdego dnia. Ćwicz kiedy chcesz. Buduj swoją serię.',

    // Game names
    dailyWordGame: 'Słowo Dnia',
    crosswordMini: 'Mini Krzyżówka',
    wordSearch: 'Szukanie Słów',
    anagrams: 'Anagramy',
    connections: 'Połączenia',
    spellingBee: 'Pszczoła Ortografii',
    wordLadder: 'Drabina Słów',
    rosco: 'Koło Słów',

    // Game descriptions
    dailyWordDesc: 'Odgadnij 5-literowe słowo w 6 próbach',
    crosswordDesc: 'Kompaktowa krzyżówka z codziennymi wskazówkami',
    wordSearchDesc: 'Znajdź ukryte słowa w siatce liter',
    anagramsDesc: 'Ułóż jak najwięcej słów z liter',
    connectionsDesc: 'Pogrupuj 16 słów w 4 ukryte kategorie',
    spellingBeeDesc: 'Twórz słowa z 7 liter, środkowa jest wymagana',
    wordLadderDesc: 'Zmieniaj po jednej literze, aby dotrzeć do docelowego słowa',
    roscoDesc: 'Gra ABC — jedno słowo na literę, na czas',
    daily: 'Dzienny',
    sponsored: 'Sponsorowane',

    // Why Klystora
    whyKlystora: 'Dlaczego Klystora',
    specialtyCoffeeTitle: 'Specjalistyczna Kawa Gier Słownych',
    specialtyCoffeeSubtitle: 'Premium, spokojna i stworzona dla miłośników języka. Bez toksyczności. Bez hałasu. Tylko słowa.',
    instantPlay: 'Natychmiastowa Gra',
    instantPlayDesc: 'Bez rejestracji. Bez pobierania. Bez tarcia. Otwórz, graj, gotowe. Twoja seria czeka.',
    languages: '27 Języków',
    languagesDesc: 'Od angielskiego po fiński. Graj w swoim języku, ucz się innego. Świat mówi słowami.',
    builtForStreaks: 'Stworzona dla Serii',
    builtForStreaksDesc: 'Śledź swoje statystyki. Dziel się zwycięstwami. Konkuruj z samym sobą. Każdy dzień to nowe wyzwanie.',
    calmNonToxic: 'Spokojna i Nietoksyczna',
    calmNonToxicDesc: 'Bez rankingów. Bez presji. Bez ciemnych wzorców. Tylko ty, słowa i chwila spokojnego skupienia.',
    cleanAdFree: 'Czysta i Bezpłatna od Reklam',
    cleanAdFreeDesc: 'Darmowa wersja ma dyskretne reklamy. Pro całkowicie je usuwa. Ty wybierasz swoje doświadczenie.',
    deepStats: 'Głęboka Statystyka',
    deepStatsDesc: 'Rozkład prób, trendy czasowe, podział językowy. Zrozum, jak twój mózg pracuje ze słowami.',

    // Stats banner
    dailyPlayers: 'Dziennych Graczy',
    languagesCount: 'Języki',
    gamesPlayed: 'Rozegranych Gier',
    countries: 'Kraje',
    joinCommunity: 'Dołącz do Społeczności — Za Darmo',

    // Pro teaser
    goPro: 'Przejdź na Pro',
    proTitle: 'Twoja Najlepsza Gra, Bez Przerw',
    proDesc: 'Usuń reklamy. Odblokuj nieograniczone archiwa. Zanurz się w statystykach. Wspieraj spokojne, niezależne studio gier słownych.',
    proAdFree: '100% doświadczenie bez reklam',
    proArchive: 'Nieograniczony dostęp do archiwum gier',
    proStats: 'Zaawansowane statystyki i wnioski',
    proPriority: 'Priorytet w nowych trybach gry',
    proSupport: 'Wspieraj niezależny rozwój',
    proPrice: '19,99 zł/mies',
    proCTA: 'Zacznij za darmo — ulepszaj kiedy chcesz',

    // Footer
    tagline: 'Specjalistyczna kawa gier słownych.',
    footerGames: 'Gry',
    footerCompany: 'Firma',
    footerLegal: 'Prawne',
    allRightsReserved: '© 2025 Klystora. Wszelkie prawa zastrzeżone.',

    // Mini game
    greatSolve: 'Świetne rozwiązanie!',
    comeBackTomorrow: 'Wróć jutro',
    playFullVersion: 'Graj Pełną Wersję',
    share: 'Udostępnij',

    // Common
    light: 'Jasny',
    dark: 'Ciemny',
    english: 'English',
    spanish: 'Español',
  },
  nl: {
    // Navbar
    play: 'Spelen',
    signIn: 'Inloggen',
    games: 'Spellen',
    company: 'Bedrijf',
    legal: 'Juridisch',
    about: 'Over ons',
    blog: 'Blog',
    pricing: 'Prijzen',
    careers: 'Carrière',
    contact: 'Contact',
    privacy: 'Privacybeleid',
    terms: 'Gebruiksvoorwaarden',
    cookies: 'Cookiebeleid',
    support: 'Ondersteuning',

    // Hero
    heroTitle: 'Woordspel, Verheven',
    heroSubtitle: 'Acht dagelijkse woordspellen. Nul wrijving. Één prachtige plek om te spelen.',
    playNowFree: 'Nu Spelen — Gratis',
    seeAllGames: 'Bekijk Alle Spellen',
    socialProof: 'Sluit je aan bij 350.000+ dagelijkse spelers',
    dailyWord: 'Woord van de Dag',

    // Game cards section
    eightWaysToPlay: '8 Manieren om te Spelen',
    dailyGamesEndlessWords: 'Dagelijkse Spellen, Eindeloze Woorden',
    dailyGamesSubtitle: 'Elke dag een nieuwe uitdaging. Oefen wanneer je wilt. Bouw je serie op.',

    // Game names
    dailyWordGame: 'Woord van de Dag',
    crosswordMini: 'Mini Kruiswoord',
    wordSearch: 'Woordzoeker',
    anagrams: 'Anagrammen',
    connections: 'Verbanden',
    spellingBee: 'Spelling Bij',
    wordLadder: 'Woordladder',
    rosco: 'Woordwiel',

    // Game descriptions
    dailyWordDesc: 'Raad het 5-letterwoord in 6 pogingen',
    crosswordDesc: 'Compact kruiswoordraadsel met dagelijkse aanwijzingen',
    wordSearchDesc: 'Vind verborgen woorden in een letterrooster',
    anagramsDesc: 'Maak zoveel mogelijk woorden van de letters',
    connectionsDesc: 'Groepeer 16 woorden in 4 verborgen categorieën',
    spellingBeeDesc: 'Maak woorden van 7 letters, de middelste is verplicht',
    wordLadderDesc: 'Wissel telkens één letter om het doelwoord te bereiken',
    roscoDesc: 'ABC-woordspel — één woord per letter, tegen de klok',
    daily: 'Dagelijks',
    sponsored: 'Gesponsord',

    // Why Klystora
    whyKlystora: 'Waarom Klystora',
    specialtyCoffeeTitle: 'De Specialty Koffie van Woordspellen',
    specialtyCoffeeSubtitle: 'Premium, kalm en gebouwd voor taalliefhebbers. Geen toxiciteit. Geen lawaai. Alleen woorden.',
    instantPlay: 'Direct Spelen',
    instantPlayDesc: 'Geen aanmelding. Geen download. Geen wrijving. Open, speel, klaar. Je serie wacht.',
    languages: '27 Talen',
    languagesDesc: 'Van Engels tot Fins. Speel in je eigen taal, leer een andere. De wereld spreekt in woorden.',
    builtForStreaks: 'Gebouwd voor Series',
    builtForStreaksDesc: 'Volg je statistieken. Deel je overwinningen. Concurreer met jezelf. Elke dag is een nieuwe uitdaging.',
    calmNonToxic: 'Kalm & Niet-Toxisch',
    calmNonToxicDesc: 'Geen ranglijsten. Geen druk. Geen dark patterns. Alleen jij, de woorden en een moment van rustige focus.',
    cleanAdFree: 'Schoon & Ad-Free Optie',
    cleanAdFreeDesc: 'Gratis versie heeft discrete advertenties. Pro verwijdert ze volledig. Jij kiest je ervaring.',
    deepStats: 'Diepe Statistieken',
    deepStatsDesc: 'Verdeling van pogingen, tijdtrends, taaloverzicht. Begrijp hoe je brein werkt met woorden.',

    // Stats banner
    dailyPlayers: 'Dagelijkse Spelers',
    languagesCount: 'Talen',
    gamesPlayed: 'Gespeelde Spellen',
    countries: 'Landen',
    joinCommunity: 'Word Lid van de Community — Gratis',

    // Pro teaser
    goPro: 'Ga Pro',
    proTitle: 'Je Beste Spel, Zonder Onderbrekingen',
    proDesc: 'Verwijder advertenties. Ontgrendel onbeperkte archieven. Duik diep in je statistieken. Ondersteun een kalm, onafhankelijk woordspelstudio.',
    proAdFree: '100% advertentievrije ervaring',
    proArchive: 'Onbeperkte toegang tot spelarchieven',
    proStats: 'Geavanceerde statistieken & inzichten',
    proPriority: 'Prioriteit bij nieuwe spelmodi',
    proSupport: 'Ondersteun onafhankelijke ontwikkeling',
    proPrice: '€4,99/maand',
    proCTA: 'Begin gratis — upgrade wanneer je wilt',

    // Footer
    tagline: 'De specialty koffie van woordspellen.',
    footerGames: 'Spellen',
    footerCompany: 'Bedrijf',
    footerLegal: 'Juridisch',
    allRightsReserved: '© 2025 Klystora. Alle rechten voorbehouden.',

    // Mini game
    greatSolve: 'Geweldige oplossing!',
    comeBackTomorrow: 'Kom morgen terug',
    playFullVersion: 'Speel Volledige Versie',
    share: 'Delen',

    // Common
    light: 'Licht',
    dark: 'Donker',
    english: 'English',
    spanish: 'Español',
  },
  uk: {
    // Navbar
    play: 'Грати',
    signIn: 'Увійти',
    games: 'Ігри',
    company: 'Компанія',
    legal: 'Правова інформація',
    about: 'Про нас',
    blog: 'Блог',
    pricing: 'Ціни',
    careers: 'Кар\'єра',
    contact: 'Контакти',
    privacy: 'Політика конфіденційності',
    terms: 'Умови використання',
    cookies: 'Політика cookies',
    support: 'Підтримка',

    // Hero
    heroTitle: 'Словесні ігри на новому рівні',
    heroSubtitle: 'Вісім щоденних словесних ігор. Нуль тертя. Одне прекрасне місце для гри.',
    playNowFree: 'Грати зараз — безкоштовно',
    seeAllGames: 'Всі ігри',
    socialProof: 'Приєднуйтесь до 350 000+ щоденних гравців',
    dailyWord: 'Слово дня',

    // Game cards section
    eightWaysToPlay: '8 способів грати',
    dailyGamesEndlessWords: 'Щоденні ігри, нескінченні слова',
    dailyGamesSubtitle: 'Новий виклик кожного дня. Практикуйтесь будь-коли. Будуйте свою серію.',

    // Game names
    dailyWordGame: 'Слово дня',
    crosswordMini: 'Міні-кросворд',
    wordSearch: 'Пошук слів',
    anagrams: 'Анаграми',
    connections: 'Зв\'язки',
    spellingBee: 'Бджола орфографії',
    wordLadder: 'Драбинка слів',
    rosco: 'Колесо слів',

    // Game descriptions
    dailyWordDesc: 'Вгадайте слово з 5 літер за 6 спроб',
    crosswordDesc: 'Компактний кросворд з щоденними підказками',
    wordSearchDesc: 'Знайдіть приховані слова в сітці літер',
    anagramsDesc: 'Складіть якомога більше слів з літер',
    connectionsDesc: 'Розподіліть 16 слів на 4 приховані категорії',
    spellingBeeDesc: 'Складайте слова з 7 літер, центральна обов\'язкова',
    wordLadderDesc: 'Змінюйте по одній літері, щоб досягти цільового слова',
    roscoDesc: 'Гра ABC — по слову на кожну літеру, на час',
    daily: 'Щоденно',
    sponsored: 'Спонсорське',

    // Why Klystora
    whyKlystora: 'Чому Klystora',
    specialtyCoffeeTitle: 'Спешелті-кава словесних ігор',
    specialtyCoffeeSubtitle: 'Преміум, спокійний і створений для тих, хто любить мову. Без токсичності. Без шуму. Тільки слова.',
    instantPlay: 'Миттєва гра',
    instantPlayDesc: 'Без реєстрації. Без завантаження. Без тертя. Відкрий, грай, готово. Твоя серія чекає.',
    languages: '27 мов',
    languagesDesc: 'Від англійської до фінської. Грай своєю мовою, вивчай іншу. Світ говорить словами.',
    builtForStreaks: 'Створений для серій',
    builtForStreaksDesc: 'Відстежуй статистику. Ділись перемогами. Змагайся з собою. Кожен день — новий виклик.',
    calmNonToxic: 'Спокійний і нетоксичний',
    calmNonToxicDesc: 'Немає таблиць лідерів. Немає тиску. Немає темних патернів. Тільки ти, слова і момент тихої концентрації.',
    cleanAdFree: 'Чистий і без реклами',
    cleanAdFreeDesc: 'Безкоштовна версія має ненав\'язливу рекламу. Pro повністю прибирає. Ти обираєш свій досвід.',
    deepStats: 'Глибока статистика',
    deepStatsDesc: 'Розподіл спроб, тренди часу, розбивка за мовами. Зрозумій, як твій мозок працює зі словами.',

    // Stats banner
    dailyPlayers: 'Щоденні гравці',
    languagesCount: 'Мови',
    gamesPlayed: 'Зіграно ігор',
    countries: 'Країни',
    joinCommunity: 'Приєднуйтесь до спільноти — безкоштовно',

    // Pro teaser
    goPro: 'Станьте Pro',
    proTitle: 'Ваша найкраща гра, без перерв',
    proDesc: 'Приберіть рекламу. Розблокуйте необмежені архіви. Зануртесь у статистику. Підтримайте спокійну незалежну студію словесних ігор.',
    proAdFree: '100% без реклами',
    proArchive: 'Необмежений доступ до архіву ігор',
    proStats: 'Розширена статистика та аналітика',
    proPriority: 'Пріоритет у нових режимах',
    proSupport: 'Підтримайте незалежну розробку',
    proPrice: '149 ₴/міс',
    proCTA: 'Почніть безкоштовно — покращуйте будь-коли',

    // Footer
    tagline: 'Спешелті-кава словесних ігор.',
    footerGames: 'Ігри',
    footerCompany: 'Компанія',
    footerLegal: 'Правова інформація',
    allRightsReserved: '© 2025 Klystora. Всі права захищені.',

    // Mini game
    greatSolve: 'Чудове рішення!',
    comeBackTomorrow: 'Повертайтесь завтра',
    playFullVersion: 'Грати повну версію',
    share: 'Поділитися',

    // Common
    light: 'Світла',
    dark: 'Темна',
    english: 'English',
    spanish: 'Español',
  },
  ro: {
    // Navbar
    play: 'Joacă',
    signIn: 'Conectare',
    games: 'Jocuri',
    company: 'Companie',
    legal: 'Legal',
    about: 'Despre',
    blog: 'Blog',
    pricing: 'Prețuri',
    careers: 'Cariere',
    contact: 'Contact',
    privacy: 'Politica de Confidențialitate',
    terms: 'Termeni și Condiții',
    cookies: 'Politica Cookie',
    support: 'Suport',

    // Hero
    heroTitle: 'Jocul de Cuvinte, Elevat',
    heroSubtitle: 'Opt jocuri de cuvinte zilnice. Zero frecare. Un loc frumos de jucat.',
    playNowFree: 'Joacă Acum — Gratis',
    seeAllGames: 'Vezi Toate Jocurile',
    socialProof: 'Alătură-te 350.000+ jucători zilnici',
    dailyWord: 'Cuvântul Zilei',

    // Game cards section
    eightWaysToPlay: '8 Moduri de a Juca',
    dailyGamesEndlessWords: 'Jocuri Zilnice, Cuvinte Infinite',
    dailyGamesSubtitle: 'O nouă provocare în fiecare zi. Exersează oricând. Construiește-ți seria.',

    // Game names
    dailyWordGame: 'Cuvântul Zilei',
    crosswordMini: 'Mini Cuvinte Încrucișate',
    wordSearch: 'Căutare Cuvinte',
    anagrams: 'Anagrame',
    connections: 'Conexiuni',
    spellingBee: 'Albina Ortografiei',
    wordLadder: 'Scara Cuvintelor',
    rosco: 'Roata Cuvintelor',

    // Game descriptions
    dailyWordDesc: 'Ghicește cuvântul de 5 litere în 6 încercări',
    crosswordDesc: 'Cuvinte încrucișate compacte cu indicii zilnice',
    wordSearchDesc: 'Găsește cuvinte ascunse într-o grilă',
    anagramsDesc: 'Formează cât mai multe cuvinte din litere',
    connectionsDesc: 'Grupează 16 cuvinte în 4 categorii ascunse',
    spellingBeeDesc: 'Formează cuvinte din 7 litere, cea centrală este obligatorie',
    wordLadderDesc: 'Schimbă câte o literă pentru a ajunge la cuvântul țintă',
    roscoDesc: 'Joc ABC — un cuvânt pe literă, contra cronometru',
    daily: 'Zilnic',
    sponsored: 'Sponsorizat',

    // Why Klystora
    whyKlystora: 'De Ce Klystora',
    specialtyCoffeeTitle: 'Cafeaua de Specialitate a Jocurilor de Cuvinte',
    specialtyCoffeeSubtitle: 'Premium, calm și construit pentru iubitorii de limbă. Fără toxicitate. Fără zgomot. Doar cuvinte.',
    instantPlay: 'Joc Instant',
    instantPlayDesc: 'Fără înregistrare. Fără descărcare. Fără frecare. Deschide, joacă, gata. Seria ta așteaptă.',
    languages: '27 Limbi',
    languagesDesc: 'De la engleză la finlandeză. Joacă în limba ta, învață alta. Lumea vorbește în cuvinte.',
    builtForStreaks: 'Construit pentru Serii',
    builtForStreaksDesc: 'Urmărește-ți statisticile. Împărtășește-ți victoriile. Concuriază cu tine însuți. În fiecare zi e o nouă provocare.',
    calmNonToxic: 'Calm și Ne-Toxic',
    calmNonToxicDesc: 'Fără clasamente. Fără presiune. Fără modele întunecate. Doar tu, cuvintele și un moment de concentrare liniștită.',
    cleanAdFree: 'Curat și Fără Reclame',
    cleanAdFreeDesc: 'Nivelul gratuit are reclame discrete. Pro le elimină complet. Tu îți alegi experiența.',
    deepStats: 'Statistici Profunde',
    deepStatsDesc: 'Distribuția încercărilor, tendințe de timp, descompunere pe limbi. Înțelege cum funcționează creierul tău cu cuvintele.',

    // Stats banner
    dailyPlayers: 'Jucători Zilnici',
    languagesCount: 'Limbi',
    gamesPlayed: 'Jocuri Jucate',
    countries: 'Țări',
    joinCommunity: 'Alătură-te Comunității — Gratis',

    // Pro teaser
    goPro: 'Devino Pro',
    proTitle: 'Cel Mai Bun Joc al Tău, Fără Întreruperi',
    proDesc: 'Elimină reclamele. Deblochează arhive nelimitate. Adâncește-te în statisticile tale. Susține un studio calm și independent de jocuri de cuvinte.',
    proAdFree: 'Experiență 100% fără reclame',
    proArchive: 'Acces nelimitat la arhivele de jocuri',
    proStats: 'Statistici și insight-uri avansate',
    proPriority: 'Prioritate la noile moduri de joc',
    proSupport: 'Susține dezvoltarea independentă',
    proPrice: '19,99 lei/lună',
    proCTA: 'Începe gratis — upgradează oricând',

    // Footer
    tagline: 'Cafeaua de specialitate a jocurilor de cuvinte.',
    footerGames: 'Jocuri',
    footerCompany: 'Companie',
    footerLegal: 'Legal',
    allRightsReserved: '© 2025 Klystora. Toate drepturile rezervate.',

    // Mini game
    greatSolve: 'Rezolvare excelentă!',
    comeBackTomorrow: 'Revino mâine',
    playFullVersion: 'Joacă Versiunea Completă',
    share: 'Distribuie',

    // Common
    light: 'Luminos',
    dark: 'Întunecat',
    english: 'English',
    spanish: 'Español',
  },
  el: {
    // Navbar
    play: 'Παίξε',
    signIn: 'Σύνδεση',
    games: 'Παιχνίδια',
    company: 'Εταιρεία',
    legal: 'Νομικά',
    about: 'Σχετικά',
    blog: 'Ιστολόγιο',
    pricing: 'Τιμές',
    careers: 'Καριέρα',
    contact: 'Επικοινωνία',
    privacy: 'Πολιτική Απορρήτου',
    terms: 'Όροι Χρήσης',
    cookies: 'Πολιτική Cookies',
    support: 'Υποστήριξη',

    // Hero
    heroTitle: 'Το Παιχνίδι Λέξεων, σε Υψηλό Επίπεδο',
    heroSubtitle: 'Οκτώ καθημερινά παιχνίδια λέξεων. Μηδενική τριβή. Ένα όμορφο μέρος για να παίζεις.',
    playNowFree: 'Παίξε Τώρα — Δωρεάν',
    seeAllGames: 'Δες Όλα τα Παιχνίδια',
    socialProof: 'Μπες στην παρέα 350.000+ καθημερινών παικτών',
    dailyWord: 'Η Λέξη της Ημέρας',

    // Game cards section
    eightWaysToPlay: '8 Τρόποι να Παίξεις',
    dailyGamesEndlessWords: 'Καθημερινά Παιχνίδια, Άπειρες Λέξεις',
    dailyGamesSubtitle: 'Μια νέα πρόκληση κάθε μέρα. Εξάσκηση όποτε θες. Χτίσε το σερί σου.',

    // Game names
    dailyWordGame: 'Η Λέξη της Ημέρας',
    crosswordMini: 'Μίνι Σταυρόλεξο',
    wordSearch: 'Αναζήτηση Λέξεων',
    anagrams: 'Αναγράμματα',
    connections: 'Συνδέσεις',
    spellingBee: 'Μέλισσα Ορθογραφίας',
    wordLadder: 'Σκάλα Λέξεων',
    rosco: 'Τροχός Λέξεων',

    // Game descriptions
    dailyWordDesc: 'Μάντεψε τη λέξη 5 γραμμάτων σε 6 προσπάθειες',
    crosswordDesc: 'Συμπαγές σταυρόλεξο με καθημερινά στοιχεία',
    wordSearchDesc: 'Βρες κρυμμένες λέξεις σε ένα πλέγμα',
    anagramsDesc: 'Σχημάτισε όσες περισσότερες λέξεις μπορείς από τα γράμματα',
    connectionsDesc: 'Ομαδοποίησε 16 λέξεις σε 4 κρυφές κατηγορίες',
    spellingBeeDesc: 'Σχημάτισε λέξεις από 7 γράμματα, το κεντρικό είναι υποχρεωτικό',
    wordLadderDesc: 'Άλλαξε ένα γράμμα κάθε φορά για να φτάσεις στη λέξη-στόχο',
    roscoDesc: 'Παιχνίδι ABC — μια λέξη ανά γράμμα, με το χρόνο',
    daily: 'Καθημερινό',
    sponsored: 'Χορηγούμενο',

    // Why Klystora
    whyKlystora: 'Γιατί Klystora',
    specialtyCoffeeTitle: 'Ο Ειδικός Καφές των Παιχνιδιών Λέξεων',
    specialtyCoffeeSubtitle: 'Premium, ήρεμο και φτιαγμένο για όσους αγαπούν τη γλώσσα. Χωρίς τοξικότητα. Χωρίς θόρυβο. Μόνο λέξεις.',
    instantPlay: 'Άμεσο Παιχνίδι',
    instantPlayDesc: 'Χωρίς εγγραφή. Χωρίς λήψη. Χωρίς τριβή. Άνοιξε, παίξε, τέλος. Το σερί σου περιμένει.',
    languages: '27 Γλώσσες',
    languagesDesc: 'Από τα αγγλικά στα φινλανδικά. Παίξε στη γλώσσα σου, μάθε μια άλλη. Ο κόσμος μιλάει σε λέξεις.',
    builtForStreaks: 'Φτιαγμένο για Σερί',
    builtForStreaksDesc: 'Παρακολούθησε τα στατιστικά σου. Μοιράσου τις νίκες σου. Ανταγωνίσου τον εαυτό σου. Κάθε μέρα είναι μια νέα πρόκληση.',
    calmNonToxic: 'Ήρεμο και Μη-Τοξικό',
    calmNonToxicDesc: 'Χωρίς κατατάξεις. Χωρίς πίεση. Χωρίς σκοτεινά μοτίβα. Μόνο εσύ, οι λέξεις και μια στιγμή ήσυχης συγκέντρωσης.',
    cleanAdFree: 'Καθαρό και Χωρίς Διαφημίσεις',
    cleanAdFreeDesc: 'Η δωρεάν έκδοση έχει διακριτικές διαφημίσεις. Το Pro τις αφαιρεί εντελώς. Εσύ διαλέγεις την εμπειρία σου.',
    deepStats: 'Βαθιά Στατιστικά',
    deepStatsDesc: 'Κατανομή προσπαθειών, τάσεις χρόνου, ανάλυση γλωσσών. Κατάλαβε πώς ο εγκέφαλός σου δουλεύει με τις λέξεις.',

    // Stats banner
    dailyPlayers: 'Καθημερινοί Παίκτες',
    languagesCount: 'Γλώσσες',
    gamesPlayed: 'Παιχνίδια που Παίχτηκαν',
    countries: 'Χώρες',
    joinCommunity: 'Μπες στην Κοινότητα — Δωρεάν',

    // Pro teaser
    goPro: 'Πήγαινε Pro',
    proTitle: 'Το Καλύτερό σου Παιχνίδι, Χωρίς Διακοπές',
    proDesc: 'Αφαίρεσε διαφημίσεις. Ξεκλείδωσε απεριόριστα αρχεία. Βούτα βαθιά στα στατιστικά σου. Υποστήριξε ένα ήρεμο, ανεξάρτητο στούντιο παιχνιδιών λέξεων.',
    proAdFree: '100% εμπειρία χωρίς διαφημίσεις',
    proArchive: 'Απεριόριστη πρόσβαση σε αρχεία παιχνιδιών',
    proStats: 'Προχωρημένα στατιστικά και insights',
    proPriority: 'Προτεραιότητα σε νέους τρόπους παιχνιδιού',
    proSupport: 'Υποστήριξε την ανεξάρτητη ανάπτυξη',
    proPrice: '4,99 €/μήνα',
    proCTA: 'Ξεκίνα δωρεάν — αναβάθμισε όποτε θες',

    // Footer
    tagline: 'Ο ειδικός καφές των παιχνιδιών λέξεων.',
    footerGames: 'Παιχνίδια',
    footerCompany: 'Εταιρεία',
    footerLegal: 'Νομικά',
    allRightsReserved: '© 2025 Klystora. Με επιφύλαξη παντός δικαιώματος.',

    // Mini game
    greatSolve: 'Εξαιρετική επίλυση!',
    comeBackTomorrow: 'Επέστρεψε αύριο',
    playFullVersion: 'Παίξε Πλήρη Έκδοση',
    share: 'Μοιράσου',

    // Common
    light: 'Φωτεινό',
    dark: 'Σκοτεινό',
    english: 'English',
    spanish: 'Español',
  },
  cs: {
    // Navbar
    play: 'Hrát',
    signIn: 'Přihlásit se',
    games: 'Hry',
    company: 'Společnost',
    legal: 'Právní',
    about: 'O nás',
    blog: 'Blog',
    pricing: 'Ceny',
    careers: 'Kariéra',
    contact: 'Kontakt',
    privacy: 'Zásady Ochrany Osobních Údajů',
    terms: 'Podmínky Používání',
    cookies: 'Zásady Cookies',
    support: 'Podpora',

    // Hero
    heroTitle: 'Slovní Hry na Vyšší Úrovni',
    heroSubtitle: 'Osm denních slovních her. Nulové tření. Jedno krásné místo ke hře.',
    playNowFree: 'Hrát Teď — Zdarma',
    seeAllGames: 'Zobrazit Všechny Hry',
    socialProof: 'Připoj se k 350 000+ denních hráčů',
    dailyWord: 'Slovo Dne',

    // Game cards section
    eightWaysToPlay: '8 Způsobů Hry',
    dailyGamesEndlessWords: 'Denní Hry, Nekonečná Slova',
    dailyGamesSubtitle: 'Každý den nová výzva. Cvič kdykoli. Buduj svou sérii.',

    // Game names
    dailyWordGame: 'Slovo Dne',
    crosswordMini: 'Mini Křížovka',
    wordSearch: 'Hledání Slov',
    anagrams: 'Anagramy',
    connections: 'Spojení',
    spellingBee: 'Včela Pravopisu',
    wordLadder: 'Řetěz Slov',
    rosco: 'Kolo Slov',

    // Game descriptions
    dailyWordDesc: 'Uhádni 5-písmenné slovo na 6 pokusů',
    crosswordDesc: 'Kompaktní křížovka s denními nápovědami',
    wordSearchDesc: 'Najdi skrytá slova v síti písmen',
    anagramsDesc: 'Vytvoř co nejvíce slov z písmen',
    connectionsDesc: 'Rozděl 16 slov do 4 skrytých kategorií',
    spellingBeeDesc: 'Tvoř slova ze 7 písmen, střední je povinné',
    wordLadderDesc: 'Měň pokaždé jedno písmeno, abys dosáhl cílového slova',
    roscoDesc: 'Slovní hra ABC — jedno slovo na písmeno, na čas',
    daily: 'Denní',
    sponsored: 'Sponzorováno',

    // Why Klystora
    whyKlystora: 'Proč Klystora',
    specialtyCoffeeTitle: 'Speciality Káva Slovních Her',
    specialtyCoffeeSubtitle: 'Premium, klidná a vytvořená pro milovníky jazyka. Žádná toxicita. Žádný hluk. Jen slova.',
    instantPlay: 'Okamžitá Hra',
    instantPlayDesc: 'Žádná registrace. Žádné stahování. Žádné tření. Otevři, hraj, hotovo. Tvoje série čeká.',
    languages: '27 Jazyků',
    languagesDesc: 'Od angličtiny po finštinu. Hraj ve svém jazyce, nauč se další. Svět mluví slovy.',
    builtForStreaks: 'Vytvořeno pro Série',
    builtForStreaksDesc: 'Sleduj své statistiky. Sdílej svá vítězství. Soutež sám se sebou. Každý den je nová výzva.',
    calmNonToxic: 'Klidné a Netoxické',
    calmNonToxicDesc: 'Žádné žebříčky. Žádný tlak. Žádné temné vzory. Jen ty, slova a chvíle klidného soustředění.',
    cleanAdFree: 'Čisté a Bez Reklam',
    cleanAdFreeDesc: 'Volná verze má nenápadné reklamy. Pro je úplně odstraní. Ty si vybíráš svůj zážitek.',
    deepStats: 'Hluboké Statistiky',
    deepStatsDesc: 'Rozdělení pokusů, časové trendy, jazykový rozbor. Pochop, jak tvůj mozek pracuje se slovy.',

    // Stats banner
    dailyPlayers: 'Denních Hráčů',
    languagesCount: 'Jazyky',
    gamesPlayed: 'Odehraných Her',
    countries: 'Země',
    joinCommunity: 'Připoj se ke Komunitě — Zdarma',

    // Pro teaser
    goPro: 'Přejdi na Pro',
    proTitle: 'Tvá Nejlepší Hra, Bez Přerušení',
    proDesc: 'Odstraň reklamy. Odemkni neomezené archivy. Ponoř se hluboko do statistik. Podpoř klidné nezávislé studio slovních her.',
    proAdFree: '100% zážitek bez reklam',
    proArchive: 'Neomezený přístup k herním archivům',
    proStats: 'Pokročilé statistiky a poznatky',
    proPriority: 'Priorita u nových herních režimů',
    proSupport: 'Podpoř nezávislý vývoj',
    proPrice: '119 Kč/měs',
    proCTA: 'Začni zdarma — upgraduj kdykoli',

    // Footer
    tagline: 'Speciality káva slovních her.',
    footerGames: 'Hry',
    footerCompany: 'Společnost',
    footerLegal: 'Právní',
    allRightsReserved: '© 2025 Klystora. Všechna práva vyhrazena.',

    // Mini game
    greatSolve: 'Skvělé řešení!',
    comeBackTomorrow: 'Vrať se zítra',
    playFullVersion: 'Hraj Plnou Verzi',
    share: 'Sdílet',

    // Common
    light: 'Světlý',
    dark: 'Tmavý',
    english: 'English',
    spanish: 'Español',
  },
  sv: {
    // Navbar
    play: 'Spela',
    signIn: 'Logga in',
    games: 'Spel',
    company: 'Företag',
    legal: 'Juridisk',
    about: 'Om oss',
    blog: 'Blogg',
    pricing: 'Priser',
    careers: 'Karriär',
    contact: 'Kontakt',
    privacy: 'Integritetspolicy',
    terms: 'Användarvillkor',
    cookies: 'Cookiepolicy',
    support: 'Support',

    // Hero
    heroTitle: 'Ordspelet, Förhöjt',
    heroSubtitle: 'Åtta dagliga ordspel. Noll friktion. En vacker plats att spela på.',
    playNowFree: 'Spela Nu — Gratis',
    seeAllGames: 'Se Alla Spel',
    socialProof: 'Gå med i 350 000+ dagliga spelare',
    dailyWord: 'Dagens Ord',

    // Game cards section
    eightWaysToPlay: '8 Sätt att Spela',
    dailyGamesEndlessWords: 'Dagliga Spel, Oändliga Ord',
    dailyGamesSubtitle: 'En ny utmaning varje dag. Öva när du vill. Bygg din svit.',

    // Game names
    dailyWordGame: 'Dagens Ord',
    crosswordMini: 'Mini Korsord',
    wordSearch: 'Ordjakt',
    anagrams: 'Anagram',
    connections: 'Kopplingar',
    spellingBee: 'Stavnings-Bi',
    wordLadder: 'Ordstege',
    rosco: 'Ordhjul',

    // Game descriptions
    dailyWordDesc: 'Gissa det 5-bokstavsordet på 6 försök',
    crosswordDesc: 'Kompakt korsord med dagliga ledtrådar',
    wordSearchDesc: 'Hitta gömda ord i ett bokstavsrutnät',
    anagramsDesc: 'Bilda så många ord som möjligt av bokstäverna',
    connectionsDesc: 'Gruppera 16 ord i 4 dolda kategorier',
    spellingBeeDesc: 'Bilda ord av 7 bokstäver, den mittersta är obligatorisk',
    wordLadderDesc: 'Byt en bokstav i taget för att nå målordet',
    roscoDesc: 'ABC-ordspel — ett ord per bokstav, mot klockan',
    daily: 'Dagligen',
    sponsored: 'Sponsrad',

    // Why Klystora
    whyKlystora: 'Varför Klystora',
    specialtyCoffeeTitle: 'Specialkaffet för Ordspel',
    specialtyCoffeeSubtitle: 'Premium, lugnt och byggt för dem som älskar språk. Ingen toxicitet. Inget brus. Bara ord.',
    instantPlay: 'Omedelbart Spel',
    instantPlayDesc: 'Ingen registrering. Ingen nedladdning. Ingen friktion. Öppna, spela, klart. Din svit väntar.',
    languages: '27 Språk',
    languagesDesc: 'Från engelska till finska. Spela på ditt språk, lär dig ett annat. Världen talar i ord.',
    builtForStreaks: 'Byggt för Sviter',
    builtForStreaksDesc: 'Följ din statistik. Dela dina segrar. Tävla med dig själv. Varje dag är en ny utmaning.',
    calmNonToxic: 'Lugnt & Icke-Toxiskt',
    calmNonToxicDesc: 'Inga topplistor. Inget tryck. Inga mörka mönster. Bara du, orden och ett ögonblick av lugn koncentration.',
    cleanAdFree: 'Rent och Reklamfritt',
    cleanAdFreeDesc: 'Gratisnivån har diskreta annonser. Pro tar bort dem helt. Du väljer din upplevelse.',
    deepStats: 'Djup Statistik',
    deepStatsDesc: 'Gissningsfördelning, tidstrender, språkuppdelning. Förstå hur din hjärna arbetar med ord.',

    // Stats banner
    dailyPlayers: 'Dagliga Spelare',
    languagesCount: 'Språk',
    gamesPlayed: 'Spelade Spel',
    countries: 'Länder',
    joinCommunity: 'Gå med i Gemenskapen — Gratis',

    // Pro teaser
    goPro: 'Gå Pro',
    proTitle: 'Ditt Bästa Spel, Oavbrutet',
    proDesc: 'Ta bort annonser. Lås upp obegränsade arkiv. Djuptdyk i din statistik. Stöd ett lugnt, oberoende ordspelsstudio.',
    proAdFree: '100% reklamfri upplevelse',
    proArchive: 'Obegränsad tillgång till spelarkiv',
    proStats: 'Avancerad statistik och insikter',
    proPriority: 'Prioritet på nya spellägen',
    proSupport: 'Stöd oberoende utveckling',
    proPrice: '49 kr/mån',
    proCTA: 'Börja gratis — uppgradera när du vill',

    // Footer
    tagline: 'Specialkaffet för ordspel.',
    footerGames: 'Spel',
    footerCompany: 'Företag',
    footerLegal: 'Juridisk',
    allRightsReserved: '© 2025 Klystora. Alla rättigheter förbehållna.',

    // Mini game
    greatSolve: 'Bra löst!',
    comeBackTomorrow: 'Kom tillbaka imorgon',
    playFullVersion: 'Spela Full Version',
    share: 'Dela',

    // Common
    light: 'Ljust',
    dark: 'Mörkt',
    english: 'English',
    spanish: 'Español',
  },
  hu: {
    // Navbar
    play: 'Játék',
    signIn: 'Bejelentkezés',
    games: 'Játékok',
    company: 'Vállalat',
    legal: 'Jogi',
    about: 'Rólunk',
    blog: 'Blog',
    pricing: 'Árak',
    careers: 'Karrier',
    contact: 'Kapcsolat',
    privacy: 'Adatvédelmi Irányelvek',
    terms: 'Felhasználási Feltételek',
    cookies: 'Cookie Szabályzat',
    support: 'Támogatás',

    // Hero
    heroTitle: 'Szójáték, Megemelve',
    heroSubtitle: 'Nyolc napi szójáték. Nulla súrlódás. Egy gyönyörű hely a játékhoz.',
    playNowFree: 'Játssz Most — Ingyen',
    seeAllGames: 'Összes Játék Megtekintése',
    socialProof: 'Csatlakozz 350 000+ napi játékoshoz',
    dailyWord: 'A Nap Szava',

    // Game cards section
    eightWaysToPlay: '8 Játékmód',
    dailyGamesEndlessWords: 'Napi Játékok, Végtelen Szavak',
    dailyGamesSubtitle: 'Minden nap új kihívás. Gyakorolj bármikor. Építsd a sorozatod.',

    // Game names
    dailyWordGame: 'A Nap Szava',
    crosswordMini: 'Mini Keresztrejtvény',
    wordSearch: 'Szókereső',
    anagrams: 'Anagrammák',
    connections: 'Kapcsolatok',
    spellingBee: 'Helyesírási Méh',
    wordLadder: 'Szólétra',
    rosco: 'Szókerék',

    // Game descriptions
    dailyWordDesc: 'Találd ki az 5 betűs szót 6 próbálkozásból',
    crosswordDesc: 'Kompakt keresztrejtvény napi tippekkel',
    wordSearchDesc: 'Találd meg a rejtett szavakat a betűrácsban',
    anagramsDesc: 'Rakj ki minél több szót a betűkből',
    connectionsDesc: 'Csoportosítsd 16 szót 4 rejtett kategóriába',
    spellingBeeDesc: 'Képezz szavakat 7 betűből, a középső kötelező',
    wordLadderDesc: 'Változtass egy-egy betűt, hogy elérd a célszót',
    roscoDesc: 'ABC szójáték — betűnként egy szó, az idő ellen',
    daily: 'Napi',
    sponsored: 'Szponzorált',

    // Why Klystora
    whyKlystora: 'Miért Klystora',
    specialtyCoffeeTitle: 'A Szójátékok Különleges Kávéja',
    specialtyCoffeeSubtitle: 'Prémium, nyugodt és a nyelvet szeretőknek készült. Nincs toxicitás. Nincs zaj. Csak szavak.',
    instantPlay: 'Azonnali Játék',
    instantPlayDesc: 'Nincs regisztráció. Nincs letöltés. Nincs súrlódás. Nyisd meg, játssz, kész. A sorozatod vár.',
    languages: '27 Nyelv',
    languagesDesc: 'Az angoltól a finnig. Játssz a saját nyelveden, tanulj meg egy másikat. A világ szavakban beszél.',
    builtForStreaks: 'Sorozatokhoz Készült',
    builtForStreaksDesc: 'Kövesd a statisztikáidat. Oszd meg a győzelmeidet. Versenyezz magaddal. Minden nap új kihívás.',
    calmNonToxic: 'Nyugodt és Nem Mérgező',
    calmNonToxicDesc: 'Nincs ranglista. Nincs nyomás. Nincs sötét minta. Csak te, a szavak és egy nyugodt koncentráció pillanata.',
    cleanAdFree: 'Tiszta és Hirdetésmentes',
    cleanAdFreeDesc: 'Az ingyenes verzióban diszkrét hirdetések vannak. A Pro teljesen eltávolítja. Te választod az élményt.',
    deepStats: 'Mély Statisztikák',
    deepStatsDesc: 'Találgatási eloszlás, időtrendek, nyelvi lebontás. Értsd meg, hogyan dolgozik az agyad a szavakkal.',

    // Stats banner
    dailyPlayers: 'Napi Játékosok',
    languagesCount: 'Nyelvek',
    gamesPlayed: 'Játszott Játékok',
    countries: 'Országok',
    joinCommunity: 'Csatlakozz a Közösséghez — Ingyen',

    // Pro teaser
    goPro: 'Legyél Pro',
    proTitle: 'A Legjobb Játékod, Megszakítás Nélkül',
    proDesc: 'Távolítsd el a hirdetéseket. Oldd fel a korlátlan archívumot. Mélyedj el a statisztikáidban. Támogass egy nyugodt, független szójáték-stúdiót.',
    proAdFree: '100% hirdetésmentes élmény',
    proArchive: 'Korlátlan játékarchívum-hozzáférés',
    proStats: 'Fejlett statisztikák és betekintések',
    proPriority: 'Elsőbbség új játékmódokban',
    proSupport: 'Támogasd a független fejlesztést',
    proPrice: '1 990 Ft/hó',
    proCTA: 'Kezdj ingyen — bármikor frissíthetsz',

    // Footer
    tagline: 'A szójátékok különleges kávéja.',
    footerGames: 'Játékok',
    footerCompany: 'Vállalat',
    footerLegal: 'Jogi',
    allRightsReserved: '© 2025 Klystora. Minden jog fenntartva.',

    // Mini game
    greatSolve: 'Nagyszerű megoldás!',
    comeBackTomorrow: 'Gyere vissza holnap',
    playFullVersion: 'Játszd a Teljes Verziót',
    share: 'Megosztás',

    // Common
    light: 'Világos',
    dark: 'Sötét',
    english: 'English',
    spanish: 'Español',
  },
  id: {
    // Navbar
    play: 'Main',
    signIn: 'Masuk',
    games: 'Permainan',
    company: 'Perusahaan',
    legal: 'Hukum',
    about: 'Tentang',
    blog: 'Blog',
    pricing: 'Harga',
    careers: 'Karier',
    contact: 'Kontak',
    privacy: 'Kebijakan Privasi',
    terms: 'Syarat Layanan',
    cookies: 'Kebijakan Cookie',
    support: 'Dukungan',

    // Hero
    heroTitle: 'Permainan Kata, Ditingkatkan',
    heroSubtitle: 'Delapan permainan kata harian. Nol gesekan. Satu tempat indah untuk bermain.',
    playNowFree: 'Main Sekarang — Gratis',
    seeAllGames: 'Lihat Semua Permainan',
    socialProof: 'Bergabung dengan 350.000+ pemain harian',
    dailyWord: 'Kata Harian',

    // Game cards section
    eightWaysToPlay: '8 Cara Bermain',
    dailyGamesEndlessWords: 'Permainan Harian, Kata Tak Terbatas',
    dailyGamesSubtitle: 'Tantangan baru setiap hari. Berlatih kapan saja. Bangun rentetanmu.',

    // Game names
    dailyWordGame: 'Kata Harian',
    crosswordMini: 'Teka-Teki Silang Mini',
    wordSearch: 'Pencarian Kata',
    anagrams: 'Anagram',
    connections: 'Koneksi',
    spellingBee: 'Lebah Ejaan',
    wordLadder: 'Tangga Kata',
    rosco: 'Roda Kata',

    // Game descriptions
    dailyWordDesc: 'Tebak kata 5 huruf dalam 6 percobaan',
    crosswordDesc: 'Teka-teki silang ringkas dengan petunjuk harian',
    wordSearchDesc: 'Temukan kata tersembunyi dalam kotak huruf',
    anagramsDesc: 'Bentuk kata sebanyak mungkin dari huruf-huruf',
    connectionsDesc: 'Kelompokkan 16 kata ke dalam 4 kategori tersembunyi',
    spellingBeeDesc: 'Bentuk kata dari 7 huruf, huruf tengah wajib',
    wordLadderDesc: 'Ubah satu huruf setiap kali untuk mencapai kata target',
    roscoDesc: 'Permainan kata ABC — satu kata per huruf, melawan waktu',
    daily: 'Harian',
    sponsored: 'Sponsor',

    // Why Klystora
    whyKlystora: 'Mengapa Klystora',
    specialtyCoffeeTitle: 'Kopi Spesialitas Permainan Kata',
    specialtyCoffeeSubtitle: 'Premium, tenang, dan dibuat untuk pecinta bahasa. Tanpa toksisitas. Tanpa kebisingan. Hanya kata.',
    instantPlay: 'Main Instan',
    instantPlayDesc: 'Tanpa pendaftaran. Tanpa unduhan. Tanpa gesekan. Buka, main, selesai. Rentetanmu menunggu.',
    languages: '27 Bahasa',
    languagesDesc: 'Dari Inggris hingga Finlandia. Main dalam bahasamu, pelajari bahasa lain. Dunia berbicara dalam kata.',
    builtForStreaks: 'Dibuat untuk Rentetan',
    builtForStreaksDesc: 'Lacak statistikmu. Bagikan kemenanganmu. Bersaing dengan dirimu sendiri. Setiap hari adalah tantangan baru.',
    calmNonToxic: 'Tenang dan Bebas Toksis',
    calmNonToxicDesc: 'Tanpa papan peringkat. Tanpa tekanan. Tanpa pola gelap. Hanya kamu, kata-kata, dan momen fokus yang tenang.',
    cleanAdFree: 'Bersih dan Bebas Iklan',
    cleanAdFreeDesc: 'Tingkat gratis memiliki iklan yang halus. Pro menghapusnya sepenuhnya. Kamu memilih pengalamanmu.',
    deepStats: 'Statistik Mendalam',
    deepStatsDesc: 'Distribusi tebakan, tren waktu, rincian bahasa. Pahami bagaimana otakmu bekerja dengan kata.',

    // Stats banner
    dailyPlayers: 'Pemain Harian',
    languagesCount: 'Bahasa',
    gamesPlayed: 'Permainan Dimainkan',
    countries: 'Negara',
    joinCommunity: 'Bergabung dengan Komunitas — Gratis',

    // Pro teaser
    goPro: 'Jadilah Pro',
    proTitle: 'Permainan Terbaikmu, Tanpa Gangguan',
    proDesc: 'Hapus iklan. Buka kunci arsip tak terbatas. Selami statistikmu. Dukung studio permainan kata yang tenang dan independen.',
    proAdFree: 'Pengalaman 100% bebas iklan',
    proArchive: 'Akses arsip permainan tak terbatas',
    proStats: 'Statistik dan wawasan lanjutan',
    proPriority: 'Prioritas mode permainan baru',
    proSupport: 'Dukung pengembangan independen',
    proPrice: 'Rp75.000/bulan',
    proCTA: 'Mulai gratis — tingkatkan kapan saja',

    // Footer
    tagline: 'Kopi spesialitas permainan kata.',
    footerGames: 'Permainan',
    footerCompany: 'Perusahaan',
    footerLegal: 'Hukum',
    allRightsReserved: '© 2025 Klystora. Hak cipta dilindungi.',

    // Mini game
    greatSolve: 'Penyelesaian bagus!',
    comeBackTomorrow: 'Kembali besok',
    playFullVersion: 'Main Versi Lengkap',
    share: 'Bagikan',

    // Common
    light: 'Terang',
    dark: 'Gelap',
    english: 'English',
    spanish: 'Español',
  },
  vi: {
    // Navbar
    play: 'Chơi',
    signIn: 'Đăng nhập',
    games: 'Trò chơi',
    company: 'Công ty',
    legal: 'Pháp lý',
    about: 'Giới thiệu',
    blog: 'Blog',
    pricing: 'Giá',
    careers: 'Nghề nghiệp',
    contact: 'Liên hệ',
    privacy: 'Chính sách Bảo mật',
    terms: 'Điều khoản Dịch vụ',
    cookies: 'Chính sách Cookie',
    support: 'Hỗ trợ',

    // Hero
    heroTitle: 'Trò Chơi Chữ, Nâng Tầm',
    heroSubtitle: 'Tám trò chơi chữ hàng ngày. Không ma sát. Một nơi tuyệt đẹp để chơi.',
    playNowFree: 'Chơi Ngay — Miễn phí',
    seeAllGames: 'Xem Tất cả Trò chơi',
    socialProof: 'Tham gia cùng 350.000+ người chơi hàng ngày',
    dailyWord: 'Từ Ngày',

    // Game cards section
    eightWaysToPlay: '8 Cách Chơi',
    dailyGamesEndlessWords: 'Trò Chơi Hàng Ngày, Từ Vô Tận',
    dailyGamesSubtitle: 'Thử thách mới mỗi ngày. Luyện tập bất cứ lúc nào. Xây dựng chuỗi của bạn.',

    // Game names
    dailyWordGame: 'Từ Ngày',
    crosswordMini: 'Ô Chữ Mini',
    wordSearch: 'Tìm Từ',
    anagrams: 'Sắp Xếp Chữ',
    connections: 'Kết Nối',
    spellingBee: 'Ong Chính Tả',
    wordLadder: 'Thang Từ',
    rosco: 'Bánh Xe Từ Vựng',

    // Game descriptions
    dailyWordDesc: 'Đoán từ 5 chữ cái trong 6 lần thử',
    crosswordDesc: 'Ô chữ nhỏ gọn với gợi ý hàng ngày',
    wordSearchDesc: 'Tìm từ ẩn trong lưới chữ cái',
    anagramsDesc: 'Sắp xếp chữ cái tạo thành càng nhiều từ càng tốt',
    connectionsDesc: 'Nhóm 16 từ thành 4 danh mục ẩn',
    spellingBeeDesc: 'Tạo từ từ 7 chữ cái, chữ giữa bắt buộc',
    wordLadderDesc: 'Thay đổi từng chữ cái để đến từ đích',
    roscoDesc: 'Trò chơi chữ ABC — một từ mỗi chữ cái, chống lại thời gian',
    daily: 'Hàng ngày',
    sponsored: 'Tài trợ',

    // Why Klystora
    whyKlystora: 'Tại sao Klystora',
    specialtyCoffeeTitle: 'Cà Phê Đặc Sản của Trò Chơi Chữ',
    specialtyCoffeeSubtitle: 'Cao cấp, yên bình và dành cho những người yêu ngôn ngữ. Không độc hại. Không ồn ào. Chỉ có từ ngữ.',
    instantPlay: 'Chơi Ngay',
    instantPlayDesc: 'Không đăng ký. Không tải xuống. Không ma sát. Mở, chơi, xong. Chuỗi của bạn đang chờ.',
    languages: '27 Ngôn ngữ',
    languagesDesc: 'Từ tiếng Anh đến tiếng Phần Lan. Chơi bằng ngôn ngữ của bạn, học thêm ngôn ngữ khác. Thế giới nói bằng từ ngữ.',
    builtForStreaks: 'Dành cho Chuỗi',
    builtForStreaksDesc: 'Theo dõi thống kê. Chia sẻ chiến thắng. Cạnh tranh với chính mình. Mỗi ngày là một thử thách mới.',
    calmNonToxic: 'Yên Bình và Lành Mạnh',
    calmNonToxicDesc: 'Không bảng xếp hạng. Không áp lực. Không mô hình xấu. Chỉ có bạn, từ ngữ và khoảnh khắc tập trung yên tĩnh.',
    cleanAdFree: 'Sạch và Không Quảng Cáo',
    cleanAdFreeDesc: 'Phiên bản miễn phí có quảng cáo nhẹ. Pro loại bỏ hoàn toàn. Bạn chọn trải nghiệm.',
    deepStats: 'Thống Kê Sâu',
    deepStatsDesc: 'Phân phối đoán, xu hướng thời gian, phân tích ngôn ngữ. Hiểu não bạn xử lý từ ngữ như thế nào.',

    // Stats banner
    dailyPlayers: 'Người Chơi Hàng Ngày',
    languagesCount: 'Ngôn ngữ',
    gamesPlayed: 'Trò Chơi Đã Chơi',
    countries: 'Quốc gia',
    joinCommunity: 'Tham gia Cộng đồng — Miễn phí',

    // Pro teaser
    goPro: 'Nâng cấp Pro',
    proTitle: 'Trò Chơi Tốt Nhất, Không Gián Đoạn',
    proDesc: 'Loại bỏ quảng cáo. Mở khóa kho lưu trữ không giới hạn. Khám phá sâu thống kê. Hỗ trợ studio trò chơi chữ độc lập, yên bình.',
    proAdFree: 'Trải nghiệm 100% không quảng cáo',
    proArchive: 'Truy cập kho trò chơi không giới hạn',
    proStats: 'Thống kê và phân tích nâng cao',
    proPriority: 'Ưu tiên chế độ chơi mới',
    proSupport: 'Hỗ trợ phát triển độc lập',
    proPrice: '115.000₫/tháng',
    proCTA: 'Bắt đầu miễn phí — nâng cấp bất cứ lúc nào',

    // Footer
    tagline: 'Cà phê đặc sản của trò chơi chữ.',
    footerGames: 'Trò chơi',
    footerCompany: 'Công ty',
    footerLegal: 'Pháp lý',
    allRightsReserved: '© 2025 Klystora. Đã đăng ký bản quyền.',

    // Mini game
    greatSolve: 'Giải hay!',
    comeBackTomorrow: 'Mai quay lại nhé',
    playFullVersion: 'Chơi Phiên Bản Đầy Đủ',
    share: 'Chia sẻ',

    // Common
    light: 'Sáng',
    dark: 'Tối',
    english: 'English',
    spanish: 'Español',
  },
  th: {
    // Navbar
    play: 'เล่น',
    signIn: 'เข้าสู่ระบบ',
    games: 'เกม',
    company: 'บริษัท',
    legal: 'กฎหมาย',
    about: 'เกี่ยวกับเรา',
    blog: 'บล็อก',
    pricing: 'ราคา',
    careers: 'อาชีพ',
    contact: 'ติดต่อ',
    privacy: 'นโยบายความเป็นส่วนตัว',
    terms: 'เงื่อนไขการให้บริการ',
    cookies: 'นโยบายคุกกี้',
    support: 'สนับสนุน',

    // Hero
    heroTitle: 'เกมคำศัพท์ ระดับสูง',
    heroSubtitle: 'แปดเกมคำศัพท์ประจำวัน ไร้แรงเสียดทาน สถานที่สวยงามแห่งหนึ่งสำหรับการเล่น',
    playNowFree: 'เล่นเลย — ฟรี',
    seeAllGames: 'ดูเกมทั้งหมด',
    socialProof: 'เข้าร่วมกับผู้เล่น 350,000+ คนต่อวัน',
    dailyWord: 'คำประจำวัน',

    // Game cards section
    eightWaysToPlay: '8 วิธีการเล่น',
    dailyGamesEndlessWords: 'เกมประจำวัน คำศัพท์ไม่สิ้นสุด',
    dailyGamesSubtitle: 'ความท้าทายใหม่ทุกวัน ฝึกฝนได้ตลอดเวลา สร้างสถิติต่อเนื่องของคุณ',

    // Game names
    dailyWordGame: 'คำประจำวัน',
    crosswordMini: 'ปริศนาคำไขว้มินิ',
    wordSearch: 'ค้นหาคำ',
    anagrams: 'สลับตัวอักษร',
    connections: 'ความสัมพันธ์',
    spellingBee: 'ผึ้งสะกดคำ',
    wordLadder: 'บันไดคำศัพท์',
    rosco: 'วงล้อคำศัพท์',

    // Game descriptions
    dailyWordDesc: 'ทายคำ 5 ตัวอักษรใน 6 ครั้ง',
    crosswordDesc: 'ปริศนาคำไขวะกระชับพร้อมคำใบ้ประจำวัน',
    wordSearchDesc: 'หาคำที่ซ่อนอยู่ในตารางตัวอักษร',
    anagramsDesc: 'จัดเรียงตัวอักษรให้เป็นคำได้มากที่สุด',
    connectionsDesc: 'จัดกลุ่ม 16 คำเข้า 4 หมวดหมู่ที่ซ่อนอยู่',
    spellingBeeDesc: 'สร้างคำจาก 7 ตัวอักษร ตัวกลางบังคับ',
    wordLadderDesc: 'เปลี่ยนทีละตัวอักษรเพื่อไปสู่คำเป้าหมาย',
    roscoDesc: 'เกมคำศัพท์ ABC — คำละตัวอักษร แข่งกับเวลา',
    daily: 'รายวัน',
    sponsored: 'สปอนเซอร์',

    // Why Klystora
    whyKlystora: 'ทำไมต้อง Klystora',
    specialtyCoffeeTitle: 'กาแฟสเปเชียลตี้แห่งเกมคำศัพท์',
    specialtyCoffeeSubtitle: 'พรีเมียม เงียบสงบ และสร้างสรรค์สำหรับผู้รักภาษา ไร้พิษ ไร้เสียงรบกวน มีแต่คำศัพท์',
    instantPlay: 'เล่นทันที',
    instantPlayDesc: 'ไม่ต้องสมัคร ไม่ต้องดาวน์โหลด ไร้แรงเสียดทาน เปิด เล่น เสร็จ สถิติต่อเนื่องรอคุณอยู่',
    languages: '27 ภาษา',
    languagesDesc: 'จากอังกฤษถึงฟินแลนด์ เล่นในภาษาของคุณ เรียนรู้อีกภาษา โลกพูดด้วยคำศัพท์',
    builtForStreaks: 'สร้างมาเพื่อสถิติต่อเนื่อง',
    builtForStreaksDesc: 'ติดตามสถิติ แชร์ชัยชนะ แข่งกับตัวเอง ทุกวันคือความท้าทายใหม่',
    calmNonToxic: 'สงบและไร้พิษ',
    calmNonToxicDesc: 'ไม่มีกระดานผู้นำ ไม่มีแรงกดดัน ไม่มีรูปแบบมืด มีแต่คุณ คำศัพท์ และช่วงเวลาแห่งสมาธิ',
    cleanAdFree: 'สะอาดและปราศจากโฆษณา',
    cleanAdFreeDesc: 'เวอร์ชันฟรีมีโฆษณาเรียบร้อย Pro ลบออกทั้งหมด คุณเลือกประสบการณ์ของคุณ',
    deepStats: 'สถิติเชิงลึก',
    deepStatsDesc: 'การกระจายการเดา แนวโน้มเวลา การวิเคราะห์ภาษา เข้าใจว่าสมองของคุณทำงานกับคำศัพท์อย่างไร',

    // Stats banner
    dailyPlayers: 'ผู้เล่นประจำวัน',
    languagesCount: 'ภาษา',
    gamesPlayed: 'จำนวนเกมที่เล่น',
    countries: 'ประเทศ',
    joinCommunity: 'เข้าร่วมชุมชน — ฟรี',

    // Pro teaser
    goPro: 'อัปเกรด Pro',
    proTitle: 'เกมที่ดีที่สุดของคุณ ไม่มีสะดุด',
    proDesc: 'ลบโฆษณา ปลดล็อกคลังเกมไม่จำกัด ดำดิ่งสถิติของคุณ สนับสนุนสตูดิโอเกมคำศัพท์อิสระและสงบ',
    proAdFree: 'ประสบการณ์ปราศจากโฆษณา 100%',
    proArchive: 'เข้าถึงคลังเกมไม่จำกัด',
    proStats: 'สถิตีและข้อมูลเชิงลึกขั้นสูง',
    proPriority: 'สิทธิพิเศษโหมดเกมใหม่',
    proSupport: 'สนับสนุนการพัฒนาอิสระ',
    proPrice: '฿169/เดือน',
    proCTA: 'เริ่มต้นฟรี — อัปเกรดได้ตลอดเวลา',

    // Footer
    tagline: 'กาแฟสเปเชียลตี้แห่งเกมคำศัพท์',
    footerGames: 'เกม',
    footerCompany: 'บริษัท',
    footerLegal: 'กฎหมาย',
    allRightsReserved: '© 2025 Klystora สงวนลิขสิทธิ์',

    // Mini game
    greatSolve: 'เฉลยได้ดีมาก!',
    comeBackTomorrow: 'กลับมาพรุ่งนี้',
    playFullVersion: 'เล่นเวอร์ชันเต็ม',
    share: 'แชร์',

    // Common
    light: 'สว่าง',
    dark: 'มืด',
    english: 'English',
    spanish: 'Español',
  },
  da: {
    // Navbar
    play: 'Spil',
    signIn: 'Log ind',
    games: 'Spil',
    company: 'Virksomhed',
    legal: 'Juridisk',
    about: 'Om os',
    blog: 'Blog',
    pricing: 'Priser',
    careers: 'Karriere',
    contact: 'Kontakt',
    privacy: 'Privatlivspolitik',
    terms: 'Servicevilkår',
    cookies: 'Cookiepolitik',
    support: 'Support',

    // Hero
    heroTitle: 'Ordspil, Ophøjet',
    heroSubtitle: 'Otte daglige ordspil. Nul friktion. Et smukt sted at spille.',
    playNowFree: 'Spil Nu — Gratis',
    seeAllGames: 'Se Alle Spil',
    socialProof: 'Deltag i 350.000+ daglige spillere',
    dailyWord: 'Dagens Ord',

    // Game cards section
    eightWaysToPlay: '8 Måder at Spille på',
    dailyGamesEndlessWords: 'Daglige Spil, Endeløse Ord',
    dailyGamesSubtitle: 'En ny udfordring hver dag. Øv når som helst. Byg din stime.',

    // Game names
    dailyWordGame: 'Dagens Ord',
    crosswordMini: 'Mini Krydsord',
    wordSearch: 'Ordjagt',
    anagrams: 'Anagrammer',
    connections: 'Forbindelser',
    spellingBee: 'Stave-Bi',
    wordLadder: 'Ordstige',
    rosco: 'Ordhjul',

    // Game descriptions
    dailyWordDesc: 'Gæt det 5-bogstavsord på 6 forsøg',
    crosswordDesc: 'Kompakt krydsord med daglige ledetråde',
    wordSearchDesc: 'Find skjulte ord i et bogstavgitter',
    anagramsDesc: 'Dann så mange ord som muligt af bogstaverne',
    connectionsDesc: 'Gruppér 16 ord i 4 skjulte kategorier',
    spellingBeeDesc: 'Dann ord af 7 bogstaver, det midterste er obligatorisk',
    wordLadderDesc: 'Skift ét bogstav ad gangen for at nå målordet',
    roscoDesc: 'ABC-ordspil — ét ord pr. bogstav, mod uret',
    daily: 'Daglig',
    sponsored: 'Sponsoreret',

    // Why Klystora
    whyKlystora: 'Hvorfor Klystora',
    specialtyCoffeeTitle: 'Specialkaffen til Ordspil',
    specialtyCoffeeSubtitle: 'Premium, rolig og bygget til sprogelskere. Ingen toksicitet. Ingen støj. Bare ord.',
    instantPlay: 'Øjeblikkeligt Spil',
    instantPlayDesc: 'Ingen tilmelding. Ingen download. Ingen friktion. Åbn, spil, færdig. Din stime venter.',
    languages: '27 Sprog',
    languagesDesc: 'Fra engelsk til finsk. Spil på dit sprog, lær et andet. Verden taler i ord.',
    builtForStreaks: 'Bygget til Stimer',
    builtForStreaksDesc: 'Spor din statistik. Del dine sejre. Konkurrer med dig selv. Hver dag er en ny udfordring.',
    calmNonToxic: 'Rolig & Ikke-Toksisk',
    calmNonToxicDesc: 'Ingen ranglister. Intet pres. Ingen mørke mønstre. Bare dig, ordene og et øjeblik af roligt fokus.',
    cleanAdFree: 'Rent og Reklamefrit',
    cleanAdFreeDesc: 'Gratisniveauet har diskrete reklamer. Pro fjerner dem helt. Du vælger din oplevelse.',
    deepStats: 'Dyb Statistik',
    deepStatsDesc: 'Gættefordeling, tidstendenser, sprogoversigt. Forstå hvordan din hjerne arbejder med ord.',

    // Stats banner
    dailyPlayers: 'Daglige Spillere',
    languagesCount: 'Sprog',
    gamesPlayed: 'Spillede Spil',
    countries: 'Lande',
    joinCommunity: 'Deltag i Fællesskabet — Gratis',

    // Pro teaser
    goPro: 'Gå Pro',
    proTitle: 'Dit Bedste Spil, Uafbrudt',
    proDesc: 'Fjern reklamer. Lås op for ubegrænsede arkiver. Dyk dybt i din statistik. Støt et roligt, uafhængigt ordspilsstudie.',
    proAdFree: '100% reklamefri oplevelse',
    proArchive: 'Ubegrænset adgang til spilarkiver',
    proStats: 'Avanceret statistik og indsigter',
    proPriority: 'Prioritet på nye spiltilstande',
    proSupport: 'Støt uafhængig udvikling',
    proPrice: '35 kr/md',
    proCTA: 'Start gratis — opgrader når som helst',

    // Footer
    tagline: 'Specialkaffen til ordspil.',
    footerGames: 'Spil',
    footerCompany: 'Virksomhed',
    footerLegal: 'Juridisk',
    allRightsReserved: '© 2025 Klystora. Alle rettigheder forbeholdes.',

    // Mini game
    greatSolve: 'God løsning!',
    comeBackTomorrow: 'Kom tilbage i morgen',
    playFullVersion: 'Spil Fuld Version',
    share: 'Del',

    // Common
    light: 'Lyst',
    dark: 'Mørkt',
    english: 'English',
    spanish: 'Español',
  },
  fi: {
    // Navbar
    play: 'Pelaa',
    signIn: 'Kirjaudu',
    games: 'Pelit',
    company: 'Yritys',
    legal: 'Laki',
    about: 'Tietoja',
    blog: 'Blogi',
    pricing: 'Hinnat',
    careers: 'Ura',
    contact: 'Yhteys',
    privacy: 'Tietosuojakäytäntö',
    terms: 'Käyttöehdot',
    cookies: 'Evästekäytäntö',
    support: 'Tuki',

    // Hero
    heroTitle: 'Sanapeli, Kohotettu',
    heroSubtitle: 'Kahdeksan päivittäistä sanapeliä. Nolla kitkaa. Yksi kaunis paikka pelata.',
    playNowFree: 'Pelaa Nyt — Ilmaiseksi',
    seeAllGames: 'Näytä Kaikki Pelit',
    socialProof: 'Liity 350 000+ päivittäisen pelaajan joukkoon',
    dailyWord: 'Päivän Sana',

    // Game cards section
    eightWaysToPlay: '8 Pelitapaa',
    dailyGamesEndlessWords: 'Päivittäiset Pelit, Loputtomat Sanat',
    dailyGamesSubtitle: 'Uusi haaste joka päivä. Harjoittele milloin tahansa. Rakena putkesi.',

    // Game names
    dailyWordGame: 'Päivän Sana',
    crosswordMini: 'Mini Sanaristikko',
    wordSearch: 'Sanahaku',
    anagrams: 'Anagrammit',
    connections: 'Yhteydet',
    spellingBee: 'Oikeinkirjoitus-Mehiläinen',
    wordLadder: 'Sanarappuset',
    rosco: 'Sananpyörä',

    // Game descriptions
    dailyWordDesc: 'Arvaa 5-kirjaiminen sana 6 yrityksessä',
    crosswordDesc: 'Kompakti sanaristikko päivittäisillä vihjeillä',
    wordSearchDesc: 'Etsi piilotettuja sanoja kirjainruudukosta',
    anagramsDesc: 'Muodosta kirjaimista niin monta sanaa kuin mahdollista',
    connectionsDesc: 'Ryhmitä 16 sanaa 4 piilotettuun kategoriaan',
    spellingBeeDesc: 'Muodosta sanoja 7 kirjaimesta, keskimmäinen pakollinen',
    wordLadderDesc: 'Vaihda yksi kirjain kerrallaan päästäksesi kohdesanaan',
    roscoDesc: 'ABC-sanapeli — yksi sana per kirjain, aikaa vastaan',
    daily: 'Päivittäin',
    sponsored: 'Sponsoroitu',

    // Why Klystora
    whyKlystora: 'Miksi Klystora',
    specialtyCoffeeTitle: 'Sanapelien Erikoiskahvi',
    specialtyCoffeeSubtitle: 'Premium, rauhallinen ja rakennettu kielen ystäville. Ei myrkyllisyyttä. Ei melua. Vain sanoja.',
    instantPlay: 'Välitön Peli',
    instantPlayDesc: 'Ei rekisteröitymistä. Ei latausta. Ei kitkaa. Avaa, pelaa, valmis. Putkesi odottaa.',
    languages: '27 Kieltä',
    languagesDesc: 'Englannista suomeen. Pelaa kielelläsi, opi toinen. Maailma puhuu sanoilla.',
    builtForStreaks: 'Rakennettu Putkille',
    builtForStreaksDesc: 'Seuraa tilastojasi. Jaa voittosi. Kilpaile itseäsi vastaan. Joka päivä on uusi haaste.',
    calmNonToxic: 'Rauhallinen ja Myrkyttömä',
    calmNonToxicDesc: 'Ei tulostauluja. Ei painetta. Ei hämäriä kaavioita. Vain sinä, sanat ja hetki rauhallista keskittymistä.',
    cleanAdFree: 'Puhdas ja Mainosvapaa',
    cleanAdFreeDesc: 'Ilmaisversiossa on hienovaraisia mainoksia. Pro poistaa ne kokonaan. Sinä valitset kokemuksesi.',
    deepStats: 'Syvät Tilastot',
    deepStatsDesc: 'Arvausjakauma, aikatrendit, kielijakauma. Ymmärrä miten aivosi työskentelevät sanojen kanssa.',

    // Stats banner
    dailyPlayers: 'Päivittäiset Pelaajat',
    languagesCount: 'Kielet',
    gamesPlayed: 'Pelatut Pelit',
    countries: 'Maat',
    joinCommunity: 'Liity Yhteisöön — Ilmaiseksi',

    // Pro teaser
    goPro: 'Mene Pro',
    proTitle: 'Paras Pelisi, Keskeytyksettä',
    proDesc: 'Poista mainokset. Avaa rajattomat arkistot. Sukella syvälle tilastoihisi. Tue rauhallista itsenäistä sanapelistudiota.',
    proAdFree: '100% mainosvapaa kokemus',
    proArchive: 'Rajaton pääsy peliarkistoihin',
    proStats: 'Edistyneet tilastot ja näkemykset',
    proPriority: 'Etusija uusissa pelitiloissa',
    proSupport: 'Tue itsenäistä kehitystä',
    proPrice: '4,99 €/kk',
    proCTA: 'Aloita ilmaiseksi — päivitä milloin tahansa',

    // Footer
    tagline: 'Sanapelien erikoiskahvi.',
    footerGames: 'Pelit',
    footerCompany: 'Yritys',
    footerLegal: 'Laki',
    allRightsReserved: '© 2025 Klystora. Kaikki oikeudet pidätetään.',

    // Mini game
    greatSolve: 'Hieno ratkaisu!',
    comeBackTomorrow: 'Tule takaisin huomenna',
    playFullVersion: 'Pelaa Täysversiota',
    share: 'Jaa',

    // Common
    light: 'Vaalea',
    dark: 'Tumma',
    english: 'English',
    spanish: 'Español',
  },
  no: {
    // Navbar
    play: 'Spill',
    signIn: 'Logg inn',
    games: 'Spill',
    company: 'Selskap',
    legal: 'Juridisk',
    about: 'Om oss',
    blog: 'Blogg',
    pricing: 'Priser',
    careers: 'Karriere',
    contact: 'Kontakt',
    privacy: 'Personvernerklæring',
    terms: 'Vilkår for bruk',
    cookies: 'Cookie-policy',
    support: 'Støtte',

    // Hero
    heroTitle: 'Ordspill, Hevet',
    heroSubtitle: 'Åtte daglige ordspill. Null friksjon. Et vakkert sted å spille.',
    playNowFree: 'Spill Nå — Gratis',
    seeAllGames: 'Se Alle Spill',
    socialProof: 'Bli med 350 000+ daglige spillere',
    dailyWord: 'Dagens Ord',

    // Game cards section
    eightWaysToPlay: '8 Måter å Spille på',
    dailyGamesEndlessWords: 'Daglige Spill, Endeløse Ord',
    dailyGamesSubtitle: 'En ny utfordring hver dag. Øv når som helst. Bygg rekken din.',

    // Game names
    dailyWordGame: 'Dagens Ord',
    crosswordMini: 'Mini Kryssord',
    wordSearch: 'Ordjakt',
    anagrams: 'Anagrammer',
    connections: 'Koblinger',
    spellingBee: 'Stave-Bie',
    wordLadder: 'Ordstige',
    rosco: 'Ordhjul',

    // Game descriptions
    dailyWordDesc: 'Gjett det 5-bokstaversordet på 6 forsøk',
    crosswordDesc: 'Kompakt kryssord med daglige ledetråder',
    wordSearchDesc: 'Finn skjulte ord i et bokstavnett',
    anagramsDesc: 'Dann så mange ord som mulig av bokstavene',
    connectionsDesc: 'Grupper 16 ord i 4 skjulte kategorier',
    spellingBeeDesc: 'Dann ord av 7 bokstaver, den midterste er obligatorisk',
    wordLadderDesc: 'Bytt én bokstav om gangen for å nå målordet',
    roscoDesc: 'ABC-ordspill — ett ord per bokstav, mot klokken',
    daily: 'Daglig',
    sponsored: 'Sponset',

    // Why Klystora
    whyKlystora: 'Hvorfor Klystora',
    specialtyCoffeeTitle: 'Spesialkaffen til Ordspill',
    specialtyCoffeeSubtitle: 'Premium, rolig og bygget for språkelskere. Ingen toksisitet. Ingen støy. Bare ord.',
    instantPlay: 'Umiddelbart Spill',
    instantPlayDesc: 'Ingen registrering. Ingen nedlasting. Ingen friksjon. Åpne, spill, ferdig. Rekken din venter.',
    languages: '27 Språk',
    languagesDesc: 'Fra engelsk til finsk. Spill på språket ditt, lær et annet. Verden snakker i ord.',
    builtForStreaks: 'Bygget for Rekker',
    builtForStreaksDesc: 'Spor statistikken din. Del seirene dine. Konkurrer med deg selv. Hver dag er en ny utfordring.',
    calmNonToxic: 'Rolig & Ikke-Toksisk',
    calmNonToxicDesc: 'Ingen topplister. Ingen press. Ingen mørke mønstre. Bare du, ordene og et øyeblikk av rolig fokus.',
    cleanAdFree: 'Rent og Reklamefritt',
    cleanAdFreeDesc: 'Gratisnivået har diskrete reklamer. Pro fjerner dem helt. Du velger opplevelsen din.',
    deepStats: 'Dyp Statistikk',
    deepStatsDesc: 'Gjetningsfordeling, tidstrender, språkoversikt. Forstå hvordan hjernen din arbeider med ord.',

    // Stats banner
    dailyPlayers: 'Daglige Spillere',
    languagesCount: 'Språk',
    gamesPlayed: 'Spilte Spill',
    countries: 'Land',
    joinCommunity: 'Bli med i Fellesskapet — Gratis',

    // Pro teaser
    goPro: 'Gå Pro',
    proTitle: 'Ditt Beste Spill, Uavbrutt',
    proDesc: 'Fjern reklamer. Lås opp ubegrensede arkiver. Dykk dypt i statistikken din. Støtt et rolig, uavhengig ordspillstudio.',
    proAdFree: '100% reklamefri opplevelse',
    proArchive: 'Ubegrenset tilgang til spillarkiver',
    proStats: 'Avansert statistikk og innsikt',
    proPriority: 'Prioritet på nye spillmoduser',
    proSupport: 'Støtt uavhengig utvikling',
    proPrice: '49 kr/md',
    proCTA: 'Start gratis — oppgrader når som helst',

    // Footer
    tagline: 'Spesialkaffen til ordspill.',
    footerGames: 'Spill',
    footerCompany: 'Selskap',
    footerLegal: 'Juridisk',
    allRightsReserved: '© 2025 Klystora. Alle rettigheter reservert.',

    // Mini game
    greatSolve: 'Bra løst!',
    comeBackTomorrow: 'Kom tilbake i morgen',
    playFullVersion: 'Spill Full Versjon',
    share: 'Del',

    // Common
    light: 'Lyst',
    dark: 'Mørkt',
    english: 'English',
    spanish: 'Español',
  },
};

export type Translations = typeof translations.en;
