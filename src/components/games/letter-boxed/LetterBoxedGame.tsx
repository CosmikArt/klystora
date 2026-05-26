import { useState, useEffect, useCallback } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Zap, Trash2, Check, Box } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Pre-defined puzzles with valid solutions
const PUZZLES: Record<string, { sides: string[][]; minWords: number; solutions: string[][] }[]> = {
  en: [
    {
      sides: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I'], ['J', 'K', 'L']],
      minWords: 3,
      solutions: [['BEAD', 'FLICK', 'JAIL']]
    },
    {
      sides: [['M', 'N', 'O'], ['P', 'Q', 'R'], ['S', 'T', 'U'], ['V', 'W', 'X']],
      minWords: 4,
      solutions: [['MOST', 'TURN', 'VOW', 'WIMP']]
    },
  ],
  default: [
    {
      sides: [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'I'], ['J', 'K', 'L']],
      minWords: 3,
      solutions: [['BEAD', 'FLICK', 'JAIL']]
    },
  ]
};

function getPuzzle(lang: string) {
  const puzzles = PUZZLES[lang] || PUZZLES['default'];
  return puzzles[Math.floor(Math.random() * puzzles.length)];
}

// Simple word validation (in production, use a proper dictionary)
const COMMON_WORDS = new Set([
  'THE', 'AND', 'FOR', 'ARE', 'BUT', 'NOT', 'YOU', 'ALL', 'CAN', 'HAD', 'HER', 'WAS', 'ONE', 'OUR', 'OUT',
  'DAY', 'GET', 'HAS', 'HIM', 'HIS', 'HOW', 'MAN', 'NEW', 'NOW', 'OLD', 'SEE', 'TWO', 'WAY', 'WHO', 'BOY',
  'DID', 'ITS', 'LET', 'PUT', 'SAY', 'SHE', 'TOO', 'USE', 'ABLE', 'ACID', 'AGED', 'ALSO', 'AREA', 'ARMY',
  'AWAY', 'BABY', 'BACK', 'BALL', 'BAND', 'BANK', 'BASE', 'BATH', 'BEAR', 'BEAT', 'BEEN', 'BEER', 'BELL',
  'BELT', 'BEST', 'BIKE', 'BILL', 'BIRD', 'BLOW', 'BLUE', 'BOAT', 'BODY', 'BOND', 'BONE', 'BOOK', 'BORN',
  'BOSS', 'BOTH', 'BOWL', 'BULK', 'BURN', 'BUSH', 'BUSY', 'CALL', 'CALM', 'CAME', 'CAMP', 'CARD', 'CARE',
  'CASE', 'CASH', 'CAST', 'CELL', 'CHAT', 'CHIP', 'CITY', 'CLUB', 'COAL', 'COAT', 'CODE', 'COLD', 'COME',
  'COOK', 'COOL', 'COPY', 'CORE', 'COST', 'CREW', 'CROP', 'DARK', 'DATA', 'DATE', 'DAWN', 'DEAD', 'DEAL',
  'DEAR', 'DEBT', 'DEEP', 'DENY', 'DESK', 'DIAL', 'DIET', 'DISC', 'DISK', 'DOES', 'DONE', 'DOOR', 'DOSE',
  'DOWN', 'DRAW', 'DROP', 'DRUG', 'DUAL', 'DUST', 'DUTY', 'EARN', 'EASE', 'EAST', 'EDGE', 'EDIT', 'ELSE',
  'EVEN', 'EVER', 'EVIL', 'EXIT', 'FACE', 'FACT', 'FAIL', 'FAIR', 'FALL', 'FARM', 'FAST', 'FATE', 'FEAR',
  'FEED', 'FEEL', 'FEET', 'FELL', 'FELT', 'FILE', 'FILL', 'FILM', 'FIND', 'FINE', 'FIRE', 'FIRM', 'FISH',
  'FLAT', 'FLOW', 'FOOD', 'FOOT', 'FORM', 'FORT', 'FOUR', 'FREE', 'FROM', 'FUEL', 'FULL', 'FUND', 'GAIN',
  'GAME', 'GATE', 'GAVE', 'GEAR', 'GENE', 'GIFT', 'GIRL', 'GIVE', 'GLAD', 'GOAL', 'GOES', 'GOLD', 'GOLF',
  'GONE', 'GOOD', 'GREW', 'GROW', 'GULF', 'HAIR', 'HALF', 'HALL', 'HAND', 'HANG', 'HARD', 'HARM', 'HATE',
  'HAVE', 'HEAD', 'HEAR', 'HEAT', 'HELD', 'HELL', 'HELP', 'HERE', 'HERO', 'HIGH', 'HILL', 'HIRE', 'HOLD',
  'HOLE', 'HOLY', 'HOME', 'HOPE', 'HOST', 'HOUR', 'HUGE', 'HUNG', 'HUNT', 'HURT', 'IDEA', 'INCH', 'INTO',
  'IRON', 'ITEM', 'JOIN', 'JUMP', 'JUST', 'KEEP', 'KEPT', 'KICK', 'KILL', 'KIND', 'KING', 'KNEE', 'KNEW',
  'KNOW', 'LACK', 'LADY', 'LAID', 'LAKE', 'LAND', 'LANE', 'LAST', 'LATE', 'LEAD', 'LEFT', 'LESS', 'LIFE',
  'LIFT', 'LIKE', 'LINE', 'LINK', 'LIST', 'LIVE', 'LOAD', 'LOAN', 'LOCK', 'LONG', 'LOOK', 'LORD', 'LOSE',
  'LOSS', 'LOST', 'LOVE', 'LUCK', 'MADE', 'MAIL', 'MAIN', 'MAKE', 'MALE', 'MANY', 'MARK', 'MASS', 'MATE',
  'MATH', 'MEAL', 'MEAN', 'MEAT', 'MEET', 'MENU', 'MILE', 'MILK', 'MILL', 'MIND', 'MINE', 'MISS', 'MODE',
  'MOOD', 'MOON', 'MORE', 'MOST', 'MOVE', 'MUCH', 'MUST', 'NAME', 'NAVY', 'NEAR', 'NECK', 'NEED', 'NEWS',
  'NEXT', 'NICE', 'NINE', 'NONE', 'NOSE', 'NOTE', 'OKAY', 'ONCE', 'ONLY', 'ONTO', 'OPEN', 'ORAL', 'OVER',
  'PACE', 'PACK', 'PAGE', 'PAID', 'PAIN', 'PAIR', 'PALM', 'PARK', 'PART', 'PASS', 'PAST', 'PATH', 'PEAK',
  'PICK', 'PILE', 'PINK', 'PIPE', 'PLAN', 'PLAY', 'PLOT', 'PLUG', 'PLUS', 'POEM', 'POET', 'POOL', 'POOR',
  'PORT', 'POST', 'POUR', 'PRAY', 'PULL', 'PURE', 'PUSH', 'QUIT', 'RACE', 'RAIL', 'RAIN', 'RANK', 'RARE',
  'RATE', 'READ', 'REAL', 'REAR', 'RELY', 'RENT', 'REST', 'RICE', 'RICH', 'RIDE', 'RING', 'RISE', 'RISK',
  'ROAD', 'ROCK', 'ROLE', 'ROLL', 'ROOF', 'ROOM', 'ROOT', 'ROPE', 'ROSE', 'RULE', 'RUSH', 'SAFE', 'SAKE',
  'SALE', 'SALT', 'SAME', 'SAND', 'SAVE', 'SEAT', 'SEED', 'SEEK', 'SEEM', 'SEEN', 'SELF', 'SELL', 'SEND',
  'SENT', 'SHIP', 'SHOE', 'SHOP', 'SHOT', 'SHOW', 'SHUT', 'SICK', 'SIDE', 'SIGN', 'SILK', 'SITE', 'SIZE',
  'SKIN', 'SLIP', 'SLOW', 'SNOW', 'SOFT', 'SOIL', 'SOLD', 'SOLE', 'SOME', 'SONG', 'SOON', 'SORT', 'SOUL',
  'SOUP', 'SPAN', 'SPIN', 'SPOT', 'STAR', 'STAY', 'STEM', 'STEP', 'STOP', 'SUCH', 'SUIT', 'SURE', 'SURF',
  'SWIM', 'TAIL', 'TAKE', 'TALE', 'TALK', 'TALL', 'TANK', 'TAPE', 'TASK', 'TEAM', 'TEAR', 'TELL', 'TEND',
  'TERM', 'TEST', 'TEXT', 'THAN', 'THAT', 'THEM', 'THEN', 'THIN', 'THIS', 'THUS', 'TILL', 'TIME', 'TINY',
  'TOLD', 'TOLL', 'TONE', 'TOOK', 'TOOL', 'TOUR', 'TOWN', 'TREE', 'TRIP', 'TRUE', 'TUBE', 'TUNE', 'TURN',
  'TWIN', 'TYPE', 'UNIT', 'UPON', 'USED', 'USER', 'VARY', 'VAST', 'VERY', 'VIEW', 'VOTE', 'WAGE', 'WAIT',
  'WAKE', 'WALK', 'WALL', 'WANT', 'WARD', 'WARM', 'WASH', 'WAVE', 'WAYS', 'WEAK', 'WEAR', 'WEEK', 'WELL',
  'WENT', 'WERE', 'WEST', 'WHAT', 'WHEN', 'WHOM', 'WIDE', 'WIFE', 'WILD', 'WILL', 'WIND', 'WINE', 'WING',
  'WIRE', 'WISE', 'WISH', 'WITH', 'WOOD', 'WOOL', 'WORD', 'WORK', 'YARD', 'YEAR', 'ZERO', 'ZONE',
  // 5+ letter words
  'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN', 'AGENT', 'AGREE',
  'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER',
  'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO',
  'AUDIT', 'AVOID', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN', 'BEGUN', 'BEING',
  'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH',
  'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD',
  'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHECK',
  'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLOCK',
  'CLOSE', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CREAM', 'CRIME', 'CROSS',
  'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH',
  'DERBY', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DREAM', 'DRESS', 'DRINK', 'DRIVE', 'DROVE', 'DYING',
  'EARLY', 'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT',
  'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY', 'FIGHT',
  'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM',
  'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS',
  'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN',
  'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL', 'HOUSE',
  'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE',
  'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL',
  'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOGIC', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH',
  'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL',
  'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH',
  'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR',
  'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PHASE',
  'PHONE', 'PHOTO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND',
  'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN',
  'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REFER', 'RIGHT',
  'RIVAL', 'RIVER', 'ROBIN', 'ROBOT', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE',
  'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT',
  'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE',
  'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE',
  'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START',
  'STATE', 'STEAM', 'STEEL', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP',
  'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES',
  'TEACH', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING',
  'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'TIGHT', 'TIMES', 'TIRED', 'TITLE', 'TODAY', 'TOPIC',
  'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIED', 'TRUCK',
  'TRULY', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN',
  'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER',
  'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE',
  'WORST', 'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH',
  // 6+ letter words
  'ABROAD', 'ACCEPT', 'ACCESS', 'ACROSS', 'ACTING', 'ACTION', 'ACTIVE', 'ACTUAL', 'ADVICE', 'ADVISE', 'AGENCY',
  'AGENDA', 'ALMOST', 'ALWAYS', 'AMOUNT', 'ANIMAL', 'ANNUAL', 'ANSWER', 'ANYONE', 'ANYWAY', 'APPEAL', 'APPEAR',
  'AROUND', 'ARRIVE', 'ARTIST', 'ASPECT', 'ASSESS', 'ASSIST', 'ASSUME', 'ATTACK', 'ATTEND', 'AUGUST', 'AUTHOR',
  'AVENUE', 'BACKED', 'BARELY', 'BATTLE', 'BEAUTY', 'BECAME', 'BECOME', 'BEFORE', 'BEHALF', 'BEHIND', 'BELIEF',
  'BELONG', 'BERLIN', 'BETTER', 'BEYOND', 'BISHOP', 'BORDER', 'BOTTLE', 'BOTTOM', 'BOUGHT', 'BRANCH', 'BREATH',
  'BRIDGE', 'BRIGHT', 'BROKEN', 'BUDGET', 'BURDEN', 'BUREAU', 'BUTTON', 'CAMERA', 'CANCER', 'CANNOT', 'CARBON',
  'CAREER', 'CASTLE', 'CASUAL', 'CAUGHT', 'CENTER', 'CENTRE', 'CHANCE', 'CHANGE', 'CHARGE', 'CHOICE', 'CHOOSE',
  'CHOSEN', 'CHURCH', 'CIRCLE', 'CLIENT', 'CLOSED', 'CLOSER', 'COFFEE', 'COLUMN', 'COMBAT', 'COMING', 'COMMON',
  'COMPLY', 'COPPER', 'CORNER', 'COSTLY', 'COUNTY', 'COUPLE', 'COURSE', 'COVERS', 'CREATE', 'CREDIT', 'CRISIS',
  'CUSTOM', 'DAMAGE', 'DANGER', 'DEALER', 'DEBATE', 'DECIDE', 'DEFEAT', 'DEFEND', 'DEFINE', 'DEGREE', 'DEMAND',
  'DEPEND', 'DEPUTY', 'DESERT', 'DESIGN', 'DESIRE', 'DETAIL', 'DETECT', 'DEVICE', 'DIFFER', 'DINNER', 'DIRECT',
  'DOCTOR', 'DOLLAR', 'DOMAIN', 'DOUBLE', 'DRIVEN', 'DRIVER', 'DURING', 'EASILY', 'EATING', 'EDITOR', 'EFFECT',
  'EFFORT', 'EIGHTY', 'EITHER', 'ELEVEN', 'EMERGE', 'EMPIRE', 'EMPLOY', 'ENDING', 'ENERGY', 'ENGAGE', 'ENGINE',
  'ENOUGH', 'ENSURE', 'ENTIRE', 'ENTITY', 'EQUITY', 'ESCAPE', 'ESTATE', 'ETHICS', 'EXCEED', 'EXCEPT', 'EXCESS',
  'EXPAND', 'EXPECT', 'EXPERT', 'EXPORT', 'EXTEND', 'EXTENT', 'FABRIC', 'FACING', 'FACTOR', 'FAILED', 'FAIRLY',
  'FALLEN', 'FAMILY', 'FAMOUS', 'FATHER', 'FELLOW', 'FEMALE', 'FIGURE', 'FILING', 'FINGER', 'FINISH', 'FISCAL',
  'FLIGHT', 'FLYING', 'FOLLOW', 'FORCED', 'FOREST', 'FORGET', 'FORMAL', 'FORMAT', 'FORMER', 'FOSTER', 'FOUGHT',
  'FOURTH', 'FRENCH', 'FRIEND', 'FUTURE', 'GARDEN', 'GATHER', 'GENDER', 'GERMAN', 'GLOBAL', 'GOLDEN', 'GROUND',
  'GROWTH', 'GUILTY', 'HANDLE', 'HAPPEN', 'HARDLY', 'HEALTH', 'HEAVEN', 'HEIGHT', 'HIDDEN', 'HOLDER', 'HOLLOW',
  'HONEST', 'HORROR', 'HORSES', 'HOSTLE', 'HOUSING', 'HUMOUR', 'HUNGER', 'HUNTED', 'HUNTER', 'IGNORE', 'IMPACT',
  'IMPORT', 'INCOME', 'INDEED', 'INJURY', 'INSIDE', 'INTEND', 'INTENT', 'INVEST', 'ISLAND', 'ITSELF', 'JERSEY',
  'JUNIOR', 'KILLED', 'LABOUR', 'LATEST', 'LAUNCH', 'LAWYER', 'LEADER', 'LEAGUE', 'LEAVES', 'LEGACY', 'LENGTH',
  'LESSON', 'LETTER', 'LIGHTS', 'LIKELY', 'LINKED', 'LISTEN', 'LITTLE', 'LIVING', 'LOCATE', 'LONDON', 'LONELY',
  'LOSING', 'LOVELY', 'LUXURY', 'MAINLY', 'MAKING', 'MANAGE', 'MANNER', 'MANUAL', 'MARGIN', 'MARINE', 'MARKED',
  'MARKET', 'MARTIN', 'MASTER', 'MATTER', 'MATURE', 'MEDIUM', 'MEMBER', 'MEMORY', 'MENTAL', 'MERELY', 'MERGER',
  'METHOD', 'MIDDLE', 'MILLER', 'MINING', 'MINUTE', 'MIRROR', 'MOBILE', 'MODERN', 'MODEST', 'MODULE', 'MOMENT',
  'MORRIS', 'MOSTLY', 'MOTHER', 'MOTION', 'MOVING', 'MURDER', 'MUSEUM', 'MUTUAL', 'MYSELF', 'NARROW', 'NATION',
  'NATIVE', 'NATURE', 'NEARLY', 'NIGHTS', 'NOBODY', 'NORMAL', 'NOTICE', 'NOTION', 'NUMBER', 'OBJECT', 'OBTAIN',
  'OFFICE', 'OFFSET', 'ONLINE', 'OPTION', 'ORANGE', 'ORIGIN', 'OUTPUT', 'OXFORD', 'PACKED', 'PALACE', 'PARENT',
  'PARKER', 'PARTLY', 'PATENT', 'PEOPLE', 'PERIOD', 'PERMIT', 'PERSON', 'PHRASE', 'PICKED', 'PLANET', 'PLAYER',
  'PLEASE', 'PLENTY', 'POCKET', 'POLICE', 'POLICY', 'PREFER', 'PRETTY', 'PRINCE', 'PRISON', 'PROFIT', 'PROPER',
  'PROVE', 'PUBLIC', 'PURSUE', 'RAISED', 'RANDOM', 'RARELY', 'RATHER', 'RATING', 'READER', 'REALLY', 'REASON',
  'RECALL', 'RECENT', 'RECORD', 'REDUCE', 'REFORM', 'REGARD', 'REGIME', 'REGION', 'RELATE', 'RELIEF', 'REMAIN',
  'REMOTE', 'REMOVE', 'REPAIR', 'REPEAT', 'REPLAY', 'REPORT', 'RESCUE', 'RESORT', 'RESULT', 'RETAIL', 'RETAIN',
  'RETURN', 'REVEAL', 'REVIEW', 'RHYTHM', 'RIDING', 'RISING', 'ROBUST', 'ROCKET', 'ROLLER', 'ROMMAN', 'SAFETY',
  'SALARY', 'SAMPLE', 'SAVING', 'SCHEME', 'SCHOOL', 'SCREAM', 'SCREEN', 'SCRIPT', 'SEARCH', 'SEASON', 'SECOND',
  'SECRET', 'SECTOR', 'SECURE', 'SEEING', 'SELECT', 'SELLER', 'SENIOR', 'SERIES', 'SERVER', 'SETTLE', 'SEVERE',
  'SEXUAL', 'SHOULD', 'SIGNAL', 'SIGNED', 'SILENT', 'SILVER', 'SIMPLE', 'SIMPLY', 'SINGLE', 'SISTER', 'SLIGHT',
  'SMOOTH', 'SOCIAL', 'SOCIETY', 'SOFTLY', 'SOLELY', 'SOUGHT', 'SOURCE', 'SOVIET', 'SPEECH', 'SPIRIT', 'SPOKEN',
  'SPREAD', 'SPRING', 'SQUARE', 'STABLE', 'STATUS', 'STEADY', 'STOLEN', 'STRAIN', 'STREAM', 'STREET', 'STRESS',
  'STRICT', 'STRIKE', 'STRING', 'STRONG', 'STRUCK', 'STUDIO', 'SUBMIT', 'SUDDEN', 'SUFFER', 'SUMMER', 'SUMMIT',
  'SUPPLY', 'SURELY', 'SURVEY', 'SWITCH', 'SYMBOL', 'SYSTEM', 'TAKING', 'TALENT', 'TARGET', 'TAUGHT', 'TENANT',
  'TENDER', 'TENNIS', 'THANKS', 'THEORY', 'THIRTY', 'THOUGH', 'THREAT', 'THROWN', 'TICKET', 'TIMING', 'TISSUE',
  'TONGUE', 'TOPICS', 'TOUCH', 'TOWARD', 'TRAVEL', 'TREATY', 'TRYING', 'TWELVE', 'TWENTY', 'UNABLE', 'UNIQUE',
  'UNITED', 'UNLESS', 'UNLIKE', 'UPDATE', 'USEFUL', 'VALLEY', 'VARIED', 'VENDOR', 'VERSUS', 'VICTIM', 'VISION',
  'VISUAL', 'VOLUME', 'WALKER', 'WANTED', 'WARNING', 'WEALTH', 'WEEKLY', 'WEIGHT', 'WHOLLY', 'WINDOW', 'WINNER',
  'WINTER', 'WITHIN', 'WONDER', 'WORKER', 'WRIGHT', 'WRITER', 'YELLOW'
]);

