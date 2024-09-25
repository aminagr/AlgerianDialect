import React from 'react';
import { Link } from 'react-router-dom'; 
import { useAppContext } from '../context/AppContext';
import '../styles/Home.css';

const Home = () => {
  const { language, translations } = useAppContext(); 

  return (
    <div className="home">
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
};

export default Home;
