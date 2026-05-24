// 7x7 Crossword puzzle data
export interface CrosswordCell {
  row: number;
  col: number;
  letter: string;
  number?: number;
  isBlack: boolean;
  prefilled?: boolean;
}

export interface CrosswordWord {
  number: number;
  direction: 'across' | 'down';
  row: number;
  col: number;
  length: number;
  clue: string;
  clueEs: string;
  answer: string;
  cells: [number, number][];
}

export interface CrosswordPuzzle {
  size: number;
  cells: CrosswordCell[][];
  words: CrosswordWord[];
}

// Puzzle 1: Simple 7x7
const PUZZLES: CrosswordPuzzle[] = [
  {
    size: 7,
    cells: [],
    words: [
      // Across
      { number: 1, direction: 'across', row: 0, col: 0, length: 7, clue: 'A bright color of the sky', clueEs: 'Un color brillante del cielo', answer: 'AZUREBL', cells: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]] },
      { number: 4, direction: 'across', row: 2, col: 0, length: 5, clue: 'Large body of water', clueEs: 'Gran cuerpo de agua', answer: 'OCEAN', cells: [[2,0],[2,1],[2,2],[2,3],[2,4]] },
      { number: 6, direction: 'across', row: 4, col: 0, length: 5, clue: 'Frozen water', clueEs: 'Agua congelada', answer: 'FROST', cells: [[4,0],[4,1],[4,2],[4,3],[4,4]] },
      { number: 7, direction: 'across', row: 6, col: 0, length: 7, clue: 'Precious stone', clueEs: 'Piedra preciosa', answer: 'CRYSTAL', cells: [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6]] },
      // Down
      { number: 1, direction: 'down', row: 0, col: 0, length: 3, clue: 'Greeting for the morning', clueEs: 'Saludo de la mañana', answer: 'ALO', cells: [[0,0],[1,0],[2,0]] },
      { number: 2, direction: 'down', row: 0, col: 2, length: 7, clue: 'To make something new', clueEs: 'Hacer algo nuevo', answer: 'ZEBRACT', cells: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]] },
      { number: 3, direction: 'down', row: 0, col: 4, length: 3, clue: 'A type of tree', clueEs: 'Un tipo de árbol', answer: 'EBO', cells: [[0,4],[1,4],[2,4]] },
      { number: 4, direction: 'down', row: 2, col: 1, length: 5, clue: 'Opposite of closed', clueEs: 'Opuesto de cerrado', answer: 'LARES', cells: [[2,1],[3,1],[4,1],[5,1],[6,1]] },
      { number: 5, direction: 'down', row: 2, col: 3, length: 5, clue: 'To gain knowledge', clueEs: 'Adquirir conocimiento', answer: 'EARNS', cells: [[2,3],[3,3],[4,3],[5,3],[6,3]] },
    ],
  },
  {
    size: 7,
    cells: [],
    words: [
      // Across
      { number: 1, direction: 'across', row: 0, col: 0, length: 7, clue: 'Plant with thorns', clueEs: 'Planta con espinas', answer: 'CACTUSE', cells: [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]] },
      { number: 4, direction: 'across', row: 2, col: 0, length: 5, clue: 'A flying insect that makes honey', clueEs: 'Insecto volador que hace miel', answer: 'BEECH', cells: [[2,0],[2,1],[2,2],[2,3],[2,4]] },
      { number: 6, direction: 'across', row: 4, col: 0, length: 5, clue: 'To go up', clueEs: 'Subir', answer: 'RISES', cells: [[4,0],[4,1],[4,2],[4,3],[4,4]] },
      { number: 7, direction: 'across', row: 6, col: 0, length: 7, clue: 'A device for seeing distant objects', clueEs: 'Dispositivo para ver objetos lejanos', answer: 'LENSBOX', cells: [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6]] },
      // Down
      { number: 1, direction: 'down', row: 0, col: 0, length: 3, clue: 'Feline pet', clueEs: 'Mascota felina', answer: 'CAT', cells: [[0,0],[1,0],[2,0]] },
      { number: 2, direction: 'down', row: 0, col: 2, length: 7, clue: 'The study of living things', clueEs: 'Estudio de los seres vivos', answer: 'CIENCES', cells: [[0,2],[1,2],[2,2],[3,2],[4,2],[5,2],[6,2]] },
      { number: 3, direction: 'down', row: 0, col: 4, length: 3, clue: 'A large mammal', clueEs: 'Un gran mamífero', answer: 'TEA', cells: [[0,4],[1,4],[2,4]] },
      { number: 4, direction: 'down', row: 2, col: 1, length: 5, clue: 'A place for books', clueEs: 'Lugar para libros', answer: 'REELS', cells: [[2,1],[3,1],[4,1],[5,1],[6,1]] },
      { number: 5, direction: 'down', row: 2, col: 3, length: 5, clue: 'A piece of furniture to sit on', clueEs: 'Mueble para sentarse', answer: 'CRESS', cells: [[2,3],[3,3],[4,3],[5,3],[6,3]] },
    ],
  },
];

