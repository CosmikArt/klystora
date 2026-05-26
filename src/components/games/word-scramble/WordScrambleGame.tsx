import { useState, useEffect, useCallback, useRef } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Zap, Clock, Lightbulb, Shuffle, Star } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Word lists by language (simplified - in production these would be larger)
const WORD_LISTS: Record<string, string[]> = {
  en: ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'dad', 'mom', 'act', 'add', 'age', 'ago', 'aid', 'air', 'all', 'art', 'ask', 'bad', 'bag', 'bar', 'bat', 'bed', 'bet', 'bid', 'big', 'bit', 'bus', 'buy', 'car', 'cat', 'cop', 'cow', 'cry', 'cup', 'cut', 'dog', 'dry', 'due', 'eat', 'egg', 'end', 'eye', 'fan', 'far', 'fat', 'fee', 'few', 'fit', 'fix', 'fly', 'fun', 'gap', 'gas', 'god', 'guy', 'gym', 'hat', 'hit', 'hot', 'hug', 'hut', 'ice', 'ill', 'ink', 'inn', 'jam', 'jar', 'jaw', 'jet', 'job', 'joy', 'key', 'kid', 'kit', 'lab', 'lap', 'law', 'lay', 'leg', 'lid', 'lie', 'lip', 'log', 'lot', 'low', 'mad', 'map', 'mat', 'may', 'mix', 'mud', 'mug', 'nap', 'net', 'nod', 'nut', 'oak', 'odd', 'off', 'oil', 'owl', 'own', 'pad', 'pan', 'pay', 'pea', 'pen', 'pet', 'pie', 'pig', 'pin', 'pit', 'pop', 'pot', 'pro', 'pub', 'pun', 'rag', 'ram', 'ran', 'rap', 'rat', 'raw', 'ray', 'red', 'rib', 'rid', 'rig', 'rim', 'rip', 'rob', 'rod', 'row', 'rub', 'rug', 'run', 'sad', 'sat', 'saw', 'sea', 'set', 'sew', 'shy', 'sin', 'sip', 'sir', 'sit', 'ski', 'sky', 'sly', 'son', 'spa', 'spy', 'sum', 'sun', 'tab', 'tag', 'tan', 'tap', 'tax', 'tea', 'ten', 'the', 'tie', 'tin', 'tip', 'toe', 'ton', 'too', 'top', 'tow', 'toy', 'try', 'tub', 'tug', 'van', 'vet', 'via', 'war', 'wax', 'web', 'wed', 'wet', 'wig', 'win', 'wit', 'won', 'wow', 'yes', 'yet', 'zip', 'zoo', 'able', 'acid', 'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball', 'band', 'bank', 'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt', 'best', 'bike', 'bill', 'bird', 'blow', 'blue', 'boat', 'body', 'bomb', 'bond', 'bone', 'book', 'boom', 'born', 'boss', 'both', 'bowl', 'bulk', 'burn', 'bush', 'busy', 'call', 'calm', 'came', 'camp', 'card', 'care', 'case', 'cash', 'cast', 'cell', 'chat', 'chip', 'city', 'club', 'coal', 'coat', 'code', 'cold', 'come', 'cook', 'cool', 'copy', 'core', 'cost', 'crew', 'crop', 'dark', 'data', 'date', 'dawn', 'dead', 'deal', 'dear', 'debt', 'deep', 'deny', 'desk', 'dial', 'diet', 'disc', 'disk', 'does', 'done', 'door', 'dose', 'down', 'draw', 'drop', 'drug', 'dual', 'duke', 'dust', 'duty', 'earn', 'ease', 'east', 'edge', 'edit', 'else', 'even', 'ever', 'evil', 'exit', 'face', 'fact', 'fail', 'fair', 'fall', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel', 'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'flat', 'flow', 'food', 'foot', 'ford', 'form', 'fort', 'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gave', 'gear', 'gene', 'gift', 'girl', 'give', 'glad', 'goal', 'goes', 'gold', 'golf', 'gone', 'good', 'grew', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hang', 'hard', 'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here', 'hero', 'high', 'hill', 'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host', 'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'jack', 'jazz', 'join', 'jump', 'jury', 'just', 'keen', 'keep', 'kept', 'kick', 'kill', 'kind', 'king', 'knee', 'knew', 'know', 'lack', 'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late', 'lead', 'left', 'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load', 'loan', 'lock', 'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck', 'made', 'mail', 'main', 'make', 'male', 'many', 'mark', 'mass', 'mate', 'math', 'meal', 'mean', 'meat', 'meet', 'menu', 'mile', 'milk', 'mill', 'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'navy', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nine', 'none', 'nose', 'note', 'nuclear', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'over', 'pace', 'pack', 'page', 'paid', 'pain', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pile', 'pink', 'pipe', 'plan', 'play', 'plot', 'plug', 'plus', 'poem', 'poet', 'pool', 'poor', 'port', 'post', 'pour', 'pray', 'pull', 'pure', 'push', 'quit', 'race', 'rail', 'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose', 'rule', 'rush', 'ruth', 'safe', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent', 'ship', 'shoe', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'silk', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'soup', 'span', 'spin', 'spot', 'star', 'stay', 'stem', 'step', 'stop', 'such', 'suit', 'sure', 'surf', 'swim', 'tail', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tell', 'tend', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'thin', 'this', 'thus', 'till', 'time', 'tiny', 'told', 'toll', 'tone', 'took', 'tool', 'tour', 'town', 'tree', 'trip', 'true', 'tube', 'tune', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'vary', 'vast', 'very', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'ward', 'warm', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what', 'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish', 'with', 'wood', 'wool', 'word', 'work', 'yard', 'year', 'zero', 'zone'],
  es: ['que', 'de', 'la', 'en', 'un', 'ser', 'se', 'no', 'haber', 'por', 'con', 'su', 'para', 'como', 'estar', 'tener', 'le', 'lo', 'pero', 'más', 'hacer', 'poder', 'decir', 'este', 'ir', 'otro', 'ese', 'la', 'si', 'me', 'ya', 'ver', 'porque', 'dar', 'cuando', 'él', 'muy', 'sin', 'vez', 'mucho', 'saber', 'qué', 'sobre', 'mi', 'alguno', 'mismo', 'yo', 'también', 'hasta', 'año', 'dos', 'querer', 'entre', 'así', 'primero', 'desde', 'grande', 'eso', 'ni', 'nos', 'llegar', 'pasar', 'tiempo', 'ella', 'sí', 'día', 'uno', 'bien', 'poco', 'deber', 'entonces', 'poner', 'cosa', 'tanto', 'hombre', 'parecer', 'nuestro', 'tan', 'donde', 'ahora', 'parte', 'después', 'vida', 'quedar', 'siempre', 'creer', 'hablar', 'llevar', 'dejar', 'nada', 'cada', 'seguir', 'menos', 'nuevo', 'encontrar'],
  default: ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'man', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'its', 'let', 'put', 'say', 'she', 'too', 'use', 'able', 'acid', 'aged', 'also', 'area', 'army', 'away', 'baby', 'back', 'ball', 'band', 'bank', 'base', 'bath', 'bear', 'beat', 'been', 'beer', 'bell', 'belt', 'best', 'bike', 'bill', 'bird', 'blow', 'blue', 'boat', 'body', 'bond', 'bone', 'book', 'born', 'boss', 'both', 'bowl', 'bulk', 'burn', 'bush', 'busy', 'call', 'calm', 'came', 'camp', 'card', 'care', 'case', 'cash', 'cast', 'cell', 'chat', 'chip', 'city', 'club', 'coal', 'coat', 'code', 'cold', 'come', 'cook', 'cool', 'copy', 'core', 'cost', 'crew', 'crop', 'dark', 'data', 'date', 'dawn', 'dead', 'deal', 'dear', 'debt', 'deep', 'deny', 'desk', 'dial', 'diet', 'disc', 'disk', 'does', 'done', 'door', 'dose', 'down', 'draw', 'drop', 'drug', 'dual', 'dust', 'duty', 'earn', 'ease', 'east', 'edge', 'edit', 'else', 'even', 'ever', 'evil', 'exit', 'face', 'fact', 'fail', 'fair', 'fall', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel', 'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'flat', 'flow', 'food', 'foot', 'form', 'fort', 'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gate', 'gave', 'gear', 'gene', 'gift', 'girl', 'give', 'glad', 'goal', 'goes', 'gold', 'golf', 'gone', 'good', 'grew', 'grow', 'gulf', 'hair', 'half', 'hall', 'hand', 'hang', 'hard', 'harm', 'hate', 'have', 'head', 'hear', 'heat', 'held', 'hell', 'help', 'here', 'hero', 'high', 'hill', 'hire', 'hold', 'hole', 'holy', 'home', 'hope', 'host', 'hour', 'huge', 'hung', 'hunt', 'hurt', 'idea', 'inch', 'into', 'iron', 'item', 'join', 'jump', 'just', 'keen', 'keep', 'kept', 'kick', 'kill', 'kind', 'king', 'knee', 'knew', 'know', 'lack', 'lady', 'laid', 'lake', 'land', 'lane', 'last', 'late', 'lead', 'left', 'less', 'life', 'lift', 'like', 'line', 'link', 'list', 'live', 'load', 'loan', 'lock', 'long', 'look', 'lord', 'lose', 'loss', 'lost', 'love', 'luck', 'made', 'mail', 'main', 'make', 'male', 'many', 'mark', 'mass', 'mate', 'math', 'meal', 'mean', 'meat', 'meet', 'menu', 'mile', 'milk', 'mill', 'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'name', 'navy', 'near', 'neck', 'need', 'news', 'next', 'nice', 'nine', 'none', 'nose', 'note', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'over', 'pace', 'pack', 'page', 'paid', 'pain', 'pair', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'pick', 'pile', 'pink', 'pipe', 'plan', 'play', 'plot', 'plug', 'plus', 'poem', 'poet', 'pool', 'poor', 'port', 'post', 'pour', 'pray', 'pull', 'pure', 'push', 'quit', 'race', 'rail', 'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose', 'rule', 'rush', 'safe', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'seat', 'seed', 'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent', 'ship', 'shoe', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sign', 'silk', 'site', 'size', 'skin', 'slip', 'slow', 'snow', 'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'soup', 'span', 'spin', 'spot', 'star', 'stay', 'stem', 'step', 'stop', 'such', 'suit', 'sure', 'surf', 'swim', 'tail', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'tell', 'tend', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'thin', 'this', 'thus', 'till', 'time', 'tiny', 'told', 'toll', 'tone', 'took', 'tool', 'tour', 'town', 'tree', 'trip', 'true', 'tube', 'tune', 'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'vary', 'vast', 'very', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'ward', 'warm', 'wash', 'wave', 'ways', 'weak', 'wear', 'week', 'well', 'went', 'were', 'west', 'what', 'when', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish', 'with', 'wood', 'wool', 'word', 'work', 'yard', 'year', 'zero', 'zone'],
};

