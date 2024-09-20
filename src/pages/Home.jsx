import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <h2>Apprenez le dialecte algérien et testez vos connaissances grace aux quiz! </h2>
            <div className="card-container">
                <div className="card">Cours</div>
                <div className="card">Quiz</div>
            </div>
        </div>
    );
};

export default Home;
