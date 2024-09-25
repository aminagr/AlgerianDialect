import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard'; 
import { useNavigate, useLocation } from 'react-router-dom';
import lessonsData from '../data/lessons.json';
import '../styles/Courses.css';

const Courses = () => {
  const { language, translations } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300); // Délai de 300ms

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
    setIsSearching(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); 
    }
  };

  const handleResultClick = (courseId, lessonId) => {
    navigate(`/courses/${courseId}/${lessonId}`);
    setSearchTerm('');
    setSearchResults([]); 
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
