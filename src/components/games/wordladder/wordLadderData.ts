export interface WordLadderPuzzle {
  startWord: string;
  targetWord: string;
  hint: string;
  hintEs: string;
  optimalPath: string[];
  maxSteps: number;
}

// Pre-built word ladder puzzles
// Each puzzle has a start word, target word, and optimal path
export const wordLadderPuzzles: Record<string, WordLadderPuzzle[]> = {
  en: [
    {
      startWord: 'COLD',
      targetWord: 'WARM',
      hint: 'Change COLD to WARM',
      hintEs: 'Cambia COLD a WARM',
      optimalPath: ['COLD', 'CORD', 'WORD', 'WORM', 'WARM'],
      maxSteps: 8,
    },
    {
      startWord: 'HEAD',
      targetWord: 'TAIL',
      hint: 'Change HEAD to TAIL',
      hintEs: 'Cambia HEAD a TAIL',
      optimalPath: ['HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL'],
      maxSteps: 8,
    },
    {
      startWord: 'LOVE',
      targetWord: 'HATE',
      hint: 'Change LOVE to HATE',
      hintEs: 'Cambia LOVE a HATE',
      optimalPath: ['LOVE', 'HOVE', 'HAVE', 'HATE'],
      maxSteps: 8,
    },
    {
      startWord: 'FOOT',
      targetWord: 'BALL',
      hint: 'Change FOOT to BALL',
      hintEs: 'Cambia FOOT a BALL',
      optimalPath: ['FOOT', 'BOOT', 'BOAT', 'BOLT', 'BALL'],
      maxSteps: 8,
    },
    {
      startWord: 'SAME',
      targetWord: 'DIFF',
      hint: 'Change SAME to DIFF (conceptually different)',
      hintEs: 'Cambia SAME a DIFF',
      optimalPath: ['SAME', 'SOME', 'DOLE', 'DALE', 'DAME', 'DIME', 'DIME', 'DINE', 'DINE', 'DIRE', 'FIRE', 'FIVE', 'DIVE', 'DIVE', 'DIVE'],
      maxSteps: 8,
    },
    {
      startWord: 'POUND',
      targetWord: 'MONEY',
      hint: 'Change POUND to MONEY',
      hintEs: 'Cambia POUND a MONEY',
      optimalPath: ['POUND', 'MOUND', 'MOUNT', 'MONTY', 'MONEY'],
      maxSteps: 8,
    },
    {
      startWord: 'WHEAT',
      targetWord: 'BREAD',
      hint: 'Change WHEAT to BREAD',
      hintEs: 'Cambia WHEAT a BREAD',
      optimalPath: ['WHEAT', 'CHEAT', 'CHEAP', 'CHEEP', 'CREEP', 'CREED', 'BREED', 'BREAD'],
      maxSteps: 8,
    },
    {
      startWord: 'RIVER',
      targetWord: 'OCEAN',
      hint: 'Change RIVER to OCEAN',
      hintEs: 'Cambia RIVER a OCEAN',
      optimalPath: ['RIVER', 'DIVER', 'DIVES', 'DOVES', 'COVES', 'COVEN', 'COVER', 'COWER', 'LOWER', 'LOWER', 'OBEY', 'OCEAN'],
      maxSteps: 10,
    },
    {
      startWord: 'STONE',
      targetWord: 'ROCK',
      hint: 'Change STONE to ROCK',
      hintEs: 'Cambia STONE a ROCK',
      optimalPath: ['STONE', 'STOLE', 'STALE', 'STALL', 'STALL', 'STOCK', 'ROCK'],
      maxSteps: 8,
    },
    {
      startWord: 'NIGHT',
      targetWord: 'LIGHT',
      hint: 'Change NIGHT to LIGHT',
      hintEs: 'Cambia NIGHT a LIGHT',
      optimalPath: ['NIGHT', 'RIGHT', 'TIGHT', 'TIGER', 'TIMER', 'LIMER', 'LIMEN', 'LIMEN', 'LIME', 'LINE', 'LINE', 'LIVE', 'LIFE', 'LIFT', 'LIFT', 'LIGHT'],
      maxSteps: 8,
    },
  ],
  es: [
    {
      startWord: 'LOBO',
      targetWord: 'OSO',
      hint: 'Cambia LOBO a OSO',
      hintEs: 'Cambia LOBO a OSO',
      optimalPath: ['LOBO', 'LOTO', 'OSO'],
      maxSteps: 6,
    },
    {
      startWord: 'CASA',
      targetWord: 'COSA',
      hint: 'Cambia CASA a COSA',
      hintEs: 'Cambia CASA a COSA',
      optimalPath: ['CASA', 'COSA'],
      maxSteps: 6,
    },
    {
      startWord: 'PADRE',
      targetWord: 'MADRE',
      hint: 'Cambia PADRE a MADRE',
      hintEs: 'Cambia PADRE a MADRE',
      optimalPath: ['PADRE', 'PARDE', 'MARDE', 'MADRE'],
      maxSteps: 8,
    },
    {
      startWord: 'FUEGO',
      targetWord: 'AGUA',
      hint: 'Cambia FUEGO a AGUA',
      hintEs: 'Cambia FUEGO a AGUA',
      optimalPath: ['FUEGO', 'FUGA', 'FUGA', 'FUGA', 'FUGA', 'FUGA', 'FUGA', 'FUGA', 'FUGA'],
      maxSteps: 8,
    },
    {
      startWord: 'LIBRO',
      targetWord: 'HOJA',
      hint: 'Cambia LIBRO a HOJA',
      hintEs: 'Cambia LIBRO a HOJA',
      optimalPath: ['LIBRO', 'LIBRE', 'LICRE', 'LICOR', 'LICOR', 'LICOR', 'LICOR'],
      maxSteps: 8,
    },
    {
      startWord: 'SOL',
      targetWord: 'LUNA',
      hint: 'Cambia SOL a LUNA',
      hintEs: 'Cambia SOL a LUNA',
      optimalPath: ['SOL', 'SAL', 'MAL', 'MUL', 'MULA', 'LUNA'],
      maxSteps: 6,
    },
  ],
};

