import type { APIRoute } from 'astro';
import { locales, gameSlugs } from '../lib/i18n';

export const GET: APIRoute = async () => {
  const baseUrl = 'https://klystora.com';
  const today = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = ['', 'about', 'blog', 'pricing', 'privacy', 'terms'];

  // Game pages
  const games = Object.keys(gameSlugs.en);

  let urls = '';

  // Root pages (EN)
  for (const page of staticPages) {
    const path = page ? `/${page}` : '';
    urls += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  }

  // Root game pages (EN)
  for (const game of games) {
    const slug = gameSlugs.en[game as keyof typeof gameSlugs.en];
    urls += `  <url>\n    <loc>${baseUrl}/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }

  // Localized pages
  for (const locale of locales) {
    if (locale === 'en') continue;

    for (const page of staticPages) {
      const path = page ? `/${locale}/${page}` : `/${locale}`;
      urls += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${page === '' ? '0.9' : '0.7'}</priority>\n  </url>\n`;
    }

    for (const game of games) {
      const slug = gameSlugs[locale as keyof typeof gameSlugs]?.[game as keyof typeof gameSlugs.en] || gameSlugs.en[game as keyof typeof gameSlugs.en];
      urls += `  <url>\n    <loc>${baseUrl}/${locale}/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }
  }

  // Blog posts
  const blogSlugs = [
    'best-starting-words-wordle',
    'crossword-solving-tips',
    'spelling-bee-pangrams',
    'word-games-brain-health',
    'connections-strategy-guide',
    'word-search-themes-for-adults',
    'anagrams-scoring-strategy',
    'word-ladder-shortest-path',
    'rosco-history-pasapalabra',
    'why-klystora-30-languages'
  ];

  for (const slug of blogSlugs) {
    urls += `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};
