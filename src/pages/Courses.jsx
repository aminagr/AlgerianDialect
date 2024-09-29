import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard'; 
import { useNavigate, useLocation } from 'react-router-dom';
import lessonsData from '../data/lessons.json';
import '../styles/Courses.css';
import SEO from '../components/SEO';
import useSearch from '../hooks/useSearch';
const translations = {
  fr: {
    search: {
      placeholder: "Recherchez un mot...",
      noResultsFound: "Aucun résultat trouvé",
    },
    seo: {
      title: "Cours de Dialècte Algérien",
      description: "Découvrez nos cours de dialècte algérien",
      keywords: "cours algérien, apprendre l'algérien, langue algérienne, dialècte algérien, algérie",
    },
  },
  en: {
    search: {
      placeholder: "Search for a word...",
      noResultsFound: "No results found",
    },
    seo: {
      title: "Algerian Dialect Courses",
      description: "Explore our Algerian language courses to enhance your skills.",
      keywords: "algerian courses, learn algerian, algerian language",
    },
  },
  es: {
    search: {
      placeholder: "Busca una palabra argelina o española...",
      noResultsFound: "No se encontraron resultados",
    },
    seo: {
      title: "Cursos de Lengua Argelina",
      description: "Descubre nuestros cursos de lengua argelina para mejorar tus habilidades.",
      keywords: "cursos argelinos, aprender argelino, lengua argelina",
    },
  },
  it: {
    search: {
      placeholder: "Cerca una parola algerina o italiana...",
      noResultsFound: "Nessun risultato trovato",
    },
    seo: {
      title: "Corsi di Lingua Algerina",
      description: "Scopri i nostri corsi di lingua algerina per migliorare le tue abilità.",
      keywords: "corsi algerini, imparare l'algerino, lingua algerina",
    },
  },
  ru: {
    search: {
      placeholder: "Поиск алжирский или русский...",
      noResultsFound: "Результатов не найдено",
    },
    seo: {
      title: "Курсы по Алжирскому Языку",
      description: "Изучите наши курсы по алжирскому языку для повышения ваших навыков.",
      keywords: "алжирские курсы, изучать алжирский, алжирский язык",
    },
  },
  ar: {
    search: {
      placeholder: "ابحث عن دورة...",
      noResultsFound: "لم يتم العثور على نتائج",
    },
    seo: {
      title: "دروس الهجة الجزائرية",
      description: "اكتشف دروس اللهجة الجزائرية لتعلمها بكل سهولة.",
      keywords: "دروس جزائرية، تعلم الجزائرية، اللهجة الجزائرية",
    },
  },
};

const Courses = () => {
  const { language } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');

  
  const searchResults = useSearch(searchTerm);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(searchTerm);
    }
  };

  const handleResultClick = (courseId, lessonId) => {
    navigate(`/courses/${courseId}/${lessonId}`);
    setSearchTerm('');
  };

  const renderCourseCards = () => {
    return Object.keys(lessonsData.courses).map((courseId, index) => (
      <CourseCard
        key={index}
        title={lessonsData.courses[courseId].title[language]}
        onClick={() => navigate(`/courses/${courseId}`)} 
      />
    ));
  };

  return (
    <div className="courses-page">
      <SEO 
        title={translations[language].seo.title} 
        description={translations[language].seo.description} 
        keywords={translations[language].seo.keywords} 
        image="url-to-courses-image.jpg" 
      />
      <div className="search-bar">
        <div className="input-container">
          <input 
            type="text" 
            placeholder={translations[language].search.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <button className="search-icon" onClick={() => setSearchTerm(searchTerm)}>
            🔍
          </button>
        </div>
      </div>
      {searchResults.length > 0 ? (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div 
              key={index} 
              className="search-result" 
              onClick={() => handleResultClick(result.courseId, result.lesson.id)}
            >
              <strong>{result.lesson.word.dz}</strong>: {result.lesson.word[language]}
            </div>
          ))}
        </div>
      ) : (
        searchTerm && <div className="no-results">{translations[language].search.noResultsFound}</div>
      )}
      {searchResults.length === 0 && (
        <div className="courses">
          {renderCourseCards()}
        </div>
      )}
    </div>
  );
};

export default Courses;