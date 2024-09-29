import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAppContext } from '../context/AppContext';

import '../styles/Home.css';
import SEO from '../components/SEO';

import useSearch from '../hooks/useSearch';
const translations = {
  fr: {
    search: {
      placeholder: "Recherchez un mot...",
      noResultsFound: "Aucun résultat trouvé",
    },
    seo: {
      title: "Apprendre le Dialècte Algérien",
      description: "Bienvenue sur notre plateforme d'apprentissage de la langue algérienne.",
      keywords: "cours algérien, apprendre l'algérien, langue algérienne",
    },
  },
  en: {
    search: {
      placeholder: "Search for a word...",
      noResultsFound: "No results found",
    },
    seo: {
      title: "Learn Algerian Dialect",
      description: "Welcome to our platform for learning the Algerian language.",
      keywords: "algerian courses, learn algerian, algerian language",
    },
  },
  es: {
    search: {
      placeholder: "Busca una palabra argelina o española...",
      noResultsFound: "No se encontraron resultados",
    },
    seo: {
      title: "Aprende el dialecto argelino",
      description: "Bienvenido a nuestra plataforma de aprendizaje de la lengua argelina.",
      keywords: "cursos argelinos, aprender argelino, lengua argelina",
    },
  },
  it: {
    search: {
      placeholder: "Cerca una parola algerina o italiana...",
      noResultsFound: "Nessun risultato trovato",
    },
    seo: {
      title: "Imparare il dialetto algerino",
      description: "Benvenuto sulla nostra piattaforma per l'apprendimento della lingua algerina.",
      keywords: "corsi algerini, imparare l'algerino, lingua algerina",
    },
  },
  ru: {
    search: {
      placeholder: "Поиск алжирский или русский...",
      noResultsFound: "Результатов не найдено",
    },
    seo: {
      title: "Алжирский язык как удовольствие",
      description: "Добро пожаловать на нашу платформу для изучения алжирского языка.",
      keywords: "алжирские курсы, изучать алжирский, алжирский язык",
    },
  },
  ar: {
    search: {
      placeholder: "ابحث عن كلمة...",
      noResultsFound: "لم يتم العثور على نتائج",
    },
    seo: {
      title: " تعلم اللهجة الجزائرية",
      description: "مرحبًا بك في منصتنا لتعلم اللهجة الجزائرية.",
      keywords: "دروس جزائرية، تعلم الجزائرية، اللهجة الجزائرية",
    },
  },
};

const Home = () => {
  const { language, translations: appTranslations } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSearch(searchTerm);

  return (
    <div className="home">
      <SEO 
        title={translations[language].seo.title}
        description={translations[language].seo.description}
        keywords={translations[language].seo.keywords}
        image="url-to-default-image.jpg"
      />
      <div className="search-bar">
        <div className="input-container">
          <input 
            type="text" 
            placeholder={translations[language].search.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="search-icon" 
            onClick={() => setSearchTerm(searchTerm)} 
          >
            🔍
          </button>
        </div>
      </div>

      {searchTerm && (
        searchResults.length > 0 ? (
          <div className="search-results">
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="search-result" 
                onClick={() => navigate(`/courses/${result.courseId}/${result.lesson.id}`)}
              >
                <strong>{result.lesson.word.dz}</strong>: {result.lesson.word[language]}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">{translations[language].search.noResultsFound}</div>
        )
      )}

      {searchResults.length === 0 && !searchTerm && (
        <div className="hero-content">
          <h1 className="hero-title">{appTranslations[language].heroTitle}</h1>
          <p className="hero-subtitle">{appTranslations[language].heroSubtitle}</p>
          <div className="button-container">
            <Link to="/courses" className="card-button courses-button">
              {appTranslations[language].coursesButton}
            </Link>
            <Link to="/quiz" className="card-button quizzes-button">
              {appTranslations[language].quizzesButton}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;