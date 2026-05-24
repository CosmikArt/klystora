export interface SpellingBeePuzzle {
  centerLetter: string;
  outerLetters: string[];
  validWords: string[];
  pangrams: string[];
}

// Pre-built puzzles - 7 letters (1 center + 6 outer)
export const spellingBeePuzzles: Record<string, SpellingBeePuzzle[]> = {
  en: [
    {
      centerLetter: 'A',
      outerLetters: ['L', 'G', 'E', 'M', 'N', 'T'],
      validWords: [
        'AGATE', 'AGENT', 'AGILE', 'ALGAE', 'ALLEGE', 'ALLEY', 'ALLERGY', 'ALLOT', 'ALLOY', 'ALLY',
        'ANAL', 'ANALOG', 'ANGEL', 'ANGLE', 'ANALYST', 'ANTENNA', 'ATLAS', 'ATOLL',
        'EAGLE', 'GALA', 'GALE', 'GALL', 'GALLEY', 'GALLON', 'GALLOP', 'GAME', 'GAMMA', 'GANGET',
        'GATE', 'GENT', 'GENTLE', 'GENTLY', 'GENTRY', 'GLEN', 'LAGOON', 'LAMENT', 'LAME', 'LANE',
        'LEGAL', 'LEGALLY', 'LEGEND', 'LENGTH', 'LENGTHY', 'LENT', 'LETTY', 'MAGAZINE', 'MAGE',
        'MAGNET', 'MAGNETO', 'MALE', 'MALL', 'MALLEY', 'MALT', 'MANGE', 'MANGLE', 'MANAGE',
        'MANAGEMENT', 'MANGE', 'MANGO', 'MANLY', 'MANY', 'MATT', 'MEAL', 'MEAN', 'MEANT',
        'MEAT', 'MEATY', 'MEGA', 'MELANGE', 'MELON', 'MENTAL', 'MENTALLY', 'METAL', 'METALLIC',
        'NATAL', 'NAVEL', 'NEAT', 'NEATLY', 'NEGATE', 'NETTLE', 'TALE', 'TALENT', 'TALON',
        'TAME', 'TAMEly', 'TANG', 'TANGLE', 'TANK', 'TATTLE', 'TEAM', 'TEAT', 'TELL', 'TELLTALE',
        'TENANT', 'TENT', 'TENTH', 'TENANT', 'THAN', 'THANE', 'THAT', 'THEM', 'THEN', 'THYME',
        'TOKEN', 'TOME', 'TONGA', 'TOTAL', 'TOTALLY', 'TOTEM', 'ALLEGE', 'ANALYST', 'GALLEY',
        'GALLON', 'GALLOP', 'GENTLY', 'GENTRY', 'LAMENT', 'LEGEND', 'LENGTHY', 'MAGNET',
        'MAGNETO', 'MANAGE', 'MELANGE', 'MENTAL', 'METALLIC', 'NEGATE', 'NETTLE', 'TALENT',
        'TANGLE', 'TELLTALE', 'TENANT', 'TOTALLY', 'ALLERGY', 'ANALOG', 'GENTLY', 'LAMENT',
        'LENGTHY', 'MAGNET', 'MANAGE', 'MELANGE', 'MENTAL', 'NEGATE', 'TALENT', 'TOTALLY',
      ],
      pangrams: ['MAGNETO', 'MEGATON', 'NETTLE'],
    },
    {
      centerLetter: 'R',
      outerLetters: ['A', 'I', 'N', 'T', 'E', 'D'],
      validWords: [
        'AIRE', 'AIRER', 'ARIA', 'ARID', 'ARRAIGN', 'ARREAR', 'ATTAIN', 'ATTAINER', 'ATTIRE',
        'DARE', 'DARER', 'DARN', 'DART', 'DARTER', 'DEAR', 'DEER', 'DENARI', 'DERIDE',
        'DINAR', 'DINE', 'DINER', 'DIRE', 'DIRER', 'DIRT', 'DRAIN', 'DRAINER', 'DRAT',
        'DREAD', 'DREAR', 'DRENCH', 'DRIDE', 'DRIFT', 'DRILL', 'DRINK', 'DRIP', 'DRIVE',
        'EARN', 'EARNER', 'EARTH', 'EIDER', 'ERRAND', 'ERRANT', 'ERRATA', 'INERT', 'INFER',
        'INNER', 'INTER', 'INTERN', 'INTERRAID', 'IRATE', 'IRON', 'NADIR', 'NAIRU', 'NEAR',
        'NEATER', 'NERD', 'NINETEEN', 'NITER', 'RAIN', 'RAINER', 'RAISE', 'RAISIN', 'RAND',
        'RANI', 'RANT', 'RANTER', 'RARE', 'RARED', 'RARER', 'RATE', 'RATER', 'RATINE',
        'READ', 'READER', 'REAR', 'REATA', 'REDIA', 'REIN', 'RENT', 'RENTER', 'RERAN',
        'RERUN', 'RESIDE', 'RESIN', 'RETAIN', 'RETAINER', 'RETINA', 'RETINAE', 'RETREAD',
        'RETRAIN', 'RETREAD', 'RIANT', 'RIDE', 'RIDER', 'RIND', 'RING', 'RIOT', 'RISE',
        'RITE', 'ROAD', 'ROAN', 'ROAR', 'ROTE', 'TARE', 'TARRE', 'TARRIER', 'TEAR',
        'TEARIER', 'TERRA', 'TERRAIN', 'TERRANE', 'TERRIER', 'TERROR', 'TIDIER', 'TIER',
        'TIRE', 'TRADE', 'TRADER', 'TRAIN', 'TRAINER', 'TRAIT', 'TREAD', 'TREND', 'TRIED',
        'TRIREME',
      ],
      pangrams: ['RETAINER', 'TERRAIN', 'TRAINER'],
    },
    {
      centerLetter: 'E',
      outerLetters: ['P', 'L', 'A', 'S', 'T', 'I'],
      validWords: [
        'APPLE', 'APPLIES', 'APPLY', 'ASPIRE', 'ISLE', 'ISLET', 'LAPIS', 'LISP', 'LIST',
        'LISTEN', 'LITRE', 'PALE', 'PALEST', 'PASTE', 'PASTEL', 'PASTIE', 'PASTIES', 'PASTIL',
        'PASTILLE', 'PEAT', 'PELT', 'PEST', 'PESTLE', 'PETAL', 'PIECE', 'PILE', 'PILL',
        'PILLAR', 'PISTIL', 'PISTLE', 'PLAIT', 'PLAN', 'PLANE', 'PLANET', 'PLANT', 'PLATE',
        'PLATTE', 'PLEA', 'PLEAD', 'PLEAS', 'PLEASE', 'PLEAT', 'PLIE', 'PLIES', 'PLIST',
        'SALE', 'SALT', 'SALTPET', 'SALVE', 'SEAL', 'SEAT', 'SELL', 'SEPAL', 'SEPIA',
        'SETA', 'SETT', 'SILENT', 'SIPPET', 'SLEEP', 'SLEET', 'SLIP', 'SLIT', 'SPAETZLE',
        'SPAT', 'SPELL', 'SPELT', 'SPILITE', 'SPILL', 'SPILT', 'SPIT', 'SPITE', 'SPLAT',
        'SPLINT', 'SPLIT', 'STALE', 'STALEST', 'STAPLE', 'STEEL', 'STEEple', 'STELE',
        'STEP', 'STILE', 'STILL', 'STILT', 'STIPE', 'STIPPLE', 'STLE', 'TALE', 'TALI',
        'TAPES', 'TASTE', 'TEAL', 'TEAT', 'TELL', 'TELLS', 'TEMPLE', 'TESLA', 'TILE',
        'TILL', 'TILT', 'TIPLE', 'TITLE', 'TSPILE', 'APPLE', 'APPLIES', 'ASPIRE',
        'ISLET', 'PASTEL', 'PASTILLE', 'PESTLE', 'PETAL', 'PISTIL', 'PLANET', 'PLEASE',
        'PLEAT', 'SALTPET', 'SEPAL', 'SILENT', 'SIPPET', 'SPLINT', 'STAPLE', 'STIPPLE',
        'TEMPLE', 'TESLA',
      ],
      pangrams: ['PASTILLE', 'PLANET', 'SPLINT'],
    },
  ],
  es: [
    {
      centerLetter: 'A',
      outerLetters: ['L', 'R', 'T', 'S', 'N', 'E'],
      validWords: [
        'ALERTA', 'ALERTAR', 'ALMA', 'ALTA', 'ALTAR', 'ALTERAR', 'ANULAR', 'AREA', 'ARENA',
        'ARRESTAR', 'ARTE', 'ASEAR', 'ASESAR', 'ASNA', 'ASTA', 'ASTAR', 'ATAR', 'ATLAS',
        'ATLAS', 'ECHAR', 'ELLA', 'ESTA', 'ESTAR', 'ESTRADA', 'LANA', 'LANAR', 'LATA',
        'LATERAL', 'LEAL', 'LENA', 'LENTA', 'MALA', 'MALETA', 'MALLA', 'MANAR', 'MANTA',
        'MAR', 'MAREA', 'MARTE', 'MASA', 'MASLAR', 'MASTEAR', 'MASTAR', 'MATA', 'MATAR',
        'NALA', 'NATAL', 'NATAR', 'NEAR', 'PALA', 'PALETA', 'PANTALAN', 'PARTE', 'PARTEAR',
        'PASA', 'PASAR', 'PASTA', 'PASTAR', 'PATA', 'PATAN', 'RALA', 'RANA', 'RASAR',
        'RASPA', 'RASTA', 'RATA', 'RATAR', 'REAL', 'REATA', 'SALA', 'SALAR', 'SALSA',
        'SALTA', 'SALTAR', 'SANA', 'SANAR', 'SANTA', 'SARNA', 'SELLAR', 'SEMA', 'SENA',
        'SENTAR', 'TALA', 'TALAR', 'TALLA', 'TALLAR', 'TAREA', 'TASA', 'TASAR', 'TEMA',
        'TENAR', 'TRAMA', 'TRAMAR', 'TRAS', 'TASA', 'ALERTA', 'ALTAR', 'ARENA', 'ATLAS',
        'LATERAL', 'MALETA', 'MANTA', 'MAREA', 'PALETA', 'PARTE', 'SALTA', 'SANTA',
        'SELLAR', 'TALLA', 'TAREA', 'TRAMA',
      ],
      pangrams: ['ALTERAR', 'LATERAL', 'MARTE'],
    },
    {
      centerLetter: 'O',
      outerLetters: ['C', 'R', 'A', 'S', 'T', 'E'],
      validWords: [
        'ACOSTAR', 'ACOSO', 'ACRE', 'ACTOR', 'ACTORAL', 'ACTOS', 'ACORO', 'AERO', 'ARCO',
        'ARENA', 'AROMA', 'AROS', 'ASARO', 'ASTERO', 'ATAR', 'CATORCE', 'CERO', 'CEROS',
        'COCOA', 'COCOS', 'COCOA', 'COSTA', 'COSTAR', 'COSTO', 'COSTRA', 'COSTURA',
        'CREAR', 'CRESTA', 'CROAR', 'CROSTA', 'ESCARO', 'ESCARAR', 'ESCORA', 'ESCORAR',
        'ESCOSO', 'ESTAR', 'ESTO', 'ESTOS', 'ETOS', 'OCASO', 'OCASOS', 'OCRE', 'ORAR',
        'ORCA', 'ORCAS', 'OREAR', 'ORO', 'OSAR', 'OSCAR', 'OSTRA', 'OTAR', 'OTRA',
        'RASO', 'RASOS', 'RATO', 'RATOS', 'RECTO', 'RESTAR', 'RESTO', 'RETAR', 'RETO',
        'ROCA', 'ROCAS', 'ROCE', 'ROSA', 'ROSAL', 'ROSCA', 'ROSTRO', 'ROTAR', 'SACO',
        'SALTO', 'SALTO', 'SANO', 'SANTO', 'SARO', 'SATO', 'SECO', 'SOAR', 'SOBRA',
        'SOCORRO', 'SORA', 'SORTEAR', 'SOSTEN', 'STAR', 'TACO', 'TARO', 'TARRO', 'TECHO',
        'TEMOR', 'TESO', 'TESORO', 'TOSO', 'TOSTAR', 'TORTA', 'TOS', 'TOSER', 'TOSTAR',
        'TRASTO', 'TROCAR', 'TROZAR', 'COSTA', 'COSTAR', 'COSTRA', 'CRESTA', 'CROSTA',
        'ESCORAR', 'OCASO', 'ORO', 'OSTRA', 'RESTAR', 'ROSCA', 'ROSTRO', 'SOCORRO',
        'SORTEAR', 'TESORO', 'TOSTAR', 'TORTA', 'TRASTO',
      ],
      pangrams: ['ACTORAL', 'ESCORAR', 'SORTEAR'],
    },
  ],
};

