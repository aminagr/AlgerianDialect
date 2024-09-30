import sitemap from 'sitemap';
import { writeFileSync } from 'fs';

const { createSitemap } = sitemap; 

const sitemapInstance = createSitemap({
    hostname: 'https://learnalgerian.vercel.app',
    cacheTime: 600000, 
    urls: [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/quiz', changefreq: 'daily', priority: 0.8 },
        { url: '/quiz/:level', changefreq: 'daily', priority: 0.8 },
        { url: '/courses', changefreq: 'daily', priority: 0.8 },
        { url: '/courses/:courseId', changefreq: 'monthly', priority: 0.6 },
        { url: '/courses/:courseId/:lessonId', changefreq: 'daily', priority: 0.6 },
        { url: '/search', changefreq: 'daily', priority: 0.6 },
    ],
});

// Écrire le sitemap dans le dossier public
writeFileSync('public/sitemap.xml', sitemapInstance.toString());
