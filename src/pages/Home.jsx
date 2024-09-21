import React from 'react';
import '../styles/Home.css';

const Home = ({ translations }) => {
    return (
        <div className="home">
            <div className="hero-content">
                <h1 className="hero-title">{translations.heroTitle}</h1>
                <p className="hero-subtitle">
                    {translations.heroSubtitle}
                </p>
                <div className="button-container">
                    <div className="card-button courses-button">{translations.coursesButton}</div>
                    <div className="card-button quizzes-button">{translations.quizzesButton}</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