// Generate a daily puzzle from letters
function generatePuzzle(lang: string): { letters: string[]; centerLetter: string; validWords: string[]; pangram: string } {
  const words = WORD_LISTS[lang] || WORD_LISTS['default'];
  
  // Find words with 7 unique letters
  const sevenLetterWords = words.filter(w => w.length >= 7);
  const pangram = sevenLetterWords[Math.floor(Math.random() * sevenLetterWords.length)] || 'abcdefg';
  
  // Get unique letters from pangram
  const uniqueLetters = [...new Set(pangram.split(''))].slice(0, 7);
  while (uniqueLetters.length < 7) {
    const extra = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    if (!uniqueLetters.includes(extra)) uniqueLetters.push(extra);
  }
  
  const centerLetter = uniqueLetters[0];
  
  // Find all valid words (3+ letters, containing center letter, using only puzzle letters)
  const validWords = words.filter(word => {
    if (word.length < 3) return false;
    if (!word.includes(centerLetter)) return false;
    return word.split('').every(c => uniqueLetters.includes(c));
  });
  
  return { letters: uniqueLetters, centerLetter, validWords, pangram };
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function WordScrambleGame() {
  const { trackGameComplete } = useAnalytics();
  const { lang } = useLanguage();
  
  const [puzzle, setPuzzle] = useState(() => generatePuzzle(lang));
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const [hints, setHints] = useState(3);
  const [timeLeft, setTimeLeft] = useState(180);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [shuffledLetters, setShuffledLetters] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setShuffledLetters(shuffleArray(puzzle.letters));
  }, [puzzle]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            finishGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const finishGame = useCallback(() => {
    setIsActive(false);
    setIsComplete(true);
    trackGameComplete('word-scramble', { 
      score, 
      wordsFound: foundWords.length,
      time: 180 - timeLeft 
    });
  }, [score, foundWords.length, timeLeft, trackGameComplete]);

  const startGame = () => {
    setIsActive(true);
    inputRef.current?.focus();
  };

  const submitWord = () => {
    const word = currentWord.toLowerCase().trim();
    
    if (!word) return;
    
    if (word.length < 3) {
      showMessage('Too short! Minimum 3 letters.', 'error');
      return;
    }
    
    if (!word.includes(puzzle.centerLetter)) {
      showMessage(`Must include center letter "${puzzle.centerLetter.toUpperCase()}"`, 'error');
      return;
    }
    
    if (foundWords.includes(word)) {
      showMessage('Already found!', 'error');
      return;
    }
    
    if (puzzle.validWords.includes(word)) {
      const points = word.length === 3 ? 100 : word.length === 4 ? 200 : word.length === 5 ? 400 : word.length === 6 ? 800 : 1500;
      const isPangram = puzzle.letters.every(l => word.includes(l));
      const finalPoints = isPangram ? points * 2 : points;
      
      setFoundWords(prev => [...prev, word]);
      setScore(prev => prev + finalPoints);
      
      if (isPangram) {
        showMessage(`Pangram! +${finalPoints} points`, 'success');
      } else {
        showMessage(`+${finalPoints} points`, 'success');
      }
      
      setCurrentWord('');
      
      if (!isActive) startGame();
    } else {
      showMessage('Not in word list', 'error');
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

  const useHint = () => {
    if (hints <= 0) return;
    
    const unfoundWords = puzzle.validWords.filter(w => !foundWords.includes(w));
    if (unfoundWords.length === 0) return;
    
    const hintWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
    setHints(prev => prev - 1);
    showMessage(`Hint: ${hintWord[0].toUpperCase()}...`, 'success');
  };

  const reset = () => {
    const newPuzzle = generatePuzzle(lang);
    setPuzzle(newPuzzle);
    setFoundWords([]);
    setCurrentWord('');
    setScore(0);
    setMessage('');
    setMessageType('');
    setHints(3);
    setTimeLeft(180);
    setIsActive(false);
    setIsComplete(false);
    setShuffledLetters(shuffleArray(newPuzzle.letters));
  };

  const getRank = () => {
    const maxScore = puzzle.validWords.reduce((acc, w) => {
      const pts = w.length === 3 ? 100 : w.length === 4 ? 200 : w.length === 5 ? 400 : w.length === 6 ? 800 : 1500;
      return acc + pts;
    }, 0);
    const pct = score / maxScore;
    if (pct >= 0.7) return 'Queen Bee';
    if (pct >= 0.5) return 'Outstanding';
    if (pct >= 0.3) return 'Solid';
    if (pct >= 0.15) return 'Good';
    return 'Beginner';
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sand-500">
            <Clock className="w-4 h-4" />
            <span className={`font-mono text-lg font-bold ${timeLeft <= 30 ? 'text-red-500' : ''}`}>
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>
          <div className="flex items-center gap-2 text-violet-500">
            <Star className="w-4 h-4" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={useHint}
            disabled={hints <= 0 || isComplete}
            className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-medium bg-amber-100 text-amber-600 hover:bg-amber-200 transition disabled:opacity-50"
          >
            <Lightbulb className="w-4 h-4" />
            {hints}
          </button>
          <button
            onClick={() => setShuffledLetters(shuffleArray(shuffledLetters))}
            className="p-1 rounded-lg text-sand-500 hover:bg-sand-100 transition"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Letter Grid */}
      <div className="flex justify-center mb-6">
        <div className="relative w-64 h-64">
          {/* Center letter */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-violet-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg z-10">
            {puzzle.centerLetter.toUpperCase()}
          </div>
          {/* Surrounding letters */}
          {shuffledLetters.slice(1).map((letter, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180);
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);
            return (
              <button
                key={i}
                onClick={() => {
                  setCurrentWord(prev => prev + letter);
                  inputRef.current?.focus();
                  if (!isActive) startGame();
                }}
                className="absolute w-14 h-14 bg-white border-2 border-sand-200 rounded-full flex items-center justify-center text-xl font-bold text-coal hover:border-violet-400 hover:bg-violet-50 transition -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {letter.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          ref={inputRef}
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value.toLowerCase())}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submitWord();
            if (e.key === 'Backspace' && currentWord === '') {
              // Allow backspace to clear
            }
          }}
          className="flex-1 px-4 py-3 border border-sand-200 rounded-xl text-lg font-mono uppercase focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          placeholder="Type a word..."
          disabled={isComplete}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button
          onClick={submitWord}
          disabled={isComplete || currentWord.length < 3}
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

      {/* Progress */}
      <div className="flex items-center justify-between mb-4 text-sm text-sand-500">
        <span>{foundWords.length} of {puzzle.validWords.length} words found</span>
        <span className="font-medium">{getRank()}</span>
      </div>

      {/* Found Words */}
      <div className="bg-white border border-sand-200 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {foundWords.sort().map(word => (
            <span key={word} className="px-2 py-1 bg-violet-100 text-violet-700 rounded-lg text-sm font-medium">
              {word}
              {puzzle.letters.every(l => word.includes(l)) && (
                <Star className="w-3 h-3 inline ml-1 text-amber-500" />
              )}
            </span>
          ))}
          {foundWords.length === 0 && (
            <span className="text-sand-400 text-sm">No words found yet. Start typing!</span>
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
              <h3 className="font-bold text-lg">Results</h3>
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
      {!isActive && !isComplete && (
        <div className="mt-6 flex items-start gap-3 text-sm text-sand-500">
          <Zap className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="mb-2">Form words using the letters above. Rules:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Words must be at least 3 letters long</li>
              <li>Must include the center letter (purple)</li>
              <li>Letters can be reused</li>
              <li>3 letters = 100pts, 4 = 200pts, 5 = 400pts, 6 = 800pts, 7+ = 1500pts</li>
              <li>Use all 7 letters for a Pangram (2x bonus!)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
