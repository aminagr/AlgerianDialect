import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero-content">
                <h1 className="hero-title">Learn Algerian Dialect Now</h1>
                <p className="hero-subtitle">
                    Dive into the vibrant world of the Algerian dialect! Discover a fun and interactive way to learn English through engaging lessons and quizzes that make mastering the language enjoyable. Join us and elevate your skills today!
                </p>
                <div className="button-container">
                    <div className="card-button courses-button">Courses</div>
                    <div className="card-button quizzes-button">Quizzes</div>
                </div>
            </div>
        </div>
    );
};

export default Home;
