import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext.jsx'; 
import Home from './pages/Home';
import Quiz from './pages/QuizPage.jsx'; 
import Courses from './pages/Courses';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import translations from './data/translations'; 

const App = () => {
  return (
    <AppProvider>
      <Router>
        <MainContent />
      </Router>
    </AppProvider>
  );
};

const MainContent = () => {
  const { language } = useAppContext(); 

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
      <Footer footerText={translations[language].footer} />
    </div>
  );
};

export default App;