export function getPuzzle(lang: string, index: number): SpellingBeePuzzle {
  const puzzles = spellingBeePuzzles[lang] || spellingBeePuzzles.en;
  return puzzles[index % puzzles.length];
}

export function getDailyPuzzleIndex(): number {
  const now = new Date();
  const start = new Date(2025, 0, 1);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}

// Scoring for spelling bee
export function getWordScore(word: string, isPangram: boolean): number {
  if (word.length <= 4) return 1;
  const base = word.length;
  return isPangram ? base + 7 : base;
}

export function getRank(score: number, maxScore: number): string {
  const pct = score / maxScore;
  if (pct >= 0.7) return 'Genius';
  if (pct >= 0.5) return 'Amazing';
  if (pct >= 0.3) return 'Great';
  if (pct >= 0.15) return 'Good';
  return 'Beginner';
}

export function getRankEs(score: number, maxScore: number): string {
  const pct = score / maxScore;
  if (pct >= 0.7) return 'Genio';
  if (pct >= 0.5) return 'Asombroso';
  if (pct >= 0.3) return 'Excelente';
  if (pct >= 0.15) return 'Bueno';
  return 'Principiante';
}

export function getRankThresholds(maxScore: number): { rank: string; rankEs: string; threshold: number }[] {
  return [
    { rank: 'Beginner', rankEs: 'Principiante', threshold: 0 },
    { rank: 'Good', rankEs: 'Bueno', threshold: Math.floor(maxScore * 0.15) },
    { rank: 'Great', rankEs: 'Excelente', threshold: Math.floor(maxScore * 0.3) },
    { rank: 'Amazing', rankEs: 'Asombroso', threshold: Math.floor(maxScore * 0.5) },
    { rank: 'Genius', rankEs: 'Genio', threshold: Math.floor(maxScore * 0.7) },
  ];
}
