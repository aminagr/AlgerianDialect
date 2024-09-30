import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext'; 
import Home from './pages/Home';
import QuizPage from './pages/QuizPage.jsx'; 
import Courses from './pages/Courses';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import translations from './data/translations'; 
import LessonCard from './components/courses/LessonCard.jsx';
import SearchResults from './pages/SearchResults.jsx';
import useAnalytics from './hooks/useAnalytics'; 
import Grammaire from './components/courses/Grammaire.jsx';
import Conjugaison from './components/courses/Conjugaison.jsx';
import Vocabulaire from './components/courses/Vocabulaire.jsx';

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
  useAnalytics(); 

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/quiz/:level" element={<QuizPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="courses/grammaire" element={<Grammaire />} />
          <Route path="/courses/conjugaison" element={<Conjugaison />} />
          <Route path="/courses/vocabulaire" element={<Vocabulaire />} />
          <Route path="/courses/:courseId" element={<LessonCard />} />
          <Route path="/courses/:courseId/:lessonId" element={<LessonCard />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
      <Footer footerText={translations[language].footer} />
    </div>
  );
};

export default App;
