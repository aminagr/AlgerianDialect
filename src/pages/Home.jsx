import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useAppContext } from '../context/AppContext';
import translationsData from '../data/translations';
import '../styles/Home.css';

const Home = () => {
  const { language } = useAppContext();
  const translations = translationsData[language];

  return (
    <div className="home">
      <div className="hero-content">
        <h1 className="hero-title">{translations.heroTitle}</h1>
        <p className="hero-subtitle">{translations.heroSubtitle}</p>
        <div className="button-container">
          <Link to="/courses" className="card-button courses-button">{translations.coursesButton}</Link>
          <Link to="/quiz" className="card-button quizzes-button">{translations.quizzesButton}</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
