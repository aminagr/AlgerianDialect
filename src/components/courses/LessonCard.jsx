import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import '../../styles/Courses.css';
import lessonsData from '../../data/lessons.json';

const LessonCard = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { language, translations } = useAppContext(); 
  const course = lessonsData.courses[courseId];

  if (!course) {
    return <div>{translations[language].lesson.title}: Course not found</div>;
  }

  const lesson = lessonId 
    ? course.lessons.find(lesson => lesson.id === parseInt(lessonId)) 
    : course.lessons[0]; 

  if (!lesson) {
    return <div>{translations[language].lesson.title}: Lesson not found</div>;
  }

  const currentLessonIndex = course.lessons.indexOf(lesson);
  const totalLessons = course.lessons.length;

  const handleNext = () => {
    const nextLessonId = currentLessonIndex + 1;
    if (nextLessonId < totalLessons) {
      navigate(`/courses/${courseId}/${course.lessons[nextLessonId].id}`);
    }
  };

  const handlePrev = () => {
    const prevLessonId = currentLessonIndex - 1;
    if (prevLessonId >= 0) {
      navigate(`/courses/${courseId}/${course.lessons[prevLessonId].id}`);
    }
  };

  const handleClose = () => {
    navigate('/courses'); 
  };


  const seoTranslations = {
    fr: {
      title: "{{word.dz}} : {{word.fr}} en algérien | cours de : {{course.title}}",
      description: "Cours de {{course.title}} : {{word.dz}} EN DIALECTE ALGERIEN signifie {{word.fr}}.",
      keywords: "traduction de {{word.fr}} en algérien, traduction de {{word.dz}} en français, {{course.title}} en algérien, que signifie {{word.dz}}, comment dire {{word.fr}} en algérien",
    },
    en: {
      title: "{{word.dz}} : {{word.en}} in Algerian | course of: {{course.title}}",
      description: "Course of {{course.title}}: {{word.dz}} IN ALGERIAN DIALECT means {{word.en}}.",
      keywords: "translation of {{word.en}} in Algerian, translation of {{word.dz}} in English, {{course.title}} in Algerian, what does {{word.dz}} mean, how to say {{word.en}} in Algerian",
    },
    es: {
      title: "{{word.dz}} : {{word.es}} en argelino | curso de : {{course.title}}",
      description: "Curso de {{course.title}} : {{word.dz}} EN DIALECTO ARGELINO significa {{word.es}}.",
      keywords: "traducción de {{word.es}} en argelino, traducción de {{word.dz}} en español, {{course.title}} en argelino, qué significa {{word.dz}}, cómo decir {{word.es}} en argelino",
    },
    it: {
      title: "{{word.dz}} : {{word.it}} in algerino | corso di : {{course.title}}",
      description: "Corso di {{course.title}} : {{word.dz}} IN DIALETTO ALGERINO significa {{word.it}}.",
      keywords: "traduzione di {{word.it}} in algerino, traduzione di {{word.dz}} in italiano, {{course.title}} in algerino, cosa significa {{word.dz}}, come si dice {{word.it}} in algerino",
    },
    ru: {
      title: "{{word.dz}} : {{word.ru}} на алжирском | курс : {{course.title}}",
      description: "Курс {{course.title}} : {{word.dz}} В АЛЖИРСКОМ ДИАЛЕКТЕ означает {{word.ru}}.",
      keywords: "перевод {{word.ru}} на алжирский, перевод {{word.dz}} на русский, {{course.title}} на алжирском, что означает {{word.dz}}, как сказать {{word.ru}} на алжирском",
    },
    ar: {
      title: "{{word.dz}} :  باللهجة الجزائرية | {{word.ar}} ",
      description: "درس {{course.title}} : {{word.dz}} يعني باللهجة الجزائرية {{word.ar}}.",
      keywords: "ترجمة {{word.ar}} إلى اللهجة الجزائرية، ترجمة {{word.dz}} إلى العربية، {{course.title}} باللهجة الجزائرية، ماذا يعني {{word.dz}}، كيف تقول {{word.ar}} باللهجة الجزائرية",
    },
    
  };


  const seoTitle = seoTranslations[language].title
    .replace('{{word.dz}}', lesson.word.dz)
    .replace('{{word.en}}', lesson.word.en)
    .replace('{{word.fr}}', lesson.word.fr || lesson.word.en)
    .replace('{{word.es}}', lesson.word.es || lesson.word.en)
    .replace('{{word.it}}', lesson.word.it || lesson.word.en)
    .replace('{{word.ru}}', lesson.word.ru || lesson.word.en)
    .replace('{{word.ar}}', lesson.word.ar || lesson.word.en)
    .replace('{{course.title}}', course.title[language]);

  const seoDescription = seoTranslations[language].description
    .replace('{{course.title}}', course.title[language])
    .replace('{{word.dz}}', lesson.word.dz)
    .replace('{{word.en}}', lesson.word.en)
    .replace('{{word.fr}}', lesson.word.fr || lesson.word.en)
    .replace('{{word.es}}', lesson.word.es || lesson.word.en)
    .replace('{{word.it}}', lesson.word.it || lesson.word.en)
    .replace('{{word.ru}}', lesson.word.ru || lesson.word.en)
    .replace('{{word.ar}}', lesson.word.ar || lesson.word.en);

  const seoKeywords = seoTranslations[language].keywords
    .replace('{{word.fr}}', lesson.word.fr || lesson.word.en)
    .replace('{{word.dz}}', lesson.word.dz)
    .replace('{{word.en}}', lesson.word.en)
    .replace('{{word.es}}', lesson.word.es || lesson.word.en)
    .replace('{{word.it}}', lesson.word.it || lesson.word.en)
    .replace('{{word.ru}}', lesson.word.ru || lesson.word.en)
    .replace('{{word.ar}}', lesson.word.ar || lesson.word.en)
    .replace('{{course.title}}', course.title[language]);


  React.useEffect(() => {
    document.title = seoTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaDescription) {
      metaDescription.content = seoDescription;
    }

    if (metaKeywords) {
      metaKeywords.content = seoKeywords;
    }
  }, [seoTitle, seoDescription, seoKeywords]);

  return (
    <div className="lesson-card">
      <button className="close-button" onClick={handleClose}>
        ❌
      </button>
      <h2>{course.title[language]}</h2>
      <h3>{lesson.word.dz}</h3>
      <p>{lesson.word[language] || translations[language].lesson.note}</p>
      <div className="button-container">
        <button onClick={handlePrev} disabled={currentLessonIndex === 0}>
          {translations[language].lesson.previous}
        </button>
        <div className='lesson-progress'>
          {currentLessonIndex + 1} / {totalLessons}
        </div>
        <button onClick={handleNext} disabled={currentLessonIndex === totalLessons - 1}>
          {translations[language].lesson.next}
        </button>
      </div>
    </div>
  );
};

export default LessonCard;
