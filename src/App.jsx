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
