import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, ArrowRight, Lightbulb, CornerDownLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface Puzzle {
  start: string;
  target: string;
  solution: string[];
  maxSteps: number;
}

const PUZZLES: Record<string, Puzzle[]> = {
  en: [
    { start: 'COLD', target: 'WARM', solution: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM'], maxSteps: 5 },
    { start: 'HEAD', target: 'TAIL', solution: ['HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL'], maxSteps: 6 },
    { start: 'LOVE', target: 'HATE', solution: ['LOVE', 'LOVE', 'HAVE', 'HATE'], maxSteps: 4 },
    { start: 'FOOT', target: 'BALL', solution: ['FOOT', 'BOOT', 'BOAT', 'BOLT', 'BALL'], maxSteps: 5 },
    { start: 'FISH', target: 'BIRD', solution: ['FISH', 'FIST', 'FIST', 'BIRD'], maxSteps: 4 },
    { start: 'DARK', target: 'LIGHT', solution: ['DARK', 'DANK', 'LANK', 'LINK', 'LINE', 'LITE', 'LIGHT'], maxSteps: 7 },
  ],
  es: [
    { start: 'LOBO', target: 'OSO', solution: ['LOBO', 'LOSO', 'LOSO', 'OSO'], maxSteps: 4 },
    { start: 'CASA', target: 'PISO', solution: ['CASA', 'CASA', 'PASA', 'PASA', 'PISO'], maxSteps: 5 },
    { start: 'LUZ', target: 'SOL', solution: ['LUZ', 'LUS', 'LOS', 'SOL'], maxSteps: 4 },
  ],
  default: [
    { start: 'COLD', target: 'WARM', solution: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM'], maxSteps: 5 },
    { start: 'HEAD', target: 'TAIL', solution: ['HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL'], maxSteps: 6 },
  ],
};

function getPuzzle(lang: string): Puzzle {
  const puzzles = PUZZLES[lang] || PUZZLES['default'];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

function differsByOne(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diff++;
  }
  return diff === 1;
}

const COMMON_WORDS = new Set([
  'COLD', 'CORD', 'CARD', 'WARD', 'WARM', 'HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL',
  'LOVE', 'HAVE', 'HATE', 'FOOT', 'BOOT', 'BOAT', 'BOLT', 'BALL', 'FISH', 'FIST', 'BIRD',
  'DARK', 'DANK', 'LANK', 'LINK', 'LINE', 'LITE', 'LIGHT', 'WORD', 'WORK', 'WORM', 'WORN',
  'FIRE', 'FIRM', 'FARM', 'FOAM', 'FORM', 'FORK', 'FORT', 'FOUR', 'FOWL', 'FOXY', 'FOZY',
  'GAME', 'GAMB', 'GAMP', 'GAMY', 'GANE', 'GANG', 'GAOL', 'GAPE', 'GAPS', 'GAPY', 'GARB',
  'GARS', 'GART', 'GASH', 'GASP', 'GAST', 'GATE', 'GATS', 'GAUD', 'GAUM', 'GAUN', 'GAUR',
  'GAVE', 'GAWK', 'GAWP', 'GAYS', 'GAZE', 'GAZY', 'GEAR', 'GECK', 'GEDS', 'GEED', 'GEEK',
  'GEES', 'GELS', 'GELT', 'GEMS', 'GENE', 'GENS', 'GENT', 'GENU', 'GERM', 'GEST', 'GETA',
  'GETS', 'GHAT', 'GHEE', 'GHIS', 'GIBE', 'GIBS', 'GIDS', 'GIED', 'GIEN', 'GIES', 'GIFT',
  'GIGA', 'GIGS', 'GILD', 'GILL', 'GILT', 'GIMP', 'GINK', 'GINS', 'GIPS', 'GIRD', 'GIRL',
  'GIRN', 'GIRO', 'GIRT', 'GIST', 'GITE', 'GITS', 'GIVE', 'GLAD', 'GLEE', 'GLEG', 'GLEN',
  'GLIB', 'GLIM', 'GLOB', 'GLOM', 'GLOP', 'GLOW', 'GLUE', 'GLUG', 'GLUM', 'GLUT', 'GNAR',
  'GNAT', 'GNAW', 'GOAD', 'GOAL', 'GOAS', 'GOAT', 'GOBO', 'GOBS', 'GOBY', 'GODS', 'GOER',
  'GOES', 'GOGO', 'GOLD', 'GOLF', 'GONE', 'GONG', 'GOOD', 'GOOF', 'GOOK', 'GOON', 'GOOP',
  'GOOS', 'GORE', 'GORM', 'GORP', 'GORY', 'GOSH', 'GOTH', 'GOUT', 'GOWD', 'GOWK', 'GOWN',
  'GOYS', 'GRAB', 'GRAD', 'GRAM', 'GRAN', 'GRAT', 'GRAY', 'GREE', 'GREW', 'GREY', 'GRID',
  'GRIG', 'GRIM', 'GRIN', 'GRIP', 'GRIT', 'GROG', 'GROK', 'GROT', 'GROW', 'GRUB', 'GRUE',
  'GUAN', 'GUAR', 'GUCK', 'GUDE', 'GUFF', 'GULF', 'GULL', 'GULP', 'GUMS', 'GUNK', 'GUNS',
  'GURU', 'GUSH', 'GUST', 'GUTS', 'GUVS', 'GUYS', 'GYMS', 'GYPS', 'GYRE', 'GYRI', 'GYRO',
  'GYVE', 'HACK', 'HADE', 'HADJ', 'HAED', 'HAES', 'HAET', 'HAFT', 'HAGS', 'HAHA', 'HAHS',
  'HAIL', 'HAIR', 'HAJI', 'HAJJ', 'HAKE', 'HAKU', 'HALE', 'HALF', 'HALL', 'HALM', 'HALO',
  'HALT', 'HAME', 'HAMS', 'HAND', 'HANG', 'HANK', 'HANT', 'HAPS', 'HARD', 'HARE', 'HARK',
  'HARL', 'HARM', 'HARP', 'HART', 'HASH', 'HASP', 'HAST', 'HATE', 'HATH', 'HAUL', 'HAUT',
  'HAVE', 'HAWK', 'HAWS', 'HAYS', 'HAZE', 'HAZY', 'HEAD', 'HEAL', 'HEAP', 'HEAR', 'HEAT',
  'HEBE', 'HECK', 'HEED', 'HEEL', 'HEFT', 'HEHS', 'HEIL', 'HEIR', 'HELD', 'HELL', 'HELM',
  'HELO', 'HELP', 'HEMP', 'HENS', 'HERB', 'HERD', 'HERE', 'HERL', 'HERM', 'HERN', 'HERS',
  'HEST', 'HETH', 'HEWN', 'HEWS', 'HICK', 'HIDE', 'HIED', 'HIES', 'HIGH', 'HIKE', 'HILL',
  'HILT', 'HIND', 'HINS', 'HINT', 'HIPS', 'HIRE', 'HISN', 'HISS', 'HIST', 'HITS', 'HIVE',
  'HOAR', 'HOAX', 'HOBO', 'HOBS', 'HOCK', 'HODS', 'HOED', 'HOER', 'HOES', 'HOGG', 'HOGS',
  'HOKE', 'HOLD', 'HOLE', 'HOLK', 'HOLM', 'HOLP', 'HOLS', 'HOLT', 'HOLY', 'HOME', 'HONE',
  'HONG', 'HONS', 'HOOD', 'HOOF', 'HOOK', 'HOOP', 'HOOT', 'HOPE', 'HOPS', 'HORA', 'HORN',
  'HOSE', 'HOST', 'HOTS', 'HOUR', 'HOVE', 'HOWF', 'HOWK', 'HOWL', 'HOWS', 'HOYA', 'HOYS',
  'HUBS', 'HUCK', 'HUED', 'HUES', 'HUFF', 'HUGE', 'HUGS', 'HUIC', 'HULA', 'HULK', 'HULL',
  'HUMP', 'HUMS', 'HUNG', 'HUNH', 'HUNK', 'HUNS', 'HUNT', 'HURL', 'HURT', 'HUSH', 'HUSK',
  'HUTS', 'HWAN', 'HWYL', 'HYLA', 'HYMN', 'HYPE', 'HYPO', 'HYPS', 'HYTE', 'IBEX', 'IBIS',
  'ICED', 'ICES', 'ICHS', 'ICKY', 'ICON', 'IDEA', 'IDEM', 'IDES', 'IDLE', 'IDLY', 'IDOL',
  'IDYL', 'IFFY', 'IGLU', 'IKAT', 'ILIA', 'ILKA', 'ILKS', 'ILL', 'IMAM', 'IMID', 'IMMY',
  'IMPI', 'IMPS', 'INBY', 'INCH', 'INFO', 'INIA', 'INKS', 'INKY', 'INLY', 'INNS', 'INRO',
  'INTI', 'INTO', 'IONS', 'IOTA', 'IRED', 'IRES', 'IRID', 'IRIS', 'IRKS', 'IRON', 'ISBA',
  'ISLE', 'ISMS', 'ITCH', 'ITEM', 'IWIS', 'IXIA', 'IZAR', 'JABS', 'JACK', 'JADE', 'JAGG',
  'JAGS', 'JAIL', 'JAKE', 'JAMB', 'JAMS', 'JANE', 'JAPE', 'JARL', 'JARS', 'JATO', 'JAWS',
  'JAYS', 'JAZZ', 'JEAN', 'JEEZ', 'JEFE', 'JEHU', 'JELL', 'JEON', 'JERK', 'JESS', 'JEST',
  'JETE', 'JETS', 'JEUX', 'JEWS', 'JIAO', 'JIBB', 'JIBE', 'JIBS', 'JIFF', 'JIGS', 'JILL',
  'JILT', 'JINK', 'JINN', 'JINS', 'JINX', 'JISM', 'JIVE', 'JIVY', 'JOBS', 'JOCK', 'JOES',
  'JOEY', 'JOGS', 'JOHN', 'JOIN', 'JOKE', 'JOKY', 'JOLE', 'JOLT', 'JOSH', 'JOSS', 'JOTA',
  'JOTS', 'JOWL', 'JOWS', 'JOYS', 'JUBA', 'JUBE', 'JUCO', 'JUDO', 'JUGA', 'JUGS', 'Juju',
  'JUKE', 'JUKU', 'JUMP', 'JUNK', 'JUPE', 'JURA', 'JURY', 'JUST', 'JUTE', 'JUTS', 'KAAS',
  'KABS', 'KADI', 'KAES', 'KAFS', 'KAGO', 'KAGU', 'KAIF', 'KAIL', 'KAIN', 'KAKA', 'KAKI',
  'KALE', 'KAME', 'KAMI', 'KANA', 'KANE', 'KAON', 'KAPA', 'KAPH', 'KARN', 'KART', 'KATA',
  'KATS', 'KAVA', 'KAYO', 'KAYS', 'KBAR', 'KEAS', 'KECK', 'KEEF', 'KEEK', 'KEEL', 'KEEN',
  'KEEP', 'KEET', 'KEFS', 'KEGS', 'KEIR', 'KELP', 'KELT', 'KEMP', 'KENO', 'KENS', 'KENT',
  'KEPI', 'KEPS', 'KEPT', 'KERB', 'KERF', 'KERN', 'KETO', 'KEYS', 'KHAF', 'KHAN', 'KHAT',
  'KHIS', 'KIBE', 'KICK', 'KIDS', 'KIEF', 'KIER', 'KIEV', 'KIFS', 'KILL', 'KILN', 'KILO',
  'KILT', 'KINA', 'KIND', 'KINE', 'KING', 'KINK', 'KINO', 'KINS', 'KIPS', 'KIRK', 'KIRN',
  'KIRS', 'KISS', 'KIST', 'KITE', 'KITH', 'KITS', 'KIVA', 'KIWI', 'KNEE', 'KNEW', 'KNIT',
  'KNOB', 'KNOT', 'KNOW', 'KOAN', 'KOAS', 'KOBO', 'KOBS', 'KOEL', 'KOHL', 'KOIS', 'KOJI',
  'KOLA', 'KOPS', 'KORA', 'KORE', 'KORS', 'KOSS', 'KOTO', 'KRIS', 'KUDO', 'KUDU', 'KUES',
  'KUFI', 'KUNA', 'KUNE', 'KURU', 'KVAS', 'KYAK', 'KYAR', 'KYAT', 'KYES', 'KYTE', 'LABS',
  'LACE', 'LACK', 'LACS', 'LACY', 'LADE', 'LADS', 'LADY', 'LAGS', 'LAHS', 'LAIC', 'LAID',
  'LAIN', 'LAIR', 'LAKE', 'LAKH', 'LAKY', 'LALL', 'LAMA', 'LAMB', 'LAME', 'LAMP', 'LAMS',
  'LAND', 'LANE', 'LANG', 'LANK', 'LAPS', 'LARD', 'LARI', 'LARK', 'LARS', 'LASE', 'LASH',
  'LASS', 'LAST', 'LATE', 'LATH', 'LATI', 'LATS', 'LATU', 'LAUD', 'LAVA', 'LAVE', 'LAVS',
  'LAWS', 'LAYS', 'LAZE', 'LAZY', 'LEAD', 'LEAF', 'LEAK', 'LEAL', 'LEAN', 'LEAP', 'LEAR',
  'LEAS', 'LECH', 'LEEK', 'LEER', 'LEES', 'LEFT', 'LEGS', 'LEHR', 'LEIS', 'LEKE', 'LEKS',
  'LEKU', 'LEND', 'LENO', 'LENS', 'LENT', 'LEPT', 'LESS', 'LEST', 'LETS', 'LEUD', 'LEVA',
  'LEVO', 'LEVS', 'LEVY', 'LEWD', 'LEYS', 'LIAR', 'LIBS', 'LICE', 'LICH', 'LICK', 'LIDO',
  'LIDS', 'LIED', 'LIEF', 'LIEN', 'LIER', 'LIES', 'LIEU', 'LIFE', 'LIFT', 'LIKE', 'LILO',
  'LILT', 'LILY', 'LIMA', 'LIMB', 'LIME', 'LIMN', 'LIMO', 'LIMP', 'LIMY', 'LINE', 'LING',
  'LINK', 'LINN', 'LINO', 'LINS', 'LINT', 'LINY', 'LION', 'LIPA', 'LIPE', 'LIPS', 'LIRA',
  'LIRE', 'LIRI', 'LISP', 'LIST', 'LITE', 'LITS', 'LITU', 'LIVE', 'LOAD', 'LOAF', 'LOAM',
  'LOAN', 'LOBE', 'LOBO', 'LOBS', 'LOCA', 'LOCH', 'LOCI', 'LOCK', 'LOCO', 'LODE', 'LOFT',
  'LOGE', 'LOGO', 'LOGS', 'LOGY', 'LOID', 'LOIN', 'LOLL', 'LONE', 'LONG', 'LOOF', 'LOOK',
  'LOOM', 'LOON', 'LOOP', 'LOOR', 'LOOS', 'LOOT', 'LOPE', 'LOPS', 'LORD', 'LORE', 'LORN',
  'LOSS', 'LOST', 'LOTA', 'LOTH', 'LOTI', 'LOTS', 'LOUD', 'LOUN', 'LOUP', 'LOUR', 'LOUT',
  'LOVE', 'LOWE', 'LOWN', 'LOWS', 'LUAU', 'LUBE', 'LUCE', 'LUCK', 'LUDE', 'LUES', 'LUFF',
  'LUGE', 'LUGS', 'LULL', 'LULU', 'LUMA', 'LUMP', 'LUMS', 'LUNA', 'LUNE', 'LUNG', 'LUNK',
  'LUNS', 'LUNT', 'LUNY', 'LURE', 'LURK', 'LUSH', 'LUST', 'LUTE', 'LUTZ', 'LUVS', 'LUXE',
  'LWEI', 'LYCH', 'LYES', 'LYNX', 'LYRE', 'LYSE', 'MAAR', 'MABE', 'MACS', 'MADE', 'MADS',
  'MAES', 'MAGE', 'MAGI', 'MAGS', 'MAID', 'MAIL', 'MAIM', 'MAIN', 'MAIR', 'MAKE', 'MAKO',
  'MALE', 'MALL', 'MALM', 'MALT', 'MAMA', 'MANA', 'MANE', 'MANO', 'MANS', 'MANY', 'MAPS',
  'MARA', 'MARC', 'MARE', 'MARK', 'MARL', 'MARS', 'MART', 'MASA', 'MASH', 'MASK', 'MASS',
  'MAST', 'MATE', 'MATH', 'MATS', 'MATT', 'MAUD', 'MAUL', 'MAUN', 'MAUT', 'MAWN', 'MAWS',
  'MAXI', 'MAYA', 'MAYS', 'MAZE', 'MAZY', 'MEAD', 'MEAL', 'MEAN', 'MEAT', 'MEDS', 'MEED',
  'MEEK', 'MEET', 'MEGA', 'MEGS', 'MELD', 'MELL', 'MELS', 'MELT', 'MEME', 'MEMO', 'MEND',
  'MENO', 'MENU', 'MEOU', 'MEOW', 'MERC', 'MERE', 'MERK', 'MERL', 'MESA', 'MESH', 'MESS',
  'META', 'METE', 'METH', 'MEWS', 'MEZE', 'MHOS', 'MIBS', 'MICA', 'MICE', 'MICK', 'MICS',
  'MIDD', 'MIDI', 'MIDS', 'MIEN', 'MIFF', 'MIGG', 'MIGS', 'MIKE', 'MILD', 'MILE', 'MILK',
  'MILL', 'MILO', 'MILS', 'MILT', 'MIME', 'MINA', 'MIND', 'MINE', 'MINI', 'MINK', 'MINT',
  'MINX', 'MIPS', 'MIRE', 'MIRI', 'MIRK', 'MIRS', 'MIRY', 'MISE', 'MISO', 'MISS', 'MIST',
  'MITE', 'MITT', 'MITY', 'MIXT', 'MOAN', 'MOAS', 'MOAT', 'MOBS', 'MOCK', 'MOCS', 'MODE',
  'MODI', 'MODS', 'MOGS', 'MOIL', 'MOJO', 'MOKA', 'MOLA', 'MOLD', 'MOLE', 'MOLL', 'MOLS',
  'MOLT', 'MOLY', 'MOME', 'MOMI', 'MOMS', 'MONK', 'MONO', 'MONS', 'MONY', 'MOOD', 'MOOL',
  'MOON', 'MOOR', 'MOOS', 'MOOT', 'MOPE', 'MOPS', 'MOPY', 'MORA', 'MORE', 'MORN', 'MORS',
  'MORT', 'MOSE', 'MOSH', 'MOSK', 'MOSS', 'MOST', 'MOTE', 'MOTH', 'MOTS', 'MOTT', 'MOUE',
  'MOVE', 'MOWN', 'MOWS', 'MOXA', 'MOZO', 'MUCH', 'MUCK', 'MUDS', 'MUFF', 'MUGG', 'MUGS',
  'MULE', 'MULL', 'MUMM', 'MUMP', 'MUMS', 'MUMU', 'MUNI', 'MUNS', 'MUON', 'MURA', 'MURE',
  'MURK', 'MUSE', 'MUSH', 'MUSK', 'MUSS', 'MUST', 'MUTE', 'MUTS', 'MUTT', 'MYCS', 'MYNA',
  'MYTH', 'NAAN', 'NABE', 'NABS', 'NAGS', 'NAIF', 'NAIL', 'NAIR', 'NAME', 'NANA', 'NANS',
  'NAOI', 'NAOS', 'NAPA', 'NAPE', 'NAPS', 'NARC', 'NARD', 'NARY', 'NAVE', 'NAVY', 'NAYS',
  'NAZI', 'NEAP', 'NEAR', 'NEAT', 'NEBS', 'NECK', 'NEED', 'NEEM', 'NEEP', 'NEGS', 'NEIF',
  'NEMA', 'NENE', 'NEON', 'NERD', 'NESS', 'NEST', 'NETS', 'NETT', 'NEUK', 'NEUM', 'NEVE',
  'NEVI', 'NEWB', 'NEWS', 'NEWT', 'NEXT', 'NIBS', 'NICE', 'NICK', 'NIDE', 'NIDI', 'NIGH',
  'NILL', 'NILS', 'NIMS', 'NINE', 'NIPA', 'NIPS', 'NISI', 'NITE', 'NITS', 'NIXE', 'NIXY',
  'NOBS', 'NOCK', 'NODE', 'NODI', 'NODS', 'NOEL', 'NOES', 'NOGG', 'NOGS', 'NOIL', 'NOIR',
  'NOLO', 'NOMA', 'NOME', 'NOMS', 'NONA', 'NONE', 'NOOK', 'NOON', 'NOPE', 'NORI', 'NORM',
  'NOSE', 'NOSH', 'NOSY', 'NOTA', 'NOTE', 'NOTT', 'NOUN', 'NOUS', 'NOVA', 'NOWS', 'NOWT',
  'NUBS', 'NUDE', 'NUKE', 'NULL', 'NUMB', 'NUNS', 'NURD', 'NURL', 'NUTS', 'OAFS', 'OAKS',
  'OAKY', 'OARS', 'OAST', 'OATH', 'OATS', 'OBAS', 'OBES', 'OBEY', 'OBIA', 'OBIS', 'OBIT',
  'OBOE', 'OBOL', 'OCAS', 'OCHS', 'OCKS', 'OCRA', 'OCTA', 'ODAH', 'ODAS', 'ODDS', 'ODEA',
  'ODES', 'ODIC', 'ODOR', 'ODYL', 'OFAY', 'OFFS', 'OGAM', 'OGEE', 'OGLE', 'OGRE', 'OHED',
  'OHIA', 'OHMS', 'OILS', 'OILY', 'OINK', 'OKAS', 'OKAY', 'OKEH', 'OKES', 'OKRA', 'OLDE',
  'OLDS', 'OLDY', 'OLEA', 'OLEO', 'OLES', 'OLIO', 'OLLA', 'OMEN', 'OMER', 'OMIT', 'ONCE',
  'ONES', 'ONLY', 'ONOS', 'ONTO', 'ONUS', 'ONYX', 'OOHS', 'OOPS', 'OOSE', 'OOTS', 'OPAH',
  'OPAL', 'OPED', 'OPEN', 'OPES', 'OPTS', 'OPUS', 'ORAD', 'ORAL', 'ORBS', 'ORBY', 'ORCA',
  'ORCS', 'ORES', 'ORGY', 'ORLE', 'ORRA', 'ORTS', 'ORYX', 'ORZO', 'OSAR', 'OSES', 'OSSA',
  'OTIC', 'OTTO', 'OUCH', 'OUDS', 'OUPH', 'OURS', 'OUST', 'OUTS', 'OUZO', 'OVAL', 'OVEN',
  'OVER', 'OVUM', 'OWED', 'OWES', 'OWLS', 'OWNS', 'OWSE', 'OXEN', 'OXES', 'OXID', 'OXIM',
  'OYER', 'OYES', 'OYEZ', 'PACA', 'PACE', 'PACK', 'PACS', 'PACT', 'PACY', 'PADI', 'PADS',
  'PAGE', 'PAID', 'PAIK', 'PAIL', 'PAIN', 'PAIR', 'PALE', 'PALL', 'PALM', 'PALP', 'PALS',
  'PALY', 'PAMS', 'PAND', 'PANE', 'PANG', 'PANS', 'PANT', 'PAPA', 'PAPS', 'PARA', 'PARD',
  'PARE', 'PARK', 'PARR', 'PARS', 'PART', 'PASE', 'PASH', 'PASS', 'PAST', 'PATE', 'PATH',
  'PATS', 'PATY', 'PAVE', 'PAWK', 'PAWL', 'PAWN', 'PAWS', 'PAYS', 'PEAG', 'PEAK', 'PEAL',
  'PEAN', 'PEAR', 'PEAS', 'PEAT', 'PECH', 'PECK', 'PECS', 'PEDS', 'PEED', 'PEEK', 'PEEL',
  'PEEN', 'PEEP', 'PEER', 'PEGS', 'PEHS', 'PEIN', 'PEKE', 'PELE', 'PELF', 'PELT', 'PEND',
  'PENS', 'PENT', 'PEON', 'PEPO', 'PEPS', 'PERE', 'PERI', 'PERK', 'PERM', 'PERP', 'PERT',
  'PESO', 'PEST', 'PETS', 'PEWS', 'PFFT', 'PFUI', 'PHAT', 'PHEW', 'PHIS', 'PHIZ', 'PHON',
  'PHOT', 'PHUT', 'PIAL', 'PIAN', 'PIAS', 'PICA', 'PICE', 'PICK', 'PICS', 'PIED', 'PIER',
  'PIES', 'PIGS', 'PIKA', 'PIKE', 'PIKI', 'PILE', 'PILI', 'PILL', 'PILY', 'PIMA', 'PIMP',
  'PINA', 'PINE', 'PING', 'PINK', 'PINS', 'PINT', 'PINY', 'PION', 'PIPS', 'PIPY', 'PIRL',
  'PIRN', 'PISH', 'PISO', 'PISS', 'PITA', 'PITH', 'PITS', 'PITY', 'PIXY', 'PLAN', 'PLAT',
  'PLAY', 'PLEA', 'PLEB', 'PLED', 'PLEW', 'PLIE', 'PLOD', 'PLOP', 'PLOT', 'PLOW', 'PLOY',
  'PLUG', 'PLUM', 'PLUS', 'POCK', 'POCO', 'PODS', 'POEM', 'POET', 'POGY', 'POIS', 'POKE',
  'POKY', 'POLE', 'POLL', 'POLO', 'POLS', 'POLY', 'POME', 'POMP', 'POMS', 'POND', 'PONE',
  'PONG', 'PONS', 'PONY', 'POOD', 'POOF', 'POOH', 'POOL', 'POON', 'POOP', 'POOR', 'POOS',
  'POPE', 'POPS', 'PORE', 'PORK', 'PORN', 'PORT', 'POSE', 'POSH', 'POST', 'POSY', 'POTS',
  'POUF', 'POUR', 'POUT', 'POWS', 'POXY', 'PRAM', 'PRAO', 'PRAT', 'PRAY', 'PREE', 'PREP',
  'PREX', 'PREY', 'PREZ', 'PRIG', 'PRIM', 'PROA', 'PROD', 'PROF', 'PROG', 'PROM', 'PROP',
  'PROS', 'PROW', 'PSIS', 'PSST', 'PUCE', 'PUCK', 'PUDS', 'PUFF', 'PUGH', 'PUGS', 'PUJA',
  'PUKE', 'PULA', 'PULE', 'PULI', 'PULK', 'PULL', 'PULP', 'PULS', 'PUMA', 'PUMP', 'PUNA',
  'PUNG', 'PUNK', 'PUNS', 'PUNT', 'PUNY', 'PUPA', 'PUPS', 'PUPU', 'PURE', 'PURI', 'PURL',
  'PURR', 'PURS', 'PUSH', 'PUSS', 'PUTS', 'PUTT', 'PUTZ', 'PYAS', 'PYES', 'PYIC', 'PYIN',
  'PYRE', 'PYRO', 'QADI', 'QAID', 'QATS', 'QOPH', 'QUAD', 'QUAG', 'QUAI', 'QUAY', 'QUEY',
  'QUID', 'QUIN', 'QUIP', 'QUIT', 'QUIZ', 'QUOD', 'RACE', 'RACK', 'RACY', 'RADS', 'RAFF',
  'RAFT', 'RAGA', 'RAGE', 'RAGG', 'RAGI', 'RAGS', 'RAIA', 'RAID', 'RAIL', 'RAIN', 'RAIS',
  'RAJA', 'RAKE', 'RAKI', 'RAKU', 'RALE', 'RAMI', 'RAMP', 'RAMS', 'RAND', 'RANG', 'RANI',
  'RANK', 'RANT', 'RAPS', 'RAPT', 'RARE', 'RASE', 'RASH', 'RASP', 'RATE', 'RATH', 'RATO',
  'RATS', 'RAVE', 'RAWS', 'RAYA', 'RAYS', 'RAZE', 'RAZZ', 'READ', 'REAL', 'REAM', 'REAP',
  'REAR', 'REBS', 'RECK', 'RECS', 'REDD', 'REDE', 'REDO', 'REDS', 'REED', 'REEF', 'REEK',
  'REEL', 'REES', 'REFS', 'REFT', 'REGS', 'REIF', 'REIN', 'REIS', 'REMS', 'REND', 'RENT',
  'REPO', 'REPP', 'REPS', 'RESH', 'REST', 'RETE', 'RETS', 'REVS', 'RHEA', 'RHOS', 'RHUS',
  'RIAL', 'RIAS', 'RIBS', 'RICE', 'RICH', 'RICK', 'RIDE', 'RIDS', 'RIEL', 'RIFE', 'RIFF',
  'RIFS', 'RIFT', 'RIGS', 'RILE', 'RILL', 'RIME', 'RIMS', 'RIMY', 'RIND', 'RING', 'RINK',
  'RINS', 'RIOT', 'RIPA', 'RIPE', 'RIPS', 'RISE', 'RISK', 'RITE', 'RITZ', 'RIVE', 'ROAD',
  'ROAM', 'ROAN', 'ROAR', 'ROBE', 'ROBS', 'ROCK', 'ROCS', 'RODE', 'RODS', 'ROES', 'ROIL',
  'ROLE', 'ROLF', 'ROLL', 'ROMP', 'ROMS', 'ROOD', 'ROOF', 'ROOK', 'ROOM', 'ROOS', 'ROOT',
  'ROPE', 'ROPY', 'ROSE', 'ROSH', 'ROSY', 'ROTA', 'ROTE', 'ROTI', 'ROTL', 'ROTO', 'ROTS',
  'ROUE', 'ROUP', 'ROUT', 'ROUX', 'ROVE', 'ROWS', 'RUBE', 'RUBS', 'RUBY', 'RUCK', 'RUCS',
  'RUDD', 'RUDE', 'RUED', 'RUER', 'RUES', 'RUFF', 'RUGA', 'RUGS', 'RUIN', 'RULE', 'RULY',
  'RUMP', 'RUMS', 'RUNE', 'RUNG', 'RUNS', 'RUNT', 'RUSE', 'RUSH', 'RUSK', 'RUST', 'RUTH',
  'RUTS', 'RYAS', 'RYES', 'RYKE', 'RYND', 'RYOT', 'SABE', 'SABS', 'SACK', 'SACS', 'SADE',
  'SADI', 'SAFE', 'SAGA', 'SAGE', 'SAGO', 'SAGS', 'SAGY', 'SAID', 'SAIL', 'SAIN', 'SAKE',
  'SAKI', 'SALE', 'SALL', 'SALP', 'SALS', 'SALT', 'SAME', 'SAMP', 'SAND', 'SANE', 'SANG',
  'SANK', 'SANS', 'SAPS', 'SARD', 'SARI', 'SARK', 'SASH', 'SASS', 'SATE', 'SATI', 'SAUL',
  'SAVE', 'SAWN', 'SAWS', 'SAXE', 'SAYS', 'SCAB', 'SCAD', 'SCAG', 'SCAM', 'SCAN', 'SCAR',
  'SCAT', 'SCOP', 'SCOT', 'SCOW', 'SCRY', 'SCUD', 'SCUM', 'SCUP', 'SCUT', 'SEAL', 'SEAM',
  'SEAR', 'SEAS', 'SEAT', 'SECS', 'SECT', 'SEED', 'SEEK', 'SEEL', 'SEEM', 'SEEN', 'SEEP',
  'SEER', 'SEES', 'SEGO', 'SEGS', 'SEIF', 'SEIS', 'SELF', 'SELL', 'SELS', 'SEME', 'SEMI',
  'SEND', 'SENE', 'SENT', 'SEPT', 'SERA', 'SERE', 'SERF', 'SERS', 'SETA', 'SETS', 'SETT',
  'SEWN', 'SEWS', 'SEXT', 'SEXY', 'SHAD', 'SHAG', 'SHAH', 'SHAM', 'SHAT', 'SHAW', 'SHAY',
  'SHEA', 'SHED', 'SHES', 'SHEW', 'SHIM', 'SHIN', 'SHIP', 'SHIV', 'SHMO', 'SHOD', 'SHOE',
  'SHOG', 'SHOO', 'SHOP', 'SHOT', 'SHOW', 'SHRI', 'SHUL', 'SHUN', 'SHUT', 'SHWA', 'SIAL',
  'SIBB', 'SICE', 'SICK', 'SICS', 'SIDE', 'SIFT', 'SIGH', 'SIGN', 'SIKA', 'SIKE', 'SILD',
  'SILK', 'SILL', 'SILO', 'SILT', 'SIMP', 'SINE', 'SING', 'SINH', 'SINK', 'SINS', 'SIPE',
  'SIPS', 'SIRE', 'SIRI', 'SIRS', 'SITE', 'SITH', 'SITS', 'SIZE', 'SIZY', 'SKAG', 'SKAS',
  'SKAT', 'SKEE', 'SKEG', 'SKEN', 'SKEP', 'SKID', 'SKIM', 'SKIN', 'SKIP', 'SKIS', 'SKIT',
  'SKUA', 'SLAB', 'SLAG', 'SLAM', 'SLAP', 'SLAT', 'SLAW', 'SLAY', 'SLED', 'SLEW', 'SLID',
  'SLIM', 'SLIP', 'SLIT', 'SLOB', 'SLOG', 'SLOP', 'SLOT', 'SLOW', 'SLUB', 'SLUE', 'SLUG',
  'SLUM', 'SLUR', 'SMIT', 'SMOG', 'SMUG', 'SMUT', 'SNAG', 'SNAP', 'SNAW', 'SNED', 'SNIB',
  'SNIP', 'SNIT', 'SNOB', 'SNOG', 'SNOT', 'SNOW', 'SNUB', 'SNUG', 'SNYE', 'SOAK', 'SOAP',
  'SOAR', 'SOBA', 'SOBS', 'SOCA', 'SOCK', 'SODA', 'SODS', 'SOFA', 'SOFT', 'SOIL', 'SOJA',
  'SOKE', 'SOLA', 'SOLD', 'SOLE', 'SOLI', 'SOLO', 'SOLS', 'Soma', 'SOME', 'SOMS', 'SONE',
  'SONG', 'SONS', 'SOOK', 'SOON', 'SOOT', 'SOPH', 'SOPS', 'SORA', 'SORB', 'SORD', 'SORE',
  'SORI', 'SORN', 'SORT', 'SOTH', 'SOTS', 'SOUK', 'SOUL', 'SOUP', 'SOUR', 'SOUS', 'SOWN',
  'SOWS', 'SOYA', 'SOYS', 'SPAE', 'SPAM', 'SPAN', 'SPAR', 'SPAS', 'SPAT', 'SPAY', 'SPAZ',
  'SPEC', 'SPED', 'SPEW', 'SPIK', 'SPIN', 'SPIT', 'SPIV', 'SPRY', 'SPUD', 'SPUE', 'SPUN',
  'SPUR', 'SRIS', 'STAB', 'STAG', 'STAR', 'STAT', 'STAW', 'STAY', 'STED', 'STEM', 'STEP',
  'STET', 'STEW', 'STEY', 'STIR', 'STOA', 'STOB', 'STOP', 'STOT', 'STOW', 'STUB', 'STUD',
  'STUM', 'STUN', 'STYE', 'SUBA', 'SUBS', 'SUCH', 'SUCK', 'SUDD', 'SUDS', 'SUED', 'SUER',
  'SUES', 'SUET', 'SUGH', 'SUIT', 'SUKH', 'SULK', 'SULU', 'SUMO', 'SUMP', 'SUMS', 'SUNG',
  'SUNK', 'SUNN', 'SUNS', 'SUPE', 'SUPS', 'SUQS', 'SURA', 'SURD', 'SURE', 'SURF', 'SUSS',
  'SWAB', 'SWAG', 'SWAM', 'SWAN', 'SWAP', 'SWAT', 'SWAY', 'SWIG', 'SWIM', 'SWOB', 'SWOP',
  'SWOT', 'SWUM', 'SYBO', 'SYCE', 'SYKE', 'SYNE', 'SYNC', 'SYPH', 'TAEL', 'TAGS', 'TAIL',
  'TAKE', 'TALA', 'TALE', 'TALI', 'TALK', 'TALL', 'TAME', 'TAMP', 'TAMS', 'TANG', 'TANK',
  'TANS', 'TAOS', 'TAPA', 'TAPE', 'TAPS', 'TARE', 'TARN', 'TARO', 'TARP', 'TARS', 'TART',
  'TASK', 'TASS', 'TATE', 'TATS', 'TAUS', 'TAUT', 'TAVS', 'TAWS', 'TAXA', 'TAXI', 'TEAK',
  'TEAL', 'TEAM', 'TEAR', 'TEAS', 'TEAT', 'TECH', 'TEDS', 'TEED', 'TEEL', 'TEEM', 'TEEN',
  'TEES', 'TEFF', 'TEGG', 'TEGS', 'TELA', 'TELE', 'TELL', 'TELS', 'TEMP', 'TEND', 'TENS',
  'TENT', 'TEPA', 'TERM', 'TERN', 'TEST', 'TETH', 'TETS', 'TEWS', 'TEXT', 'THAN', 'THAT',
  'THAW', 'THEE', 'THEM', 'THEN', 'THEW', 'THEY', 'THIN', 'THIO', 'THIR', 'THIS', 'THOU',
  'THRO', 'THRU', 'THUD', 'THUG', 'THUS', 'TICK', 'TICS', 'TIDE', 'TIDY', 'TIED', 'TIER',
  'TIES', 'TIFF', 'TIKE', 'TIKI', 'TILE', 'TILL', 'TILS', 'TILT', 'TIME', 'TINE', 'TING',
  'TINS', 'TINT', 'TINY', 'TIPI', 'TIPS', 'TIRE', 'TIRL', 'TIRO', 'TITS', 'TIVY', 'TOAD',
  'TOBY', 'TOCK', 'TOCS', 'TODS', 'TOEA', 'TOED', 'TOES', 'TOFF', 'TOFT', 'TOFU', 'TOGA',
  'TOGS', 'TOIL', 'TOIT', 'TOKE', 'TOLA', 'TOLD', 'TOLE', 'TOLL', 'TOLU', 'TOMB', 'TOME',
  'TOMS', 'TONE', 'TONG', 'TONS', 'TOOK', 'TOOL', 'TOOM', 'TOON', 'TOOT', 'TOPE', 'TOPH',
  'TOPI', 'TOPO', 'TOPS', 'TORA', 'TORC', 'TORE', 'TORI', 'TORN', 'TORO', 'TORR', 'TORS',
  'TORT', 'TORY', 'TOSH', 'TOSS', 'TOTE', 'TOTS', 'TOUR', 'TOUT', 'TOWN', 'TOWS', 'TOWY',
  'TOYO', 'TOYS', 'TRAD', 'TRAM', 'TRAP', 'TRAY', 'TREE', 'TREF', 'TREK', 'TREM', 'TRES',
  'TRET', 'TREY', 'TRIG', 'TRIM', 'TRIO', 'TRIP', 'TROD', 'TROG', 'TROP', 'TROT', 'TROW',
  'TROY', 'TRUE', 'TRUG', 'TSAR', 'TUBA', 'TUBE', 'TUBS', 'TUCK', 'TUFA', 'TUFF', 'TUFT',
  'TUGS', 'TUIS', 'TULE', 'TUMP', 'TUNA', 'TUNE', 'TUNG', 'TUNS', 'TUPS', 'TURD', 'TURF',
  'TURK', 'TURN', 'TUSH', 'TUSK', 'TUTU', 'TWAE', 'TWAS', 'TWAT', 'TWEE', 'TWIG', 'TWIN',
  'TWIT', 'TWOS', 'TYEE', 'TYER', 'TYES', 'TYIN', 'TYKE', 'TYNE', 'TYPE', 'TYPO', 'TYPP',
  'TYPY', 'TYRE', 'TYRO', 'TZAR', 'UDON', 'UGHS', 'UGLI', 'UKES', 'ULAN', 'ULEE', 'ULNA',
  'ULUS', 'ULVA', 'UMBO', 'UMPS', 'UNAI', 'UNAU', 'UNBE', 'UNCI', 'UNCO', 'UNDE', 'UNDO',
  'UNDY', 'UNIT', 'UNTO', 'UPAS', 'UPBY', 'UPDO', 'UPON', 'URBS', 'URDS', 'UREA', 'URGE',
  'URIC', 'URNS', 'URPS', 'URSA', 'URUS', 'USED', 'USER', 'USES', 'UTAS', 'UTES', 'UVEA',
  'VACS', 'Vagi', 'VAIL', 'VAIN', 'VAIR', 'VALE', 'VAMP', 'VANE', 'VANG', 'VANS', 'VARA',
  'VARY', 'VASA', 'VASE', 'VAST', 'VATS', 'VATU', 'VAUS', 'VAVS', 'VAWS', 'VEAL', 'VEEP',
  'VEER', 'VEES', 'VEIL', 'VEIN', 'VELA', 'VELD', 'VENA', 'VEND', 'VENT', 'VERA', 'VERB',
  'VERT', 'VERY', 'VEST', 'VETO', 'VETS', 'VEXT', 'VIAL', 'VIBE', 'VICE', 'VIDE', 'VIDS',
  'VIED', 'VIER', 'VIES', 'VIEW', 'VIGA', 'VILE', 'VILL', 'VIMS', 'VINA', 'VINE', 'VINO',
  'VINS', 'VINY', 'VIOL', 'VIRL', 'VISA', 'VISE', 'VITA', 'VITE', 'VIVA', 'VIVE', 'VOES',
  'VOGS', 'VOID', 'VOLE', 'VOLT', 'VOTE', 'VOWS', 'VRIL', 'VROW', 'VUGG', 'VUGH', 'VUGS',
  'VULN', 'WABS', 'WACK', 'WADE', 'WADI', 'WADS', 'WADY', 'WAES', 'WAFF', 'WAFT', 'WAGE',
  'WAGS', 'WAIF', 'WAIL', 'WAIN', 'WAIR', 'WAIT', 'WAKE', 'WALE', 'WALK', 'WALL', 'WALY',
  'WAME', 'WAND', 'WANE', 'WANG', 'WANK', 'WANS', 'WANT', 'WANY', 'WAPS', 'WARD', 'WARE',
  'WARK', 'WARM', 'WARN', 'WARP', 'WARS', 'WART', 'WARY', 'WASH', 'WASP', 'WAST', 'WATS',
  'WATT', 'WAUK', 'WAUL', 'WAUR', 'WAVE', 'WAVY', 'WAWL', 'WAWS', 'WAXY', 'WAYS', 'WEAK',
  'WEAL', 'WEAN', 'WEAR', 'WEBS', 'WEDS', 'WEED', 'WEEK', 'WEEL', 'WEEN', 'WEEP', 'WEER',
  'WEES', 'WEET', 'WEFT', 'WEIR', 'WELD', 'WELL', 'WELT', 'WEND', 'WENS', 'WENT', 'WEPT',
  'WERE', 'WERT', 'WEST', 'WETS', 'WHAM', 'WHAP', 'WHAT', 'WHEE', 'WHEN', 'WHET', 'WHEW',
  'WHEY', 'WHID', 'WHIG', 'WHIM', 'WHIN', 'WHIP', 'WHIR', 'WHIT', 'WHIZ', 'WHOA', 'WHOM',
  'WHOP', 'WHOT', 'WHUP', 'WHYS', 'WICH', 'WICK', 'WIDE', 'WIFE', 'WIGS', 'WILD', 'WILE',
  'WILL', 'WILT', 'WILY', 'WIMP', 'WIND', 'WINE', 'WING', 'WINK', 'WINO', 'WINS', 'WINY',
  'WIPE', 'WIRE', 'WIRY', 'WISE', 'WISH', 'WISP', 'WISS', 'WIST', 'WITE', 'WITH', 'WITS',
  'WIVE', 'WOAD', 'WOES', 'WOKE', 'WOKS', 'WOLD', 'WOLF', 'WOMB', 'WONK', 'WONS', 'WONT',
  'WOOD', 'WOOF', 'WOOL', 'WOOS', 'WOPS', 'WORD', 'WORE', 'WORK', 'WORM', 'WORN', 'WORT',
  'WOS', 'WOST', 'WOTS', 'WOVE', 'WOWS', 'WRAP', 'WREN', 'WRIT', 'WUSS', 'WYCH', 'WYES',
  'WYLE', 'WYND', 'WYNN', 'WYNS', 'WYTE', 'XEBEC', 'XRAY', 'XYST', 'YACK', 'YAFF', 'YAGI',
  'YAKS', 'YALD', 'YAMS', 'YANG', 'YANK', 'YAPS', 'YARD', 'YARE', 'YARN', 'YAUD', 'YAUP',
  'YAWL', 'YAWN', 'YAWP', 'YAWS', 'YAYA', 'YAYS', 'YEAH', 'YEAN', 'YEAR', 'YEAS', 'YEBO',
  'YECH', 'YEED', 'YEGG', 'YELD', 'YELK', 'YELL', 'YELP', 'YENS', 'YEPS', 'YERK', 'YETT',
  'YEUK', 'Yews', 'YILL', 'YINS', 'YIPE', 'YIPS', 'YIRD', 'YIRL', 'YIRR', 'YITE', 'YLEM',
  'YOBS', 'YOCK', 'YODH', 'YODS', 'YOGA', 'YOGH', 'YOGI', 'YOKE', 'YOKEL', 'YOKS', 'YOLK',
  'YOND', 'YONI', 'YORE', 'YOUR', 'YOUS', 'YOWE', 'YOWL', 'YOWS', 'YUAN', 'YUCA', 'YUCH',
  'YUCK', 'YUGA', 'YUKS', 'YULE', 'YUPS', 'YURT', 'YUTZ', 'YWIS', 'ZAGS', 'ZANY', 'ZAPS',
  'ZARF', 'ZEAL', 'ZEBU', 'ZEDS', 'ZEES', 'ZEIN', 'ZEKS', 'ZERK', 'ZERO', 'ZEST', 'ZETA',
  'ZIGS', 'ZILL', 'ZINC', 'ZINE', 'ZING', 'ZINS', 'ZIPS', 'ZITI', 'ZITS', 'ZOEA', 'ZONA',
  'ZONE', 'ZONK', 'ZOOM', 'ZOON', 'ZOOS', 'ZORI', 'ZOUK', 'ZUZA', 'ZYME',
]);

function isValidWord(word: string): boolean {
  return COMMON_WORDS.has(word.toUpperCase());
}

export default function WordLadderGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle] = useState(() => getPuzzle(lang));
  const [ladder, setLadder] = useState<string[]>([puzzle.start]);
  const [currentWord, setCurrentWord] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, puzzle.start.length);
    setCurrentWord(value);
    setMessage('');
  };

  const submitWord = () => {
    const word = currentWord.toUpperCase();
    const lastWord = ladder[ladder.length - 1];

    if (word.length !== puzzle.start.length) {
      showMessage(`Must be ${puzzle.start.length} letters`, 'error');
      return;
    }

    if (word === lastWord) {
      showMessage('Same word', 'error');
      return;
    }

    if (!differsByOne(word, lastWord)) {
      showMessage('Must change exactly 1 letter', 'error');
      return;
    }

    if (!isValidWord(word)) {
      showMessage('Not a valid word', 'error');
      return;
    }

    const newLadder = [...ladder, word];
    setLadder(newLadder);
    setCurrentWord('');

    if (word === puzzle.target) {
      setIsComplete(true);
      trackGameComplete('word-ladder', { steps: newLadder.length - 1, optimal: puzzle.solution.length - 1 });
      showMessage(`Solved in ${newLadder.length - 1} steps!`, 'success');
    } else {
      showMessage('Good step!', 'success');
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2000);
  };

  const reset = () => {
    setLadder([puzzle.start]);
    setCurrentWord('');
    setIsComplete(false);
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-sand-500">
          {ladder.length - 1} steps
        </div>
        <div className="text-sm text-sand-500">
          Goal: {puzzle.target}
        </div>
      </div>

      {/* Ladder */}
      <div className="space-y-2 mb-6">
        {ladder.map((word, i) => (
          <motion.div
            key={`${word}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-bold">
              {i + 1}
            </div>
            <div className={`px-4 py-2 rounded-lg font-mono font-bold text-lg ${
              word === puzzle.target ? 'bg-green-100 text-green-700' : 'bg-white border border-sand-200'
            }`}>
              {word}
            </div>
            {i < ladder.length - 1 && (
              <ArrowRight className="w-4 h-4 text-sand-300" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Input */}
      {!isComplete && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={currentWord}
            onChange={handleInput}
            onKeyDown={e => e.key === 'Enter' && submitWord()}
            className="flex-1 px-4 py-3 border border-sand-200 rounded-xl text-center font-mono font-bold text-lg uppercase tracking-widest focus:outline-none focus:border-violet-400"
            placeholder={`Change 1 letter from ${ladder[ladder.length - 1]}`}
            maxLength={puzzle.start.length}
          />
          <button
            onClick={submitWord}
            className="px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition"
          >
            <CornerDownLeft className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Message */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center py-2 rounded-lg mb-4 ${
              messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-violet-500" />
              <h3 className="font-bold text-lg">Word Ladder Complete!</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{ladder.length - 1}</p>
                <p className="text-sm text-sand-500">Your Steps</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{puzzle.solution.length - 1}</p>
                <p className="text-sm text-sand-500">Optimal</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
