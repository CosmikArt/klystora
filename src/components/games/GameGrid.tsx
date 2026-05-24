import { memo } from 'react';

export type TileState = 'empty' | 'filled' | 'correct' | 'partial' | 'wrong';

export interface Tile {
  letter: string;
  state: TileState;
  evaluating: boolean;
  shake: boolean;
  pop: boolean;
}

interface GameGridProps {
  grid: Tile[][];
  currentRow: number;
}

function getTileClasses(tile: Tile): string {
  const base = 'w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] rounded-lg border-2 flex items-center justify-center text-game-tile font-bold uppercase transition-all duration-200 ease-smooth';

  switch (tile.state) {
    case 'correct':
      return `${base} bg-[#4A8B5B] text-white border-[#4A8B5B]`;
    case 'partial':
      return `${base} bg-[#D9A93E] text-white border-[#D9A93E]`;
    case 'wrong':
      return `${base} bg-[#7A7268] text-white border-[#7A7268]`;
    case 'filled':
      return `${base} bg-[#FAF8F3] dark:bg-[#1E1C26] border-[#6B6560] dark:border-[#7A748C]`;
    default:
      return `${base} bg-[#F0EDE6] dark:bg-[#282636] border-[#E2DED4] dark:border-[#3A3750]`;
  }
}

const TileCell = memo(function TileCell({ tile, rowIndex, colIndex }: {
  tile: Tile;
  rowIndex: number;
  colIndex: number;
}) {
  const classes = getTileClasses(tile);
  const animationClasses = [
    tile.shake ? 'animate-tile-shake' : '',
    tile.pop ? 'animate-tile-pop' : '',
    tile.evaluating ? 'animate-tile-flip' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      key={`${rowIndex}-${colIndex}`}
      className={`${classes} ${animationClasses}`}
      style={{
        animationDelay: tile.evaluating ? `${colIndex * 100}ms` : undefined,
      }}
    >
      {tile.letter}
    </div>
  );
});

const GameRow = memo(function GameRow({ row, rowIndex }: {
  row: Tile[];
  rowIndex: number;
}) {
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {row.map((tile, colIndex) => (
        <TileCell
          key={colIndex}
          tile={tile}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </div>
  );
});

const GameGrid = memo(function GameGrid({ grid }: GameGridProps) {
  return (
    <div className="grid grid-rows-6 gap-1.5 perspective-500">
      {grid.map((row, rowIndex) => (
        <GameRow key={rowIndex} row={row} rowIndex={rowIndex} />
      ))}
    </div>
  );
});

export default GameGrid;
