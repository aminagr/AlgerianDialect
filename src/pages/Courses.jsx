import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/courses/CourseCard'; 
import { useNavigate } from 'react-router-dom';
import lessonsData from '../data/lessons.json';
import '../styles/Courses.css';

const Courses = () => {
  const { language, translations } = useAppContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

    if (results.length > 0) {
      setSearchResults(results); 
    } else {
      alert('Aucune leçon trouvée');
      setSearchResults([]); 
    }
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
        <input 
          type="text" 
          placeholder={translations[language].search.placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} 
        />
        <button className="searchIconBtn" onClick={handleSearch}>🔍</button>
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
        <div className="no-results">
          {translations[language].search.noResultsFound} 
        </div>
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
