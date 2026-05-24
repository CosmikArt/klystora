import { memo, useCallback } from 'react';
import { Delete } from 'lucide-react';

export type KeyState = 'default' | 'correct' | 'partial' | 'wrong';

interface VirtualKeyboardProps {
  keyStates: Record<string, KeyState>;
  onKeyPress: (key: string) => void;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

function getKeyClasses(key: string, state: KeyState): string {
  const isSpecial = key === 'ENTER' || key === 'BACKSPACE';

  if (isSpecial) {
    return 'px-2 sm:px-3 text-caption font-semibold bg-[#3D3933] dark:bg-[#3A3750] text-white hover:bg-[#1A1714] dark:hover:bg-[#7A748C] active:scale-95 transition-all duration-75';
  }

  const base = 'w-[32px] sm:w-[40px] md:w-[44px] h-[52px] sm:h-[56px] rounded-md text-[13px] sm:text-sm font-semibold active:scale-95 transition-all duration-75';

  switch (state) {
    case 'correct':
      return `${base} bg-[#4A8B5B] text-white hover:bg-[#3D7450]`;
    case 'partial':
      return `${base} bg-[#D9A93E] text-white hover:bg-[#BF9130]`;
    case 'wrong':
      return `${base} bg-[#7A7268] text-white hover:bg-[#5E574F]`;
    default:
      return `${base} bg-[#F0EDE6] dark:bg-[#282636] text-[#1A1714] dark:text-[#F0EDE8] hover:bg-[#E2DED4] dark:hover:bg-[#3A3750]`;
  }
}

const KeyButton = memo(function KeyButton({
  keyLabel,
  state,
  onPress,
  disabled,
}: {
  keyLabel: string;
  state: KeyState;
  onPress: (key: string) => void;
  disabled: boolean;
}) {
  const handleClick = useCallback(() => {
    if (!disabled) onPress(keyLabel);
  }, [disabled, keyLabel, onPress]);

  const isSpecial = keyLabel === 'ENTER' || keyLabel === 'BACKSPACE';

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${getKeyClasses(keyLabel, state)} ${disabled && !isSpecial ? 'opacity-50 cursor-not-allowed' : ''} flex items-center justify-center rounded-[6px]`}
    >
      {keyLabel === 'BACKSPACE' ? (
        <Delete size={18} strokeWidth={1.5} />
      ) : keyLabel === 'ENTER' ? (
        <span className="text-[10px] sm:text-xs uppercase tracking-wide">Enter</span>
      ) : (
        keyLabel
      )}
    </button>
  );
});

const VirtualKeyboard = memo(function VirtualKeyboard({
  keyStates,
  onKeyPress,
  disabled = false,
}: VirtualKeyboardProps) {
  return (
    <div className="w-full max-w-[520px] mx-auto space-y-1.5 select-none">
      {KEYBOARD_ROWS.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-[5px] sm:gap-[6px]">
          {row.map((key) => (
            <KeyButton
              key={key}
              keyLabel={key}
              state={keyStates[key] || 'default'}
              onPress={onKeyPress}
              disabled={disabled}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

export default VirtualKeyboard;