// Build a valid grid from word placements
function buildGrid(puzzle: CrosswordPuzzle): CrosswordCell[][] {
  const { size, words } = puzzle;
  const grid: CrosswordCell[][] = [];

  // Initialize all black
  for (let r = 0; r < size; r++) {
    grid[r] = [];
    for (let c = 0; c < size; c++) {
      grid[r][c] = {
        row: r,
        col: c,
        letter: '',
        isBlack: true,
      };
    }
  }

  // Fill in word cells
  for (const word of words) {
    for (let i = 0; i < word.cells.length; i++) {
      const [r, c] = word.cells[i];
      if (r < size && c < size) {
        grid[r][c] = {
          row: r,
          col: c,
          letter: word.answer[i] || '',
          isBlack: false,
        };
      }
    }
  }

  // Assign numbers
  const numberMap = new Map<string, number>();
  for (const word of words) {
    const key = `${word.row},${word.col}`;
    if (!numberMap.has(key)) {
      numberMap.set(key, word.number);
    }
  }
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const key = `${r},${c}`;
      if (numberMap.has(key) && !grid[r][c].isBlack) {
        grid[r][c].number = numberMap.get(key);
      }
    }
  }

  return grid;
}

// Simple 5x5 puzzles for easier mode
const PUZZLES_5: CrosswordPuzzle[] = [
  {
    size: 5,
    cells: [],
    words: [
      { number: 1, direction: 'across', row: 0, col: 0, length: 5, clue: 'To make music with voice', clueEs: 'Hacer música con la voz', answer: 'SINGS', cells: [[0,0],[0,1],[0,2],[0,3],[0,4]] },
      { number: 3, direction: 'across', row: 2, col: 0, length: 5, clue: 'Small piece of paper', clueEs: 'Pequeña pieza de papel', answer: 'SLIPS', cells: [[2,0],[2,1],[2,2],[2,3],[2,4]] },
      { number: 5, direction: 'across', row: 4, col: 0, length: 5, clue: 'Bright red color', clueEs: 'Color rojo brillante', answer: 'CRIMN', cells: [[4,0],[4,1],[4,2],[4,3],[4,4]] },
      { number: 1, direction: 'down', row: 0, col: 0, length: 3, clue: 'Sound from a fire', clueEs: 'Sonido del fuego', answer: 'SIS', cells: [[0,0],[1,0],[2,0]] },
      { number: 2, direction: 'down', row: 0, col: 2, length: 5, clue: 'A number', clueEs: 'Un número', answer: 'NINTH', cells: [[0,2],[1,2],[2,2],[3,2],[4,2]] },
      { number: 3, direction: 'down', row: 2, col: 1, length: 3, clue: 'Light source', clueEs: 'Fuente de luz', answer: 'LIP', cells: [[2,1],[3,1],[4,1]] },
      { number: 4, direction: 'down', row: 2, col: 3, length: 3, clue: 'A type of flower', clueEs: 'Un tipo de flor', answer: 'IPM', cells: [[2,3],[3,3],[4,3]] },
    ],
  },
];

export function getPuzzle(seed: number, size: 5 | 7 = 7): CrosswordPuzzle {
  const puzzles = size === 5 ? PUZZLES_5 : PUZZLES;
  const idx = seed % puzzles.length;
  const puzzle = puzzles[idx];
  if (!puzzle) return puzzles[0];

  const cells = buildGrid(puzzle);

  // Create prefilled version for practice (easier)
  if (size === 5) {
    // Prefill some letters for 5x5
    const prefilledCells = cells.map(row =>
      row.map(cell => {
        if (cell.isBlack) return cell;
        // Prefill about 30% of letters randomly but deterministically
        if ((cell.row * 7 + cell.col * 3 + seed) % 3 === 0) {
          return { ...cell, prefilled: true };
        }
        return { ...cell, letter: '' };
      })
    );
    return { ...puzzle, cells: prefilledCells };
  }

  // For 7x7, no prefilled letters (harder)
  const userCells = cells.map(row =>
    row.map(cell => (cell.isBlack ? cell : { ...cell, letter: '' }))
  );
  return { ...puzzle, cells: userCells };
}

export function checkPuzzle(grid: CrosswordCell[][], words: CrosswordWord[]): boolean {
  for (const word of words) {
    for (let i = 0; i < word.cells.length; i++) {
      const [r, c] = word.cells[i];
      if (grid[r]?.[c]?.letter !== word.answer[i]) {
        return false;
      }
    }
  }
  return true;
}

export function checkWord(grid: CrosswordCell[][], word: CrosswordWord): boolean {
  for (let i = 0; i < word.cells.length; i++) {
    const [r, c] = word.cells[i];
    if (grid[r]?.[c]?.letter !== word.answer[i]) {
      return false;
    }
  }
  return true;
}

export function getCellWords(row: number, col: number, words: CrosswordWord[]): CrosswordWord[] {
  return words.filter(w => w.cells.some(([r, c]) => r === row && c === col));
}
