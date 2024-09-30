const fs = require('fs');
const { createSitemap } = require('sitemap');
const { courses } = require('./src/data/lessons.json'); 

const urls = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/quiz', changefreq: 'daily', priority: 0.8 },
  { url: '/courses', changefreq: 'weekly', priority: 0.8 },
  { url: '/search', changefreq: 'weekly', priority: 0.6 },
];


Object.keys(courses).forEach(courseId => {
  const course = courses[courseId];
  urls.push({ url: `/courses/${courseId}`, changefreq: 'monthly', priority: 0.5 });

  course.lessons.forEach(lesson => {
    urls.push({ url: `/courses/${courseId}/lesson/${lesson.id}`, changefreq: 'monthly', priority: 0.4 });
  });
});

const sitemap = createSitemap({
  hostname: 'https://learnalgerian.vercel.app',
  cacheTime: 600000,
  urls,
});


fs.writeFileSync('./public/sitemap.xml', sitemap.toString());
console.log('Sitemap generated: public/sitemap.xml');
