export interface Category {
  name: string;
  nameEs: string;
  words: string[];
  color: string;
  bgClass: string;
}

export interface Puzzle {
  categories: Category[];
}

// Pre-built puzzles for both EN and ES
export const connectionsPuzzles: Record<string, Puzzle[]> = {
  en: [
    {
      categories: [
        { name: 'Colors', nameEs: 'Colores', words: ['RED', 'BLUE', 'GREEN', 'YELLOW'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Animals', nameEs: 'Animales', words: ['LION', 'TIGER', 'BEAR', 'WOLF'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Fruits', nameEs: 'Frutas', words: ['APPLE', 'GRAPE', 'PEACH', 'MANGO'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Musical Instruments', nameEs: 'Instrumentos Musicales', words: ['PIANO', 'DRUM', 'FLUTE', 'HARP'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
    {
      categories: [
        { name: 'Planets', nameEs: 'Planetas', words: ['MARS', 'VENUS', 'EARTH', 'PLUTO'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Greek Letters', nameEs: 'Letras Griegas', words: ['ALPHA', 'BETA', 'DELTA', 'SIGMA'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Chess Pieces', nameEs: 'Piezas de Ajedrez', words: ['KING', 'QUEEN', 'ROOK', 'PAWN'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Types of Rain', nameEs: 'Tipos de Lluvia', words: ['DRIZZLE', 'SHOWER', 'STORM', 'MIST'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
    {
      categories: [
        { name: 'Ocean Things', nameEs: 'Cosas del Oceano', words: ['WAVE', 'CORAL', 'SHARK', 'PEARL'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Book Parts', nameEs: 'Partes de un Libro', words: ['COVER', 'SPINE', 'PAGE', 'INDEX'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Time Units', nameEs: 'Unidades de Tiempo', words: ['SECOND', 'MINUTE', 'HOUR', 'MOMENT'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Dance Styles', nameEs: 'Estilos de Baile', words: ['TANGO', 'SALSA', 'WALTZ', 'JIVE'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
    {
      categories: [
        { name: 'Tree Parts', nameEs: 'Partes de un Arbol', words: ['ROOT', 'BRANCH', 'BARK', 'TRUNK'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Gemstones', nameEs: 'Piedras Preciosas', words: ['RUBY', 'OPAL', 'JADE', 'PEARL'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Kitchen Tools', nameEs: 'Utensilios de Cocina', words: ['WHISK', 'GRATER', 'LADLE', 'TONGS'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Email Actions', nameEs: 'Acciones de Email', words: ['SEND', 'REPLY', 'FORWARD', 'DRAFT'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
    {
      categories: [
        { name: 'Months', nameEs: 'Meses', words: ['MARCH', 'MAY', 'JUNE', 'AUGUST'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Directions', nameEs: 'Direcciones', words: ['NORTH', 'SOUTH', 'EAST', 'WEST'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Fabrics', nameEs: 'Telas', words: ['DENIM', 'LINEN', 'SILK', 'FLANNEL'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Apartment Things', nameEs: 'Cosas de Apartamento', words: ['LEASE', 'SUITE', 'LOFT', 'STUDIO'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
  ],
  es: [
    {
      categories: [
        { name: 'Colors', nameEs: 'Colores', words: ['ROJO', 'AZUL', 'VERDE', 'GRIS'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Animals', nameEs: 'Animales', words: ['LEON', 'LOBO', 'OSO', 'TORO'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Fruits', nameEs: 'Frutas', words: ['MANZANA', 'UVA', 'PERA', 'CIRUELA'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Body Parts', nameEs: 'Partes del Cuerpo', words: ['BRAZO', 'PIERNA', 'CORAZON', 'CEREBRO'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
    {
      categories: [
        { name: 'Planets', nameEs: 'Planetas', words: ['MARTE', 'VENUS', 'TIERRA', 'PLUTON'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Elements', nameEs: 'Elementos', words: ['FUEGO', 'AGUA', 'AIRE', 'TIERRA'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Vehicles', nameEs: 'Vehiculos', words: ['COCHE', 'TREN', 'BARCO', 'AVION'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Musical Notes', nameEs: 'Notas Musicales', words: ['DO', 'RE', 'MI', 'FA'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
    {
      categories: [
        { name: 'Family', nameEs: 'Familia', words: ['MADRE', 'PADRE', 'HERMANO', 'TIO'], color: '#4A8B5B', bgClass: 'bg-sage-500' },
        { name: 'Professions', nameEs: 'Profesiones', words: ['MEDICO', 'COCINERO', 'PINTOR', 'ACTOR'], color: '#D9A93E', bgClass: 'bg-mustard-500' },
        { name: 'Furniture', nameEs: 'Muebles', words: ['SILLA', 'MESA', 'CAMA', 'ARMARIO'], color: '#7D5BBF', bgClass: 'bg-violet-500' },
        { name: 'Weather', nameEs: 'Clima', words: ['SOL', 'LLUVIA', 'VIENTO', 'NIEVE'], color: '#FF6B3D', bgClass: 'bg-sunset-500' },
      ],
    },
  ],
};

export function getPuzzle(lang: string, index: number): Puzzle {
  const puzzles = connectionsPuzzles[lang] || connectionsPuzzles.en;
  return puzzles[index % puzzles.length];
}

export function getDailyPuzzleIndex(): number {
  const now = new Date();
  const start = new Date(2025, 0, 1);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}
