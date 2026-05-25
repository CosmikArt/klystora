import { describe, it, expect } from 'vitest';
import { locales, getMessages, getLocaleFromPath, type Locale } from './i18n';

describe('i18n', () => {
  it('should have 27 locales', () => {
    expect(locales.length).toBe(27);
  });

  it('should have English as first locale', () => {
    expect(locales[0]).toBe('en');
  });

  it('should return messages for all locales', () => {
    for (const locale of locales) {
      const messages = getMessages(locale as Locale);
      expect(messages).toBeDefined();
      expect(messages.nav).toBeDefined();
      expect(messages.nav.games).toBeDefined();
      expect(messages.footer).toBeDefined();
      expect(messages.games).toBeDefined();
    }
  });

  it('should have all 14 games in messages', () => {
    const messages = getMessages('en');
    const gameKeys = Object.keys(messages.games);
    expect(gameKeys.length).toBeGreaterThanOrEqual(14);
  });

  it('should detect locale from path', () => {
    expect(getLocaleFromPath('/')).toBe('en');
    expect(getLocaleFromPath('/es/')).toBe('es');
    expect(getLocaleFromPath('/es/daily-word')).toBe('es');
    expect(getLocaleFromPath('/fr/jeu-du-jour')).toBe('fr');
  });

  it('should fallback to English for unknown locale', () => {
    const messages = getMessages('xx' as Locale);
    expect(messages).toBeDefined();
    expect(messages.nav.games).toBeDefined();
  });

  it('should have game slugs for all locales', () => {
    for (const locale of locales) {
      const messages = getMessages(locale as Locale);
      expect(Object.keys(messages.games).length).toBeGreaterThan(0);
    }
  });
});
