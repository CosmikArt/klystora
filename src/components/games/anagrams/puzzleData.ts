// Anagrams puzzle data
export interface AnagramsPuzzle {
  letters: string[];
  targetWords: string[];
  pangrams?: string[];
}

// Valid English words from 7-letter sets
const PUZZLES_EN: AnagramsPuzzle[] = [
  {
    letters: ['T', 'A', 'B', 'L', 'E', 'R', 'S'],
    targetWords: [
      'ABLE', 'BARE', 'BASE', 'BATE', 'BATS', 'BEAR', 'BEAT', 'BELT', 'BEST', 'BETA',
      'BLAST', 'BLEAT', 'BRAT', 'EARL', 'EAST', 'EATS', 'LATE', 'LEAR', 'LEST', 'RATE',
      'REAL', 'REST', 'SALE', 'SALT', 'SLATE', 'STALE', 'STARE', 'STAR', 'STEAL', 'TABLE',
      'TALE', 'TEAR', 'TEAS', 'TALE', 'RATES', 'LASER', 'BLARE', 'REBEL', 'BALES', 'ALERT',
      'ALTER', 'ARTS', 'BAR', 'BAT', 'BET', 'EAR', 'EAT', 'ERA', 'LAB', 'LET',
      'RAT', 'SAT', 'SEA', 'SET', 'TAB', 'TAR', 'TEA', 'TEN',
      'TABLES', 'STABLE', 'BATTLE', 'BLASTER', 'REBATES',
    ],
    pangrams: ['STABLE', 'TABLES'],
  },
  {
    letters: ['S', 'T', 'A', 'R', 'E', 'N', 'D'],
    targetWords: [
      'AND', 'ANT', 'ARE', 'ART', 'ATE', 'DEN', 'EAT', 'END', 'NET', 'RAN',
      'RAT', 'RED', 'SAD', 'SAT', 'SEA', 'SEN', 'SET', 'TAN', 'TAR', 'TEA',
      'TEN', 'DARE', 'DARN', 'DART', 'DATE', 'DEAN', 'DEAR', 'DENS', 'DENT', 'EARN',
      'EARS', 'EAST', 'EATS', 'ENDS', 'NEAR', 'NEST', 'NETS', 'RANT', 'RATE', 'READ',
      'RENT', 'REST', 'SAND', 'SANE', 'SANT', 'SEND', 'SENT', 'STAR', 'TARS', 'TEAR',
      'TEAS', 'TEND', 'TENS', 'TERN', 'TRADE', 'TREAD', 'DANES', 'DARNS', 'DARTS', 'DATES',
      'DEANS', 'DENTS', 'EARNS', 'RANTS', 'RATED', 'RATES', 'READS', 'RENTS', 'SNARE', 'STARE',
      'STAND', 'TREAD', 'TREND', 'STARED', 'STRAND', 'STARRED', 'TRADES',
    ],
    pangrams: ['STRAND', 'STARRED'],
  },
  {
    letters: ['C', 'R', 'E', 'A', 'T', 'I', 'V'],
    targetWords: [
      'ACT', 'AIR', 'ARE', 'ART', 'ATE', 'CAR', 'CAT', 'EAR', 'EAT', 'ERA',
      'ICE', 'RAT', 'TAR', 'TEA', 'TIE', 'VIA', 'VIE', 'CARE', 'CART', 'CAVE',
      'CITE', 'RACE', 'RATE', 'RAVE', 'RICE', 'RISE', 'RITE', 'SAVE', 'STAR', 'STIR',
      'TACE', 'TAKE', 'TEAR', 'TIER', 'TIRE', 'TRACE', 'TRICE', 'TRIVE', 'VICE', 'VIEW',
      'ACRE', 'CERT', 'CRATE', 'CRAVE', 'CURVE', 'EVICT', 'REACT', 'TRACE', 'TRICE',
      'ACTIVE', 'CATIVE', 'CREATIVE', 'REACTIVE', 'VERITAC',
    ],
    pangrams: ['CREATIVE', 'REACTIVE'],
  },
  {
    letters: ['M', 'O', 'U', 'N', 'T', 'A', 'I'],
    targetWords: [
      'AIM', 'ANT', 'MAN', 'MAT', 'NOT', 'NUT', 'OUT', 'TAN', 'TON', 'TIN',
      'UNIT', 'AINT', 'INTO', 'MAIN', 'MANO', 'MINT', 'MOAN', 'MOAT', 'MUTA', 'NAUT',
      'OMIT', 'TAIN', 'UNTO', 'AMOUNT', 'OUTMAN', 'NATION', 'MOUNT', 'AMINO',
      'MOUNTAIN', 'NOTATION', 'UNION',
    ],
    pangrams: ['MOUNTAIN'],
  },
];

