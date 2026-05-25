export type Locale =
  | 'en' | 'es' | 'zh' | 'hi' | 'pt' | 'bn' | 'ru' | 'ja' | 'de' | 'ko'
  | 'fr' | 'tr' | 'it' | 'pl' | 'nl' | 'uk' | 'ro' | 'el' | 'cs' | 'sv'
  | 'hu' | 'id' | 'vi' | 'th' | 'da' | 'fi' | 'no';

// Alias for compatibility with hooks/useLanguage.tsx
export type Lang = Locale;

export const defaultLocale: Locale = 'en';
export const locales: Locale[] = [
  'en', 'es', 'zh', 'hi', 'pt', 'bn', 'ru', 'ja', 'de', 'ko',
  'fr', 'tr', 'it', 'pl', 'nl', 'uk', 'ro', 'el', 'cs', 'sv',
  'hu', 'id', 'vi', 'th', 'da', 'fi', 'no'
];

// Alias for compatibility
export const supportedLanguages = locales;

export function getLocaleFromPath(path: string): Locale {
  const match = path.match(/^\/([a-z]{2})(\/|$)/);
  const locale = match?.[1] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
}

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}

// Game slugs por idioma — según biblia sección 7.2
export const gameSlugs: Record<Locale, Record<string, string>> = {
  en: {
    dailyWord: 'daily-word',
    crossword: 'mini-crossword',
    wordSearch: 'word-search',
    anagrams: 'anagrams',
    connections: 'connections',
    spellingBee: 'spelling-bee',
    wordLadder: 'word-ladder',
    rosco: 'word-wheel',
  },
  es: {
    dailyWord: 'palabra-diaria',
    crossword: 'crucigrama-mini',
    wordSearch: 'sopa-de-letras',
    anagrams: 'anagramas',
    connections: 'conexiones',
    spellingBee: 'colmena',
    wordLadder: 'escalera-de-palabras',
    rosco: 'rosco',
  },
  zh: {
    dailyWord: 'mei-ri-yi-ci',
    crossword: 'mi-ni-tian-zi-you-xi',
    wordSearch: 'zhao-dan-ci',
    anagrams: 'zi-mu-zhong-zu',
    connections: 'lian-xiang',
    spellingBee: 'pin-xie-bi-sai',
    wordLadder: 'dan-ci-ti-ti',
    rosco: 'zhuan-lun-pan',
  },
  hi: {
    dailyWord: 'din-bhar-ka-shabd',
    crossword: 'chhota-shabd-jaal',
    wordSearch: 'shabd-khoj',
    anagrams: 'akshar-jeern',
    connections: 'sambandh',
    spellingBee: 'vartani-madhumakkhi',
    wordLadder: 'shabd-seedi',
    rosco: 'shabd-chakra',
  },
  pt: {
    dailyWord: 'palavra-diaria',
    crossword: 'cruzadinha-mini',
    wordSearch: 'caca-palavras',
    anagrams: 'anagramas',
    connections: 'conexoes',
    spellingBee: 'abelha-de-ortografia',
    wordLadder: 'escada-de-palavras',
    rosco: 'roda-de-palavras',
  },
  bn: {
    dailyWord: 'doinik-shobdo',
    crossword: 'chhoto-shobdo-jaal',
    wordSearch: 'shobdo-khoj',
    anagrams: 'bak-jorano',
    connections: 'somporko',
    spellingBee: 'barnona-moumachhi',
    wordLadder: 'shobdo-siri',
    rosco: 'shobdo-chakra',
  },
  ru: {
    dailyWord: 'slovo-dnya',
    crossword: 'mini-krossvord',
    wordSearch: 'poisk-slov',
    anagrams: 'anagrammy',
    connections: 'svyazi',
    spellingBee: 'pchela-orfografii',
    wordLadder: 'lestnitsa-slov',
    rosco: 'koleso-slov',
  },
  ja: {
    dailyWord: 'mainichi-no-kotoba',
    crossword: 'mini-kurosuwaado',
    wordSearch: 'tango-sagashi',
    anagrams: 'anaguramu',
    connections: 'renketsu',
    spellingBee: 'supellingu-bii',
    wordLadder: 'tango-hashi',
    rosco: 'tango-sharin',
  },
  de: {
    dailyWord: 'taegliches-wort',
    crossword: 'mini-kreuzwort',
    wordSearch: 'wort-suche',
    anagrams: 'anagramme',
    connections: 'verbindungen',
    spellingBee: 'rechtschreib-biene',
    wordLadder: 'wortleiter',
    rosco: 'wortrad',
  },
  ko: {
    dailyWord: 'maeil-han-geul',
    crossword: 'mini-silheom-mal-ggeut',
    wordSearch: 'dan-eo-chajgi',
    anagrams: 'munja-baek-gwi',
    connections: 'yeongyeol',
    spellingBee: 'pyeongbeob-bbeol',
    wordLadder: 'daneo-saedeul',
    rosco: 'daneo-hoihwan',
  },
  fr: {
    dailyWord: 'mot-du-jour',
    crossword: 'mini-mots-croises',
    wordSearch: 'mots-melanges',
    anagrams: 'anagrammes',
    connections: 'connexions',
    spellingBee: 'abeille-d-orthographe',
    wordLadder: 'echelle-de-mots',
    rosco: 'roue-de-mots',
  },
  tr: {
    dailyWord: 'gunun-kelimesi',
    crossword: 'mini-bulmaca',
    wordSearch: 'kelime-avi',
    anagrams: 'anagramlar',
    connections: 'baglantilar',
    spellingBee: 'yazim-ari',
    wordLadder: 'kelime-merdiveni',
    rosco: 'kelime-tekerlegi',
  },
  it: {
    dailyWord: 'parola-del-giorno',
    crossword: 'mini-cruciverba',
    wordSearch: 'ricerca-parole',
    anagrams: 'anagrammi',
    connections: 'connessioni',
    spellingBee: 'ape-ortografica',
    wordLadder: 'scala-di-parole',
    rosco: 'ruota-di-parole',
  },
  pl: {
    dailyWord: 'slowo-dnia',
    crossword: 'mini-krzyzowka',
    wordSearch: 'szukanie-slow',
    anagrams: 'anagramy',
    connections: 'polaczenia',
    spellingBee: 'pszczola-ortografii',
    wordLadder: 'drabina-slow',
    rosco: 'kolo-slow',
  },
  nl: {
    dailyWord: 'dagelijks-woord',
    crossword: 'mini-kruiswoord',
    wordSearch: 'woordzoeker',
    anagrams: 'anagrammen',
    connections: 'verbanden',
    spellingBee: 'spelling-bij',
    wordLadder: 'woordladder',
    rosco: 'woordwiel',
  },
  uk: {
    dailyWord: 'slovo-dnya',
    crossword: 'mini-krosvord',
    wordSearch: 'poshuk-sliv',
    anagrams: 'anagramy',
    connections: 'zvyazky',
    spellingBee: 'bdzhola-ortografiyi',
    wordLadder: 'dribynka-sliv',
    rosco: 'koleso-sliv',
  },
  ro: {
    dailyWord: 'cuvantul-zilei',
    crossword: 'mini-cuvinte-incrucisate',
    wordSearch: 'cautare-cuvinte',
    anagrams: 'anagrame',
    connections: 'conexiuni',
    spellingBee: 'albina-ortografiei',
    wordLadder: 'scara-cuvintelor',
    rosco: 'roata-cuvintelor',
  },
  el: {
    dailyWord: 'i-lexi-tis-imeras',
    crossword: 'mini-stavrolexo',
    wordSearch: 'anazitisi-lekseon',
    anagrams: 'anagrammata',
    connections: 'sindeseis',
    spellingBee: 'melissa-orthografias',
    wordLadder: 'skala-lekseon',
    rosco: 'trochos-lekseon',
  },
  cs: {
    dailyWord: 'slovo-dne',
    crossword: 'mini-krizovka',
    wordSearch: 'hledani-slov',
    anagrams: 'anagramy',
    connections: 'spojeni',
    spellingBee: 'vcela-pravopisu',
    wordLadder: 'retez-slov',
    rosco: 'kolo-slov',
  },
  sv: {
    dailyWord: 'dagens-ord',
    crossword: 'mini-korsord',
    wordSearch: 'ordjakt',
    anagrams: 'anagram',
    connections: 'kopplingar',
    spellingBee: 'stavnings-bi',
    wordLadder: 'ordstege',
    rosco: 'ordhjul',
  },
  hu: {
    dailyWord: 'a-napi-szo',
    crossword: 'mini-keresztrejtvény',
    wordSearch: 'szokereso',
    anagrams: 'anagrammak',
    connections: 'kapcsolatok',
    spellingBee: 'helyesirasi-meh',
    wordLadder: 'szoletra',
    rosco: 'szokerék',
  },
  id: {
    dailyWord: 'kata-harian',
    crossword: 'mini-teka-teki-silang',
    wordSearch: 'pencarian-kata',
    anagrams: 'anagram',
    connections: 'koneksi',
    spellingBee: 'lebah-ejaan',
    wordLadder: 'tangga-kata',
    rosco: 'roda-kata',
  },
  vi: {
    dailyWord: 'tu-ngay',
    crossword: 'o-chu-mini',
    wordSearch: 'tim-tu',
    anagrams: 'sap-xep-chu-cai',
    connections: 'ket-noi',
    spellingBee: 'ong-chinh-ta',
    wordLadder: 'thang-tu',
    rosco: 'banh-xe-tu-vung',
  },
  th: {
    dailyWord: 'kham-pra-jam-wan',
    crossword: 'kham-khuei-mini',
    wordSearch: 'kham-nai-talad',
    anagrams: 'kham-salap',
    connections: 'khwam-samphan',
    spellingBee: 'phueng-sak-phaasa',
    wordLadder: 'bansai-kham',
    rosco: 'long-kham',
  },
  da: {
    dailyWord: 'dagens-ord',
    crossword: 'mini-krydsord',
    wordSearch: 'ordjagt',
    anagrams: 'anagrammer',
    connections: 'forbindelser',
    spellingBee: 'stavnings-bi',
    wordLadder: 'ordstige',
    rosco: 'ordhjul',
  },
  fi: {
    dailyWord: 'paivan-sana',
    crossword: 'mini-sanaristikko',
    wordSearch: 'sanahaku',
    anagrams: 'anagrammit',
    connections: 'yhteydet',
    spellingBee: 'oikeinkirjoitus-mehilainen',
    wordLadder: 'sanarappuset',
    rosco: 'sananpyora',
  },
  no: {
    dailyWord: 'dagens-ord',
    crossword: 'mini-kryssord',
    wordSearch: 'ordjakt',
    anagrams: 'anagrammer',
    connections: 'koblinger',
    spellingBee: 'stave-bie',
    wordLadder: 'ordstige',
    rosco: 'ordhjul',
  },
};

