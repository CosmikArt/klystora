import { useCallback } from 'react';

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, props?: Record<string, string | number>) => {
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, { props });
    }
  }, []);

  const trackGameStart = useCallback((game: string) => {
    trackEvent('Game Start', { game });
  }, [trackEvent]);

  const trackGameComplete = useCallback((game: string, score: number, won: boolean) => {
    trackEvent('Game Complete', { game, score: String(score), result: won ? 'win' : 'loss' });
  }, [trackEvent]);

  const trackShare = useCallback((game: string, platform: string) => {
    trackEvent('Share', { game, platform });
  }, [trackEvent]);

  const trackLanguageChange = useCallback((from: string, to: string) => {
    trackEvent('Language Change', { from, to });
  }, [trackEvent]);

  return { trackEvent, trackGameStart, trackGameComplete, trackShare, trackLanguageChange };
}