// Valid Spanish words from 7-letter sets
const PUZZLES_ES: AnagramsPuzzle[] = [
  {
    letters: ['T', 'A', 'B', 'L', 'E', 'R', 'O'],
    targetWords: [
      'ALO', 'BAR', 'BEL', 'BOA', 'LAO', 'LOA', 'OLA', 'ORO', 'ROB', 'TEO',
      'ABETO', 'ABORTE', 'ALERO', 'BALOR', 'BATEL', 'BLATER', 'BOLETE', 'BOTAR', 'BROTA', 'LABLE',
      'LABOR', 'LIBRA', 'LOBAR', 'OBLEA', 'ORLAR', 'RATO', 'REALO', 'RETAL', 'ROBLE', 'ROTAR',
      'TALER', 'TALON', 'TARO', 'TELAR', 'TOLAR', 'TORAL', 'TROLA', 'TABOLE', 'TABOR',
      'TABLEO', 'BOTARE', 'LOBARE', 'TABLERO', 'ROBALO', 'LABORE', 'RETALO',
    ],
    pangrams: ['TABLERO'],
  },
  {
    letters: ['C', 'O', 'R', 'A', 'Z', 'O', 'N'],
    targetWords: [
      'CON', 'COR', 'COZ', 'CRO', 'NOR', 'ONA', 'ORA', 'ROC', 'RON', 'ZAR',
      'ARCO', 'AZOR', 'CORO', 'COZA', 'CRAN', 'NOZA', 'ORCA', 'ORNO', 'RANO', 'RAZO',
      'ROCA', 'ROZA', 'ZONA', 'ZANC', 'CORAZON', 'CORONA', 'CROAZON', 'ZONAR',
      'ACORNO', 'ARCOZON', 'CORANZO',
    ],
    pangrams: ['CORAZON'],
  },
  {
    letters: ['M', 'A', 'R', 'I', 'P', 'O', 'S'],
    targetWords: [
      'MAR', 'MAS', 'MIO', 'MIR', 'MIS', 'MOA', 'MOS', 'OAR', 'OAS', 'PAS',
      'PIA', 'RAS', 'RIA', 'RIO', 'ROA', 'ROM', 'SAR', 'SIM', 'SOP', 'AIR',
      'AMOS', 'AMPO', 'APIS', 'AROS', 'ASIR', 'IMPO', 'MAIS', 'MAOS', 'MARI', 'MIRA',
      'MISO', 'MOAS', 'MORA', 'OPAS', 'ORAR', 'OSAR', 'PARA', 'PASE', 'PISA', 'POSA',
      'PRAS', 'PRIO', 'PROA', 'RAMO', 'RAPO', 'RASO', 'RIMA', 'ROAS', 'ROMA', 'ROSA',
      'SAMO', 'SIMA', 'SODA', 'SOMA', 'SORA', 'AMPIO', 'AROMA', 'MARIP', 'MOPAS', 'MORAS',
      'PARIS', 'PARMO', 'PASMO', 'PRIMA', 'PRIMO', 'PROAS', 'RAMOS', 'RASPO', 'RIMAS',
      'MARIPOS', 'MARIPOSA', 'MOPASI', 'PRIAMO', 'RAPIOSA', 'MARISCO',
    ],
    pangrams: ['MARIPOSA'],
  },
];

export function getPuzzle(seed: number, lang: 'en' | 'es'): AnagramsPuzzle {
  const puzzles = lang === 'es' ? PUZZLES_ES : PUZZLES_EN;
  const idx = seed % puzzles.length;
  return puzzles[idx] || puzzles[0];
}

export function isValidWord(word: string, puzzle: AnagramsPuzzle): boolean {
  return puzzle.targetWords.includes(word.toUpperCase());
}

export function canFormWord(word: string, letters: string[]): boolean {
  const available = [...letters];
  const w = word.toUpperCase();
  for (const ch of w) {
    const idx = available.indexOf(ch);
    if (idx === -1) return false;
    available.splice(idx, 1);
  }
  return true;
}

export function getWordScore(word: string): number {
  const len = word.length;
  if (len <= 2) return 0;
  if (len === 3) return 1;
  if (len === 4) return 2;
  if (len === 5) return 4;
  if (len === 6) return 8;
  return 12; // 7+
}

export function shuffleLetters(letters: string[]): string[] {
  const shuffled = [...letters];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