function isValidWord(word: string): boolean {
  return COMMON_WORDS.has(word.toUpperCase()) && word.length >= 3;
}

export default function LetterBoxedGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();

  const [puzzle] = useState(() => getPuzzle(lang));
  const [currentWord, setCurrentWord] = useState('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [usedLetters, setUsedLetters] = useState<Set<string>>(new Set());
  const [lastSide, setLastSide] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [isComplete, setIsComplete] = useState(false);

  const getSide = (letter: string): number => {
    for (let i = 0; i < 4; i++) {
      if (puzzle.sides[i].includes(letter.toUpperCase())) return i;
    }
    return -1;
  };

  const handleLetterClick = (letter: string) => {
    if (isComplete) return;

    const side = getSide(letter);
    if (side === -1) return;

    // Can't use same side consecutively
    if (lastSide !== null && side === lastSide) {
      showMessage('Cannot use same side twice in a row', 'error');
      return;
    }

    setCurrentWord(prev => prev + letter.toUpperCase());
    setLastSide(side);
    setMessage('');
  };

  const submitWord = () => {
    const word = currentWord.toUpperCase();

    if (word.length < 3) {
      showMessage('Word must be at least 3 letters', 'error');
      return;
    }

    if (foundWords.includes(word)) {
      showMessage('Already found!', 'error');
      return;
    }

    if (!isValidWord(word)) {
      showMessage('Not a valid word', 'error');
      return;
    }

    // Check all letters are from the puzzle
    const puzzleLetters = puzzle.sides.flat();
    if (!word.split('').every(c => puzzleLetters.includes(c))) {
      showMessage('Use only letters from the box', 'error');
      return;
    }

    setFoundWords(prev => [...prev, word]);
    setScore(prev => prev + word.length * 10);

    const newUsed = new Set(usedLetters);
    word.split('').forEach(c => newUsed.add(c));
    setUsedLetters(newUsed);

    // Check if all letters used
    const allUsed = puzzleLetters.every(c => newUsed.has(c));
    if (allUsed) {
      setIsComplete(true);
      trackGameComplete('letter-boxed', { score, wordsFound: foundWords.length + 1 });
      showMessage('Queen Bee! All letters used!', 'success');
    } else {
      showMessage(`+${word.length * 10} points`, 'success');
    }

    setCurrentWord('');
    setLastSide(null);
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 2000);
  };

  const clearWord = () => {
    setCurrentWord('');
    setLastSide(null);
    setMessage('');
  };

  const reset = () => {
    setCurrentWord('');
    setFoundWords([]);
    setUsedLetters(new Set());
    setLastSide(null);
    setScore(0);
    setMessage('');
    setIsComplete(false);
  };

  const getRank = () => {
    const totalLetters = puzzle.sides.flat().length;
    const pct = usedLetters.size / totalLetters;
    if (pct >= 1) return 'Queen Bee';
    if (pct >= 0.7) return 'Outstanding';
    if (pct >= 0.5) return 'Solid';
    if (pct >= 0.3) return 'Good';
    return 'Beginner';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-violet-500">
            <Zap className="w-4 h-4" />
            <span className="font-bold">{score}</span>
          </div>
          <div className="text-sm text-sand-500">
            {usedLetters.size}/{puzzle.sides.flat().length} letters
          </div>
        </div>
        <div className="text-sm font-medium text-sand-500">
          {getRank()}
        </div>
      </div>

      {/* Letter Box */}
      <div className="flex justify-center mb-6">
        <div className="relative w-72 h-72">
          {/* Box border */}
          <div className="absolute inset-4 border-2 border-sand-300 rounded-lg" />
          
          {/* Top side */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2">
            {puzzle.sides[0].map((letter, i) => (
              <button
                key={`top-${i}`}
                onClick={() => handleLetterClick(letter)}
                disabled={isComplete}
                className={`w-12 h-12 rounded-lg font-bold text-lg transition ${
                  usedLetters.has(letter)
                    ? 'bg-green-100 text-green-600 border-2 border-green-300'
                    : lastSide === 0
                    ? 'bg-sand-100 text-sand-300 cursor-not-allowed'
                    : 'bg-white border-2 border-sand-200 text-coal hover:border-violet-400 hover:bg-violet-50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {puzzle.sides[1].map((letter, i) => (
              <button
                key={`right-${i}`}
                onClick={() => handleLetterClick(letter)}
                disabled={isComplete}
                className={`w-12 h-12 rounded-lg font-bold text-lg transition ${
                  usedLetters.has(letter)
                    ? 'bg-green-100 text-green-600 border-2 border-green-300'
                    : lastSide === 1
                    ? 'bg-sand-100 text-sand-300 cursor-not-allowed'
                    : 'bg-white border-2 border-sand-200 text-coal hover:border-violet-400 hover:bg-violet-50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Bottom side */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {puzzle.sides[2].map((letter, i) => (
              <button
                key={`bottom-${i}`}
                onClick={() => handleLetterClick(letter)}
                disabled={isComplete}
                className={`w-12 h-12 rounded-lg font-bold text-lg transition ${
                  usedLetters.has(letter)
                    ? 'bg-green-100 text-green-600 border-2 border-green-300'
                    : lastSide === 2
                    ? 'bg-sand-100 text-sand-300 cursor-not-allowed'
                    : 'bg-white border-2 border-sand-200 text-coal hover:border-violet-400 hover:bg-violet-50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Left side */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {puzzle.sides[3].map((letter, i) => (
              <button
                key={`left-${i}`}
                onClick={() => handleLetterClick(letter)}
                disabled={isComplete}
                className={`w-12 h-12 rounded-lg font-bold text-lg transition ${
                  usedLetters.has(letter)
                    ? 'bg-green-100 text-green-600 border-2 border-green-300'
                    : lastSide === 3
                    ? 'bg-sand-100 text-sand-300 cursor-not-allowed'
                    : 'bg-white border-2 border-sand-200 text-coal hover:border-violet-400 hover:bg-violet-50'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Word */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 bg-white border border-sand-200 rounded-xl px-4 py-3 text-lg font-mono font-bold text-center min-h-[48px]">
          {currentWord || 'Click letters to form a word'}
        </div>
        <button
          onClick={clearWord}
          className="p-3 text-sand-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          onClick={submitWord}
          disabled={currentWord.length < 3 || isComplete}
          className="px-6 py-3 bg-violet-500 text-white font-medium rounded-xl hover:bg-violet-600 transition disabled:opacity-50"
        >
          Enter
        </button>
      </div>

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

      {/* Found Words */}
      <div className="bg-white border border-sand-200 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {foundWords.map(word => (
            <span key={word} className="px-2 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium">
              {word}
            </span>
          ))}
          {foundWords.length === 0 && (
            <span className="text-sand-400 text-sm">No words found yet. Start connecting!</span>
          )}
        </div>
      </div>

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
              <h3 className="font-bold text-lg">Solved!</h3>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{score}</p>
                <p className="text-sm text-sand-500">Points</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{foundWords.length}</p>
                <p className="text-sm text-sand-500">Words</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-violet-600">{getRank()}</p>
                <p className="text-sm text-sand-500">Rank</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 bg-violet-500 text-white font-medium px-6 py-3 rounded-xl hover:bg-violet-600 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!isComplete && (
        <div className="mt-6 flex items-start gap-3 text-sm text-sand-500">
          <Box className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="mb-2">Connect letters from different sides to form words:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Words must be at least 3 letters long</li>
              <li>Consecutive letters must be from different sides</li>
              <li>Use all 12 letters to achieve Queen Bee rank</li>
              <li>Longer words = more points</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