// Helper para obtener URL de un juego en un idioma
export function getGameUrl(gameKey: string, locale: Locale): string {
  const slug = gameSlugs[locale][gameKey];
  return locale === 'en' ? `/${slug}` : `/${locale}/${slug}`;
}

// Helper para obtener homepage URL
export function getHomeUrl(locale: Locale): string {
  return locale === 'en' ? '/' : `/${locale}/`;
}

// Language names for display
export const localeNames: Record<Locale, string> = {
  en: 'English', es: 'Español', zh: '中文', hi: 'हिन्दी', pt: 'Português',
  bn: 'বাংলা', ru: 'Русский', ja: '日本語', de: 'Deutsch', ko: '한국어',
  fr: 'Français', tr: 'Türkçe', it: 'Italiano', pl: 'Polski', nl: 'Nederlands',
  uk: 'Українська', ro: 'Română', el: 'Ελληνικά', cs: 'Čeština', sv: 'Svenska',
  hu: 'Magyar', id: 'Bahasa Indonesia', vi: 'Tiếng Việt', th: 'ไทย',
  da: 'Dansk', fi: 'Suomi', no: 'Norsk',
};

// OG locale codes
export const ogLocales: Record<Locale, string> = {
  en: 'en_US', es: 'es_MX', zh: 'zh_CN', hi: 'hi_IN', pt: 'pt_BR',
  bn: 'bn_BD', ru: 'ru_RU', ja: 'ja_JP', de: 'de_DE', ko: 'ko_KR',
  fr: 'fr_FR', tr: 'tr_TR', it: 'it_IT', pl: 'pl_PL', nl: 'nl_NL',
  uk: 'uk_UA', ro: 'ro_RO', el: 'el_GR', cs: 'cs_CZ', sv: 'sv_SE',
  hu: 'hu_HU', id: 'id_ID', vi: 'vi_VN', th: 'th_TH',
  da: 'da_DK', fi: 'fi_FI', no: 'no_NO',
};

