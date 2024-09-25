import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAppContext } from '../context/AppContext';
import '../styles/Home.css';

const Home = () => {
  const { language, translations } = useAppContext(); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Naviguer vers /courses avec le terme de recherche
    navigate('/courses', { state: { searchTerm } });
    setSearchTerm('');
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
    </div>
  );
}

export default Home;
