import React from 'react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <Home />
            <Footer />
        </div>
    );
};

export default App;