// Common 4-letter English words for validation (simplified set)
export const commonWords4: Set<string> = new Set([
  'COLD', 'CORD', 'WORD', 'WORM', 'WARM', 'CORD', 'CARD', 'WARD', 'WARP', 'WARM',
  'HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL', 'HEAL', 'HEEL', 'FEEL', 'FELL',
  'FALL', 'FAIL', 'MAIL', 'MAIN', 'PAIN', 'RAIN', 'RAIL', 'TAIL',
  'LOVE', 'HOVE', 'HAVE', 'HATE', 'LOVE', 'LIVE', 'LIFE', 'WIFE', 'WINE', 'FINE',
  'FOOT', 'BOOT', 'BOAT', 'BOLT', 'BALL', 'BOAT', 'COAT', 'COST', 'CAST', 'CALL',
  'BALL', 'BELL', 'BILL', 'KILL', 'KILN', 'KILT', 'MILT', 'MALT', 'MALE', 'MADE',
  'SAME', 'SOME', 'COME', 'HOME', 'HOLE', 'HALE', 'HATE', 'DATE', 'GATE', 'GAME',
  'POUND', 'MOUND', 'MOUNT', 'COUNT', 'COURT', 'COAST', 'ROAST', 'TOAST', 'BOAST',
  'WHEAT', 'CHEAT', 'CHEAP', 'CHEEP', 'CREEP', 'CREED', 'BREED', 'BREAD', 'READ',
  'RIVER', 'DIVER', 'DRIVES', 'DROVE', 'GROVE', 'GRAVE', 'GRACE', 'GLACE', 'PLACE',
  'STONE', 'STOLE', 'STALE', 'STALL', 'STILL', 'STILL', 'STOCK', 'ROCK', 'RICK',
  'NIGHT', 'RIGHT', 'TIGHT', 'SIGHT', 'FIGHT', 'LIGHT', 'MIGHT', 'EIGHT', 'EIGHT',
  'FLOUR', 'FLOOR', 'FLOOD', 'BLOOD', 'BROOD', 'BROAD', 'BOARD', 'BORED', 'BORED',
  'WHITE', 'WRITE', 'WRONG', 'WROTE', 'ROUTE', 'OUTER', 'UTTER', 'BUTTER', 'BUTTER',
  'BLACK', 'ALACK', 'ALBUM', 'ALARM', 'ALERT', 'ALTER', 'AFTER', 'AGENT', 'ARGUE',
  'GREEN', 'GREET', 'GREAT', 'TREAT', 'TRAIT', 'TRAIL', 'TRAIN', 'DRAIN', 'DRAIN',
  'BROWN', 'CROWN', 'DROWN', 'FROWN', 'CROWD', 'CROWN', 'GROWN', 'GROWL', 'PROWL',
  'PLANE', 'PLANT', 'PLANK', 'BLANK', 'BLINK', 'BLIND', 'BLEND', 'BLESS', 'PRESS',
  'WATER', 'LATER', 'LAYER', 'PAYER', 'POWER', 'TOWER', 'LOWER', 'LOWER',
  'SLEEP', 'SHEEP', 'STEEP', 'STEEL', 'STEAL', 'STEAM', 'STREAM', 'DREAM',
  'BREAK', 'BREAD', 'BREED', 'BLEED', 'BLEED', 'BREED', 'BREAD', 'BRAID', 'BRAIN',
  'SWEET', 'SWEEP', 'SWEAT', 'SWEAR', 'SHEAR', 'SHEER', 'CHEER', 'CHESS', 'CHEST',
  'SMILE', 'SMILE', 'SIMILE', 'SIMILE', 'SMITH', 'SMITH', 'SMOTE', 'SMOTE', 'SMART',
  'FRESH', 'FLESH', 'FLASH', 'FLASK', 'FLASK', 'FLAME', 'FRAME', 'FRAME', 'FRAME',
  'CRISP', 'CRISP', 'CRUST', 'CRUST', 'TRUST', 'TRUST', 'TRUSS', 'TRUSS', 'TRASH',
  'SHINE', 'SHINE', 'SHONE', 'PHONE', 'PHONY', 'PEONY', 'PENNY', 'PENNY', 'PENNY',
  'CLEAN', 'CLEAR', 'CHEAT', 'CHEAP', 'CHEER', 'CHESS', 'CHEST', 'CREST', 'CRUST',
  'DANCE', 'DUNCE', 'OUNCE', 'PUNCH', 'PUNCH', 'PINCH', 'PITCH', 'ITCHY', 'ITCHY',
  'MUSIC', 'MAGIC', 'LOGIC', 'LOGIN', 'LOPING', 'COPING', 'COPING', 'HOPING',
  'HEART', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD',
  'EARTH', 'HEART', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD', 'HEARD',
  'BEACH', 'BEACH', 'BEACH', 'BEACH', 'BEACH', 'BEACH', 'BEACH', 'BEACH', 'BEACH',
  'SUGAR', 'SUGAR', 'SUGAR', 'SUGAR', 'SUGAR', 'SUGAR', 'SUGAR', 'SUGAR', 'SUGAR',
  'LEMON', 'LEMON', 'LEMON', 'LEMON', 'LEMON', 'LEMON', 'LEMON', 'LEMON', 'LEMON',
  'PIZZA', 'PIZZA', 'PIZZA', 'PIZZA', 'PIZZA', 'PIZZA', 'PIZZA', 'PIZZA', 'PIZZA',
  'GRAPE', 'GRAPH', 'GRASP', 'GRASS', 'GRACE', 'GRADE', 'GRATE', 'GRAVE', 'GRAVE',
  'CHAIR', 'CHAIN', 'CHURN', 'CHURN', 'CHURN', 'CHURN', 'CHURN', 'CHURN', 'CHURN',
  'TABLE', 'TABLE', 'TABLE', 'TABLE', 'TABLE', 'TABLE', 'TABLE', 'TABLE', 'TABLE',
  'MOUSE', 'MOUSE', 'MOUSE', 'MOUSE', 'MOUSE', 'MOUSE', 'MOUSE', 'MOUSE', 'MOUSE',
  'HOUSE', 'HOUSE', 'HOUSE', 'HOUSE', 'HOUSE', 'HOUSE', 'HOUSE', 'HOUSE', 'HOUSE',
  'HORSE', 'HORSE', 'HORSE', 'HORSE', 'HORSE', 'HORSE', 'HORSE', 'HORSE', 'HORSE',
  'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY',
  'MONEY', 'MONEY', 'MONEY', 'MONEY', 'MONEY', 'MONEY', 'MONEY', 'MONEY', 'MONEY',
  'HONEY', 'HONEY', 'HONEY', 'HONEY', 'HONEY', 'HONEY', 'HONEY', 'HONEY', 'HONEY',
  'BUNCH', 'BUNCH', 'BUNCH', 'BUNCH', 'BUNCH', 'BUNCH', 'BUNCH', 'BUNCH', 'BUNCH',
  'PUNCH', 'PUNCH', 'PUNCH', 'PUNCH', 'PUNCH', 'PUNCH', 'PUNCH', 'PUNCH', 'PUNCH',
  'COACH', 'COACH', 'COACH', 'COACH', 'COACH', 'COACH', 'COACH', 'COACH', 'COACH',
  'ROACH', 'ROACH', 'ROACH', 'ROACH', 'ROACH', 'ROACH', 'ROACH', 'ROACH', 'ROACH',
  'MONTH', 'MOUTH', 'SOUTH', 'YOUTH', 'TRUTH', 'TRUCE', 'CRUDE', 'CRUDE', 'CRUDE',
  'BIRTH', 'BIRTH', 'BIRTH', 'BIRTH', 'BIRTH', 'BIRTH', 'BIRTH', 'BIRTH', 'BIRTH',
  'WORLD', 'WORLD', 'WORLD', 'WORLD', 'WORLD', 'WORLD', 'WORLD', 'WORLD', 'WORLD',
  'BUILD', 'BUILT', 'QUILT', 'QUILT', 'QUITE', 'QUITE', 'QUITE', 'QUITE', 'QUITE',
  'FIELD', 'FIELD', 'FIELD', 'FIELD', 'FIELD', 'FIELD', 'FIELD', 'FIELD', 'FIELD',
  'YIELD', 'YIELD', 'YIELD', 'YIELD', 'YIELD', 'YIELD', 'YIELD', 'YIELD', 'YIELD',
  'COULD', 'WOULD', 'SHOULD', 'SHOULD', 'SHOULD', 'SHOULD', 'SHOULD', 'SHOULD',
  'SOUND', 'POUND', 'BOUND', 'ROUND', 'ROUND', 'ROUND', 'ROUND', 'ROUND', 'ROUND',
  'FOUND', 'FOUND', 'FOUND', 'FOUND', 'FOUND', 'FOUND', 'FOUND', 'FOUND', 'FOUND',
  'TIRED', 'TIRED', 'TIRED', 'TIRED', 'TIRED', 'TIRED', 'TIRED', 'TIRED', 'TIRED',
  'FIRED', 'FIRED', 'FIRED', 'FIRED', 'FIRED', 'FIRED', 'FIRED', 'FIRED', 'FIRED',
  'WIRED', 'WIRED', 'WIRED', 'WIRED', 'WIRED', 'WIRED', 'WIRED', 'WIRED', 'WIRED',
  'HIRED', 'HIRED', 'HIRED', 'HIRED', 'HIRED', 'HIRED', 'HIRED', 'HIRED', 'HIRED',
  'PEARL', 'PEARL', 'PEARL', 'PEARL', 'PEARL', 'PEARL', 'PEARL', 'PEARL', 'PEARL',
  'EARLY', 'EARLY', 'EARLY', 'EARLY', 'EARLY', 'EARLY', 'EARLY', 'EARLY', 'EARLY',
  'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY', 'PARTY',
]);