const messages: Record<Locale, any> = {
  en: {
    siteName: 'Klystora',
    tagline: 'Word games. New every day.',
    subtitle: 'Eight daily word games in 27 languages. No signup, no pop-up ads, no waiting.',
    playNow: 'Play Now — Free',
    exploreGames: 'Explore All Games',
    nav: { games: 'Games', blog: 'Blog', about: 'About', pricing: 'Pricing' },
    games: {
      dailyWord: { name: 'Daily Word', desc: 'Guess the 5-letter word in 6 tries' },
      crossword: { name: 'Crossword Mini', desc: 'Solve the 5×5 grid' },
      wordSearch: { name: 'Word Search', desc: 'Find hidden words' },
      anagrams: { name: 'Anagrams', desc: 'Unscramble letters' },
      connections: { name: 'Connections', desc: 'Group words by theme' },
      spellingBee: { name: 'Spelling Bee', desc: 'Words from 7 letters' },
      wordLadder: { name: 'Word Ladder', desc: 'Chain words by one letter' },
      rosco: { name: 'Word Wheel', desc: 'One word per letter' }
    },
    footer: { games: 'Games', company: 'Company', legal: 'Legal', privacy: 'Privacy', terms: 'Terms', cookies: 'Cookies' }
  },
  es: {
    siteName: 'Klystora',
    tagline: 'Juegos de palabras. Distintos cada día.',
    subtitle: 'Ocho juegos de palabras diarios en 27 idiomas. Sin registro, sin anuncios intrusivos, sin esperas.',
    playNow: 'Jugar Ahora — Gratis',
    exploreGames: 'Ver Todos los Juegos',
    nav: { games: 'Juegos', blog: 'Blog', about: 'Nosotros', pricing: 'Precios' },
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
    footer: { games: 'Juegos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidad', terms: 'Términos', cookies: 'Cookies' }
  },
  zh: {
    siteName: 'Klystora',
    tagline: '文字游戏。每日更新。',
    subtitle: '27种语言的八款每日文字游戏。无需注册，无弹窗广告，无需等待。',
    playNow: '立即开始 — 免费',
    exploreGames: '查看所有游戏',
    nav: { games: '游戏', blog: '博客', about: '关于', pricing: '价格' },
    games: {
      dailyWord: { name: '每日一词', desc: '6次机会猜出5字母单词' },
      crossword: { name: '迷你填字', desc: '解开5×5网格' },
      wordSearch: { name: '找单词', desc: '寻找隐藏单词' },
      anagrams: { name: '字母重组', desc: '重新排列字母' },
      connections: { name: '联想', desc: '按主题分组单词' },
      spellingBee: { name: '拼写比赛', desc: '用7个字母组词' },
      wordLadder: { name: '单词阶梯', desc: '每次改变一个字母' },
      rosco: { name: '转轮盘', desc: '每个字母一个单词' }
    },
    footer: { games: '游戏', company: '公司', legal: '法律', privacy: '隐私', terms: '条款', cookies: 'Cookie' }
  },
  hi: {
    siteName: 'Klystora',
    tagline: 'शब्द खेल। हर दिन नया।',
    subtitle: '27 भाषाओं में आठ दैनिक शब्द खेल। कोई साइनअप नहीं, कोई पॉप-अप विज्ञापन नहीं, कोई इंतज़ार नहीं।',
    playNow: 'अभी खेलें — मुफ्त',
    exploreGames: 'सभी खेल देखें',
    nav: { games: 'खेल', blog: 'ब्लॉग', about: 'हमारे बारे में', pricing: 'मूल्य' },
    games: {
      dailyWord: { name: 'दिन का शब्द', desc: '6 प्रयासों में 5 अक्षर का शब्द अनुमान लगाएं' },
      crossword: { name: 'छोटा क्रॉसवर्ड', desc: '5×5 ग्रिड हल करें' },
      wordSearch: { name: 'शब्द खोज', desc: 'छिपे शब्द खोजें' },
      anagrams: { name: 'अक्षर जोड़', desc: 'अक्षरों को व्यवस्थित करें' },
      connections: { name: 'संबंध', desc: 'शब्दों को विषय के अनुसार समूहित करें' },
      spellingBee: { name: 'वर्तनी मधुमक्खी', desc: '7 अक्षरों से शब्द बनाएं' },
      wordLadder: { name: 'शब्द सीढ़ी', desc: 'एक-एक अक्षर बदलकर शब्द जोड़ें' },
      rosco: { name: 'शब्द चक्र', desc: 'प्रति अक्षर एक शब्द' }
    },
    footer: { games: 'खेल', company: 'कंपनी', legal: 'कानूनी', privacy: 'गोपनीयता', terms: 'शर्तें', cookies: 'Cookies' }
  },
  pt: {
    siteName: 'Klystora',
    tagline: 'Jogos de palavras. Novos todos os dias.',
    subtitle: 'Oito jogos de palavras diários em 27 idiomas. Sem cadastro, sem anúncios pop-up, sem espera.',
    playNow: 'Jogar Agora — Grátis',
    exploreGames: 'Ver Todos os Jogos',
    nav: { games: 'Jogos', blog: 'Blog', about: 'Sobre', pricing: 'Preços' },
    games: {
      dailyWord: { name: 'Palavra do Dia', desc: 'Adivinhe a palavra de 5 letras em 6 tentativas' },
      crossword: { name: 'Cruzadinha Mini', desc: 'Resolva a grade 5×5' },
      wordSearch: { name: 'Caça-Palavras', desc: 'Encontre palavras escondidas' },
      anagrams: { name: 'Anagramas', desc: 'Ordene as letras' },
      connections: { name: 'Conexões', desc: 'Agrupe palavras por tema' },
      spellingBee: { name: 'Abelha de Ortografia', desc: 'Palavras com 7 letras' },
      wordLadder: { name: 'Escada de Palavras', desc: 'Encadeie palavras mudando uma letra' },
      rosco: { name: 'Roda de Palavras', desc: 'Uma palavra por letra' }
    },
    footer: { games: 'Jogos', company: 'Empresa', legal: 'Legal', privacy: 'Privacidade', terms: 'Termos', cookies: 'Cookies' }
  },
  bn: {
    siteName: 'Klystora',
    tagline: 'শব্দ খেলা। প্রতিদিন নতুন।',
    subtitle: '২৭টি ভাষায় আটটি দৈনিক শব্দ খেলা। নিবন্ধন নেই, পপ-আপ বিজ্ঞাপন নেই, অপেক্ষা নেই।',
    playNow: 'এখনই খেলুন — বিনামূল্যে',
    exploreGames: 'সব খেলা দেখুন',
    nav: { games: 'খেলা', blog: 'ব্লগ', about: 'আমাদের সম্পর্কে', pricing: 'মূল্য' },
    games: {
      dailyWord: { name: 'দৈনিক শব্দ', desc: '৬ প্রচেষ্টায় ৫ অক্ষরের শব্দ অনুমান করুন' },
      crossword: { name: 'ছোট ক্রসওয়ার্ড', desc: '৫×৫ গ্রিড সমাধান করুন' },
      wordSearch: { name: 'শব্দ খোজ', desc: 'লুকানো শব্দ খুঁজুন' },
      anagrams: { name: 'বাক্‌যোড়া', desc: 'অক্ষর সাজান' },
      connections: { name: 'সম্পর্ক', desc: 'শব্দগুলোকে থিম অনুযায়ী গ্রুপ করুন' },
      spellingBee: { name: 'বর্ণনা মৌমাছি', desc: '৭টি অক্ষর দিয়ে শব্দ তৈরি করুন' },
      wordLadder: { name: 'শব্দ সিঁড়ি', desc: 'একটি অক্ষর পরিবর্তন করে শব্দ যোগ করুন' },
      rosco: { name: 'শব্দ চক্র', desc: 'প্রতি অক্ষরে একটি শব্দ' }
    },
    footer: { games: 'খেলা', company: 'কোম্পানি', legal: 'আইনি', privacy: 'গোপনীয়তা', terms: 'শর্তাবলী', cookies: 'Cookies' }
  },
  ru: {
    siteName: 'Klystora',
    tagline: 'Словесные игры. Новые каждый день.',
    subtitle: 'Восемь ежедневных словесных игр на 27 языках. Без регистрации, без всплывающей рекламы, без ожидания.',
    playNow: 'Играть сейчас — бесплатно',
    exploreGames: 'Все игры',
    nav: { games: 'Игры', blog: 'Блог', about: 'О нас', pricing: 'Цены' },
    games: {
      dailyWord: { name: 'Слово дня', desc: 'Угадайте слово из 5 букв за 6 попыток' },
      crossword: { name: 'Мини-кроссворд', desc: 'Решите сетку 5×5' },
      wordSearch: { name: 'Поиск слов', desc: 'Найдите скрытые слова' },
      anagrams: { name: 'Анаграммы', desc: 'Расставьте буквы' },
      connections: { name: 'Связи', desc: 'Сгруппируйте слова по теме' },
      spellingBee: { name: 'Пчела орфографии', desc: 'Слова из 7 букв' },
      wordLadder: { name: 'Лестница слов', desc: 'Связывайте слова, меняя одну букву' },
      rosco: { name: 'Колесо слов', desc: 'По слову на каждую букву' }
    },
    footer: { games: 'Игры', company: 'Компания', legal: 'Правовая информация', privacy: 'Конфиденциальность', terms: 'Условия', cookies: 'Cookies' }
  },
  ja: {
    siteName: 'Klystora',
    tagline: '言葉遊び。毎日新しい。',
    subtitle: '27言語の8つのデイリーワードゲーム。登録不要、ポップアップ広告なし、待ち時間なし。',
    playNow: '今すぐプレイ — 無料',
    exploreGames: 'すべてのゲームを見る',
    nav: { games: 'ゲーム', blog: 'ブログ', about: 'について', pricing: '料金' },
    games: {
      dailyWord: { name: '今日の言葉', desc: '6回以内に5文字の単語を当てよう' },
      crossword: { name: 'ミニクロスワード', desc: '5×5グリッドを解こう' },
      wordSearch: { name: '単語探し', desc: '隠れた単語を見つけよう' },
      anagrams: { name: 'アナグラム', desc: '文字を並べ替えよう' },
      connections: { name: '連想', desc: '単語をテーマごとにグループ化しよう' },
      spellingBee: { name: 'スペリングビー', desc: '7文字から単語を作ろう' },
      wordLadder: { name: '単語はしご', desc: '1文字ずつ変えて単語をつなごう' },
      rosco: { name: '単語車輪', desc: '各文字1単語' }
    },
    footer: { games: 'ゲーム', company: '会社', legal: '法的情報', privacy: 'プライバシー', terms: '規約', cookies: 'Cookie' }
  },
  de: {
    siteName: 'Klystora',
    tagline: 'Wortspiele. Jeden Tag neu.',
    subtitle: 'Acht tägliche Wortspiele in 27 Sprachen. Keine Anmeldung, keine Pop-up-Werbung, kein Warten.',
    playNow: 'Jetzt spielen — Kostenlos',
    exploreGames: 'Alle Spiele ansehen',
    nav: { games: 'Spiele', blog: 'Blog', about: 'Über uns', pricing: 'Preise' },
    games: {
      dailyWord: { name: 'Wort des Tages', desc: 'Errate das 5-Buchstaben-Wort in 6 Versuchen' },
      crossword: { name: 'Mini-Kreuzwort', desc: 'Löse das 5×5-Gitter' },
      wordSearch: { name: 'Wort-Suche', desc: 'Finde versteckte Wörter' },
      anagrams: { name: 'Anagramme', desc: 'Ordne die Buchstaben' },
      connections: { name: 'Verbindungen', desc: 'Gruppiere Wörter nach Thema' },
      spellingBee: { name: 'Rechtschreib-Biene', desc: 'Wörter aus 7 Buchstaben' },
      wordLadder: { name: 'Wortleiter', desc: 'Verkette Wörter mit einem Buchstabenwechsel' },
      rosco: { name: 'Wortrad', desc: 'Ein Wort pro Buchstabe' }
    },
    footer: { games: 'Spiele', company: 'Unternehmen', legal: 'Rechtliches', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', cookies: 'Cookies' }
  },
  ko: {
    siteName: 'Klystora',
    tagline: '단어 게임. 매일 새로운.',
    subtitle: '27개 언어의 8가지 데일리 단어 게임. 가입 없음, 팝업 광고 없음, 대기 없음.',
    playNow: '지금 플레이 — 물',
    exploreGames: '모든 게임 보기',
    nav: { games: '게임', blog: '블로그', about: '소개', pricing: '가격' },
    games: {
      dailyWord: { name: '오늘의 단어', desc: '6번 안에 5글자 단어를 맞춰보세요' },
      crossword: { name: '미니 십자말풀이', desc: '5×5 그리드를 풀어보세요' },
      wordSearch: { name: '단어 찾기', desc: '숨겨진 단어를 찾으세요' },
      anagrams: { name: '애너그램', desc: '글자를 재배열하세요' },
      connections: { name: '연결', desc: '단어를 주제별로 그룹화하세요' },
      spellingBee: { name: '스펠링 비', desc: '7개 글자로 단어를 만드세요' },
      wordLadder: { name: '단어 사다리', desc: '한 글자씩 바꿔 단어를 연결하세요' },
      rosco: { name: '단어 회전판', desc: '글자마다 한 단어' }
    },
    footer: { games: '게임', company: '회사', legal: '법률', privacy: '개인정보', terms: '약관', cookies: 'Cookie' }
  },
  fr: {
    siteName: 'Klystora',
    tagline: 'Jeux de mots. Nouveaux chaque jour.',
    subtitle: 'Huit jeux de mots quotidiens en 27 langues. Sans inscription, sans publicité pop-up, sans attente.',
    playNow: 'Jouer maintenant — Gratuit',
    exploreGames: 'Voir tous les jeux',
    nav: { games: 'Jeux', blog: 'Blog', about: 'À propos', pricing: 'Tarifs' },
    games: {
      dailyWord: { name: 'Mot du Jour', desc: 'Devinez le mot de 5 lettres en 6 essais' },
      crossword: { name: 'Mini Mots Croisés', desc: 'Résolvez la grille 5×5' },
      wordSearch: { name: 'Mots Mêlés', desc: 'Trouvez les mots cachés' },
      anagrams: { name: 'Anagrammes', desc: 'Réorganisez les lettres' },
      connections: { name: 'Connexions', desc: 'Groupez les mots par thème' },
      spellingBee: { name: 'Abeille d\'Orthographe', desc: 'Mots de 7 lettres' },
      wordLadder: { name: 'Échelle de Mots', desc: 'Enchaînez les mots en changeant une lettre' },
      rosco: { name: 'Roue de Mots', desc: 'Un mot par lettre' }
    },
    footer: { games: 'Jeux', company: 'Entreprise', legal: 'Mentions légales', privacy: 'Confidentialité', terms: 'Conditions', cookies: 'Cookies' }
  },
  tr: {
    siteName: 'Klystora',
    tagline: 'Kelime oyunları. Her gün yeni.',
    subtitle: '27 dilde sekiz günlük kelime oyunu. Kayıt yok, açılır pencere reklamı yok, bekleme yok.',
    playNow: 'Şimdi Oyna — Ücretsiz',
    exploreGames: 'Tüm Oyunları Gör',
    nav: { games: 'Oyunlar', blog: 'Blog', about: 'Hakkımızda', pricing: 'Fiyatlandırma' },
    games: {
      dailyWord: { name: 'Günün Kelimesi', desc: '6 denemede 5 harfli kelimeyi tahmin et' },
      crossword: { name: 'Mini Bulmaca', desc: '5×5 ızgarayı çöz' },
      wordSearch: { name: 'Kelime Avı', desc: 'Gizli kelimeleri bul' },
      anagrams: { name: 'Anagramlar', desc: 'Harfleri sırala' },
      connections: { name: 'Bağlantılar', desc: 'Kelimeleri temaya göre grupla' },
      spellingBee: { name: 'Yazım Arısı', desc: '7 harften kelime oluştur' },
      wordLadder: { name: 'Kelime Merdiveni', desc: 'Bir harf değiştirerek kelime zinciri oluştur' },
      rosco: { name: 'Kelime Tekerleği', desc: 'Her harfe bir kelime' }
    },
    footer: { games: 'Oyunlar', company: 'Şirket', legal: 'Yasal', privacy: 'Gizlilik', terms: 'Koşullar', cookies: 'Cookies' }
  },
  it: {
    siteName: 'Klystora',
    tagline: 'Giochi di parole. Nuovi ogni giorno.',
    subtitle: 'Otto giochi di parole quotidiani in 27 lingue. Senza registrazione, senza pubblicità pop-up, senza attesa.',
    playNow: 'Gioca Ora — Gratis',
    exploreGames: 'Vedi Tutti i Giochi',
    nav: { games: 'Giochi', blog: 'Blog', about: 'Chi siamo', pricing: 'Prezzi' },
    games: {
      dailyWord: { name: 'Parola del Giorno', desc: 'Indovina la parola di 5 lettere in 6 tentativi' },
      crossword: { name: 'Mini Cruciverba', desc: 'Risolvi la griglia 5×5' },
      wordSearch: { name: 'Ricerca Parole', desc: 'Trova parole nascoste' },
      anagrams: { name: 'Anagrammi', desc: 'Riordina le lettere' },
      connections: { name: 'Connessioni', desc: 'Raggruppa parole per tema' },
      spellingBee: { name: 'Ape Ortografica', desc: 'Parole di 7 lettere' },
      wordLadder: { name: 'Scala di Parole', desc: 'Concatena parole cambiando una lettera' },
      rosco: { name: 'Ruota di Parole', desc: 'Una parola per lettera' }
    },
    footer: { games: 'Giochi', company: 'Azienda', legal: 'Legale', privacy: 'Privacy', terms: 'Termini', cookies: 'Cookies' }
  },
  pl: {
    siteName: 'Klystora',
    tagline: 'Gry słowne. Nowe każdego dnia.',
    subtitle: 'Ośmioro dziennych gier słownych w 27 językach. Bez rejestracji, bez wyskakujących reklam, bez czekania.',
    playNow: 'Graj Teraz — Za Darmo',
    exploreGames: 'Zobacz Wszystkie Gry',
    nav: { games: 'Gry', blog: 'Blog', about: 'O nas', pricing: 'Cennik' },
    games: {
      dailyWord: { name: 'Słowo Dnia', desc: 'Odgadnij 5-literowe słowo na 6 prób' },
      crossword: { name: 'Mini Krzyżówka', desc: 'Rozwiąż siatkę 5×5' },
      wordSearch: { name: 'Szukanie Słów', desc: 'Znajdź ukryte słowa' },
      anagrams: { name: 'Anagramy', desc: 'Ułóż litery' },
      connections: { name: 'Połączenia', desc: 'Grupuj słowa według tematu' },
      spellingBee: { name: 'Pszczoła Ortografii', desc: 'Słowa z 7 liter' },
      wordLadder: { name: 'Drabina Słów', desc: 'Łącz słowa zmieniając jedną literę' },
      rosco: { name: 'Koło Słów', desc: 'Jedno słowo na literę' }
    },
    footer: { games: 'Gry', company: 'Firma', legal: 'Prawne', privacy: 'Prywatność', terms: 'Warunki', cookies: 'Cookies' }
  },
  nl: {
    siteName: 'Klystora',
    tagline: 'Woordspellen. Elke dag nieuw.',
    subtitle: 'Acht dagelijkse woordspellen in 27 talen. Geen registratie, geen pop-upadvertenties, geen wachten.',
    playNow: 'Nu Spelen — Gratis',
    exploreGames: 'Bekijk Alle Spellen',
    nav: { games: 'Spellen', blog: 'Blog', about: 'Over ons', pricing: 'Prijzen' },
    games: {
      dailyWord: { name: 'Woord van de Dag', desc: 'Raad het 5-letterwoord in 6 pogingen' },
      crossword: { name: 'Mini Kruiswoord', desc: 'Los het 5×5-raster op' },
      wordSearch: { name: 'Woordzoeker', desc: 'Vind verborgen woorden' },
      anagrams: { name: 'Anagrammen', desc: 'Rangschik de letters' },
      connections: { name: 'Verbanden', desc: 'Groepeer woorden op thema' },
      spellingBee: { name: 'Spelling Bij', desc: 'Woorden van 7 letters' },
      wordLadder: { name: 'Woordladder', desc: 'Koppel woorden door één letter te wisselen' },
      rosco: { name: 'Woordwiel', desc: 'Eén woord per letter' }
    },
    footer: { games: 'Spellen', company: 'Bedrijf', legal: 'Juridisch', privacy: 'Privacy', terms: 'Voorwaarden', cookies: 'Cookies' }
  },
  uk: {
    siteName: 'Klystora',
    tagline: 'Словесні ігри. Нові щодня.',
    subtitle: 'Вісім щоденних словесних ігор 27 мовами. Без реєстрації, без спливаючої реклами, без очікування.',
    playNow: 'Грати зараз — безкоштовно',
    exploreGames: 'Всі ігри',
    nav: { games: 'Ігри', blog: 'Блог', about: 'Про нас', pricing: 'Ціни' },
    games: {
      dailyWord: { name: 'Слово дня', desc: 'Вгадайте слово з 5 літер за 6 спроб' },
      crossword: { name: 'Міні-кросворд', desc: 'Розв\'яжіть сітку 5×5' },
      wordSearch: { name: 'Пошук слів', desc: 'Знайдіть приховані слова' },
      anagrams: { name: 'Анаграми', desc: 'Розставте літери' },
      connections: { name: 'Зв\'язки', desc: 'Згрупуйте слова за темою' },
      spellingBee: { name: 'Бджола орфографії', desc: 'Слова з 7 літер' },
      wordLadder: { name: 'Драбинка слів', desc: "Поєднуйте слова, змінюючи одну літеру" },
      rosco: { name: 'Колесо слів', desc: 'По слову на кожну літеру' }
    },
    footer: { games: 'Ігри', company: 'Компанія', legal: 'Правова інформація', privacy: 'Конфіденційність', terms: 'Умови', cookies: 'Cookies' }
  },
  ro: {
    siteName: 'Klystora',
    tagline: 'Jocuri de cuvinte. Noi în fiecare zi.',
    subtitle: 'Opt jocuri de cuvinte zilnice în 27 de limbi. Fără înregistrare, fără reclame pop-up, fără așteptare.',
    playNow: 'Joacă Acum — Gratis',
    exploreGames: 'Vezi Toate Jocurile',
    nav: { games: 'Jocuri', blog: 'Blog', about: 'Despre', pricing: 'Prețuri' },
    games: {
      dailyWord: { name: 'Cuvântul Zilei', desc: 'Ghicește cuvântul de 5 litere în 6 încercări' },
      crossword: { name: 'Mini Cuvinte Încrucișate', desc: 'Rezolvă grila 5×5' },
      wordSearch: { name: 'Căutare Cuvinte', desc: 'Găsește cuvinte ascunse' },
      anagrams: { name: 'Anagrame', desc: 'Ordonează literele' },
      connections: { name: 'Conexiuni', desc: 'Grupează cuvintele după temă' },
      spellingBee: { name: 'Albina Ortografiei', desc: 'Cuvinte de 7 litere' },
      wordLadder: { name: 'Scara Cuvintelor', desc: 'Înlănțuie cuvintele schimbând o literă' },
      rosco: { name: 'Roata Cuvintelor', desc: 'Un cuvânt pe literă' }
    },
    footer: { games: 'Jocuri', company: 'Companie', legal: 'Legal', privacy: 'Confidențialitate', terms: 'Termeni', cookies: 'Cookies' }
  },
  el: {
    siteName: 'Klystora',
    tagline: 'Παιχνίδια λέξεων. Νέα κάθε μέρα.',
    subtitle: 'Οκτώ καθημερινά παιχνίδια λέξεων σε 27 γλώσσες. Χωρίς εγγραφή, χωρίς αναδυόμενες διαφημίσεις, χωρίς αναμονή.',
    playNow: 'Παίξε Τώρα — Δωρεάν',
    exploreGames: 'Δες Όλα τα Παιχνίδια',
    nav: { games: 'Παιχνίδια', blog: 'Ιστολόγιο', about: 'Σχετικά', pricing: 'Τιμές' },
    games: {
      dailyWord: { name: 'Η Λέξη της Ημέρας', desc: 'Μάντεψε τη λέξη 5 γραμμάτων σε 6 προσπάθειες' },
      crossword: { name: 'Μίνι Σταυρόλεξο', desc: 'Λύσε το πλέγμα 5×5' },
      wordSearch: { name: 'Αναζήτηση Λέξεων', desc: 'Βρες κρυμμένες λέξεις' },
      anagrams: { name: 'Αναγράμματα', desc: 'Τακτοποίησε τα γράμματα' },
      connections: { name: 'Συνδέσεις', desc: 'Ομαδοποίησε λέξεις ανά θέμα' },
      spellingBee: { name: 'Μέλισσα Ορθογραφίας', desc: 'Λέξεις από 7 γράμματα' },
      wordLadder: { name: 'Σκάλα Λέξεων', desc: 'Σύνδεσε λέξεις αλλάζοντας ένα γράμμα' },
      rosco: { name: 'Τροχός Λέξεων', desc: 'Μια λέξη ανά γράμμα' }
    },
    footer: { games: 'Παιχνίδια', company: 'Εταιρεία', legal: 'Νομικά', privacy: 'Απόρρητο', terms: 'Όροι', cookies: 'Cookies' }
  },
  cs: {
    siteName: 'Klystora',
    tagline: 'Slovní hry. Nové každý den.',
    subtitle: 'Osm denních slovních her v 27 jazycích. Bez registrace, bez vyskakovacích reklam, bez čekání.',
    playNow: 'Hrát Teď — Zdarma',
    exploreGames: 'Zobrazit Všechny Hry',
    nav: { games: 'Hry', blog: 'Blog', about: 'O nás', pricing: 'Ceny' },
    games: {
      dailyWord: { name: 'Slovo Dne', desc: 'Uhádni 5-písmenné slovo na 6 pokusů' },
      crossword: { name: 'Mini Křížovka', desc: 'Vyřeš síť 5×5' },
      wordSearch: { name: 'Hledání Slov', desc: 'Najdi skrytá slova' },
      anagrams: { name: 'Anagramy', desc: 'Uspořádej písmena' },
      connections: { name: 'Spojení', desc: 'Seskup slova podle tématu' },
      spellingBee: { name: 'Včela Pravopisu', desc: 'Slova ze 7 písmen' },
      wordLadder: { name: 'Řetěz Slov', desc: 'Spoj slova změnou jednoho písmene' },
      rosco: { name: 'Kolo Slov', desc: 'Jedno slovo na písmeno' }
    },
    footer: { games: 'Hry', company: 'Společnost', legal: 'Právní', privacy: 'Soukromí', terms: 'Podmínky', cookies: 'Cookies' }
  },
  sv: {
    siteName: 'Klystora',
    tagline: 'Ordspel. Nya varje dag.',
    subtitle: 'Åtta dagliga ordspel på 27 språk. Ingen registrering, inga pop-up-annonser, ingen väntan.',
    playNow: 'Spela Nu — Gratis',
    exploreGames: 'Se Alla Spel',
    nav: { games: 'Spel', blog: 'Blogg', about: 'Om oss', pricing: 'Priser' },
    games: {
      dailyWord: { name: 'Dagens Ord', desc: 'Gissa det 5-bokstavsordet på 6 försök' },
      crossword: { name: 'Mini Korsord', desc: 'Lös rutnätet 5×5' },
      wordSearch: { name: 'Ordjakt', desc: 'Hitta gömda ord' },
      anagrams: { name: 'Anagram', desc: 'Ordna bokstäverna' },
      connections: { name: 'Kopplingar', desc: 'Gruppera ord efter tema' },
      spellingBee: { name: 'Stavnings-Bi', desc: 'Ord på 7 bokstäver' },
      wordLadder: { name: 'Ordstege', desc: 'Kedja ord genom att byta en bokstav' },
      rosco: { name: 'Ordhjul', desc: 'Ett ord per bokstav' }
    },
    footer: { games: 'Spel', company: 'Företag', legal: 'Juridisk', privacy: 'Integritet', terms: 'Villkor', cookies: 'Cookies' }
  },
  hu: {
    siteName: 'Klystora',
    tagline: 'Szójátékok. Minden nap újak.',
    subtitle: 'Nyolc napi szójáték 27 nyelven. Regisztráció nélkül, felugró reklámok nélkül, várakozás nélkül.',
    playNow: 'Játssz Most — Ingyen',
    exploreGames: 'Összes Játék Megtekintése',
    nav: { games: 'Játékok', blog: 'Blog', about: 'Rólunk', pricing: 'Árak' },
    games: {
      dailyWord: { name: 'A Nap Szava', desc: 'Találd ki az 5 betűs szót 6 próbálkozásból' },
      crossword: { name: 'Mini Keresztrejtvény', desc: 'Oldd meg az 5×5-ös rácsot' },
      wordSearch: { name: 'Szókereső', desc: 'Találd meg a rejtett szavakat' },
      anagrams: { name: 'Anagrammák', desc: 'Rendezd a betűket' },
      connections: { name: 'Kapcsolatok', desc: 'Csoportosítsd a szavakat téma szerint' },
      spellingBee: { name: 'Helyesírási Méh', desc: 'Szavak 7 betűből' },
      wordLadder: { name: 'Szólétra', desc: 'Láncold a szavakat egy betű cseréjével' },
      rosco: { name: 'Szókerék', desc: 'Betűnként egy szó' }
    },
    footer: { games: 'Játékok', company: 'Vállalat', legal: 'Jogi', privacy: 'Adatvédelem', terms: 'Feltételek', cookies: 'Cookies' }
  },
  id: {
    siteName: 'Klystora',
    tagline: 'Permainan kata. Baru setiap hari.',
    subtitle: 'Delapan permainan kata harian dalam 27 bahasa. Tanpa pendaftaran, tanpa iklan pop-up, tanpa menunggu.',
    playNow: 'Main Sekarang — Gratis',
    exploreGames: 'Lihat Semua Permainan',
    nav: { games: 'Permainan', blog: 'Blog', about: 'Tentang', pricing: 'Harga' },
    games: {
      dailyWord: { name: 'Kata Harian', desc: 'Tebak kata 5 huruf dalam 6 percobaan' },
      crossword: { name: 'Teka-Teki Silang Mini', desc: 'Selesaikan kotak 5×5' },
      wordSearch: { name: 'Pencarian Kata', desc: 'Temukan kata tersembunyi' },
      anagrams: { name: 'Anagram', desc: 'Susun huruf' },
      connections: { name: 'Koneksi', desc: 'Kelompokkan kata berdasarkan tema' },
      spellingBee: { name: 'Lebah Ejaan', desc: 'Kata dari 7 huruf' },
      wordLadder: { name: 'Tangga Kata', desc: 'Rantai kata dengan mengubah satu huruf' },
      rosco: { name: 'Roda Kata', desc: 'Satu kata per huruf' }
    },
    footer: { games: 'Permainan', company: 'Perusahaan', legal: 'Hukum', privacy: 'Privasi', terms: 'Syarat', cookies: 'Cookies' }
  },
  vi: {
    siteName: 'Klystora',
    tagline: 'Trò chơi chữ. Mới mỗi ngày.',
    subtitle: 'Tám trò chơi chữ hàng ngày bằng 27 ngôn ngữ. Không đăng ký, không quảng cáo pop-up, không chờ đợi.',
    playNow: 'Chơi Ngay — Miễn phí',
    exploreGames: 'Xem Tất cả Trò chơi',
    nav: { games: 'Trò chơi', blog: 'Blog', about: 'Giới thiệu', pricing: 'Giá' },
    games: {
      dailyWord: { name: 'Từ Ngày', desc: 'Đoán từ 5 chữ cái trong 6 lần thử' },
      crossword: { name: 'Ô Chữ Mini', desc: 'Giải lưới 5×5' },
      wordSearch: { name: 'Tìm Từ', desc: 'Tìm từ ẩn' },
      anagrams: { name: 'Sắp Xếp Chữ', desc: 'Sắp xếp lại chữ cái' },
      connections: { name: 'Kết Nối', desc: 'Nhóm từ theo chủ đề' },
      spellingBee: { name: 'Ong Chính Tả', desc: 'Từ từ 7 chữ cái' },
      wordLadder: { name: 'Thang Từ', desc: 'Nối từ bằng cách thay đổi một chữ cái' },
      rosco: { name: 'Bánh Xe Từ Vựng', desc: 'Một từ mỗi chữ cái' }
    },
    footer: { games: 'Trò chơi', company: 'Công ty', legal: 'Pháp lý', privacy: 'Bảo mật', terms: 'Điều khoản', cookies: 'Cookies' }
  },
  th: {
    siteName: 'Klystora',
    tagline: 'เกมคำศัพท์ ใหม่ทุกวัน',
    subtitle: 'แปดเกมคำศัพท์ประจำวันใน 27 ภาษา ไม่ต้องลงทะเบียน ไม่มีโฆษณาป๊อปอัป ไม่ต้องรอ',
    playNow: 'เล่นเลย — ฟรี',
    exploreGames: 'ดูเกมทั้งหมด',
    nav: { games: 'เกม', blog: 'บล็อก', about: 'เกี่ยวกับเรา', pricing: 'ราคา' },
    games: {
      dailyWord: { name: 'คำประจำวัน', desc: 'ทายคำ 5 ตัวอักษรใน 6 ครั้ง' },
      crossword: { name: 'ปริศนาคำไขว้มินิ', desc: 'แก้ตาราง 5×5' },
      wordSearch: { name: 'ค้นหาคำ', desc: 'หาคำที่ซ่อนอยู่' },
      anagrams: { name: 'สลับตัวอักษร', desc: 'จัดเรียงตัวอักษร' },
      connections: { name: 'ความสัมพันธ์', desc: 'จัดกลุ่มคำตามหัวข้อ' },
      spellingBee: { name: 'ผึ้งสะกดคำ', desc: 'คำจาก 7 ตัวอักษร' },
      wordLadder: { name: 'บันไดคำศัพท์', desc: 'เชื่อมคำโดยเปลี่ยนตัวอักษรทีละตัว' },
      rosco: { name: 'วงล้อคำศัพท์', desc: 'คำละตัวอักษร' }
    },
    footer: { games: 'เกม', company: 'บริษัท', legal: 'กฎหมาย', privacy: 'ความเป็นส่วนตัว', terms: 'เงื่อนไข', cookies: 'Cookies' }
  },
  da: {
    siteName: 'Klystora',
    tagline: 'Ordspil. Nye hver dag.',
    subtitle: 'Otte daglige ordspil på 27 sprog. Ingen registrering, ingen pop op-reklamer, ingen ventetid.',
    playNow: 'Spil Nu — Gratis',
    exploreGames: 'Se Alle Spil',
    nav: { games: 'Spil', blog: 'Blog', about: 'Om os', pricing: 'Priser' },
    games: {
      dailyWord: { name: 'Dagens Ord', desc: 'Gæt det 5-bogstavsord på 6 forsøg' },
      crossword: { name: 'Mini Krydsord', desc: 'Løs gitteret 5×5' },
      wordSearch: { name: 'Ordjagt', desc: 'Find skjulte ord' },
      anagrams: { name: 'Anagrammer', desc: 'Arrangér bogstaverne' },
      connections: { name: 'Forbindelser', desc: 'Gruppér ord efter tema' },
      spellingBee: { name: 'Stave-Bi', desc: 'Ord på 7 bogstaver' },
      wordLadder: { name: 'Ordstige', desc: 'Kæd ord sammen ved at skifte ét bogstav' },
      rosco: { name: 'Ordhjul', desc: 'Ét ord per bogstav' }
    },
    footer: { games: 'Spil', company: 'Virksomhed', legal: 'Juridisk', privacy: 'Privatliv', terms: 'Vilkår', cookies: 'Cookies' }
  },
  fi: {
    siteName: 'Klystora',
    tagline: 'Sanapelit. Uusia joka päivä.',
    subtitle: 'Kahdeksan päivittäistä sanapeliä 27 kielellä. Ei rekisteröitymistä, ei ponnahdusmainoksia, ei odotusta.',
    playNow: 'Pelaa Nyt — Ilmaiseksi',
    exploreGames: 'Näytä Kaikki Pelit',
    nav: { games: 'Pelit', blog: 'Blogi', about: 'Tietoja', pricing: 'Hinnat' },
    games: {
      dailyWord: { name: 'Päivän Sana', desc: 'Arvaa 5-kirjaiminen sana 6 yrityksessä' },
      crossword: { name: 'Mini Sanaristikko', desc: 'Ratkaise 5×5-ruudukko' },
      wordSearch: { name: 'Sanahaku', desc: 'Etsi piilotettuja sanoja' },
      anagrams: { name: 'Anagrammit', desc: 'Järjestä kirjaimet' },
      connections: { name: 'Yhteydet', desc: 'Ryhmittele sanat teeman mukaan' },
      spellingBee: { name: 'Oikeinkirjoitus-Mehiläinen', desc: 'Sanoja 7 kirjaimesta' },
      wordLadder: { name: 'Sanarappuset', desc: 'Yhdistä sanat vaihtamalla yksi kirjain' },
      rosco: { name: 'Sananpyörä', desc: 'Yksi sana per kirjain' }
    },
    footer: { games: 'Pelit', company: 'Yritys', legal: 'Laki', privacy: 'Tietosuoja', terms: 'Ehdot', cookies: 'Cookies' }
  },
  no: {
    siteName: 'Klystora',
    tagline: 'Ordspill. Nye hver dag.',
    subtitle: 'Åtte daglige ordspill på 27 språk. Ingen registrering, ingen popup-annonser, ingen ventetid.',
    playNow: 'Spill Nå — Gratis',
    exploreGames: 'Se Alle Spill',
    nav: { games: 'Spill', blog: 'Blogg', about: 'Om oss', pricing: 'Priser' },
    games: {
      dailyWord: { name: 'Dagens Ord', desc: 'Gjett det 5-bokstaversordet på 6 forsøk' },
      crossword: { name: 'Mini Kryssord', desc: 'Løs rutenettet 5×5' },
      wordSearch: { name: 'Ordjakt', desc: 'Finn skjulte ord' },
      anagrams: { name: 'Anagrammer', desc: 'Ordne bokstavene' },
      connections: { name: 'Koblinger', desc: 'Grupper ord etter tema' },
      spellingBee: { name: 'Stave-Bie', desc: 'Ord på 7 bokstaver' },
      wordLadder: { name: 'Ordstige', desc: 'Kjede ord ved å bytte én bokstav' },
      rosco: { name: 'Ordhjul', desc: 'Ett ord per bokstav' }
    },
    footer: { games: 'Spill', company: 'Selskap', legal: 'Juridisk', privacy: 'Personvern', terms: 'Vilkår', cookies: 'Cookies' }
  },
};
