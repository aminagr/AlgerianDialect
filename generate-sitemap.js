import sitemapModule from 'sitemap';
const { createSitemap } = sitemapModule; 

import { writeFileSync } from 'fs'; 

const sitemap = createSitemap({
    hostname: 'https://learnalgerian.vercel.app',
    cacheTime: 600000, // 10 minutes
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


writeFileSync('public/sitemap.xml', sitemap.toString());
