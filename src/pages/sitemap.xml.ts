import type { APIRoute } from 'astro';

const site = 'https://klystora.com';

const enPages = [
  '',
  '/daily-word',
  '/mini-crossword',
  '/word-search',
  '/anagrams',
  '/connections',
  '/spelling-bee',
  '/word-ladder',
  '/word-wheel',
  '/about',
  '/blog',
  '/privacy',
  '/terms',
];

const esPages = [
  '/es/',
  '/es/palabra-diaria',
  '/es/crucigrama-mini',
  '/es/sopa-de-letras',
  '/es/anagramas',
  '/es/conexiones',
  '/es/colmena',
  '/es/escalera-de-palabras',
  '/es/rosco',
  '/es/about',
  '/es/blog',
  '/es/privacy',
  '/es/terms',
];

export const GET: APIRoute = async () => {
  const urls = [...enPages, ...esPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${site}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '' || url === '/es/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
