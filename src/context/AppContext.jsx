import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations';
import lessonsData from '../data/lessons.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const supportedLanguages = ['en', 'fr', 'es', 'it', 'ru', 'ar'];

  const getDefaultLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      return savedLanguage;
    }
    const browserLanguage = navigator.language.split('-')[0]; // Get language code
    return supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en'; // Default to 'en'
  };

  // Initialize language state
  const [language, setLanguage] = useState(getDefaultLanguage());

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      selectedCourse,
      setSelectedCourse,
      currentLessonIndex,
      setCurrentLessonIndex,
      currentPage,
      setCurrentPage,
      translations,
      courses: lessonsData.courses,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
