import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard'; 
import lessonsData from '../data/lessons.json';
import '../styles/Home.css';

const Home = () => {
  const { language, translations } = useAppContext(); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300); 

    return () => clearTimeout(debounceSearch);
  }, [searchTerm]);

  const handleSearch = () => {
    const results = [];
    Object.keys(lessonsData.courses).forEach(courseId => {
      lessonsData.courses[courseId].lessons.forEach(lesson => {
        const words = Object.values(lesson.word);
        if (words.some(word => word.toLowerCase().includes(searchTerm.toLowerCase()))) {
          results.push({ courseId, lesson }); 
        }
      });
    });
    setSearchResults(results);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  return (
    <div className="home">
      <div className="search-bar">
        <div className="input-container">
          <input 
            type="text" 
            placeholder={translations[language].search.placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          <button className="search-icon" onClick={handleSearch}>
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
              onClick={() => navigate(`/courses/${result.courseId}/${result.lesson.id}`)}
            >
              <strong>{result.lesson.word.dz}</strong>: {result.lesson.word[language]}
            </div>
          ))}
        </div>
      ) : (
        <div className="hero-content">
          <h1 className="hero-title">{translations[language].heroTitle}</h1>
          <p className="hero-subtitle">{translations[language].heroSubtitle}</p>
          <div className="button-container">
            <Link to="/courses" className="card-button courses-button">
              {translations[language].coursesButton}
            </Link>
            <Link to="/quiz" className="card-button quizzes-button">
              {translations[language].quizzesButton}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
