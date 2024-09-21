import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import AppContent from './AppContent'; 
import Home from './pages/Home';
import Quiz from './pages/QuizPage.jsx'; 
import Courses from './pages/Courses';

const App = () => (
  <AppProvider>
    <Router>
      <AppContent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  </AppProvider>
);

export default App;
