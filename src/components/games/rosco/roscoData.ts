export interface RoscoQuestion {
  letter: string;
  question: string;
  questionEs: string;
  answer: string;
  answerEs: string;
  startsWith: string;
  contains: string;
  type: 'startsWith' | 'contains';
}

export interface RoscoPuzzle {
  questions: RoscoQuestion[];
}

// Pre-built Rosco puzzles
// Questions follow: "Contains X..." or "Starts with Y..." format
export const roscoPuzzles: Record<string, RoscoPuzzle[]> = {
  en: [
    {
      questions: [
        { letter: 'A', question: 'Fruit that keeps the doctor away', questionEs: 'Fruta que mantiene al doctor lejos', answer: 'APPLE', answerEs: 'MANZANA', startsWith: 'A', contains: 'P', type: 'startsWith' },
        { letter: 'B', question: 'Yellow and buzzing insect', questionEs: 'Insecto amarillo y zumbador', answer: 'BEE', answerEs: 'ABEJA', startsWith: 'B', contains: 'E', type: 'startsWith' },
        { letter: 'C', question: 'Feline pet that purrs', questionEs: 'Mascota felina que ronronea', answer: 'CAT', answerEs: 'GATO', startsWith: 'C', contains: 'A', type: 'startsWith' },
        { letter: 'D', question: 'Opposite of night', questionEs: 'Lo opuesto a noche', answer: 'DAY', answerEs: 'DIA', startsWith: 'D', contains: 'A', type: 'startsWith' },
        { letter: 'E', question: 'Large body of water', questionEs: 'Gran cuerpo de agua', answer: 'OCEAN', answerEs: 'OCEANO', startsWith: 'E', contains: 'A', type: 'contains' },
        { letter: 'F', question: 'Not good or evil', questionEs: 'Ni bueno ni malo', answer: 'FAIR', answerEs: 'JUSTO', startsWith: 'F', contains: 'A', type: 'startsWith' },
        { letter: 'G', question: 'Color of grass', questionEs: 'Color de la hierba', answer: 'GREEN', answerEs: 'VERDE', startsWith: 'G', contains: 'R', type: 'startsWith' },
        { letter: 'H', question: 'Place where you live', questionEs: 'Lugar donde vives', answer: 'HOME', answerEs: 'HOGAR', startsWith: 'H', contains: 'O', type: 'startsWith' },
        { letter: 'I', question: 'Frozen water', questionEs: 'Agua congelada', answer: 'ICE', answerEs: 'HIELO', startsWith: 'I', contains: 'C', type: 'startsWith' },
        { letter: 'J', question: 'Orange fruit that you squeeze', questionEs: 'Fruta naranja que exprimes', answer: 'JUICE', answerEs: 'JUGO', startsWith: 'J', contains: 'U', type: 'contains' },
        { letter: 'K', question: 'Instrument with black and white keys', questionEs: 'Instrumento con teclas blancas y negras', answer: 'PIANO', answerEs: 'PIANO', startsWith: 'K', contains: 'E', type: 'contains' },
        { letter: 'L', question: 'Gives light in the dark', questionEs: 'Da luz en la oscuridad', answer: 'LAMP', answerEs: 'LAMPARA', startsWith: 'L', contains: 'A', type: 'startsWith' },
        { letter: 'M', question: 'Round object in the night sky', questionEs: 'Objeto redondo en el cielo nocturno', answer: 'MOON', answerEs: 'LUNA', startsWith: 'M', contains: 'O', type: 'startsWith' },
        { letter: 'N', question: 'Part of the face for smelling', questionEs: 'Parte de la cara para oler', answer: 'NOSE', answerEs: 'NARIZ', startsWith: 'N', contains: 'O', type: 'startsWith' },
        { letter: 'O', question: 'Eight-sided shape', questionEs: 'Forma de ocho lados', answer: 'OCTAGON', answerEs: 'OCTOGONO', startsWith: 'O', contains: 'C', type: 'startsWith' },
        { letter: 'P', question: 'Bird that cannot fly', questionEs: 'Ave que no puede volar', answer: 'PENGUIN', answerEs: 'PINGUINO', startsWith: 'P', contains: 'E', type: 'startsWith' },
        { letter: 'Q', question: 'Line of people waiting', questionEs: 'Fila de gente esperando', answer: 'QUEUE', answerEs: 'COLA', startsWith: 'Q', contains: 'U', type: 'startsWith' },
        { letter: 'R', question: 'Water falling from the sky', questionEs: 'Agua que cae del cielo', answer: 'RAIN', answerEs: 'LLUVIA', startsWith: 'R', contains: 'A', type: 'startsWith' },
        { letter: 'S', question: 'Giant ball of gas in space', questionEs: 'Bola gigante de gas en el espacio', answer: 'STAR', answerEs: 'ESTRELLA', startsWith: 'S', contains: 'T', type: 'startsWith' },
        { letter: 'T', question: 'Striped animal from Africa', questionEs: 'Animal rayado de Africa', answer: 'TIGER', answerEs: 'TIGRE', startsWith: 'T', contains: 'I', type: 'startsWith' },
        { letter: 'U', question: 'Below or beneath', questionEs: 'Debajo o por debajo', answer: 'UNDER', answerEs: 'BAJO', startsWith: 'U', contains: 'N', type: 'startsWith' },
        { letter: 'V', question: 'Red fruit used in ketchup', questionEs: 'Fruta roja usada en ketchup', answer: 'TOMATO', answerEs: 'TOMATE', startsWith: 'V', contains: 'O', type: 'contains' },
        { letter: 'W', question: 'Liquid we all need to drink', questionEs: 'Liquido que todos necesitamos beber', answer: 'WATER', answerEs: 'AGUA', startsWith: 'W', contains: 'A', type: 'startsWith' },
        { letter: 'X', question: 'Marks the spot on a treasure map', questionEs: 'Marca el lugar en un mapa del tesoro', answer: 'XMARK', answerEs: 'XMARCA', startsWith: 'X', contains: 'M', type: 'startsWith' },
        { letter: 'Y', question: 'Time measure of 365 days', questionEs: 'Medida de tiempo de 365 dias', answer: 'YEAR', answerEs: 'ANIO', startsWith: 'Y', contains: 'E', type: 'startsWith' },
        { letter: 'Z', question: 'Striped horse-like animal', questionEs: 'Animal similar a caballo con rayas', answer: 'ZEBRA', answerEs: 'CEBRA', startsWith: 'Z', contains: 'E', type: 'startsWith' },
      ],
    },
    {
      questions: [
        { letter: 'A', question: 'A person who acts in movies', questionEs: 'Persona que actua en peliculas', answer: 'ACTOR', answerEs: 'ACTOR', startsWith: 'A', contains: 'C', type: 'startsWith' },
        { letter: 'B', question: 'Hit a baseball over the fence', questionEs: 'Golpear un beisbol por la cerca', answer: 'HOME RUN', answerEs: 'JONRON', startsWith: 'B', contains: 'A', type: 'contains' },
        { letter: 'C', question: 'A sweet frozen dessert', questionEs: 'Un postre dulce y congelado', answer: 'CAKE', answerEs: 'PASTEL', startsWith: 'C', contains: 'A', type: 'startsWith' },
        { letter: 'D', question: 'A doctor who fixes teeth', questionEs: 'Doctor que arregla dientes', answer: 'DENTIST', answerEs: 'DENTISTA', startsWith: 'D', contains: 'E', type: 'startsWith' },
        { letter: 'E', question: 'The biggest continent', questionEs: 'El continente mas grande', answer: 'ASIA', answerEs: 'ASIA', startsWith: 'E', contains: 'S', type: 'contains' },
        { letter: 'F', question: 'A piece of furniture with drawers', questionEs: 'Mueble con cajones', answer: 'FILING', answerEs: 'ARCHIVO', startsWith: 'F', contains: 'I', type: 'startsWith' },
        { letter: 'G', question: 'A long necked African animal', questionEs: 'Animal africano de cuello largo', answer: 'GIRAFFE', answerEs: 'JIRAFA', startsWith: 'G', contains: 'I', type: 'startsWith' },
        { letter: 'H', question: 'Something you wear on your head', questionEs: 'Algo que usas en la cabeza', answer: 'HAT', answerEs: 'SOMBRERO', startsWith: 'H', contains: 'A', type: 'startsWith' },
        { letter: 'I', question: 'A small device you browse the web on', questionEs: 'Pequeno dispositivo para navegar la web', answer: 'IPHONE', answerEs: 'IPHONE', startsWith: 'I', contains: 'P', type: 'startsWith' },
        { letter: 'J', question: 'A person who tells jokes', questionEs: 'Persona que cuenta chistes', answer: 'JOKER', answerEs: 'PAYASO', startsWith: 'J', contains: 'O', type: 'startsWith' },
        { letter: 'K', question: 'To strike with your foot', questionEs: 'Golpear con el pie', answer: 'KICK', answerEs: 'PATADA', startsWith: 'K', contains: 'I', type: 'startsWith' },
        { letter: 'L', question: 'A baby cat', questionEs: 'Un bebe gato', answer: 'LION', answerEs: 'LEON', startsWith: 'L', contains: 'I', type: 'startsWith' },
        { letter: 'M', question: 'The king of the jungle', questionEs: 'El rey de la selva', answer: 'MONKEY', answerEs: 'MONO', startsWith: 'M', contains: 'O', type: 'startsWith' },
        { letter: 'N', question: 'Zero, none at all', questionEs: 'Cero, nada de nada', answer: 'NOTHING', answerEs: 'NADA', startsWith: 'N', contains: 'O', type: 'startsWith' },
        { letter: 'O', question: 'An oval shape', questionEs: 'Una forma ovalada', answer: 'OVAL', answerEs: 'OVALO', startsWith: 'O', contains: 'V', type: 'startsWith' },
        { letter: 'P', question: 'Something you read with stories', questionEs: 'Algo que lees con historias', answer: 'PAPER', answerEs: 'PAPEL', startsWith: 'P', contains: 'A', type: 'startsWith' },
        { letter: 'Q', question: 'The sound a duck makes', questionEs: 'El sonido que hace un pato', answer: 'QUACK', answerEs: 'CUAC', startsWith: 'Q', contains: 'U', type: 'startsWith' },
        { letter: 'R', question: 'A color of a rainbow', questionEs: 'Un color del arcoiris', answer: 'RED', answerEs: 'ROJO', startsWith: 'R', contains: 'E', type: 'startsWith' },
        { letter: 'S', question: 'A place with slides and swings', questionEs: 'Lugar con resbaladillas y columpios', answer: 'SCHOOL', answerEs: 'ESCUELA', startsWith: 'S', contains: 'C', type: 'startsWith' },
        { letter: 'T', question: 'A device that tells time', questionEs: 'Dispositivo que dice la hora', answer: 'TIMER', answerEs: 'TEMPORIZADOR', startsWith: 'T', contains: 'I', type: 'startsWith' },
        { letter: 'U', question: 'Not beautiful, but...', questionEs: 'No hermoso, pero...', answer: 'UGLY', answerEs: 'FEO', startsWith: 'U', contains: 'G', type: 'startsWith' },
        { letter: 'V', question: 'The planet we live on', questionEs: 'El planeta en que vivimos', answer: 'VENUS', answerEs: 'VENUS', startsWith: 'V', contains: 'E', type: 'startsWith' },
        { letter: 'W', question: 'A thing you tell time with', questionEs: 'Algo con lo que ves la hora', answer: 'WATCH', answerEs: 'RELOJ', startsWith: 'W', contains: 'A', type: 'startsWith' },
        { letter: 'X', question: 'A musical instrument with strings', questionEs: 'Instrumento musical con cuerdas', answer: 'XYLO', answerEs: 'XILO', startsWith: 'X', contains: 'Y', type: 'startsWith' },
        { letter: 'Y', question: 'A round toy on a string', questionEs: 'Juguete redondo con cuerda', answer: 'YO-YO', answerEs: 'YOYO', startsWith: 'Y', contains: 'O', type: 'startsWith' },
        { letter: 'Z', question: 'A zoo animal with black and white stripes', questionEs: 'Animal del zoologico con rayas blancas y negras', answer: 'ZOO', answerEs: 'ZOO', startsWith: 'Z', contains: 'O', type: 'startsWith' },
      ],
    },
  ],
  es: [
    {
      questions: [
        { letter: 'A', question: 'Fruta que mantiene al doctor lejos', questionEs: 'Fruta que mantiene al doctor lejos', answer: 'MANZANA', answerEs: 'MANZANA', startsWith: 'A', contains: 'N', type: 'startsWith' },
        { letter: 'B', question: 'Insecto que hace miel', questionEs: 'Insecto que hace miel', answer: 'ABEJA', answerEs: 'ABEJA', startsWith: 'B', contains: 'E', type: 'contains' },
        { letter: 'C', question: 'Famoso pintor espanol', questionEs: 'Famoso pintor espanol', answer: 'PICASSO', answerEs: 'PICASSO', startsWith: 'C', contains: 'A', type: 'contains' },
        { letter: 'D', question: 'Parte del cuerpo para oler', questionEs: 'Parte del cuerpo para oler', answer: 'NARIZ', answerEs: 'NARIZ', startsWith: 'D', contains: 'I', type: 'contains' },
        { letter: 'E', question: 'Animal que da leche', questionEs: 'Animal que da leche', answer: 'VACA', answerEs: 'VACA', startsWith: 'E', contains: 'A', type: 'contains' },
        { letter: 'F', question: 'Dia de descanso', questionEs: 'Dia de descanso', answer: 'FINDE', answerEs: 'FINDE', startsWith: 'F', contains: 'I', type: 'startsWith' },
        { letter: 'G', question: 'Animal que ladra', questionEs: 'Animal que ladra', answer: 'PERRO', answerEs: 'PERRO', startsWith: 'G', contains: 'E', type: 'contains' },
        { letter: 'H', question: 'Lo opuesto a frio', questionEs: 'Lo opuesto a frio', answer: 'CALOR', answerEs: 'CALOR', startsWith: 'H', contains: 'A', type: 'contains' },
        { letter: 'I', question: 'Isla famosa de Espana', questionEs: 'Isla famosa de Espana', answer: 'IBIZA', answerEs: 'IBIZA', startsWith: 'I', contains: 'B', type: 'startsWith' },
        { letter: 'J', question: 'Mes de verano', questionEs: 'Mes de verano', answer: 'JULIO', answerEs: 'JULIO', startsWith: 'J', contains: 'U', type: 'startsWith' },
        { letter: 'K', question: 'Pais asiatico', questionEs: 'Pais asiatico', answer: 'KOREA', answerEs: 'KOREA', startsWith: 'K', contains: 'O', type: 'startsWith' },
        { letter: 'L', question: 'Lo opuesto a oscuridad', questionEs: 'Lo opuesto a oscuridad', answer: 'LUZ', answerEs: 'LUZ', startsWith: 'L', contains: 'U', type: 'startsWith' },
        { letter: 'M', question: 'Instrumento de cuerdas', questionEs: 'Instrumento de cuerdas', answer: 'GUITARRA', answerEs: 'GUITARRA', startsWith: 'M', contains: 'A', type: 'contains' },
        { letter: 'N', question: 'Paquete de informacion', questionEs: 'Paquete de informacion', answer: 'NOTICIA', answerEs: 'NOTICIA', startsWith: 'N', contains: 'O', type: 'startsWith' },
        { letter: 'O', question: 'Forma geometrica perfecta', questionEs: 'Forma geometrica perfecta', answer: 'OVALO', answerEs: 'OVALO', startsWith: 'O', contains: 'V', type: 'startsWith' },
        { letter: 'P', question: 'Ciudad famosa de Italia', questionEs: 'Ciudad famosa de Italia', answer: 'PARIS', answerEs: 'PARIS', startsWith: 'P', contains: 'A', type: 'startsWith' },
        { letter: 'Q', question: 'Descanso de la tarde', questionEs: 'Descanso de la tarde', answer: 'QUIEBRA', answerEs: 'SIESTA', startsWith: 'Q', contains: 'U', type: 'startsWith' },
        { letter: 'R', question: 'Cosa que brilla en el cielo', questionEs: 'Cosa que brilla en el cielo', answer: 'RAYO', answerEs: 'RAYO', startsWith: 'R', contains: 'A', type: 'startsWith' },
        { letter: 'S', question: 'Lugar para comprar', questionEs: 'Lugar para comprar', answer: 'SUPER', answerEs: 'SUPER', startsWith: 'S', contains: 'U', type: 'startsWith' },
        { letter: 'T', question: 'Animal con rayas', questionEs: 'Animal con rayas', answer: 'TIGRE', answerEs: 'TIGRE', startsWith: 'T', contains: 'I', type: 'startsWith' },
        { letter: 'U', question: 'País sudamericano', questionEs: 'Pais sudamericano', answer: 'URUGUAY', answerEs: 'URUGUAY', startsWith: 'U', contains: 'R', type: 'startsWith' },
        { letter: 'V', question: 'Color del cielo', questionEs: 'Color del cielo', answer: 'VERDE', answerEs: 'AZUL', startsWith: 'V', contains: 'E', type: 'startsWith' },
        { letter: 'W', question: 'Dispositivo para internet', questionEs: 'Dispositivo para internet', answer: 'WIFI', answerEs: 'WIFI', startsWith: 'W', contains: 'I', type: 'startsWith' },
        { letter: 'X', question: 'Instrumento musical antiguo', questionEs: 'Instrumento musical antiguo', answer: 'XILOFONO', answerEs: 'XILOFONO', startsWith: 'X', contains: 'I', type: 'startsWith' },
        { letter: 'Y', question: 'Mamifero marino grande', questionEs: 'Mamifero marino grande', answer: 'YUNQUE', answerEs: 'BALLENA', startsWith: 'Y', contains: 'U', type: 'contains' },
        { letter: 'Z', question: 'Zona de animales', questionEs: 'Zona de animales', answer: 'ZOO', answerEs: 'ZOO', startsWith: 'Z', contains: 'O', type: 'startsWith' },
      ],
    },
  ],
};

export function getPuzzle(lang: string, index: number): RoscoPuzzle {
  const puzzles = roscoPuzzles[lang] || roscoPuzzles.en;
  return puzzles[index % puzzles.length];
}

export function getDailyPuzzleIndex(): number {
  const now = new Date();
  const start = new Date(2025, 0, 1);
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}
