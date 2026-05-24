import { useLanguage } from '@/hooks/useLanguage';

interface GameTabBarProps {
  activeTab: 'daily' | 'practice' | 'archive';
  onTabChange: (tab: 'daily' | 'practice' | 'archive') => void;
}

export default function GameTabBar({ activeTab, onTabChange }: GameTabBarProps) {
  const { lang } = useLanguage();

  const tabs: { key: 'daily' | 'practice' | 'archive'; labelEn: string; labelEs: string }[] = [
    { key: 'daily', labelEn: 'Daily', labelEs: 'Diaria' },
    { key: 'practice', labelEn: 'Practice', labelEs: 'Pr\u00e1ctica' },
    { key: 'archive', labelEn: 'Archive', labelEs: 'Archivo' },
  ];

  return (
    <div className="max-w-[360px] mx-auto mb-6">
      <div className="flex bg-sand-200 dark:bg-dark-elevated rounded-xl p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex-1 py-2.5 rounded-[10px] text-heading-sm transition-all duration-200 ease-smooth ${
              activeTab === tab.key
                ? 'bg-sand-100 dark:bg-dark-surface text-ink-900 dark:text-dark-text shadow-sm'
                : 'text-ink-500 dark:text-dark-text-tertiary hover:text-ink-700 dark:hover:text-dark-text-secondary'
            }`}
          >
            {lang === 'es' ? tab.labelEs : tab.labelEn}
          </button>
        ))}
      </div>
    </div>
  );
}
