import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations';
import lessonsData from '../data/lessons.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Vérifiez si une langue est stockée dans localStorage
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage ? storedLanguage : 'en'; // Défaut à 'en'
  });

  // Mettre à jour localStorage lorsque la langue change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      translations
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
