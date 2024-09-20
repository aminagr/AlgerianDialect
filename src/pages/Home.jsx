import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Découvrez les cours de la langue algérienne</h1>
            <div className="card-container">
                <div className="card">Sélectionner Cours</div>
                <div className="card">Tester Quiz</div>
            </div>
        </div>
    );
};

export default Home;