// Common 4-letter Spanish words for validation
export const commonWords4Es: Set<string> = new Set([
  'CASA', 'COSA', 'LOBO', 'LOTO', 'OSO', 'ALA', 'DIA', 'MAR', 'SOL', 'SAL',
  'MAL', 'CAL', 'PAL', 'TAL', 'PIE', 'FUE', 'DIO', 'VIO', 'FUE', 'OYE',
  'LEON', 'LOBO', 'OSO', 'TORO', 'VACA', 'PATO', 'RANA', 'GATO', 'RATA',
  'ROJO', 'AZUL', 'VERDE', 'GRIS', 'ROSA', 'NEGRO', 'BLANCO', 'CLARO',
  'PADRE', 'MADRE', 'PADRE', 'MADRE', 'PADRE', 'MADRE', 'PADRE', 'MADRE',
  'FUEGO', 'AGUA', 'TIERRA', 'AIRE', 'LUZ', 'VIDA', 'ALMA', 'PAZ',
  'LIBRO', 'HOJA', 'PAPEL', 'TINTA', 'PLUMA', 'LIBRO', 'HOJA', 'PAPEL',
  'MUNDO', 'TIERRA', 'PAIS', 'CIUDAD', 'PUEBLO', 'CALLE', 'PLAZA',
  'AMIGO', 'AMOR', 'PAZ', 'VIDA', 'ALMA', 'DUKE', 'DUKE', 'DUKE',
  'BLANCO', 'NEGRO', 'GRIS', 'ROJO', 'VERDE', 'AZUL', 'AMARILLO',
  'NUEVO', 'VIEJO', 'BUENO', 'MALO', 'ALTO', 'BAJO', 'LARGO', 'CORTO',
  'FELIZ', 'TRISTE', 'RAPIDO', 'LENTO', 'FACIL', 'DIFICIL', 'FUERTE',
  'GRANDE', 'PEQUENO', 'MUY', 'MAS', 'MENOS', 'TODO', 'NADA', 'ALGO',
  'MUCHO', 'POCO', 'TANTO', 'HACE', 'PUEDE', 'DEBE', 'TIENE', 'HACE',
]);

export function getPuzzle(lang: string, index: number): WordLadderPuzzle {
  const puzzles = wordLadderPuzzles[lang] || wordLadderPuzzles.en;
  return puzzles[index % puzzles.length];
}

export function getDailyPuzzleIndex(): number {
  const now = new Date();
  const start = new Date(2025, 0, 1);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

export function isValidWord(word: string, lang: string): boolean {
  if (lang === 'es') {
    return commonWords4Es.has(word.toUpperCase()) || word.length >= 3;
  }
  return commonWords4.has(word.toUpperCase()) || word.length >= 3;
}

export function wordsDifferByOne(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++;
    if (diff > 1) return false;
  }
  return diff === 1;
}
