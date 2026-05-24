export type Direction = [number, number];

export interface WordSearchWord {
  word: string;
  row: number;
  col: number;
  direction: Direction;
  cells: [number, number][];
  found: boolean;
}

export interface WordSearchPuzzle {
  size: number;
  grid: string[][];
  words: WordSearchWord[];
}

const DIRECTIONS: Direction[] = [
  [0, 1],   // horizontal right
  [0, -1],  // horizontal left
  [1, 0],   // vertical down
  [-1, 0],  // vertical up
  [1, 1],   // diagonal down-right
  [1, -1],  // diagonal down-left
  [-1, 1],  // diagonal up-right
  [-1, -1], // diagonal up-left
];

const WORD_LISTS: { en: string[][]; es: string[][] } = {
  en: [
    ['OCEAN', 'RIVER', 'LAKE', 'STREAM', 'WATER', 'WAVE', 'TIDE', 'FISH', 'BOAT', 'SHIP', 'SAIL', 'DOCK'],
    ['PLANET', 'EARTH', 'MARS', 'VENUS', 'COMET', 'STAR', 'SPACE', 'MOON', 'SUN', 'ORBIT', 'ALIEN', 'GALAXY'],
    ['GARDEN', 'FLOWER', 'ROSE', 'TREE', 'GRASS', 'LEAF', 'PLANT', 'ROOT', 'BLOOM', 'SEED', 'SOIL', 'HERB'],
    ['MUSIC', 'SONG', 'PIANO', 'GUITAR', 'DRUM', 'VIOLIN', 'FLUTE', 'HARP', 'BAND', 'SINGER', 'MELODY', 'RHYTHM'],
    ['ANIMAL', 'TIGER', 'LION', 'BEAR', 'WOLF', 'EAGLE', 'SNAKE', 'HORSE', 'ZEBRA', 'PANDA', 'WHALE', 'SHARK'],
  ],
  es: [
    ['OCEANO', 'RIO', 'LAGO', 'ARROYO', 'AGUA', 'OLA', 'MAREA', 'PEZ', 'BARCO', 'VELA', 'MUELLE', 'MAR'],
    ['PLANETA', 'TIERRA', 'MARTE', 'VENUS', 'COMETA', 'ESTRELLA', 'LUNA', 'SOL', 'ORBITA', 'GALAXIA', 'ASTRO', 'NEBULOSA'],
    ['JARDIN', 'FLOR', 'ROSA', 'ARBOL', 'HIERBA', 'HOJA', 'PLANTA', 'RAIZ', 'BROTE', 'SEMILLA', 'SUELO', 'HIERBA'],
    ['MUSICA', 'CANCION', 'PIANO', 'GUITARRA', 'TAMBOR', 'FLAUTA', 'ARPA', 'BANDA', 'CANTO', 'MELODIA', 'RITMO', 'SONIDO'],
    ['ANIMAL', 'TIGRE', 'LEON', 'OSO', 'LOBO', 'AGUILA', 'SERPIENTE', 'CABALLO', 'CEBRA', 'PANDA', 'BALLENA', 'TIBURON'],
  ],
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function tryPlaceWord(
  grid: string[][],
  word: string,
  row: number,
  col: number,
  dir: Direction,
  size: number
): boolean {
  const [dr, dc] = dir;
  const cells: [number, number][] = [];

  for (let i = 0; i < word.length; i++) {
    const r = row + dr * i;
    const c = col + dc * i;
    if (r < 0 || r >= size || c < 0 || c >= size) return false;
    if (grid[r][c] !== '' && grid[r][c] !== word[i]) return false;
    cells.push([r, c]);
  }

  for (let i = 0; i < word.length; i++) {
    const [r, c] = cells[i];
    grid[r][c] = word[i];
  }
  return true;
}

export function generatePuzzle(seed: number, size: 10 | 12 = 12, lang: 'en' | 'es' = 'en'): WordSearchPuzzle {
  // Use seed to deterministically select word list
  const listIdx = seed % WORD_LISTS[lang].length;
  const wordList = shuffleArray(WORD_LISTS[lang][listIdx]).slice(0, 10);

  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(''));
  const placedWords: WordSearchWord[] = [];

  // Try to place each word
  for (const word of wordList) {
    const directions = shuffleArray(DIRECTIONS);
    let placed = false;

    for (const dir of directions) {
      const positions: [number, number][] = [];
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          positions.push([r, c]);
        }
      }
      const shuffledPositions = shuffleArray(positions);

      for (const [r, c] of shuffledPositions) {
        if (tryPlaceWord(grid, word, r, c, dir, size)) {
          const cells: [number, number][] = [];
          for (let i = 0; i < word.length; i++) {
            cells.push([r + dir[0] * i, c + dir[1] * i]);
          }
          placedWords.push({ word, row: r, col: c, direction: dir, cells, found: false });
          placed = true;
          break;
        }
      }
      if (placed) break;
    }
  }

  // Fill remaining cells with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return { size, grid, words: placedWords };
}

export function isValidSelection(
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  _size: number
): boolean {
  const dRow = endRow - startRow;
  const dCol = endCol - startCol;

  // Must be a straight line in one of 8 directions
  if (dRow === 0 && dCol === 0) return false;
  if (dRow === 0 || dCol === 0 || Math.abs(dRow) === Math.abs(dCol)) return true;
  return false;
}

export function getSelectionCells(
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number
): [number, number][] {
  const dRow = Math.sign(endRow - startRow);
  const dCol = Math.sign(endCol - startCol);
  const steps = Math.max(Math.abs(endRow - startRow), Math.abs(endCol - startCol));

  const cells: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    cells.push([startRow + dRow * i, startCol + dCol * i]);
  }
  return cells;
}

export function getWordFromCells(
  grid: string[][],
  cells: [number, number][]
): string {
  return cells.map(([r, c]) => grid[r]?.[c] || '').join('');
}

export function findWord(
  words: WordSearchWord[],
  cells: [number, number][]
): WordSearchWord | null {
  const cellKey = (c: [number, number]) => `${c[0]},${c[1]}`;
  const selectionKey = cells.map(cellKey).join('|');
  const reverseKey = [...cells].reverse().map(cellKey).join('|');

  for (const word of words) {
    const wordKey = word.cells.map(cellKey).join('|');
    if (wordKey === selectionKey || wordKey === reverseKey) {
      return word;
    }
  }
  return null;
}
